import brierStitchPattern from "@/data/brierStitchPattern";
import { ResizeMode, Video } from "expo-av";
import React, { useRef, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const { width } = Dimensions.get("window");

export default function BrierStitchPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const flatListRef = useRef<FlatList>(null);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    const percentage = (index + 1) / brierStitchPattern.length;
    setProgress(percentage);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: any) => (
    <View style={styles.page}>
      <Text style={styles.title}>{item.title}</Text>

      {/* 텍스트 */}
      {item.content?.text && <Text style={styles.text}>{item.content.text}</Text>}

      {/* 이미지 */}
      {item.content?.image && (
        <Image source={{ uri: item.content.image }} style={styles.image} resizeMode="contain" />
      )}

      {/* 영상 */}
      {item.content?.video && (
        <Video
          source={{ uri: item.content.video }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay={true}
          isLooping
          style={styles.video}
        />
      )}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={brierStitchPattern}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index,
          index,
        })}
      />
      <View style={styles.progressContainer}>
        <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
      </View>

      {/* 하단 바 */}
      <View style={styles.bottomBar}>
        {/* 목록 모달 버튼 */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>목록</Text>
        </TouchableOpacity>
      </View>

      {/* 목록 모달 */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>목차</Text>
            <ScrollView>
              {brierStitchPattern.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    setModalVisible(false);
                    flatListRef.current?.scrollToIndex({ index, animated: true });
                    setCurrentIndex(index);
                    setProgress((index + 1) / brierStitchPattern.length);

                    setTimeout(() => {
                      flatListRef.current?.scrollToIndex({ index, animated: true, viewPosition: 0.5 });
                      setCurrentIndex(index);
                      setProgress((index + 1) / brierStitchPattern.length);
                    }, 50);
                  }}
                  style={[
                    styles.modalItem,
                    currentIndex === index && { backgroundColor: "#e0f0ff" },
                  ]}
                >
                  <Text style={styles.modalItemText}>{item.title}</Text>
                </Pressable>
              ))}
            </ScrollView>
            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    width,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: "left",
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 10,
  },
  video: {
    width: width,
    height: (width * 9) / 16,
    marginTop: 10,
    backgroundColor: "black",
  },
  progressContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "#eee",
    position: "absolute",
    bottom: 40, // 하단바 위로 올림
    left: 0,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#007AFF",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: 40,
    backgroundColor: "#f8f8f8",
    borderTopWidth: 1,
    borderColor: "#ddd",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    backgroundColor: "lightgrey",
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: "white",
    borderRadius: 10,
    maxHeight: "70%",
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 15,
    textAlign: "center",
  },
  modalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  modalItemText: {
    fontSize: 16,
  },
});

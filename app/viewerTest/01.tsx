// pages/pattern/[id].tsx
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
      {item.cover && (
        <>
          <View style={styles.cover}>
            <Image source={{ uri: item.cover }} style={styles.coverImage} />
            <View style={styles.playIconOverlay}>
              <Text style={styles.playIcon}>▶</Text>
            </View>
          </View>
        </>
      )}

      <Text style={styles.title}>{item.title}</Text>

      {/* 복수 content 블록 처리 */}
      {item.content?.map((block: any, idx: number) => {
        if (block.type === "text") {
          return (
            <Text key={idx} style={styles.text}>
              {block.value}
            </Text>
          );
        } else if (block.type === "image") {
          return (
            <Image
              key={idx}
              source={{ uri: block.value }}
              style={styles.image}
              resizeMode="contain"
            />
          );
        } else if (block.type === "video") {
          return (
            <Video
              key={idx}
              source={{ uri: block.value }}
              useNativeControls
              resizeMode={ResizeMode.CONTAIN}
              shouldPlay={true}
              isLooping
              style={styles.video}
            />
          );
        }
        return null;
      })}
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

      {/* 하단 고정 바 */}
      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>옵션설정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>목차</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>커뮤니티</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>배경설정</Text>
        </TouchableOpacity>
      </View>

      {/* 목차 모달 */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
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
                    flatListRef.current?.scrollToIndex({
                      index,
                      animated: true,
                    });
                    setCurrentIndex(index);
                    setProgress((index + 1) / brierStitchPattern.length);
                  }}
                  style={[
                    styles.modalItem,
                    currentIndex === index && { backgroundColor: "#e0f0ff" },
                  ]}
                >
                  <Text style={styles.modalItemText}>
                    {index + 1}. {item.title}
                  </Text>
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
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 10,
  },
  image: {
    width: "100%",
    height: 300,
    marginTop: 10,
  },
  video: {
    width: width - 40,
    height: (width * 9) / 16,
    marginTop: 10,
    backgroundColor: "black",
  },

  cover: {
    position: "relative",
    width: "100%",
    height: 200,
    marginBottom: 15,
  },
  coverImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  playIconOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    fontSize: 40,
    color: "white",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 50,
  },
  progressContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "#eee",
    position: "absolute",
    bottom: 40,
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
    justifyContent: "space-around",
    alignItems: "center",
  },
  button: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  buttonText: {
    color: "black",
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
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

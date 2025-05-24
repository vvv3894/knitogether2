// pages/pattern/[id].tsx
import { useRoute } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import * as KeepAwake from "expo-keep-awake";
import { router } from "expo-router";
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

const patternData: {
  [patternId: string]: {
    title: string;
    description: string;
    image: any;
    pages: {
      [pageNum: string]: {
        pagename?: string;
        content: string;
        image?: any;
        video?: string; // 비디오 URL 추가
      };
    };
  };
} = {
  "1": {
    title: "분홍색 목도리",
    description: "초보자를 위한 도안입니다.",
    image: require("../../assets/images/도안사진1.jpg"),
    pages: {
      "1": {
        pagename: "준비물",
        content: "1페이지 내용",
        image: require("../../assets/images/도안사진1.jpg"),
      },
      "2": {
        pagename: "도안 설명",
        content: "2페이지 내용",
        image:
          "https://res.cloudinary.com/dvo3p6sao/image/upload/v1747798694/%EB%B8%8C%EB%9D%BC%EC%9D%B4%EC%96%B4%EC%8A%A4%ED%8B%B0%EC%B9%98.png",
      },
      "3": {
        pagename: "마지막인사",
        content: "1페이지 내용",
        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/v1747804469/01v3_%EC%BD%94%EB%8A%98%EB%A6%BC_1.mp4",
      },
    },
  },
  "2": {
    title: "초록 니트 모자",
    description: "중급자용 모자 도안입니다.",
    image: require("../../assets/images/도안사진2.jpg"),
    pages: {
      "1": {
        content: "1페이지 내용",
      },
    },
  },
};

function getPagesArray(patternId: string) {
  const pagesObj = patternData[patternId]?.pages || {};
  return Object.keys(pagesObj)
    .sort((a, b) => Number(a) - Number(b))
    .map((pageNum) => {
      const page = pagesObj[pageNum];
      return {
        title: page.pagename || `페이지 ${pageNum}`,
        content: [
          {
            type: "text",
            value: page.content,
          },
          ...(page.image
            ? [
                {
                  type: "image",
                  value: page.image, // require된 이미지 그대로 전달
                },
              ]
            : []),
          ...(page.video
            ? [
                {
                  type: "video",
                  value: page.video,
                },
              ]
            : []),
        ],
      };
    });
}

export default function PatternPage() {
  const route = useRoute();
  const { id: patternId } = route.params as { id: string }; // params에서 id 받아오기

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); // ← 이 부분 추가
  const flatListRef = useRef<FlatList>(null);

  const pages = getPagesArray(patternId);
  const [isLocked, setIsLocked] = useState(false);

  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.round(offsetX / width);
    const percentage = (index + 1) / pages.length;
    setProgress(percentage);
    setCurrentIndex(index);
  };

  const renderItem = ({ item }: any) => {
    return (
      <View style={styles.page}>
        <Text style={styles.title}>{item.title}</Text>

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
                source={block.value} // require된 이미지 그대로 source에 넣기
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
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        ref={flatListRef}
        data={pages}
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => router.push("/MyBook")}
        >
          <Text style={styles.buttonText}>돌아가기</Text>
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
        <TouchableOpacity
          style={[styles.button, isLocked && { backgroundColor: "#007AFF" }]}
          onPress={() => {
            if (isLocked) {
              KeepAwake.deactivateKeepAwake();
            } else {
              KeepAwake.activateKeepAwake();
            }
            setIsLocked(!isLocked);
          }}
        >
          <Text style={[styles.buttonText, isLocked && { color: "white" }]}>
            화면잠금
          </Text>
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
              {pages.map((item, index) => (
                <Pressable
                  key={index}
                  onPress={() => {
                    setModalVisible(false);
                    flatListRef.current?.scrollToIndex({
                      index,
                      animated: true,
                    });
                    setCurrentIndex(index);
                    setProgress((index + 1) / pages.length);
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
    backgroundColor: "#D06c5c",
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
    borderColor: "#ddd",
  },
  modalItemText: {
    fontSize: 16,
  },
});

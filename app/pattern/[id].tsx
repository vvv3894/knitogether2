// pages/pattern/[id].tsx
import { useRoute } from "@react-navigation/native";
import { ResizeMode, Video } from "expo-av";
import * as KeepAwake from "expo-keep-awake";
import { router } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Modal,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
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
  "514": {
    title: "Athletic Sweater No. 514",
    description: "초보자를 위한 도안입니다.",
    image: require("../../assets/images/도안사진1.jpg"),
    pages: {
      "0": {
        pagename: "도안 소개",
        content:
          "스포츠 스웨터 (Athletic Sweater)\n 작성자:Antique Pattern Library ",
        image:
          "https://res.cloudinary.com/dvo3p6sao/image/upload/v1748100053/514_cover.png",
      },
      "1": {
        pagename: "준비물",
        content:
          "사용 실\n장미색 실 5 볼 : Corticelli Shetland Flosola Yarn No. 23\n파란 실 1볼 : Corticelli Shetland Flosola Yarn No. 35\n검정 실 1볼 : Corticelli Shetland Flosola Yarn No. 99\n노란 실 1볼 : Corticelli Shetland Flosola Yarn No. 50 \n \n사용 바늘\n 5.5mm 대바늘 한쌍",
        // image:
        //   "https://res.cloudinary.com/dvo3p6sao/image/upload/v1748100053/514_cover.png",
      },
      "2": {
        pagename: "등판",
        content:
          "장미색 실로 80코 코잡기\n/*3코 고무뜨기*/\n1-11단 : 안뜨기로 시작해서 3코 고무뜨기 11단 반복\n12-63단 : 색을 바꿔가며 3코 고무뜨기 반복\n  12-13단 : 검정 실\n  14-21단 : 장미색 실\n  22-23단 : 검정 실\n  24-31단 : 파란 실\n  32-33단 : 검정 실\n  34-41단 : 노란 실\n  42-43단 : 검정 실\n  44-51단 : 파란 실\n  52-53단 : 검정 실\n  54-61단 : 장미색 실\n  62-63단 : 검정 실\n장미색 실로 변경해서 전체 길이가 18인치가 될 때까지 겉뜨기\n단의 양 끝에 마커를 하나씩 걸어줍니다. (소매 시작 표시)\n겉뜨기 72단 반복",
        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/w_380,h_213/v1748965335/SHANA_514_3%EC%BD%94_%EA%B3%A0%EB%AC%B4%EB%9C%A8%EA%B8%B0.mp4",
        image:
          "https://res.cloudinary.com/dvo3p6sao/image/upload/w_380,h_213/v1747798694/%EB%B8%8C%EB%9D%BC%EC%9D%B4%EC%96%B4%EC%8A%A4%ED%8B%B0%EC%B9%98.png",
      },
      "3": {
        pagename: "앞판",
        content:
          "32코 겉뜨기, 16코 코막음, 앞서 뜬 32코 안전핀에 보관\n/*코늘림*/\n반대편 32코는 겉뜨기로 6단 더 뜨고, 이후 20단 동안 목 쪽에 한 단마다 1코씩 늘리면서 겉뜨기\n/*케이블 캐스트 온*/\n목 쪽에서 케이블 캐스트 온으로 10코를 만들어서 46단 겉뜨기\n단의 양 끝에 마커를 하나씩 걸어줍니다. (소매 끝 표시)\n14단을 더 겉뜨기하여 앞면 쪽에서 단을 끝내고, 이 코들도 안전핀에 보관\n안전핀에 보관했던 32코도 같은 방식으로 진행\n앞판을 한 바늘에 연결한 후, 등판과 포갰을 때 63단 전까지 겉뜨기\n등판과 동일하게 컬러 스트라이프 뜨고 코막음",

        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/w_380,h_213/v1748965339/SHANA_514_%EC%BC%80%EC%9D%B4%EB%B8%94_%EC%BA%90%EC%8A%A4%ED%8A%B8_%EC%98%A8.mp4",
      },
      "4": {
        pagename: "팔 둘레 마감",
        content:
          "코바늘을 이용하여 파란 실, 노란 실, 장미색 실 순으로 1단씩 짧은 뜨기\n장미색 실로 빼뜨기하여 한 바퀴 마감",

        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/w_380,h_213/v1747804469/01v3_%EC%BD%94%EB%8A%98%EB%A6%BC_1.mp4",
      },
      "5": {
        pagename: "카라",
        content:
          "장미색 색으로 15인치 길이로 코잡기\n1-4단 : 겉뜨기\n5-99단 : 색을 바꿔가며 겉뜨기 반복\n  5-6단 : 파란 실\n  7-8단 : 노란 실\n  9-99단 : 장미색 실\n겉뜨기로 코막음\n목에 달기 (앞에서 추가한 10코 지점부터 시작)",
      },
      "6": {
        pagename: "마무리 (브라이어스티치)",
        content:
          "블루+골드 실을 함께 잡아 브라이어 스티치(Brier Stitch)로 카라와 앞면을 한 바퀴 둘러 마감.",
      },
    },
  },
  "522": {
    title: "Knit Shoulder Scarf No. 522",
    description: "초보자를 위한 도안입니다.",
    image: require("../../assets/images/도안사진6.png"),
    pages: {
      "0": {
        pagename: "도안 소개",
        content: "Knit Shoulder Scarf\n작성자 : Antique Pattern Library ",
        image: require("../../assets/images/도안사진6.png"),
      },
      "1": {
        pagename: "준비물",
        content:
          "사용 실\n하얀 실 5볼 : Corticelli Shetland Flosola Yarn No. 98\n파란 실 1볼 : Corticelli Shetland Flosola Yarn No. 33\n분홍 실 1볼 : Corticelli Shetland Flosola Yarn No. 20\n보라 실 1볼 : Corticelli Shetland Flosola Yarn No. 70\n갈색 실 1볼 : Corticelli Shetland Flosola Yarn No. 59 \n \n사용 바늘\n 5.5mm 대바늘 한쌍",
      },
      "2": {
        pagename: "시작",
        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/w_380,h_213/v1748965343/SHANA_522_%EC%BD%94%EC%9E%A1%EA%B3%A0_%EA%B2%89%EB%9C%A8%EA%B8%B0.mp4",
        content:
          "하얀 실로 100코 코잡기(좁게 만들 경우 보다 적게 잡아주세요.)\n\n색을 바꿔가며 겉뜨기 반복",
      },
      "3": {
        pagename: "실 색 변경",
        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/w_380,h_213/v1748965337/SHANA_522_%EC%8B%A4_%EB%B0%94%EA%BE%B8%EA%B8%B0.mp4",
        content:
          "31단 : 갈색 실\n32-38단 : 파란 실\n39단 : 갈색 실\n40-48단 : 하얀 실\n49단 : 갈색 실\n50-56단 : 분홍 실\n57단 : 갈색 실\n58-66단 : 하얀 실\n67단 : 갈색 실\n68-74단 : 보라 실\n76단 : 갈색 실\n77-127단 : 하얀 실",
      },
      "4": {
        pagename: "코막음",
        content: "128-253단 : 127단부터 2단까지 거꾸로 수행\n\n겉뜨기로 코막음",
        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/w_380,h_213/v1748965334/SHANA_522_%EA%B2%89%EB%9C%A8%EA%B8%B0%EB%A1%9C_%EC%BD%94%EB%A7%89%EC%9D%8C.mp4",
      },
      "5": {
        pagename: "술 달기",
        video:
          "https://res.cloudinary.com/dvo3p6sao/video/upload/w_380,h_213/v1748965334/SHANA_522_%EC%88%A0_%EB%8B%AC%EA%B8%B0.mp4",
        content: "15가닥의 흰색 실로 양 쪽에 태슬을 25개씩 달아 마무리 합니다.",
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

// 날짜 포맷 함수 추가
function formatDate(dateString: string) {
  const d = new Date(dateString);
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const min = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${min}`;
}

export default function PatternPage() {
  const route = useRoute();
  const { id: patternId } = route.params as { id: string }; // params에서 id 받아오기

  const safePatternId = patternData[patternId] ? patternId : "522";
  const pages = getPagesArray(safePatternId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [modalVisible, setModalVisible] = useState(false); // ← 이 부분 추가
  const [modalCommentVisible, setModalCommentVisible] = useState(false); // ← 이 부분 추가
  const flatListRef = useRef<FlatList>(null);

  const [isLocked, setIsLocked] = useState(false);

  // 댓글 관련 상태
  const [comments, setComments] = useState<any[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);

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

  // 댓글 불러오기
  const fetchComments = async () => {
    setLoadingComments(true);
    try {
      console.log("댓글 조회 patternId:", patternId); // patternId 콘솔 출력
      const res = await fetch(
        `http://localhost:1337/api/pattern-comments?filters[patternId][$eq]=${patternId}&sort=createdAt:desc`
      );
      const json = await res.json();
      console.log("댓글 조회 결과:", json); // 받아온 전체 데이터 콘솔 출력
      setComments(json.data || []);
    } catch (e) {
      console.error("댓글 조회 에러:", e);
      setComments([]);
    }
    setLoadingComments(false);
  };

  // 댓글 작성
  const handleSendComment = async () => {
    if (!commentInput.trim()) return;
    try {
      // patternId와 body 콘솔 출력
      console.log("댓글 작성 patternId:", patternId);
      console.log("댓글 작성 body:", {
        data: {
          patternId: patternId,
          author: "니팅러버123",
          content: commentInput.trim(),
        },
      });

      const res = await fetch("http://localhost:1337/api/pattern-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data: {
            patternId: patternId,
            author: "니팅러버123",
            content: commentInput.trim(),
          },
        }),
      });
      if (res.ok) {
        setCommentInput("");
        fetchComments();
      }
    } catch (e) {
      console.error("댓글 작성 에러:", e);
    }
  };
  //댓글삭제
  const handleDeleteComment = async (commentId: string) => {
    try {
      // 1. commentId로부터 해당 코멘트 정보 가져오기
      const res = await fetch(
        `http://localhost:1337/api/pattern-comments/${commentId}`
      );
      const json = await res.json();

      // 2. 코멘트가 없을 경우
      if (!json?.data) {
        console.warn("❌ 해당 commentId에 대한 데이터가 없습니다:", commentId);
        alert("삭제할 댓글을 찾을 수 없습니다.");
        return;
      }

      const documentId = json.data.attributes?.documentId;
      if (!documentId) {
        console.warn("❌ 댓글에 documentId가 없습니다:", commentId);
        alert("댓글에 연결된 documentId를 찾을 수 없습니다.");
        return;
      }

      console.log("📌 commentId로 찾은 documentId:", documentId);

      // 3. 모든 코멘트를 가져와서 documentId 일치 항목 찾기
      const allRes = await fetch(`http://localhost:1337/api/pattern-comments`);
      const allJson = await allRes.json();

      const match = allJson.data.find(
        (item: any) => item.attributes?.documentId === documentId
      );

      if (!match) {
        console.warn(
          "⚠️ 해당 documentId로 댓글을 찾을 수 없습니다:",
          documentId
        );
        alert("삭제할 댓글을 찾을 수 없습니다.");
        return;
      }

      const rowId = match.id;
      console.log("🧨 삭제 대상 rowId (Strapi 내부 id):", rowId);

      // 4. DELETE 요청
      const deleteRes = await fetch(
        `http://localhost:1337/api/pattern-comments/${rowId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("🧹 삭제 응답 상태코드:", deleteRes.status);
      const deleteJson = await deleteRes.json().catch(() => null);
      console.log("📩 삭제 응답 내용:", deleteJson);

      if (deleteRes.ok) {
        fetchComments(); // 댓글 목록 다시 불러오기
      } else {
        alert("삭제 실패: " + deleteRes.status);
      }
    } catch (e) {
      console.error("❌ 삭제 중 에러:", e);
      alert("삭제 중 오류 발생");
    }
  };

  // 댓글 삭제 (patternId를 0으로 업데이트)
  // const handleDeleteComment = async (commentId: string) => {
  //   try {
  //     console.log("삭제(업데이트) 시도 commentId:", commentId);
  //     const res = await fetch(
  //       `http://localhost:1337/api/pattern-comments/${commentId}`,
  //       {
  //         method: "PUT",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           data: {
  //             patternId: 0,
  //           },
  //         }),
  //       }
  //     );
  //     console.log("업데이트(삭제) 응답 status:", res.status);
  //     if (res.ok) {
  //       fetchComments();
  //     } else {
  //       const errText = await res.text();
  //       console.error("업데이트(삭제) 실패 응답:", errText);
  //       alert("삭제 실패: " + res.status);
  //     }
  //   } catch (e) {
  //     console.error("삭제(업데이트) 중 에러:", e);
  //   }
  // };

  useEffect(() => {
    if (modalCommentVisible) fetchComments();
    // eslint-disable-next-line
  }, [modalCommentVisible]);

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
        <TouchableOpacity
          onPress={() => setModalCommentVisible(true)}
          style={styles.button}
        >
          <Text style={styles.buttonText}>댓글</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, isLocked && { backgroundColor: "#D06c5c" }]}
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
            <FlatList
              data={pages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({ item, index }) => (
                <Pressable
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
                    currentIndex === index && {
                      backgroundColor: "rgba(208,108,92,0.25)",
                    },
                  ]}
                >
                  <Text style={styles.modalItemText}>
                    {index + 1}. {item.title}
                  </Text>
                </Pressable>
              )}
            />

            <TouchableOpacity
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.buttonText}>닫기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* 댓글 모달 */}
      <Modal
        visible={modalCommentVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalCommentVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>댓글</Text>

            {loadingComments ? (
              <ActivityIndicator size="small" />
            ) : comments.length === 0 ? (
              <Text style={{ textAlign: "center", marginVertical: 16 }}>
                아직 댓글이 없습니다.
              </Text>
            ) : (
              // 오래된 댓글이 위로 가도록 오름차순 정렬
              [...comments]
                .sort(
                  (a, b) =>
                    new Date(a.createdAt).getTime() -
                    new Date(b.createdAt).getTime()
                )
                .map((c) =>
                  c.content ? (
                    <View key={c.id} style={styles.commentItem}>
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Text style={styles.commentAuthor}>
                          {c.author || "익명"}
                        </Text>
                        <Text
                          style={{
                            fontWeight: "400",
                            color: "#888",
                            fontSize: 12,
                            marginLeft: 4,
                          }}
                        >
                          {formatDate(c.createdAt)}
                        </Text>
                        <TouchableOpacity
                          style={{ marginLeft: 8 }}
                          onPress={() => handleDeleteComment(c.id)}
                        >
                          {/* <Text style={{ color: "#d06c5c", fontSize: 12 }}>
                      삭제
                    </Text> */}
                        </TouchableOpacity>
                      </View>
                      <Text style={styles.commentText}>{c.content}</Text>
                    </View>
                  ) : null
                )
            )}

            {/* 댓글 입력창 */}
            <View style={styles.commentInputContainer}>
              <TextInput
                style={styles.commentInput}
                placeholder="댓글을 입력하세요..."
                value={commentInput}
                onChangeText={setCommentInput}
                multiline
              />
              <TouchableOpacity
                onPress={handleSendComment}
                style={styles.sendButton}
              >
                <Text style={styles.sendButtonText}>전송</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalCommentVisible(false)}
            >
              <Text style={styles.closeButtonText}>닫기</Text>
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
    // backgroundColor: "rgba(208,108,92,0.25)",
    fontSize: 22,
    fontWeight: "bold",
    paddingTop: 40,
    paddingBottom: 60,
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
    backgroundColor: "grey",
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
    color: "#431605",
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
    color: "#431605",
    fontSize: 16,
  },
  commentButton: {
    position: "absolute",
    top: 50,
    right: 20,
    backgroundColor: "#f0f0f0",
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 10,
    zIndex: 10,
  },
  commentButtonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  commentItem: {
    marginBottom: 16,
  },
  commentAuthor: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentText: {
    fontSize: 14,
  },
  closeButton: {
    marginTop: 24,
    backgroundColor: "#e0e0e0",
    padding: 10,
    borderRadius: 8,
    alignSelf: "center",
  },
  closeButtonText: {
    fontWeight: "bold",
  },
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#fff",
    marginTop: 8,
  },
  commentInput: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    fontSize: 14,
  },
  sendButton: {
    marginLeft: 8,
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#431605",
    fontWeight: "bold",
    fontSize: 14,
  },
});

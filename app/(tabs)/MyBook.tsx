import { shopItems } from "@/data/shopItem"; // 도안 데이터 가져오기
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export type ShopItem = {
  id: string;
  title: string;
  description: string;
  image?: any;
  needles?: string[];
  yarns?: string[];
  writer?: string;
  category?: string;
};

async function fetchMyPatternIds(): Promise<string[]> {
  try {
    const response = await fetch("http://localhost:1337/api/my-pattern-lists", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("패턴 목록을 불러오지 못했습니다.");

    const data = await response.json();
    // 전체 응답 로그
    console.log("📦 전체 응답 데이터:", data);
    return data.data.map((item: any) => String(item.PatternId));
  } catch (error) {
    console.error("내 도안 ID 불러오기 실패:", error);
    return [];
  }
}

async function deleteMyPatternId(patternId: string): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:1337/api/my-pattern-lists");
    const json = await res.json();

    console.log("📦 전체 응답:", json);

    const match = json.data.find(
      (item: any) => String(item.PatternId) === patternId
    );

    if (!match) {
      console.warn("⚠️ 삭제할 패턴이 없습니다. patternId:", patternId);
      return false;
    }

    const rowId = match.id - 1;
    console.log("🧨 삭제 대상 rowId:", rowId);

    const deleteRes = await fetch(
      `http://localhost:1337/api/my-pattern-lists/${rowId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("🧹 삭제 응답 상태코드:", deleteRes.status); // 204 기대됨

    const deleteJson = await deleteRes.json().catch(() => null);
    console.log("🧹 삭제 응답 상태코드:", deleteRes.status);
    console.log("📩 삭제 응답 내용:", deleteJson);
    return deleteRes.ok;
  } catch (error) {
    console.error("❌ 삭제 중 에러 발생:", error);
    return false;
  }
}

export default function MyBook() {
  const [numColumns, setNumColumns] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);
  const [fontSize, setFontSize] = useState(12);
  const [myProjects, setMyProjects] = useState<ShopItem[]>([]);
  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get("window").width;

      let columns = 3;
      let font = 12;

      if (width < 480) {
        columns = 2;
        font = 11;
      } else if (width < 768) {
        columns = 3;
        font = 12;
      } else if (width < 1000) {
        columns = 5;
        font = 13;
      } else {
        columns = 6;
        font = 14;
      }

      setNumColumns(columns);
      setFontSize(font);

      const calculatedWidth = (width - gap * (columns + 1)) / columns;
      setCardWidth(calculatedWidth);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener("change", updateLayout);
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    const loadMyPatterns = async () => {
      const myIds = await fetchMyPatternIds(); // ["1", "2"]
      const filtered = shopItems.filter((p) => myIds.includes(p.id));
      setMyProjects(filtered);
    };

    loadMyPatterns();
  }, []);

  // 삭제 함수
  async function handleDelete(patternId: string) {
    const ok = await deleteMyPatternId(patternId);
    if (ok) {
      setMyProjects((prev) => prev.filter((item) => item.id !== patternId));
    } else {
      Alert.alert("삭제 실패", "패턴 삭제에 실패했습니다.");
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.publicHeader}>
        <TouchableOpacity onPress={() => router.push({pathname:"../qr/QrScan"})}>
          <Ionicons name="qr-code-outline" size={30} color="#431605" />
        </TouchableOpacity>
      </View>

      <Text style={[styles.header, { fontSize: fontSize + 10 }]}>서재</Text>

      <FlatList
        data={myProjects}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns}
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: gap,
        }}
        style={{ paddingTop: 5 }}
        renderItem={({ item }) => (
          <View
            style={[
              styles.card,
              {
                width: cardWidth,
                height: cardWidth * (4 / 3),
              },
            ]}
          >
            <TouchableOpacity
              onPress={() =>
                router.push({
                  pathname: "/pattern/[id]",
                  params: { id: item.id },
                })
              }
              style={[
                styles.card,
                {
                  width: cardWidth,
                  height: cardWidth * (4 / 3),
                },
              ]}
            >
              <Image
                source={item.image}
                style={styles.image}
                resizeMode="cover"
              />
              <View style={styles.cardTextWrapper}>
                <Text style={[styles.title, { fontSize }]} numberOfLines={2}>
                  {item.title}
                </Text>
                <Text
                  style={[styles.description, { fontSize: fontSize - 2 }]}
                  numberOfLines={2}
                >
                  {item.description}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={() => {
                console.log("삭제 버튼 클릭됨");
                if (Platform.OS === "web") {
                  // confirm은 true(확인)면 삭제, false(취소)면 아무것도 안 함
                  if (window.confirm("정말 삭제하시겠습니까?")) {
                    handleDelete(item.id);
                  }
                } else {
                  Alert.alert("삭제 확인", "정말 삭제하시겠습니까?", [
                    { text: "취소", style: "cancel" },
                    {
                      text: "삭제",
                      style: "destructive",
                      onPress: () => handleDelete(item.id),
                    },
                  ]);
                }
              }}
            >
              <Ionicons name="trash-outline" size={20} color="#d06c5c" />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
const gap = 8; // 카드 간격

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  publicHeader: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    flexDirection: "row-reverse",
    height: 48,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(208,108,92,0.25)",
  },
  header: {
    padding: 20,
    color: "#431605",
    fontWeight: "bold",
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  image: {
    width: "100%",
    height: "70%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardTextWrapper: {
    paddingHorizontal: 6,
    paddingVertical: 4,
  },
  title: {
    color: "#431605",
    fontWeight: "bold",
  },
  description: {
    color: "#666",
  },
  deleteButton: {
    position: "absolute",
    top: 6,
    right: 6,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    elevation: 2,
    zIndex: 10,
  },
});

//두번째

// import Ionicons from "@expo/vector-icons/Ionicons";
// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   Platform,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// type Project = {
//   id: string;
//   title: string;
//   description: string;
//   image: any;
// };

// const projects: Project[] = [
//   {
//     id: "514",
//     title: "스포츠 스웨터 (Athletic Sweater No. 514",
//     description: "Antique Pattern Library",
//     image:
//       "https://res.cloudinary.com/dvo3p6sao/image/upload/v1748100053/514_cover.png?v=1",
//   },
//   {
//     id: "522",
//     title: "니트 숄더 스카프 (Knit Shoulder Scarf No. 522)",
//     description: "Antique Pattern Library",
//     image: require("../../assets/images/도안사진6.png"),
//   },
//   // {
//   //   id: "2",
//   //   title: "초록 니트 모자",
//   //   description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
//   //   image: require("../../assets/images/도안사진2.jpg"),
//   // },
//   // {
//   //   id: "3",
//   //   title: "분홍색 목도리",
//   //   description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
//   //   image: require("../../assets/images/도안사진1.jpg"),
//   // },
// ];

// const gap = 12;

// export default function MyBook() {
//   const [numColumns, setNumColumns] = useState(3);
//   const [cardWidth, setCardWidth] = useState(0);
//   const [fontSize, setFontSize] = useState(12);

//   useEffect(() => {
//     const updateLayout = () => {
//       const width = Dimensions.get("window").width;

//       let columns = 3;
//       let font = 12;

//       if (width < 480) {
//         columns = 2;
//         font = 11;
//       } else if (width < 768) {
//         columns = 3;
//         font = 12;
//       } else if (width < 1000) {
//         columns = 5;
//         font = 13;
//       } else {
//         columns = 6;
//         font = 14;
//       }

//       setNumColumns(columns);
//       setFontSize(font);

//       const calculatedWidth = (width - gap * (columns + 1)) / columns;
//       setCardWidth(calculatedWidth);
//     };

//     updateLayout();
//     const subscription = Dimensions.addEventListener("change", updateLayout);
//     return () => subscription.remove();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <View style={styles.publicHeader}>
//         <TouchableOpacity>
//           <Ionicons name="qr-code-outline" size={30} color="#431605" />
//         </TouchableOpacity>
//       </View>

//       <Text style={[styles.header, { fontSize: fontSize + 10 }]}>서재</Text>

//       <FlatList
//         data={projects}
//         keyExtractor={(item) => item.id}
//         numColumns={numColumns}
//         key={numColumns}
//         contentContainerStyle={styles.listContent}
//         columnWrapperStyle={{
//           justifyContent: "space-between",
//           paddingHorizontal: gap,
//         }}
//         style={{ paddingTop: 5 }}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() =>
//               router.push({
//                 pathname: "/pattern/[id]",
//                 params: { id: item.id },
//               })
//             }
//             style={[
//               styles.card,
//               {
//                 width: cardWidth,
//                 height: cardWidth * (4 / 3), // 3:4 비율로 조정
//               },
//             ]}
//           >
//             <Image
//               source={item.image}
//               style={styles.image}
//               resizeMode="cover"
//             />
//             <View style={styles.cardTextWrapper}>
//               <Text style={[styles.title, { fontSize }]} numberOfLines={2}>
//                 {item.title}
//               </Text>
//               <Text
//                 style={[styles.description, { fontSize: fontSize - 2 }]}
//                 numberOfLines={2}
//               >
//                 {item.description}
//               </Text>
//             </View>
//           </TouchableOpacity>
//         )}
//       />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#ffffff",
//   },
//   publicHeader: {
//     paddingVertical: 9,
//     paddingHorizontal: 12,
//     flexDirection: "row-reverse",
//     height: 48,
//     alignItems: "center",
//     justifyContent: "space-between",
//     backgroundColor: "rgba(208,108,92,0.25)",
//   },
//   header: {
//     padding: 20,
//     color: "#431605",
//     fontWeight: "bold",
//   },
//   listContent: {
//     paddingBottom: 16,
//   },
//   card: {
//     marginBottom: 12,
//     backgroundColor: "#fff",
//     borderRadius: 10,
//     elevation: 3,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 6,
//     overflow: Platform.OS === "android" ? "hidden" : "visible",
//   },
//   image: {
//     width: "100%",
//     height: "70%",
//     borderTopLeftRadius: 10,
//     borderTopRightRadius: 10,
//   },
//   cardTextWrapper: {
//     paddingHorizontal: 6,
//     paddingVertical: 4,
//   },
//   title: {
//     color: "#431605",
//     fontWeight: "bold",
//   },
//   description: {
//     color: "#666",
//   },
// });
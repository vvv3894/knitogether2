import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type Project = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const projects: Project[] = [
  {
    id: "1",
    title: "분홍색 목도리",
    description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
    image: require("../../assets/images/도안사진1.jpg"),
  },
  {
    id: "2",
    title: "초록 니트 모자",
    description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
    image: require("../../assets/images/도안사진2.jpg"),
  },
  {
    id: "3",
    title: "분홍색 목도리",
    description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
    image: require("../../assets/images/도안사진1.jpg"),
  },
  {
    id: "4",
    title: "초록 니트 모자",
    description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
    image: require("../../assets/images/도안사진2.jpg"),
  },
];

const gap = 12;

export default function MyBook() {
  const [numColumns, setNumColumns] = useState(3);
  const [cardWidth, setCardWidth] = useState(0);

  useEffect(() => {
    const updateLayout = () => {
      const width = Dimensions.get("window").width;

      let columns = 3;
      if (width < 600) {
        columns = 3;
      } else if (width < 1000) {
        columns = 5;
      } else {
        columns = 7;
      }

      setNumColumns(columns);
      const calculatedWidth = (width - gap * (columns + 1)) / columns;
      setCardWidth(calculatedWidth);
    };

    updateLayout();
    const subscription = Dimensions.addEventListener("change", updateLayout);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.publicHeader}><Image source={require('../../assets/images/Camera.png')} style={{height: 30,width: 30}}/></View>

      <Text style={styles.header}>서재</Text>

      <FlatList
        data={projects}
        keyExtractor={(item) => item.id}
        numColumns={numColumns}
        key={numColumns} // 강제 리렌더링
        contentContainerStyle={styles.listContent}
        columnWrapperStyle={{
          justifyContent: "space-between",
          paddingHorizontal: gap,
        }}
        renderItem={({ item }) => (
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
                height: cardWidth * (16 / 9), // 비율 유지 (3:4)
              },
            ]}
          >
            <Image
              source={item.image}
              style={styles.image}
              resizeMode="cover"
            />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  publicHeader:{
    paddingVertical: 9,
    paddingHorizontal: 12,
    display: 'flex',
    flexDirection: 'row-reverse',
    height: 48,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(208,108,92,0.25)'
  },
  header: {
    padding: 20,
    color: "#431605",
    fontSize: 22,
    fontWeight: "bold"
  },
  listContent: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 12,
    backgroundColor: "#fff",
    borderRadius: 4,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: "100%",
    height: "70%",
  },
  title: {
    fontSize: 12,
    fontWeight: "bold",
    paddingHorizontal: 6,
    marginTop: 4,
  },
  description: {
    fontSize: 10,
    paddingHorizontal: 6,
    color: "#666",
  },
});

//두번째

// import { router } from "expo-router";
// import React from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
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
//     id: "1",
//     title: "분홍색 목도리",
//     description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
//     image: require("../../assets/images/도안사진1.jpg"),
//   },
//   {
//     id: "2",
//     title: "초록 니트 모자",
//     description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
//     image: require("../../assets/images/도안사진2.jpg"),
//   },
//   {
//     id: "1",
//     title: "분홍색 목도리",
//     description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
//     image: require("../../assets/images/도안사진1.jpg"),
//   },
//   {
//     id: "2",
//     title: "초록 니트 모자",
//     description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
//     image: require("../../assets/images/도안사진2.jpg"),
//   },
//   // 더 추가 가능
// ];

// export default function MyBook() {
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🧶 나의 뜨개질 서재</Text>

//       <FlatList
//         data={projects}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() =>
//               router.push({
//                 pathname: "/pattern/[id]",
//                 params: { id: item.id },
//               })
//             }
//             style={styles.card}
//           >
//             <View style={styles.cardContent}>
//               <Image
//                 source={item.image}
//                 style={styles.image}
//                 resizeMode="cover"
//               />
//               <View style={styles.textContainer}>
//                 <Text style={styles.title}>{item.title}</Text>
//                 <Text style={styles.description}>{item.description}</Text>
//               </View>
//             </View>
//           </TouchableOpacity>
//         )}
//         numColumns={3} // 한 줄에 3개의 카드가 보이도록 설정
//         contentContainerStyle={styles.listContent}
//       />
//     </View>
//   );
// }

// const screenWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fffaf0",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     padding: 20,
//     textAlign: "center",
//   },
//   listContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   card: {
//     backgroundColor: "#ffffff",
//     borderRadius: 12,
//     marginBottom: 16,
//     overflow: "hidden",
//     elevation: 2, // Android shadow
//     shadowColor: "#000", // iOS shadow
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     marginHorizontal: 8, // 카드 간 간격 추가
//     flex: 1, // 카드가 3개씩 한 줄에 들어갈 수 있도록
//     height: 240, // 책 표지처럼 보이게 높이 설정
//   },
//   cardContent: {
//     flexDirection: "column", // 이미지는 위에, 텍스트는 아래로 배치
//     justifyContent: "flex-end", // 텍스트를 하단에 위치시킴
//     alignItems: "center",
//     height: "100%", // 카드 전체를 차지하도록 설정
//   },
//   image: {
//     width: screenWidth / 3 - 32, // 이미지 크기 조정
//     height: 160, // 책 표지처럼 보이도록 이미지 크기 설정
//     borderRadius: 8,
//   },
//   textContainer: {
//     padding: 8,
//     backgroundColor: "#ffffff",
//     position: "absolute",
//     bottom: 0, // 텍스트를 카드의 하단에 배치
//     left: 0,
//     right: 0,
//     borderBottomLeftRadius: 12,
//     borderBottomRightRadius: 12,
//   },
//   title: {
//     fontSize: 16,
//     fontWeight: "bold",
//     textAlign: "center",
//   },
//   description: {
//     fontSize: 12,
//     color: "#555",
//     textAlign: "center",
//     marginTop: 4,
//   },
// });

// import { router } from "expo-router";
// import React, { useEffect, useState } from "react";
// import {
//   Dimensions,
//   FlatList,
//   Image,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View,
// } from "react-native";

// type Project = {
//   id: string;
//   title: string;
//   description: string;
//   image: any; // require()를 사용할 예정
// };

// const projects: Project[] = [
//   {
//     id: "1",
//     title: "분홍색 목도리",
//     description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
//     image: require("../../assets/images/도안사진1.jpg"),
//   },
//   {
//     id: "2",
//     title: "초록 니트 모자",
//     description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
//     image: require("../../assets/images/도안사진2.jpg"),
//   },
//   {
//     id: "3",
//     title: "분홍색 목도리",
//     description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
//     image: require("../../assets/images/도안사진1.jpg"),
//   },
//   {
//     id: "4",
//     title: "초록 니트 모자",
//     description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
//     image: require("../../assets/images/도안사진2.jpg"),
//   },
//   // 더 추가 가능
// ];

// export default function MyBook() {
//   const [numColumns, setNumColumns] = useState(3);

//   useEffect(() => {
//     const updateNumColumns = () => {
//       const screenWidth = Dimensions.get("window").width;
//       const columns = Math.floor(screenWidth / (CARD_WIDTH + 16)); // 카드 폭 + 마진
//       setNumColumns(columns > 0 ? columns : 1);
//     };

//     updateNumColumns();
//     Dimensions.addEventListener("change", updateNumColumns);
//     const subscription = Dimensions.addEventListener(
//       "change",
//       updateNumColumns
//     );

//     return () => {
//       subscription.remove();
//     };
//   }, []);
//   return (
//     <View style={styles.container}>
//       <Text style={styles.header}>🧶 나의 뜨개질 서재</Text>

//       <FlatList
//         data={projects}
//         keyExtractor={(item) => item.id}
//         renderItem={({ item }) => (
//           <TouchableOpacity
//             onPress={() =>
//               router.push({
//                 pathname: "/pattern/[id]",
//                 params: { id: item.id },
//               })
//             }
//             style={styles.card}
//           >
//             <Image
//               source={item.image}
//               style={styles.image}
//               resizeMode="cover"
//             />
//             <Text style={styles.title}>{item.title}</Text>
//             <Text style={styles.description}>{item.description}</Text>
//           </TouchableOpacity>
//         )}
//         numColumns={numColumns}
//         contentContainerStyle={styles.listContent}
//         key={numColumns} // numColumns 변경 시 FlatList 재렌더링 강제
// columnWrapperStyle={{ justifyContent: "space-between" }} // ✅ 추가!
//       />
//     </View>
//   );
// }

// const CARD_WIDTH = 105; // 원하는 고정 크기
// const CARD_HEIGHT = 200; // 3:4 비율 (110 * 4 / 3 = 약 146.6)
// const screenWidth = Dimensions.get("window").width;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fffaf0",
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: "bold",
//     paddingVertical: 20, // 위/아래 패딩을 균등하게 줄임
//     padding: 20,
//     textAlign: "center",
//     marginTop: 40,
//   },
//   listContent: {
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//   },
//   card: {
//     width: CARD_WIDTH,
//     height: CARD_HEIGHT,
//     margin: 4,
//     marginVertical: 8,
//     backgroundColor: "#fff",
//     borderRadius: 4,
//     // overflow: "hidden",
//     elevation: 4,
//     shadowColor: "#000",
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   image: {
//     width: "100%",
//     height: "70%", // 이미지가 카드 높이의 70% 차지
//   },
//   title: {
//     fontSize: 12,
//     fontWeight: "bold",
//     paddingHorizontal: 6,
//     marginTop: 4,
//   },
//   description: {
//     fontSize: 10,
//     paddingHorizontal: 6,
//     color: "#666",
//   },
// });  그냥 얼라인을 센터로 만들고 싶은데

// import { useLocalSearchParams } from "expo-router";
// import React from "react";
// import { Image, StyleSheet, Text, View } from "react-native";

// const patternData: {
//   [key: string]: { title: string; description: string; image: any };
// } = {
//   "1": {
//     title: "분홍색 목도리",
//     description: "초보자를 위한 도안입니다.",
//     image: require("../../assets/images/도안사진1.jpg"),
//   },
//   "2": {
//     title: "초록 니트 모자",
//     description: "중급자용 모자 도안입니다.",
//     image: require("../../assets/images/도안사진2.jpg"),
//   },
// };

// export default function PatternDetail() {
//   const { id } = useLocalSearchParams();
//   const pattern = patternData[id as string];

//   if (!pattern) {
//     return (
//       <View style={styles.center}>
//         <Text>도안을 찾을 수 없습니다.</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <Image source={pattern.image} style={styles.image} />
//       <Text style={styles.title}>{pattern.title}</Text>
//       <Text style={styles.description}>{pattern.description}</Text>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff", padding: 16 },
//   center: { flex: 1, justifyContent: "center", alignItems: "center" },
//   image: { width: "100%", height: 250, borderRadius: 10 },
//   title: { fontSize: 22, fontWeight: "bold", marginTop: 16 },
//   description: { fontSize: 16, marginTop: 8, color: "#444" },
// });

import { shopItems } from "@/data/shopItem";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function PatternDetail() {
  const { id } = useLocalSearchParams();
  const pattern = shopItems.find((item) => item.id === id);

  const [added, setAdded] = useState(false);

  if (!pattern) {
    return (
      <View style={styles.center}>
        <Text>도안을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  const handleAddToLibrary = () => {
    setAdded(true);
    Alert.alert("서재에 추가되었습니다!");
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      {pattern.image && <Image source={pattern.image} style={styles.image} />}

      <Text style={styles.title}>{pattern.title}</Text>

      <Text style={styles.label}>카테고리</Text>
      <Text style={styles.text}>{pattern.category}</Text>

      <Text style={styles.label}>설명</Text>
      <Text style={styles.text}>{pattern.description}</Text>

      <Text style={styles.label}>필요 바늘</Text>
      <Text style={styles.text}>{pattern.needles?.join(", ") ?? "정보 없음"}</Text>

      <Text style={styles.label}>작성자</Text>
      <Text style={styles.text}>{pattern.writer}</Text>

      <Text style={styles.label}>실 정보</Text>
      {pattern.yarns?.length ? (
  pattern.yarns.map((yarn, index) => (
    <Text key={index} style={styles.text}>
      • {yarn}
    </Text>
  ))
) : (
  <Text style={styles.text}>정보 없음</Text>
)}

      <TouchableOpacity
        style={[styles.button, added && styles.buttonDisabled]}
        activeOpacity={0.7}
        onPress={handleAddToLibrary}
        disabled={added}
      >
        <Text style={styles.buttonText}>
          {added ? "서재에 추가됨" : "서재에 추가"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 250, borderRadius: 10, marginBottom: 16 },

  title: { fontSize: 26, fontWeight: "bold", marginBottom: 12, color: "#222" },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#d56c5c",
    marginTop: 12,
    marginBottom: 4,
  },

  text: {
    fontSize: 16,
    color: "#444",
    lineHeight: 22,
  },

  button: {
    marginTop: 32,
    backgroundColor: "#d56c5c",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },

  buttonDisabled: {
    backgroundColor: "#ffd56c5c",
  },

  buttonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
});

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

const patternData: {
  [key: string]: { title: string; description: string; image: any };
} = {
  "1": {
    title: "분홍색 목도리",
    description: "초보자를 위한 도안입니다.",
    image: require("../../assets/images/도안사진1.jpg"),
  },
  "2": {
    title: "초록 니트 모자",
    description: "중급자용 모자 도안입니다.",
    image: require("../../assets/images/도안사진2.jpg"),
  },
};

export default function PatternDetail() {
  const { id } = useLocalSearchParams();
  const pattern = patternData[id as string];

  if (!pattern) {
    return (
      <View style={styles.center}>
        <Text>도안을 찾을 수 없습니다.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={pattern.image} style={styles.image} />
      <Text style={styles.title}>{pattern.title}</Text>
      <Text style={styles.description}>{pattern.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 16 },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  image: { width: "100%", height: 250, borderRadius: 10 },
  title: { fontSize: 22, fontWeight: "bold", marginTop: 16 },
  description: { fontSize: 16, marginTop: 8, color: "#444" },
});

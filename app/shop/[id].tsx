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

// 서버에 패턴 아이디 보내서 서재에 추가 요청하는 함수
async function addMyPatternId(patternId: string): Promise<boolean> {
  try {
    const response = await fetch("http://localhost:1337/api/my-pattern-lists", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: {
          PatternId: Number(patternId),
        },
      }),
    });

    const text = await response.text();
    console.log("response text:", text); // 서버가 준 에러 메시지 확인용
    if (!response.ok) throw new Error("패턴 추가에 실패했습니다.");

    return true;
  } catch (error) {
    console.error("내 도안 ID 추가 실패:", error);
    return false;
  }
}

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

  // 내 서재에 이미 패턴이 있는지 확인하는 함수
  async function checkIfPatternAdded(patternId: number) {
    try {
      const response = await fetch(
        `http://localhost:1337/api/my-pattern-lists?filters[PatternId][$eq]=${patternId}`
      );
      if (!response.ok) throw new Error("서재 조회 실패");

      const json = await response.json();
      // 데이터가 있으면 이미 추가된 상태
      return json.data.length > 0;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  // 서버에 패턴 추가 요청 후 성공 여부에 따라 상태 변경 및 알림
  const handleAddToLibrary = async () => {
    if (!pattern) return;

    const success = await addMyPatternId(pattern.id);

    if (success) {
      setAdded(true);
      Alert.alert("서재에 추가되었습니다!");
    } else {
      Alert.alert("추가 실패", "서재에 추가하는데 실패했습니다.");
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {pattern.image && <Image source={pattern.image} style={styles.image} />}

      <Text style={styles.title}>{pattern.title}</Text>

      <Text style={styles.label}>카테고리</Text>
      <Text style={styles.text}>{pattern.category}</Text>

      <Text style={styles.label}>설명</Text>
      <Text style={styles.text}>{pattern.description}</Text>

      <Text style={styles.label}>필요 바늘</Text>
      <Text style={styles.text}>
        {pattern.needles?.join(", ") ?? "정보 없음"}
      </Text>

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

  title: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#431605",
  },

  label: {
    fontSize: 16,
    fontWeight: "700",
    color: "#d56c5c",
    marginTop: 12,
    marginBottom: 4,
  },

  text: {
    fontSize: 16,
    color: "#431605",
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

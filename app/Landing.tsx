import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Landing() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace("/(tabs)/MyBook"); // 3초 후에 '/Home'으로 리다이렉트
    }, 3000);

    return () => clearTimeout(timer); // 컴포넌트 unmount 시 타이머 해제
  }, []);
  return (
    <View style={styles.container}>
      <Image
        source={require("./../assets/images/logo.png")} // 로고 이미지 경로
        style={styles.logo}
      />

      <Text>앱을 로딩 중 입니다</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // 배경색
  },
  logo: {
    width: 200, // 로고의 너비
    height: 200, // 로고의 높이
  },
});

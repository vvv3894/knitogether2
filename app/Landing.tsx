import React from "react";
import { Image, Text, View } from "react-native";

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
    <View>
      <Image
        source={require("./../assets/images/logo.png")} // 로고 이미지 경로
      />

      <Text>시작하기</Text>
    </View>
  );
}
const styles = StyleSheet.create({});

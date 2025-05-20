import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState(""); // 사용자 이메일 상태

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || ""); // 로그인된 유저 이메일 설정
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("로그아웃", "성공적으로 로그아웃 되었습니다.");
      router.replace("/firebase/login");
    } catch (error) {
      console.error("로그아웃 오류:", error);
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>설정 / 마이페이지</Text>

      <View style={styles.profileContainer}>
        <Image
          source={require("../../assets/images/avata.png")} // 기본 프로필 이미지
          style={styles.profileImage}
        />
        <Text style={styles.username}>니팅러버123</Text>
        <Text style={styles.email}>{email}</Text> {/* 실제 로그인한 이메일 표시 */}
      </View>

      <View style={styles.settingsContainer}>
        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🔔 알림 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>🎨 테마 변경</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <Text style={styles.settingText}>📄 앱 정보</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem} onPress={handleLogout}>
          <Text style={[styles.settingText, { color: "red" }]}>
            🚪 로그아웃
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    color: "#431605",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 50,
    textAlign: "center",
    marginBottom: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 90,
    height: 90,
    borderRadius: 45,
    marginBottom: 10,
  },
  username: {
    color: "#431605",
    fontSize: 18,
    fontWeight: "600",
  },
  email: {
    fontSize: 14,
    color: "#666",
  },
  settingsContainer: {
    paddingHorizontal: 30,
  },
  settingItem: {
    paddingVertical: 15,
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
  },
  settingText: {
    color: "#431605",
    fontSize: 16,
  },
});

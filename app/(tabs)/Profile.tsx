import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { auth } from "../firebase/firebaseConfig";

export default function Profile() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [screen, setScreen] = useState<"main" | "notification" | "theme" | "info">("main");

  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setEmail(user.email || "");
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("로그아웃", "성공적으로 로그아웃 되었습니다.");
      router.push({pathname:"/firebase/login"});
    } catch (error) {
      console.error("로그아웃 오류:", error);
      Alert.alert("오류", "로그아웃 중 문제가 발생했습니다.");
    }
  };

  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDarkTheme ? "#121212" : "#ffffff",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginTop: 50,
      paddingHorizontal: 20,
    },
    backButton: {
      fontSize: 24,
      color: isDarkTheme ? "#eee" : "#431605",
    },
    header: {
      fontSize: 22,
      fontWeight: "bold",
      color: isDarkTheme ? "#eee" : "#431605",
      textAlign: "center",
      marginVertical: 20,
    },
    profileContainer: {
      alignItems: "center",
      marginVertical: 30,
    },
    profileImage: {
      width: 90,
      height: 90,
      borderRadius: 45,
      marginBottom: 10,
    },
    username: {
      color: isDarkTheme ? "#eee" : "#431605",
      fontSize: 18,
      fontWeight: "600",
    },
    email: {
      fontSize: 14,
      color: isDarkTheme ? "#ccc" : "#666",
    },
    settingsContainer: {
      paddingHorizontal: 30,
    },
    settingItem: {
      paddingVertical: 15,
      paddingHorizontal: 20,
      borderBottomColor: isDarkTheme ? "#444" : "#ddd",
      borderBottomWidth: 1,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
    settingText: {
      color: isDarkTheme ? "#eee" : "#431605",
      fontSize: 16,
    },
    content: {
      padding: 20,
      fontSize: 16,
      color: isDarkTheme ? "#eee" : "#431605",
    },
  });

  const renderHeader = (title: string) => (
    <View style={dynamicStyles.headerContainer}>
      <TouchableOpacity onPress={() => setScreen("main")}>
        <Text style={dynamicStyles.backButton}>←</Text>
      </TouchableOpacity>
      <Text style={dynamicStyles.header}>{title}</Text>
      <View style={{ width: 30 }} />
    </View>
  );

  // 화면별 렌더링
  if (screen === "notification") {
    return (
      <View style={dynamicStyles.container}>
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        {renderHeader("알림 설정")}
        <View style={dynamicStyles.settingItem}>
          <Text style={dynamicStyles.settingText}>알림 켜기</Text>
          <Switch
            value={notificationsEnabled}
            onValueChange={setNotificationsEnabled}
            thumbColor={notificationsEnabled ? "#431605" : "#ccc"}
            trackColor={{ true: "#a76e2e", false: "#555" }}
          />
        </View>
        <Text style={dynamicStyles.content}>
          {notificationsEnabled ? "알림이 활성화되었습니다." : "알림이 비활성화되었습니다."}
        </Text>
      </View>
    );
  }

  if (screen === "theme") {
    return (
      <View style={dynamicStyles.container}>
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        {renderHeader("테마 변경")}
        <View style={dynamicStyles.settingItem}>
          <Text style={dynamicStyles.settingText}>다크 모드</Text>
          <Switch
            value={isDarkTheme}
            onValueChange={setIsDarkTheme}
            thumbColor={isDarkTheme ? "#431605" : "#ccc"}
            trackColor={{ true: "#a76e2e", false: "#555" }}
          />
        </View>
        <Text style={dynamicStyles.content}>
          {isDarkTheme ? "다크 모드가 활성화되었습니다." : "라이트 모드가 활성화되었습니다."}
        </Text>
      </View>
    );
  }

  if (screen === "info") {
    return (
      <View style={dynamicStyles.container}>
        <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
        {renderHeader("앱 정보")}
        <Text style={dynamicStyles.content}>📄 버전: 1.0.0 {"\n"}제작자: 마동석 팀</Text>
      </View>
    );
  }

  // 메인 화면
  return (
    <ScrollView style={dynamicStyles.container}>
      <StatusBar barStyle={isDarkTheme ? "light-content" : "dark-content"} />
      <Text style={dynamicStyles.header}>설정 / 마이페이지</Text>

      <View style={dynamicStyles.profileContainer}>
        <Image
          source={require("../../assets/images/avata.png")}
          style={dynamicStyles.profileImage}
        />
        {/*<Text style={dynamicStyles.username}>니팅러버123</Text>*/}
        {/*user에 따라 달라지는 게 아니면 없는게 나을듯요*/}
        <Text style={dynamicStyles.email}>{email}</Text>
      </View>

      <View style={dynamicStyles.settingsContainer}>
        <TouchableOpacity style={dynamicStyles.settingItem} onPress={() => setScreen("notification")}>
          <Text style={dynamicStyles.settingText}>🔔 알림 설정</Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.settingItem} onPress={() => setScreen("theme")}>
          <Text style={dynamicStyles.settingText}>🎨 테마 변경</Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.settingItem} onPress={() => setScreen("info")}>
          <Text style={dynamicStyles.settingText}>📄 앱 정보</Text>
        </TouchableOpacity>

        <TouchableOpacity style={dynamicStyles.settingItem} onPress={handleLogout}>
          <Text style={[dynamicStyles.settingText, { color: "red" }]}>🚪 로그아웃</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
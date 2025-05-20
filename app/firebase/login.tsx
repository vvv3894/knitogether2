import { useState } from "react";
import { View, TextInput, Button, Alert, Text, StyleSheet } from "react-native";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./firebaseConfig";
import { useRouter } from "expo-router";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    try {
      if (isNew) {
        await createUserWithEmailAndPassword(auth, email, password);
        Alert.alert("회원가입 성공");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        Alert.alert("로그인 성공");
        router.replace("/Landing");
      }
    } catch (error: any) {
      Alert.alert("오류", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isNew ? "회원가입" : "로그인"}</Text>
      <TextInput placeholder="이메일" value={email} onChangeText={setEmail} style={styles.input} />
      <TextInput placeholder="비밀번호" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
      <Button title={isNew ? "회원가입" : "로그인"} onPress={handleAuth} />
      <Button title={isNew ? "로그인으로" : "회원가입으로"} onPress={() => setIsNew(!isNew)} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10 },
  title: { fontSize: 24, marginBottom: 20, textAlign: "center" },
});

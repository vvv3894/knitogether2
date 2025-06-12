import { Stack } from "expo-router";
import Head from "expo-router/head";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Head>
        <title>kniTogether</title>
      </Head>
      <Stack>
        <Stack.Screen name="Landing" options={{ headerShown: false }} />
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="firebase/login"
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="pattern/[id]"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="shop/[id]"
          options={{
            headerTitle: "",
          }}
        />
        <Stack.Screen
          name="qr/QrScan"
          options={{
            headerTitle: "QR",
          }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
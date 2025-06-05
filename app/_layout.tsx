import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
      </Stack>
    </GestureHandlerRootView>
  );
}
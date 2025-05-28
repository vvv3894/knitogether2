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
          name="pattern/[id]"
          options={{
            headerShown: false,
            //제목이 있음 좋겠는데 잘 모르겠어서 돌아가기버튼도 있겠다 걍 없앴는데 뒤로가기 버튼정도는 있는게 낫다싶으시면 밑에처럼 수정해주세요.
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
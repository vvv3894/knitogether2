import { router } from "expo-router";
import React from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type ShopItem = {
  id: string;
  title: string;
  description: string;
  image: any;
};

const shopItems: ShopItem[] = [
  {
    id: "1",
    title: "분홍색 목도리",
    description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
    image: require("../../assets/images/도안사진1.jpg"),
  },
  {
    id: "2",
    title: "초록 니트 모자",
    description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
    image: require("../../assets/images/도안사진2.jpg"),
  },
  // 더 추가 가능
];

const categories = [
  "전체",
  "모자",
  "목도리",
  "가방",
  "인형",
  "소품",
  "장갑",
  "러그",
  "기타",
];

export default function Shop() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧶 도안 상점</Text>

      <ImageBackground
        source={require("../../assets/images/bannerImg.jpg")} // 배너 이미지
        style={styles.banner}
        resizeMode="cover"
      >
        <Text style={styles.bannerText}>
          이달의 인기 도안을
          <br />
          만나보세요 🧵
        </Text>
      </ImageBackground>
      <View style={styles.buttonContainer}>
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={styles.button}>
            <Text style={styles.buttonText}>{cat}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={shopItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/pattern/[id]",
                params: { id: item.id },
              })
            }
            style={styles.card}
          >
            <Image source={item.image} style={styles.thumbnail} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const screenWidth = Dimensions.get("window").width;
const BUTTON_MARGIN = 8;
const NUM_COLUMNS = 3;
const BUTTON_WIDTH =
  (screenWidth - BUTTON_MARGIN * (NUM_COLUMNS * 2)) / NUM_COLUMNS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 16,
    textAlign: "center",
  },
  listContent: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  card: {
    flexDirection: "row",
    backgroundColor: "#ffffff",
    borderRadius: 12,
    marginBottom: 4,
    marginTop: 16,
    padding: 10,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  thumbnail: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: "#555",
  },
  banner: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  bannerText: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    paddingHorizontal: 2,
    paddingVertical: 6,
    borderRadius: 8,
    alignSelf: "flex-start", // 텍스트 왼쪽 정렬
    marginLeft: 16, // 왼쪽 여백 추가 (원하는 만큼 조절)
  },
  button: {
    width: BUTTON_WIDTH,
    height: 50,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  buttonText: {
    fontSize: 14,
    color: "#033",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});

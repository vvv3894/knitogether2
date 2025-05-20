import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import React, { useState } from "react";
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
import { TextInput } from "react-native-gesture-handler";

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
  "장갑",
  "러그",
  "기타",
];

export default function Shop() {
  const [userInput, setUserInput] = useState<string>();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🧶 도안 상점</Text>

      <View style={styles.searchBar}>
        <View>
          <Ionicons
            name="search"
            size={24}
            color="black"
            style={{ marginHorizontal: 6 }}
          />
          {/* <Image source={require('./../../assets/images/search.png')}
                    style={{
                    height: 20,
                    width: 20,
                    marginHorizontal: 6
                    }}
                /> */}
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="도안 검색"
          placeholderTextColor={"gray"}
          value={userInput}
          onChangeText={(value) => setUserInput(value)}
        />
        <TouchableOpacity
          onPress={() => setUserInput("")}
          style={{
            padding: 6,
            display: "flex",
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Ionicons name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require("../../assets/images/bannerImg.jpg")} // 배너 이미지
        style={[styles.banner, { width: screenWidth }]} // width를 고정
        resizeMode="cover"
      >
        <Text style={styles.bannerText}>
          이달의 인기 도안을
          {"\n"}
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
const NUM_COLUMNS = 4; // 한 줄에 4개씩
const BUTTON_WIDTH =
  (screenWidth - BUTTON_MARGIN * (NUM_COLUMNS * 2)) / NUM_COLUMNS;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fffaf0",
  },
  searchBar: {
    marginHorizontal: 15,
    marginBottom: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#D06C5C",
    borderRadius: 40,
    backgroundColor: "#fff",
    padding: 2,
    paddingLeft: 10,
  },
  searchInput: {
    flex: 1,
    padding: 2,
    fontSize: 15,
    borderRadius: 40,
  },
  closeIcon: {
    padding: 8,
    borderRadius: 25,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    paddingVertical: 16,
    textAlign: "center",
    marginTop: 40,
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
    height: 170,
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
    paddingVertical: 8,
  },
});

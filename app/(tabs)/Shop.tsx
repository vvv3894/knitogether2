import { shopItems } from "@/data/shopItem";
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

const categories = ["전체", "외투", "상/하의", "패션잡화"];

export default function Shop() {
  const [userInput, setUserInput] = useState<string>();
  const [selectedCategory, setSelectedCategory] = useState("전체");

  const filteredItems = shopItems.filter((item) => {
    const matchesCategory =
      selectedCategory === "전체" ||
      (selectedCategory === "상/하의"
        ? item.category === "상의" || item.category === "하의"
        : item.category === selectedCategory) ||
      (selectedCategory === "패션잡화"
        ? item.category === "패션잡화"
        : item.category === selectedCategory) ||
      (selectedCategory === "외투"
        ? item.category === "외투"
        : item.category === selectedCategory);
    const matchesSearch =
      !userInput ||
      item.title.includes(userInput) ||
      item.description.includes(userInput);
    return matchesCategory && matchesSearch;
  });

  return (
    <View style={styles.container}>
      <View style={styles.publicHeader}>
        <TouchableOpacity>
          <Ionicons name="qr-code-outline" size={30} color="#431605" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>도안 상점</Text>

      <View style={styles.searchBar}>
        <View>
          <Ionicons
            name="search"
            size={24}
            color="#d56c5c"
            style={{ marginHorizontal: 6 }}
          />
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
            flexDirection: "row",
            gap: 2,
            justifyContent: "center",
          }}
        >
          <Ionicons name="close" size={24} color="#d56c5c" />
        </TouchableOpacity>
      </View>

      <ImageBackground
        source={require("../../assets/images/bannerImg.jpg")}
        style={[styles.banner, { width: screenWidth }]}
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
          <TouchableOpacity
            key={index}
            style={[
              styles.button,
              selectedCategory === cat && styles.selectedButton,
            ]}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text
              style={[
                styles.buttonText,
                selectedCategory === cat && styles.selectedButtonText,
              ]}
            >
              {cat}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              router.push({
                pathname: "/shop/[id]",
                params: { id: item.id },
              })
            }
            style={styles.card}
          >
            <Image source={item.image} style={styles.thumbnail} />
            {/* <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.title}>{item.writer}</Text>
              <Text style={styles.description}>{item.description}</Text>
              
            </View> */}
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>

              <View style={styles.row}>
                <Text style={styles.label}>디자이너:</Text>
                <Text style={styles.value}>{item.writer}</Text>
              </View>

              <View style={styles.row}>
                <Text style={styles.label}>카테고리:</Text>
                <Text style={styles.value}>{item.category}</Text>
              </View>
              {/*
            <View style={styles.row}> 
            </View>
            <Text style={styles.description} numberOfLines={3} ellipsizeMode="tail" >{item.description}</Text>
            */}
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
    backgroundColor: "#ffffff",
  },
  publicHeader: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    display: "flex",
    flexDirection: "row-reverse",
    height: 48,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "rgba(208,108,92,0.25)",
  },
  header: {
    paddingVertical: 20,
    color: "#431605",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
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
    color: "#431605",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 11,
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
    color: "#431605",
    fontWeight: "500",
  },
  buttonContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f8f8f8",
  },
  selectedButton: {
    backgroundColor: "#d56c5c",
    borderRadius: 10,
  },
  selectedButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  row: {
    flexDirection: "row",
    gap: 6,
  },
  label: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#555",
  },
  value: {
    color: "#333",
    fontSize: 12,
  },
});

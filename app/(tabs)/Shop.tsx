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
  image?: any;
  needles?: string[]; // 추가 정보: 바늘 크기
  yarns?: string[]; // 추가 정보: 실 종류
  writer?: string; // 작성자
  category?: string; // 카테고리
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
  {
    id: "512",
    title: "Sports Vest No. 512",
    category: "외투",
    description:
      "대바늘을 사용하여 조끼를 만들고 코바늘을 사용하여 단추를 만들어 다는 디자인입니다. 등판 허리라인에 띠를 고정하여 허리라인을 강조해 페미닌한 느낌을 줍니다.",
    needles: ["대바늘 5.5mm", "코바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Tezola Yarn, 10 balls Joffre Blue No. 34",
      "Corticelli Sweater Silk, 1 ball Yellow No. 344",
    ],
  },
  {
    id: "513",
    title: "Military Sweater No. 513",
    category: "외투",
    description:
      "하단 밴드를 더 넓게 만들어 기장을 늘려도 예쁜 디자인입니다.(이 경우 실이 더 필요합니다.)",
    needles: ["코바늘 6mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Knitola Fingering Yarn, 15 balls Delft Blue No. 35",
      "Corticelli Knitola Fingering Yarn, 1 ball Chamois No. 50",
    ],
  },
  {
    id: "514",
    title: "Athletic Sweater No. 514",
    category: "상의",
    description:
      "허리라인의 스프라이트가 포인트인 롱기장의 스웨터입니다. 허리라인이 전부 고무뜨기로 되어있어 핏한 느낌입니다. 네크라인이 깊게 파여있어 레이어드해서 코디하는 것을 추천드립니다.",
    needles: ["대바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Shetland Flosola Yarn, 5 balls Rose No. 23",
      "Corticelli Shetland Flosola Yarn, 1 ball Delft Blue No. 35",
      "Corticelli Shetland Flosola Yarn, 1 ball Chamois No. 99",
      "Corticelli Shetland Flosola Yarn, 1 ball Black No. 50",
    ],
  },
  {
    id: "516",
    title: "Silk Sports Vest No. 516",
    category: "외투",
    description: "고전적인 느낌의 베이직한 조끼입니다.",
    needles: ["코바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: ["Corticelli Sweater Silk, 7 balls Old Gold No. 985.9"],
  },
  {
    id: "517",
    title: "Automobile Bonnet and Veil No. 517",
    category: "패션잡화",
    description:
      "보닛은 코바늘을 사용하고 베일은 대바늘을 사용하는 디자인입니다. 베일을 장식으로 두거나 목에 두르는 등으로 활용할 수 있습니다.",
    needles: ["대바늘 3.75mm", "코바늘 4.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Knitola Fingering Yarn, 1 ball French Grey No. 61",
      "Corticelli Shetland Flosola Yarn, 2 balls Pink No. 20",
    ],
  },
  {
    id: "518",
    title: "Athletic Sweater No. 518",
    category: "상의",
    description:
      "Athletic Sweater No. 514와 비슷하지만 칼라가 다른 디자인입니다. 삼각형의 칼라가 독특한 느낌을 줍니다. 허리라인이 전부 고무뜨기로 되어있어 핏한 느낌입니다. 네크라인이 깊게 파여있어 레이어드해서 코디하는 것을 추천드립니다.",
    needles: ["대바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Shetland Flosola Yarn, 8 balls Old Rose No. 22",
      "Corticelli Shetland Flosola Yarn, 1 ball Turquoise No. 38",
      "Corticelli Shetland Flosola Yarn, 1 ball Old Gold No. 81",
      "Corticelli Shetland Flosola Yarn, 1 ball Black No. 99",
    ],
  },
  {
    id: "519",
    title: "Knit Shoulder Vestee No. 519",
    category: "외투",
    description: "우아하고 고급스러운 느낌의 볼레로입니다.",
    needles: ["대바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Shetland Flosola Yarn, 4 balls White No. 98",
      "Corticelli Sweater Silk, 1 ball Deep Pink No. 237",
    ],
  },
  {
    id: "520",
    title: "College Tennis Coat No. 520",
    category: "상의",
    description:
      "독특한 쉐입의 칼라가 포인트인 디자인입니다. 네크라인이 깊게 파여있어 레이어드해서 코디하는 것을 추천드립니다.",
    needles: ["코바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Shetland Flosola Yarn, 5 balls Pongee No. 51",
      "Corticelli Shetland Flosola Yarn, 1 ball Turquoise No. 38",
      "Corticelli Shetland Flosola Yarn, 1 ball Old Rose No. 22",
    ],
  },
  {
    id: "522",
    title: "Knit Shoulder Scarf No. 522",
    category: "패션잡화",
    description:
      "겉뜨기만 사용해서 완성하는 초보자용 도안입니다. 코잡는 것부터 실 바꾸는 법, 태슬 다는 법까지 세세하게 영상을 첨부하였습니다. 이 도안을 통해서 겉뜨기를 마스터해보세요!",
    needles: ["대바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Shetland Flosola Yarn, 5 balls White No. 98",
      "Corticelli Shetland Flosola Yarn, 1 ball Blue No. 33",
      "Corticelli Shetland Flosola Yarn, 1 ball Pink No. 20",
      "Corticelli Shetland Flosola Yarn, 1 ball Orchid No. 70",
      "Corticelli Shetland Flosola Yarn, 1 ball Dark Brown No. 59",
    ],
  },
  {
    id: "536",
    title: "Sleeveless Sweater No. 536",
    category: "상의",
    description: "베이직한 디자인의 조끼입니다.",
    needles: ["대바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Knitola Fingering Yarn, 5 balls Light Oxford No. 68",
      "Corticelli Knitola Fingering Yarn, 5 balls Khaki No. 83 or Khaki Mixture No. 84",
    ],
  },
  {
    id: "539",
    title: "Sleeping cap No. 539",
    category: "패션잡화",
    description:
      "Sleeveless Sweater No. 536와 세트로 착용하면 더욱 예쁜 모자입니다.",
    needles: ["대바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Knitola Fingering Yarn, 3 balls Light Oxford No. 68 or Khaki No. 83 or Khaki Mixture No. 84",
    ],
  },
  {
    id: "551",
    title: "Knit Skating Coat No. 551",
    category: "외투",
    description:
      "스케이팅이 두 배로 재미있어지는 멋진 디자인의 코트입니다! 하얀 코트부분과 아래쪽의 넓은 파란색 밴드를 별도로 떠서 바느질로 연결하는 디자인입니다.",
    needles: ["대바늘 3.75mm", "대바늘 5.5mm"],
    writer: "Antique Pattern Library",
    yarns: [
      "Corticelli Tezola Yarn, 24 balls White No. 98",
      "Corticelli Tezola Yarn, 12 balls Joffre Blue No. 34",
    ],
  },
];

const categories = ["전체", "상/하의", "생활용품", "기타"];

export default function Shop() {
  const [userInput, setUserInput] = useState<string>();

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
          <Ionicons name="close" size={24} color="#d56c5c" />
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
                pathname: "/shop/[id]",
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
});

export type ShopItem = {
    id: string;
    title: string;
    description: string;
    image?: any;
    needles?: string[];
    yarns?: string[]; 
    writer?: string; 
    category?: string; 
  };

export const shopItems: ShopItem[] = [
    {
      id: "1",
      title: "분홍색 목도리",
      description: "처음으로 만든 목도리예요. 촉감이 부드럽고 포근해요!",
      image: require("../assets/images/pattern01.jpg"),
    },
    {
      id: "2",
      title: "초록 니트 모자",
      description: "겨울에 따뜻하게 쓰려고 만든 모자예요.",
      image: require("../assets/images/pattern02.jpg"),
    //   image: require("../../assets/images/patten01.jpg"),
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
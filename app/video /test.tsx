import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';

const { width: screenWidth } = Dimensions.get('window');

const videoData = [
  { id: '1', uri: 'https://www.w3schools.com/html/mov_bbb.mp4' },
  { id: '2', uri: 'https://www.w3schools.com/html/movie.mp4' },
  // 다른 영상 URL 추가 가능
];

export default function VideoCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);

  const renderItem = ({ item }: { item: { id: string; uri: string } }) => (
    <View style={styles.videoContainer}>
      <Video
        source={{ uri: item.uri }}
        style={styles.video}
        resizeMode="contain"
        repeat
        paused={false}
        rate={1.0}
      />
    </View>
  );

  return (
    <Carousel
      data={videoData}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={screenWidth}
      onSnapToItem={(index) => setActiveIndex(index)}
      inactiveSlideScale={1}
      inactiveSlideOpacity={1}
    />
  );
}

const styles = StyleSheet.create({
  videoContainer: {
    width: screenWidth,
    height: 250,
    backgroundColor: 'black',
  },
  video: {
    width: '100%',
    height: '100%',
  },
});

// 페이지 아이템 컴포넌트 분리
function PageItem({ item }: { item: any }) {
  const scale = useSharedValue(1);

  const pinchHandler =
    useAnimatedGestureHandler<PinchGestureHandlerGestureEvent>({
      onActive: (event) => {
        scale.value = event.scale;
      },
      onEnd: () => {
        scale.value = withTiming(1);
      },
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <View style={styles.page}>
      <Text style={styles.title}>{item.title}</Text>

      {item.content?.map((block: any, idx: number) => {
        if (block.type === "text") {
          return (
            <Text key={idx} style={styles.text}>
              {block.value}
            </Text>
          );
        } else if (block.type === "image") {
          return (
            <PinchGestureHandler
              key={idx}
              onGestureEvent={pinchHandler}
              onHandlerStateChange={pinchHandler}
            >
              <Animated.View style={[styles.imageContainer, animatedStyle]}>
                <Image
                  source={block.value}
                  style={styles.image}
                  resizeMode="contain"
                />
              </Animated.View>
            </PinchGestureHandler>
          );
        } else if (block.type === "video") {
          return (
            <PinchGestureHandler
              key={idx}
              onGestureEvent={pinchHandler}
              onHandlerStateChange={pinchHandler}
            >
              <Animated.View style={[styles.container, animatedStyle]}>
                <Video
                  source={{ uri: block.value }}
                  useNativeControls
                  resizeMode={ResizeMode.CONTAIN}
                  shouldPlay
                  isLooping
                  style={styles.video}
                />
              </Animated.View>
            </PinchGestureHandler>
          );
        }
        return null;
      })}
    </View>
  );
}

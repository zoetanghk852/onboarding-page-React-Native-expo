import { View, StyleSheet, Image, useWindowDimensions } from "react-native";
import { StatusBar } from "expo-status-bar";
import Animated, {
  SensorType,
  interpolate,
  useAnimatedSensor,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const IMAGE_OFFSET = 300;
const PI = Math.PI;
const HALF_PI = PI / 2;

export default function App() {
  const { width, height } = useWindowDimensions();

  const sensor = useAnimatedSensor(SensorType.ROTATION);

  const imageStyle = useAnimatedStyle(() => {
    // yaw(up to down) , pitch(x), roll(left to right)

    const { yaw, pitch, roll } = sensor.sensor.value;
    // console.log(yaw.toFixed(1), pitch.toFixed(1), roll.toFixed(1));
    return {
      top: withTiming(
        interpolate(pitch, [-HALF_PI, HALF_PI], [-IMAGE_OFFSET * 4, 0]),
        { duration: 100 }
      ),
      left: withTiming(interpolate(roll, [-PI, PI], [-IMAGE_OFFSET * 2, 0]), {
        duration: 100,
      }),
    };
  });
  return (
    <View style={styles.container}>
      <StatusBar style="dark"></StatusBar>
      <Animated.Image
        source={require("./assets/bg.png")}
        style={[
          {
            width: width + 2 * IMAGE_OFFSET,
            height: height + 2 * IMAGE_OFFSET,
            position: "absolute",
          },
          imageStyle,
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "rgb(43, 43, 43)",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

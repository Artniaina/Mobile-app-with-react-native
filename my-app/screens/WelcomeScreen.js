import React, { useState } from "react";
import {
  View,
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
} from "react-native";
import LottieView from "lottie-react-native";

const WelcomeScreen = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleScroll = (event) => {
    const contentOffsetX = event.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / windowWidth);
    setCurrentPage(currentIndex);
  };

  const animations = [
    require("../assets/lottie/cat-cloud.json"),
    require("../assets/lottie/flash-medit.json"),
    require("../assets/lottie/renard-nouille.json"),
  ];

  const backgroundColors = ["#BE5A00", "#F9F871", "#50424F"];

  return (
    <View style={[styles.container, { backgroundColor: backgroundColors[currentPage] }]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {animations.map((animation, index) => (
          <View key={index} style={styles.animationContainer}>
            <LottieView
              source={animation}
              autoPlay
              loop
              style={styles.animation}
            />
          </View>
        ))}
      </ScrollView>
      <View style={styles.pagination}>
        {animations.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, index === currentPage && styles.activeDot]}
          />
        ))}
      </View>
      <View
        style={{
          flex: 2,
          backgroundColor: "#fff",
          borderTopLeftRadius: 28,
          borderTopRightRadius: 28,
        }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("LoginScreen")}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animationContainer: {
    width: windowWidth,
    justifyContent: "center",
    alignItems: "center",
    height: windowHeight * 0.6,
  },
  animation: {
    width: "80%",
    height: "80%",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: windowHeight * 0.6 - 20,
    left: 0,
    right: 0,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#fff",
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: "#800080",
  },
  button: {
    backgroundColor: "#800080",
    paddingVertical: 20,
    paddingHorizontal: 30,
    borderRadius: 30,
    alignSelf: "center",
    position: "absolute",
    bottom: 50,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default WelcomeScreen;

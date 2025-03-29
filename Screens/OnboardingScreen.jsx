import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, memo } from "react";
import { Image, StatusBar, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";

SplashScreen.preventAutoHideAsync();

// Reusable button component
const Button = memo(({ title, onPress, style }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
));

// Dot component
const Dot = memo(({ selected }) => (
  <View style={[styles.dot, { backgroundColor: selected ? "#1E40AF" : "#C4C4C4" }]} />
));

const OnboardingScreen = () => {
  const navigation = useNavigation();
  const [fontsLoaded] = useFonts({ Raleway_700Bold });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) await SplashScreen.hideAsync();
  }, [fontsLoaded]);

  if (!fontsLoaded) return null;

  return (
    <View onLayout={onLayoutRootView} style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="black" />
      <Onboarding
        pages={onboardingPages}
        DoneButtonComponent={(props) => <Button title="Done" {...props} />}
       
        bottomBarHighlight={false}
        showSkip={false}
        showNext={false}
        onDone={() => navigation.navigate("AuthScreen")}
      />
    </View>
  );
};

export default OnboardingScreen;

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    backgroundColor: "#1E40AF",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Raleway_700Bold",
  },
  dot: {
    width: 8,
    height: 8,
    marginHorizontal: 3,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    resizeMode: "contain",
  },
});

// Onboarding content
const onboardingPages = [
  {
    backgroundColor: "#ffffff",
    image: <Image style={styles.image} source={require("../assets/Frame1.png")} />,
    title: "Welcome to Cybex IT Group where learning meets innovation!",
    subtitle: "Empowering your journey through cutting-edge IT education and expertise",
  },
  {
    backgroundColor: "#ffffff",
    image: <Image style={styles.image} source={require("../assets/Frame2.png")} />,
    title: "Begin your learning journey and unlock a world of knowledge",
    subtitle: "Explore our comprehensive courses designed to transform your skills and career",
  },
  {
    backgroundColor: "#ffffff",
    image: <Image style={styles.image} source={require("../assets/Frame4.png")} />,
    title: "Join a community of learners and embark on a learning adventure",
    subtitle: "Connect with like-minded individuals. Join us to learn, grow, and thrive together!",
  },
];
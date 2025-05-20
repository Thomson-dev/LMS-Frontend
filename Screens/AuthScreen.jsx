import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

SplashScreen.preventAutoHideAsync();

const AuthScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Rubik_bold: require("../assets/fonts/Rubik-Bold.ttf"),
    Rubik_regular: require("../assets/fonts/Rubik-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep the splash screen visible
  }

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSignupPress = () => {
    navigation.navigate("RegisterScreen");
  };
  return (
    <SafeAreaView onLayout={onLayoutRootView} className="flex-1">
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
      />
      <View className="flex-1 mt-32">
        <View className="">
          <Image
            className="w-full "
            resizeMode="contain"
            source={require("../assets/Frame.png")}
          />
        </View>
        <View className="mt-14 mx-2">
          <Text
            style={{ fontFamily: "Rubik_bold" }}
            className="text-xl text-center"
          >
            Join YemenEdu Group to Kick Start
          </Text>
          <Text
            style={{ fontFamily: "Rubik_bold" }}
            className="text-xl text-center"
          >
            {" "}
            Your Lesson
          </Text>
        </View>

        <View>
          <Text
            style={{ fontFamily: "Rubik_regular" }}
            className="text-center text-base mt-4"
          >
            Join and Learn from our Top Instructors!
          </Text>
        </View>

        <View className="mt-7 items-center justify-center flex-row gap-7">
          <TouchableOpacity
            onPress={handleLoginPress}
            className="bg-blue-500 py-3 px-12 text-white rounded-xl"
          >
            <Text
              style={{ fontFamily: "Rubik_regular" }}
              className="text-white font-bold text-lg"
            >
              Sign In
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignupPress}
            className=" border border-blue-500 py-3 px-12 text-white rounded-xl"
          >
            <Text
              style={{ fontFamily: "Rubik_regular" }}
              className=" font-bold text-lg"
            >
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

const AuthScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSignupPress = () => {
    navigation.navigate("RegisterScreen");
  };
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1 mt-32">
        <View className="">
          <Image
            className="w-full "
            resizeMode="contain"
            source={require("../assets/Frame.png")}
          />
        </View>
        <View className="mt-5">
          <Text className="text-2xl text-center">
            Join Cybex IT Group to Kick Start
          </Text>
          <Text className="text-2xl text-center"> Your Lesson</Text>
        </View>

        <View>
          <Text className="text-center text-lg mt-4">
            Join and Learn from our Top Instructors!
          </Text>
        </View>

        <View className="mt-7 items-center justify-center flex-row gap-7">
          <TouchableOpacity
            onPress={handleLoginPress}
            className="bg-blue-500 py-3 px-12 text-white rounded-xl"
          >
            <Text className="text-white font-semibold text-lg">Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleSignupPress}
            className=" border border-blue-500 py-3 px-12 text-white rounded-xl"
          >
            <Text className=" font-semibold text-lg">Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;

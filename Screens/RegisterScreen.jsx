import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  Modal,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const SERVER_URI = "https://lms-server-oqfi.onrender.com"; // Replace with your server URI

const colors = {
  white: "#FFFFFF",
  primary: "#45484A",
  secondary: "#AEB5BB",
  gray: "#D9D9D9",
};

const RegisterScreen = () => {
  const navigation = useNavigation();

  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  };

  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleRegister = async () => {
    setIsLoading(true);
    await axios
      .post(`${SERVER_URI}/api/registration`, {
        name: userInfo.name,
        email: userInfo.email,
        password: userInfo.password,
      })
      .then(async (res) => {
        console.log(res.data);
        if (res.data.activationToken) {
          await AsyncStorage.setItem(
            "activation_token",
            res.data.activationToken
          );
        }
        Alert.alert("Registration Successful", res.data.message, [
          { text: "OK" },
        ]);
        setUserInfo({
          name: "",
          email: "",
          password: "",
        });
        setIsLoading(false);
        navigation.navigate("VerifyAccount");
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        Alert.alert("Registration Failed", "Please try again.", [
          { text: "OK" },
        ]);
      });
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-6 mt-20 flex-1">
            <View className="mt-16">
              <Text className="font-semibold text-3xl text-center">
                Sign Up
              </Text>
              <Text className="font-semibold text-center text-base mt-1 text-primary">
                Create an account to begin your Learning Journey
              </Text>
            </View>

            {/* form */}
            <View className="mt-5 flex-1 p-2">
              <View className="flex flex-row rounded-xl gap-2 p-3 items-center border border-gray-300">
                <AntDesign name="user" size={30} color={colors.secondary} />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Enter your name"
                  value={userInfo.name}
                  placeholderTextColor={colors.secondary}
                  onChangeText={(value) =>
                    setUserInfo({ ...userInfo, name: value })
                  }
                  keyboardType="default"
                />
              </View>

              <View className="flex flex-row rounded-xl gap-2 p-3 mt-6 items-center border border-gray-300">
                <Ionicons
                  name={"mail-outline"}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Enter your email"
                  value={userInfo.email}
                  onChangeText={(value) =>
                    setUserInfo({ ...userInfo, email: value })
                  }
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                />
              </View>

              <View className="flex flex-row items-center p-3 rounded-xl gap-2 mt-6 border border-gray-300">
                <SimpleLineIcons
                  name={"lock"}
                  size={30}
                  color={colors.secondary}
                />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Enter your password"
                  value={userInfo.password}
                  onChangeText={(value) =>
                    setUserInfo({ ...userInfo, password: value })
                  }
                  secureTextEntry={secureEntry}
                  placeholderTextColor={colors.secondary}
                />
                <TouchableOpacity
                  onPress={() => {
                    setSecureEntry((prev) => !prev);
                  }}
                >
                  <Ionicons
                    name={secureEntry ? "eye-off" : "eye"}
                    size={20}
                    color={colors.secondary}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity
                onPress={handleRegister}
                className="mt-14 py-4 bg-[#003096] rounded-xl justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color={colors.white} />
                ) : (
                  <Text className="text-white text-lg font-bold">SIGN UP</Text>
                )}
              </TouchableOpacity>

              <View className="flex flex-row justify-center items-center mt-6">
                <Text className="text-primary">Already have an account?</Text>
                <TouchableOpacity onPress={handleLoginPress}>
                  <Text className="text-[#003096] ml-1">Sign in</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

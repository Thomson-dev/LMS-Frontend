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
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const colors = {
  white: "#FFFFFF",
  primary: "#45484A",
  secondary: "#AEB5BB",
  gray: "#D9D9D9",
};

const LoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secureEntry, setSecureEntry] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const [buttonSpinner, setButtonSpinner] = useState(false);
 

  const [userInfo, setUserInfo] = useState({
    email: "",
    password: "",
  });



  const handleLoginPress = () => {
    navigation.navigate("LoginScreen");
  };

  const handleSignupPress = () => {
    navigation.navigate("RegisterScreen");
  };

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const token = await AsyncStorage.getItem("accessToken");
  //       if (token) {
  //         navigation.replace("Home");
  //       } else {
  //         console.log("No token found");
  //       }
  //     } catch (err) {
  //       console.log("Error fetching token:", err);
      
  //       Toast.show("Email or password is not correct!", {
  //         type: "danger",
  //       });
  //     }
  //   };
  //   checkLoginStatus();
  // }, []);

  const handleLogin = async () => {
    setIsLoading(true);
    await axios
      .post(`https://lms-server-oqfi.onrender.com/api/login`, {
        email: userInfo.email,
        password: userInfo.password,

      })
      .then(async (res) => {
        console.log(res.data);
        await AsyncStorage.setItem("accessToken", res.data.accessToken);
        setUserInfo({
          email: "",
          password: "",
        });
        setIsLoading(false);
        navigation.navigate("Home");
      })
      .catch((error) => {
        setIsLoading(false);
       
        console.log(error);
        Alert.alert(
          "Login Failed",
          "Email or password is not correct!",
          [{ text: "OK" }]
        );
      });
  };

  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView behavior="padding" className="flex-1">
        <StatusBar barStyle="light-content" backgroundColor="black" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View className="p-6 flex-1">
            <View className="mt-20">
              <Text className="font-semibold text-3xl text-center">Sign in</Text>
              <Text className="font-semibold text-center text-base mt-1 text-primary">
                Please Sign in with your account
              </Text>
            </View>

            {/* form */}
            <View className="mt-5 flex-1 p-2">
              <View className="flex flex-row rounded-xl gap-2 p-3 items-center border border-gray-300">
                <Ionicons name={"mail-outline"} size={30} color={colors.secondary} />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Enter your email"
                  value={userInfo.email}
                  onChangeText={(value) => setUserInfo({ ...userInfo, email: value })}
                  placeholderTextColor={colors.secondary}
                  keyboardType="email-address"
                />
              </View>

              <View className="flex flex-row items-center p-3 rounded-xl gap-2 mt-6 border border-gray-300">
                <SimpleLineIcons name={"lock"} size={30} color={colors.secondary} />
                <TextInput
                  className="flex-1 text-base text-gray-700"
                  placeholder="Enter your password"
                  value={userInfo.password}
                  onChangeText={(value) => setUserInfo({ ...userInfo, password: value })}
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

              <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
                <Text className="text-right mt-6 font-semibold text-sm">Forgot Password?</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={handleLogin}
                className="mt-14 py-4 bg-[#003096] rounded-xl justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="large" color={colors.white} />
                ) : (
                  <Text className="text-white text-lg font-bold">SIGN IN</Text>
                )}
              </TouchableOpacity>

              <Text className="text-center mt-6 text-primary">or continue with</Text>

              <TouchableOpacity className="flex flex-row items-center justify-center border border-primary rounded-xl py-3 mt-4">
                <Image source={require("../assets/google.png")} className="h-6 w-6 mr-2" />
                <Text className="text-lg">Google</Text>
              </TouchableOpacity>

              <View className="flex flex-row justify-center items-center mt-6">
                <Text className="text-primary">Already have an account?</Text>
                <TouchableOpacity onPress ={handleSignupPress} >
                  <Text className="text-[#003096] ml-1">Sign up</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default LoginScreen;
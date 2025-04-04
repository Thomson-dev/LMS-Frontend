import {
    KeyboardAvoidingView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    View,
    Alert,
  } from "react-native";
  import React, { useState, useRef, useEffect, createRef } from "react";
  import { SafeAreaView } from "react-native-safe-area-context";
  import { Image } from "react-native";
  import { useNavigation, useRoute } from "@react-navigation/native";
  import axios from "axios";
  import AsyncStorage from "@react-native-async-storage/async-storage";
  
  const SERVER_URI = "https://lms-server-oqfi.onrender.com"; // Replace with your server URI
  
  const colors = {
    white: "#FFFFFF",
    primary: "#45484A",
    secondary: "#AEB5BB",
    gray: "#D9D9D9",
  };
  
  const CodeInput = ({ reference, onChangeText, onKeyPress, ...props }) => (
    <TextInput
      style={styles.codeInput}
      keyboardType="number-pad"
      maxLength={1}
      ref={reference}
      textAlign="center"
      onChangeText={onChangeText}
      onKeyPress={onKeyPress}
      {...props}
    />
  );
  
  const CodeInputGroup = ({ pins, onSubmit }) => {
    const otpValues = useRef(Array(pins.length).fill("")); // Initialize empty values for OTP
    const references = useRef([]);
  
    references.current = pins.map(
      (_, index) => (references.current[index] = createRef())
    );
  
    useEffect(() => {
      references.current[0].current.focus(); // Focus on the first input
    }, []);
  
    const handleInputChange = (val, index) => {
      otpValues.current[index] = val; // Update OTP value at the current index
  
      // If not the last input, move to the next input
      if (val !== "" && index < pins.length - 1) {
        references.current[index + 1].current.focus();
      }
  
      // Check if all inputs are filled
      if (otpValues.current.every((value) => value !== "")) {
        onSubmit(otpValues.current.join("")); // Submit OTP
      }
    };
  
    const handleBackspace = (index) => {
      if (index > 0) {
        references.current[index - 1].current.focus(); // Focus on the previous input
        otpValues.current[index] = ""; // Clear the current value
      }
    };
  
    return (
      <View style={styles.codeInputGroup}>
        {pins.map((_, index) => (
          <CodeInput
            key={`code${index}`}
            reference={references.current[index]}
            onChangeText={(val) => handleInputChange(val, index)}
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === "Backspace") {
                handleBackspace(index);
              }
            }}
          />
        ))}
      </View>
    );
  };
  
  const VerifyAccount = () => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const route = useRoute();
  
    const handleSubmitOtp = async (code) => {
        console.log(code);
        setOtp(code);
        setIsLoading(true);
        const token = await AsyncStorage.getItem("activation_token");
        if (!token) {
          Alert.alert("Error", "No activation token found. Please register again.");
          setIsLoading(false);
          return;
        }
      
        const maxRetries = 3;
        let attempt = 0;
        let success = false;
      
        while (attempt < maxRetries && !success) {
          try {
            const res = await axios.post(`${SERVER_URI}/api/activate-user`, {
              activation_code: code,
              activation_token: token,
            });
            Alert.alert("Success", res.data.message);
            setIsLoading(false);
            navigation.navigate("LoginScreen");
            success = true;
          } catch (error) {
            attempt++;
            if (attempt >= maxRetries) {
              setIsLoading(false);
              console.log(error);
              Alert.alert("Error", "Verification failed. Please try again.");
            }
          }
        }
      };
  
    return (
      <SafeAreaView className="flex-1 bg-white">
        <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
          <StatusBar
            barStyle="light-content" // Set text color to light
            backgroundColor="black" // Set background color
          />
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View className=" ">
              <Image
                className="w-full  h-[320px]"
                source={require("../assets/otp.png")}
              />
            </View>
            <View className="mx-4  mt-2">
              <Text className="text-4xl tracking-widest text-black  font-bold">
                Enter OTP?
              </Text>
            </View>
  
            <View className="px-3" style={styles.forgotDes}>
              <Text className="text-sm mt-2" style={styles.forgotDesLbl}>
                An 4 digit code has been sent to you
              </Text>
            </View>
            <View>
              <CodeInputGroup
                pins={[1, 2, 3, 4]}
                onSubmit={handleSubmitOtp} // Pass the submit handler
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  };
  
  export default VerifyAccount;
  
  const styles = StyleSheet.create({
    codeInputGroup: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 20,
      paddingHorizontal: 50,
    },
    codeInput: {
      width: 50,
      height: 45,
      borderWidth: 1,
      borderColor: colors.gray,
      color: colors.primary,
      fontSize: 20,
      textAlign: "center",
      marginHorizontal: 5,
    },
  });
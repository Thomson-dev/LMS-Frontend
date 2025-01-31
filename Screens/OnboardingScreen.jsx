import * as SplashScreen from "expo-splash-screen";
import React, { useCallback } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";

SplashScreen.preventAutoHideAsync();

const DoneButton = (props) => (
  <TouchableOpacity style={styles.doneButton} {...props}>
    <Text style={styles.doneButtonText}>Done</Text>
  </TouchableOpacity>
);

const ContinueButton = (props) => (
  <View
    className="absolute bottom-7 right-[8rem]"
    style={{
      justifyContent: "center",
      alignItems: "center",
      flex: 1,
    }}
  >
    <TouchableOpacity
      className="bg-blue-500"
      style={{
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 35,
        borderRadius: 8,
      }}
      {...props}
    >
      <Text style={{ fontSize: 16, color: "#FFFFFF" }}>Continue</Text>
    </TouchableOpacity>
  </View>
);

const Dot = ({ selected }) => {
  let backgroundColor;
  backgroundColor = selected ? '#1E40AF' : '#C4C4C4';

  return (
    <View
      style={{
        width: 8,
        height: 8,
        marginHorizontal: 3,
        backgroundColor,
        borderRadius: 4,
      }}
    />
  );
};

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const [fontsLoaded] = useFonts({
    Raleway_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Keep the splash screen visible
  }

  const handleDone = () => {
    navigation.navigate("AuthScreen");
  };

  return (
    <View onLayout={onLayoutRootView} style={{ flex: 1 }}>
      <Onboarding
        pages={[
          {
            backgroundColor: "#ffffff",
            image: (
              <Image
                className="w-full object-contain"
                source={require("../assets/Frame1.png")}
              />
            ),
            title: "Welcome to Cybex IT Group where learning meets innovation!",
            subtitle:
              "Empowering your journey through cutting-edge IT education and expertise",
            titleStyles: {
              fontFamily: "Rubik",
              fontSize: 20,
              color: "#000000",
            },
            subTitleStyles: {
              fontFamily: "Rubik_regular",
              fontSize: 16,
              color: "#000000",
            },
          },
          {
            backgroundColor: "#ffffff",
            image: (
              <Image
                className="object-contain"
                source={require("../assets/Frame2.png")}
              />
            ),
            title:
              "Begin your learning journey and unlock a world of knowledge",
            subtitle:
              "Explore our comprehensive courses designed to transform your skills and career",
            titleStyles: {
              fontFamily: "Rubik",
              fontSize: 20,
              color: "#000000",
            },
            subTitleStyles: {
              fontFamily: "Rubik_regular",
              fontSize: 16,
              color: "#000000",
            },
          },
          {
            backgroundColor: "#ffffff",
            image: (
              <Image
                className="object-contain"
                source={require("../assets/Frame4.png")}
              />
            ),
            title:
              "Join a community of learners and embark on a learning adventure",
            subtitle:
              "Connect with like-minded individuals Join us to learn, grow, and thrive together!",
            titleStyles: {
              fontFamily: "Rubik",
              fontSize: 20,
              color: "#000000",
            },
            subTitleStyles: {
              fontFamily: "Rubik_regular",
              fontSize: 16,
              color: "#000000",
            },
          },
        ]}
        DoneButtonComponent={DoneButton}
        
        DotComponent={Dot}
        bottomBarHighlight={false}
        showSkip={false}
        showNext={false}
        onDone={handleDone}
      />
    </View>
  );
};

export default OnboardingScreen;

const styles = StyleSheet.create({
  doneButton: {
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  doneButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
  continueButton: {
    backgroundColor: '#1E40AF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  continueButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Onboarding from "react-native-onboarding-swiper";
import { useNavigation } from "@react-navigation/native";

const DoneButton = (props) => (
  <TouchableOpacity className="bg-white  rounded-l-full py-4 px-7" {...props}>
    <Text className="">Done</Text>
  </TouchableOpacity>
);

const OnboardingScreen = () => {
  const navigation = useNavigation();

  const handleDone = () => {
    navigation.navigate("AuthScreen");
  };
  return (
    <Onboarding
      pages={[
        {
          backgroundColor: "#a7f3d0",
          image: <Image source={require("../assets/Frame1.png")} />,
          title: "Welcome to Cybex IT Group where learning meets innovation!",
          subtitle:
            "Empowering your journey through cutting-edge IT education and expertise",
         
        },
        {
          backgroundColor: "#fef3c7",
          image: <Image source={require("../assets/Frame2.png")} />,
          title: "Begin your learning journey and unlock a world of knowledge",
          subtitle:
            "Explore our comprehensive courses designed to transform your skills and career",
         
        },

        {
          backgroundColor: "#a78bfa",
          image: <Image source={require("../assets/Frame4.png")} />,
          title:
            "Join a community of learners and embark on a learning adventure",
          subtitle:
            "Connect with like-minded individuals Join us to learn, grow, and thrive together!",
          titleStyles: styles.title,
          subTitleStyles: styles.subtitle,
        },
      ]}
      DoneButtonComponent={DoneButton}
      bottomBarHighlight={false}
      showSkip={false}
      showNext={false}
      onDone={handleDone}
    />
  );
};

export default OnboardingScreen;
const styles = StyleSheet.create({
  title: {
    color: "#fff", 
  },
  subtitle: {
    color: "#fff", 
  },
});

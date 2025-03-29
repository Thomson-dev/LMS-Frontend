import { ScrollView, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import Header from "../Components/Home/Header";

import HomeBannerSlider from "../Components/Home/HomeBannerSlide";
import GetAllCourse from "../Components/Home/GetAllCourse";
import SearchInput from "./SearchScreen";

const HomeScreen = () => {
  return (
    <ScrollView className="mb-24" contentContainerStyle={{ flexGrow: 1 }}>
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
      />
      <Header /> 
       {/* <SearchInput  />  */}
       <HomeBannerSlider />
      <GetAllCourse /> 
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

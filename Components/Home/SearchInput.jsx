import React, { useEffect, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { useFonts, Nunito_700Bold } from "@expo-google-fonts/nunito";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";


export default function SearchInput({ homeScreen }) {
  const [value, setValue] = useState("");
  const [courses, setcourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);


  let [fontsLoaded, fontError] = useFonts({
    Nunito_700Bold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  

  return (
    <View>
      <View className="flex-row items-center  justify-between mx-4">
        <View className="flex-1 flex-row items-center bg-white rounded-md px-2 mr-2">
          <TextInput
            className="flex-1 text-base text-black py-2 w-full h-[50px]"
            style={{ fontFamily: "Nunito_700Bold" }}
            placeholder="Search"
            value={value}
            onChangeText={setValue}
            placeholderTextColor={"#C67cc"}
          />
          <TouchableOpacity
            className="w-9 h-9 bg-blue-600 justify-center items-center rounded-md"
            // onPress={() => router.push("/(tabs)/search")}
          >
            <AntDesign name="search1" size={20} color={"#fff"} />
          </TouchableOpacity>
        </View>
      </View>
     
    </View>
  );
}
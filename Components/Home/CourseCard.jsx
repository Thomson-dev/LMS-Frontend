import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { View, Text, TouchableOpacity, Image } from "react-native";


export default function CourseCard({ item }) {
  const thumbnailUrl = item?.thumbnail?.url || 'https://via.placeholder.com/150';
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      className="bg-white mt-5 rounded-lg overflow-hidden my-3 p-2"
      onPress={() =>
        navigation.navigate("CourseDetails", {
          item: item
        })
      }
    >
      <View className="px-2.5 ">
        <Image
        className = 'w-full h-40'
          style={{
          
            borderRadius: 5,
            alignSelf: "center",
            objectFit: "cover",
          }}
          source={{ uri: thumbnailUrl }}
        />
        <View >
          <Text className="text-left mt-2.5 text-base font-semibold">
            {item.name}
          </Text>
        </View>
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center bg-black p-1  rounded gap-1 px-2.5 h-7 mt-2.5">
            <FontAwesome name="star" size={14} color={"#ffb800"} />
            <Text className="text-white text-base">{item?.ratings}</Text>
          </View>
          <Text>{item.purchased} Students</Text>
        </View>
        <View className="flex-row items-center justify-between pb-1.5">
          <View className="flex-row">
            <Text className="pt-2.5 text-lg font-semibold">
              ${item?.price}
            </Text>
            <Text className="pl-1.5 line-through text-base font-normal">
              ${item?.estimatedPrice}
            </Text>
          </View>
          <View className="flex-row items-center">
            <Ionicons name="list-outline" size={20} color={"#8A8A8A"} />
            <Text className="ml-1.5">
              {item.courseData.length} Lectures
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}
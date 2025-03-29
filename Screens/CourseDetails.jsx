import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import {
  useFonts,
  Raleway_600SemiBold,
  Raleway_700Bold,
} from "@expo-google-fonts/raleway";
import {
  Nunito_400Regular,
  Nunito_500Medium,
  Nunito_700Bold,
  Nunito_600SemiBold,
} from "@expo-google-fonts/nunito";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Loader from "../Components/Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, useRoute } from "@react-navigation/native";
import { addToCart } from "../features/CartReducer";
import useUser from "../utils/useUser";

export default function CourseDetailScreen() {
  const [activeButton, setActiveButton] = useState("About");

  const [addedToCart, setAddedToCart] = useState(false);
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const [checkPurchased, setCheckPurchased] = useState(false);

  const navigation = useNavigation();
  const route = useRoute();
  const { item } = route.params;


  const courseData = typeof item === "string" ? JSON.parse(item) : item;

  const dispatch = useDispatch();

  useEffect(() => {
    if (user?.courses?.find((i) => i._id === courseData?._id)) {
      setCheckPurchased(true);
    }
  }, [user]);

  if (!courseData) {
    Alert.alert("Error", "Course data is not available.");
    return null;
  }

  let [fontsLoaded, fontError] = useFonts({
    Raleway_600SemiBold,
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_500Medium,
    Nunito_700Bold,
    Nunito_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  const addItemToCart = (item) => {
    setAddedToCart(true);
    dispatch(addToCart(item));
    setTimeout(() => {
      setAddedToCart(false);
    }, 60000);
  };

  return (
    <>
      <StatusBar
        barStyle="light-content" // Set text color to light
        backgroundColor="black" // Set background color
      />
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} className="flex-1 pt-4">
          <ScrollView showsVerticalScrollIndicator={false}>
            <View className="mx-4">
              <View className="absolute z-10 bg-yellow-500 rounded-full py-2 px-3 mt-2 ml-2">
                <Text className="text-black text-sm font-raleway">
                  Best Seller
                </Text>
              </View>
              <View className="absolute z-10 right-0">
                <View className="flex-row items-center bg-black py-1.5 px-3 rounded mt-2 mr-2">
                  <FontAwesome name="star" size={14} color={"#FFB800"} />
                  <Text className="text-white ml-1 font-raleway">5</Text>
                </View>
              </View>
              <Image
                source={{
                  uri: item?.thumbnail?.url
                    ? item.thumbnail.url
                    : "https://i.ytimg.com/vi/QAz2_3ceCvw/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDlUcEXuef_gq3iZNC-gwVKchz3iQ",
                }}
                className="w-full h-56 rounded"
              />
            </View>
            <Text className="mx-4 mt-4 text-xl font-bold font-raleway">
              {item.name}
            </Text>
            <View className="flex-row items-center mx-3 justify-between pr-2 pt-1">
              <View className="flex-row">
                <Text className="text-black text-2xl ml-2 py-2 font-raleway">
                  ${item.price}
                </Text>
              </View>
              <Text className="text-base">{item.students} students</Text>
            </View>
            <View className="p-2 mx-2">
              <Text className="text-xl font-bold font-raleway">
                Course Prerequisites
              </Text>
              {courseData.prerequisites?.map((prerequisite) => (
                <View
                  key={prerequisite._id}
                  className="flex-row w-11/12 py-1.5"
                >
                  <Ionicons name="checkmark-done-outline" size={18} />
                  <Text className="pl-1 text-lg font-nunito">
                    {prerequisite.title}
                  </Text>
                </View>
              ))}
            </View>

            <View className="p-2 mx-2">
              <Text className="text-xl font-bold font-raleway">
                Course Benefits
              </Text>
              {courseData.benefits?.map((benefit) => (
                <View key={benefit._id} className="flex-row w-11/12 py-1.5">
                  <Ionicons name="checkmark-done-outline" size={18} />
                  <Text className="pl-1 text-lg font-nunito">
                    {benefit.title}
                  </Text>
                </View>
              ))}
            </View>
            <View className="flex-row justify-center py-2 mt-6 mx-6 bg-blue-100 rounded-full">
              <TouchableOpacity
                className={`py-3 px-7 ${
                  activeButton === "About" ? "bg-blue-600 rounded-full" : ""
                }`}
                onPress={() => setActiveButton("About")}
              >
                <Text
                  className={`${
                    activeButton === "About" ? "text-white" : "text-black"
                  } font-raleway`}
                >
                  About
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`py-3 px-10 ${
                  activeButton === "Lessons" ? "bg-blue-600 rounded-full" : ""
                }`}
                onPress={() => setActiveButton("Lessons")}
              >
                <Text
                  className={`${
                    activeButton === "Lessons" ? "text-white" : "text-black"
                  } font-raleway`}
                >
                  Lessons
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`py-3 px-10 ${
                  activeButton === "Reviews" ? "bg-blue-600 rounded-full" : ""
                }`}
                onPress={() => setActiveButton("Reviews")}
              >
                <Text
                  className={`${
                    activeButton === "Reviews" ? "text-white" : "text-black"
                  } font-raleway`}
                >
                  Reviews
                </Text>
              </TouchableOpacity>
            </View>
            {activeButton === "About" && (
              <View className="mx-4 my-6 px-2.5">
                <Text className="text-lg font-bold font-raleway">
                  About course
                </Text>
                <Text className="text-gray-600 text-base mt-2 text-justify font-nunito">
                  {item.description}
                </Text>
              </View>
            )}
            {activeButton === "Lessons" && (
              <View className="mx-4 my-6">
                {/* Replace with your CourseLesson component */}
                <Text className="font-nunito">
                  Course Lessons will be displayed here.
                </Text>
              </View>
            )}
            {activeButton === "Reviews" && (
              <View className="mx-4 my-6">
                <View className="space-y-6">
                  {/* Replace with your ReviewCard component */}
                  <Text className="font-nunito">Review 1: Great course!</Text>
                  <Text className="font-nunito">
                    Review 2: Very informative.
                  </Text>
                </View>
              </View>
            )}
          </ScrollView>
          <View className="bg-white mx-4 py-2.5 mb-2.5">
            {checkPurchased === true ? (
              <TouchableOpacity
                className="bg-blue-600 py-4 rounded"
                onPress={() =>
                  navigation.navigate("CourseAccess", {
                    courseData: JSON.stringify(item),
                  })
                }
              >
                <Text className="text-center text-white text-base font-raleway">
                  Go to the course
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                className="bg-blue-600 py-4  rounded-sm"
                onPress={() => addItemToCart(item)}
              >
                {addedToCart ? (
                  <Text className="text-center text-white text-base font-raleway">
                    Added to cart
                  </Text>
                ) : (
                  <Text className="text-center text-white text-base font-raleway">
                    Add to cart
                  </Text>
                )}
              </TouchableOpacity>
            )}
          </View>
        </LinearGradient>
      )}
    </>
  );
}

import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import {
  useFonts,
  Raleway_700Bold,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Raleway_600SemiBold,
} from "@expo-google-fonts/nunito";
import Loader from "../Components/Loading/Loading";
import { LinearGradient } from "expo-linear-gradient";
import axios from "axios";
import CourseCard from "../Components/Home/CourseCard"; // Adjust the import path as needed
import { useSelector } from "react-redux";

const categories = [
  { title: "All" },
  { title: "Programming" },
  { title: "Design" },
  { title: "Data Science" },
  { title: "Mobile Development" },
  // Add more categories as needed
];

export default function CoursesScreen() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [courses, setCourses] = useState([]);
  const [originalCourses, setOriginalCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://lms-server-oqfi.onrender.com/api/get-courses');
        setCourses(response.data.courses);
        setOriginalCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const handleCategories = (category) => {
    setActiveCategory(category);
    if (category === "All") {
      setCourses(originalCourses);
    } else {
      const filteredCourses = originalCourses.filter(
        (course) => course.categories === category
      );
      setCourses(filteredCourses);
    }
  };

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <LinearGradient
          colors={["#E5ECF9", "#F6F7F9"]}
          style={{ flex: 1, paddingTop: 10 }}
        >
          <View style={{ padding: 10 }}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor:
                      activeCategory === category.title ? "#2467EC" : "#000",
                    borderRadius: 20,
                    paddingHorizontal: 20,
                    marginRight: 5,
                  }}
                  onPress={() => handleCategories(category.title)}
                >
                  <Text
                    style={{ color: "#fff", fontSize: 16, fontWeight: "600" }}
                  >
                    {category.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View>
            <ScrollView style={{ marginHorizontal: 15, gap: 12 }}>
              {courses.map((item, index) => (
                <CourseCard item={item} key={index} />
              ))}
            </ScrollView>
            {courses.length === 0 && (
              <Text
                style={{ textAlign: "center", paddingTop: 50, fontSize: 18 }}
              >
                No data available!
              </Text>
            )}
          </View>
        </LinearGradient>
      )}
    </>
  );
}
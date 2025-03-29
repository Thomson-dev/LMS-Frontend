import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
} from "react-native";

const EnrolledCoursesScreen = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnrolledCourses = async () => {
      try {
        // Retrieve tokens from AsyncStorage
        const accessToken = await AsyncStorage.getItem("access_token");
        const refreshToken = await AsyncStorage.getItem("refresh_token");
  
        if (!accessToken || !refreshToken) {
          setError("Authentication tokens are missing. Please log in again.");
          return;
        }
  
        // Make the API call with tokens in the headers
        const response = await fetch("https://lms-server-oqfi.onrender.com/api/enrolled", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "refresh-token": refreshToken,
          },
        });
  
        const data = await response.json();
  
        if (response.ok) {
          const formattedCourses = data.courses.map((course) => ({
            _id: course._id,
            name: course.description,
            description: course.description,
            image: course.thumbnail.url,
            lessons: 0,
            progress: 0,
          }));
  
          setCourses(formattedCourses);
        } else {
          setError(data.message || "Failed to load courses");
        }
      } catch (err) {
        setError("Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchEnrolledCourses();
  }, []);

  const renderCourseCard = ({ item }) => (
    <TouchableOpacity
      style={{
        backgroundColor: "white",
        borderRadius: 12,
        marginBottom: 16,
        padding: 16,
        flexDirection: "row",
        shadowColor: "#000",
        shadowOpacity: 0.1,
        shadowRadius: 4,
      }}
    >
      <Image
        source={{ uri: item.image }}
        style={{
          width: 80,
          height: 80,
          borderRadius: 8,
          backgroundColor: "#e5e7eb",
        }}
      />
      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            color: "#4F46E5",
            marginBottom: 4,
          }}
        >
          {item.name}
        </Text>
        <Text
          style={{ fontSize: 14, color: "#6B7280", marginBottom: 8 }}
          numberOfLines={2}
        >
          {item.description}
        </Text>
        <Text style={{ fontSize: 12, color: "#6B7280", marginTop: 4 }}>
          {item.lessons} Lessons
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#4F46E5",
          marginBottom: 8,
        }}
      >
        My Courses
      </Text>
      <Text style={{ fontSize: 16, color: "#6B7280" }}>
        Continue learning where you left off
      </Text>
    </View>
  );

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F9FAFB",
        }}
      >
        <ActivityIndicator size="large" color="#4F46E5" />
        <Text style={{ marginTop: 12, fontSize: 16, color: "#6B7280" }}>
          Loading courses...
        </Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
          backgroundColor: "#F9FAFB",
        }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#EF4444",
            marginBottom: 16,
            textAlign: "center",
          }}
        >
          Oops! {error}
        </Text>
      
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F9FAFB" }}>
      <StatusBar barStyle="dark-content" backgroundColor="#F9FAFB" />
      <FlatList
        data={Array.isArray(courses) ? courses : []}
        keyExtractor={(item) => item._id}
        renderItem={renderCourseCard}
        contentContainerStyle={{ padding: 16, paddingBottom: 24 }}
        ListHeaderComponent={renderHeader}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

export default EnrolledCoursesScreen;
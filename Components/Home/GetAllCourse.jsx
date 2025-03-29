import { Text, TouchableOpacity, View, ActivityIndicator, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useFonts } from 'expo-font';
import {
  Raleway_700Bold,
  Nunito_400Regular,
  Nunito_700Bold,
  Nunito_500Medium,
  Nunito_600SemiBold,
  Raleway_600SemiBold,
} from '@expo-google-fonts/nunito';
import CourseCard from './CourseCard';

const GetAllCourse = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const flatListRef = useRef(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get('https://lms-server-oqfi.onrender.com/api/get-courses');
        setCourses(response.data.courses);
      } catch (error) {
        console.error('Error fetching courses:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  const [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
    Nunito_400Regular,
    Nunito_700Bold,
    Nunito_500Medium,
    Nunito_600SemiBold,
    Raleway_600SemiBold,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View className="flex-1 mx-6 mt-4">
      <View className="flex-row items-center justify-between">
        <Text className="text-lg text-black font-raleway-bold">
          Popular courses
        </Text>
        <TouchableOpacity>
          <Text className="text-base text-blue-600 font-nunito-semibold">
            See All
          </Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator className = 'flex justify-center items-center flex-1 ' size="large" color="#0000ff" />
      ) : (
        <FlatList
          ref={flatListRef}
          data={courses}
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item._id.toString()}
          renderItem={({ item }) => <CourseCard item={item} />}
        />
      )}
    </View>
  );
};

export default GetAllCourse;
import React, { useEffect, useState } from 'react';
import "./global.css";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import store from "./store"; // Adjust the import path as needed
import { StripeProvider } from "@stripe/stripe-react-native";
import withAuth from './Components/WithAuth';
// Import screens
import OnboardingScreen from "./Screens/OnboardingScreen";
import AuthScreen from "./Screens/AuthScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";
import VerifyAccount from "./Screens/VerifyAccount";
import MyTabs from "./Components/MyTab";
import CourseDetailScreen from "./Screens/CourseDetails";
import CartScreen from "./Screens/CartScreen";
import CourseAccessScreen from "./Screens/CourseAccessScreen";
import QuizComponent from "./Components/Quiz/QuizComponent";
import EnrolledCoursesScreen from "./Screens/EnrolledCoursesScreen";

// Create a stack navigator
const Stack = createNativeStackNavigator();

// Common header options
const commonHeaderOptions = {
  headerStyle: {
    backgroundColor: "#fff", // Set the background color of the header
  },
  headerTintColor: "black", // Set the color of the header text and icons
  headerTitleStyle: {
    fontWeight: "semibold",
    fontSize: 18, // Set the font weight and size of the header title
  },
  headerTitleAlign: "center", // Center the header title
  headerBackTitleVisible: false, // Hide the back button text
  headerBackImage: () => (
    <Ionicons
      name="arrow-back"
      size={24}
      color="black"
      style={{ marginLeft: 10 }}
    />
  ), // Customize the back arrow
};

export default function App() {
  return (
    <Provider store={store}>
      <StripeProvider publishableKey="pk_test_51JR35pDcBGT3lmREe8J7TVNno7NubCSqQTKMoUDoHxTsHK4KEObkX54BG0efmtLeMxrdk6Sn4nuqUmeoT1ZaW1Vc00j64CUV9H">
        <NavigationContainer>
          <Stack.Navigator>
            {/* Onboarding Screen */}
            <Stack.Screen
              name="Onboarding"
              component={OnboardingScreen}
              options={{ headerShown: false }}
            />

            {/* Authentication Screens */}
            <Stack.Screen
              name="AuthScreen"
              component={AuthScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="VerifyAccount"
              component={VerifyAccount}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="RegisterScreen"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />

            {/* Cart Screen */}
            <Stack.Screen
              name="CartScreen"
              component={CartScreen}
              options={{ headerShown: false }}
            />

            {/* Course Details Screen */}
            <Stack.Screen
              name="CourseDetails"
              component={CourseDetailScreen}
              options={{
                ...commonHeaderOptions,
                headerTitle: "Course Details", // Set a custom title for the header
              }}
            />

            <Stack.Screen
              name="CourseAccess"
              component={CourseAccessScreen}
              options={{ headerShown: false }}
            />

            <Stack.Screen
              options={{ headerShown: false }}
              name="EnrolledCourse"
              component={EnrolledCoursesScreen}
            />
            <Stack.Screen name="Quiz" component={QuizComponent} />

            {/* Home Screen */}
            <Stack.Screen
              name="Home"
              component={MyTabs}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Toast />
        </NavigationContainer>
      </StripeProvider>
    </Provider>
  );
}
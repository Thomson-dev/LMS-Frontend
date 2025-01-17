import "./global.css";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./Screens/OnboardingScreen";
import HomeScreen from "./Screens/HomeScreen";
import AuthScreen from "./Screens/AuthScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";

// Create a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // NavigationContainer is a component which manages the navigation tree and state
    <NavigationContainer>
      {/* Stack.Navigator is a component that provides a way for your app to transition between screens */}
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* Define the Onboarding screen in the stack navigator */}
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        {/* Define the Home screen in the stack navigator */}
        <Stack.Screen name="Home" component={HomeScreen} />
        {/* Define the AuthScreen in the stack navigator */}
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        {/* Define the LoginScreen in the stack navigator */}
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        {/* Define the RegisterScreen in the stack navigator */}
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import "./global.css";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnboardingScreen from "./Screens/OnboardingScreen";
import Toast from 'react-native-toast-message';
import AuthScreen from "./Screens/AuthScreen";
import LoginScreen from "./Screens/LoginScreen";
import RegisterScreen from "./Screens/RegisterScreen";

import VerifyAccount from "./Screens/VerifyAccount";
import MyTabs from "./Components/MyTab";

// Create a stack navigator
const Stack = createNativeStackNavigator();

export default function App() {
  return (
  
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        <Stack.Screen name="Home" component={MyTabs} />
        <Stack.Screen name="AuthScreen" component={AuthScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
      <Toast  />
    </NavigationContainer>
     
    
  );
}

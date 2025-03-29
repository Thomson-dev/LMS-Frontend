import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import Profile from "../Screens/Profile";
import Courses from "../Screens/CoursesScreen";
import TabBar from "./MyTabBar";
import SearchScreen from "../Screens/SearchScreen";


const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
    
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: {
           // Adjust the value as needed
        },
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="CourseScreen" component={Courses} />
      {/* <Tab.Screen name="SearchScreen" component={SearchScreen} /> */}
      <Tab.Screen name="ProfileScreen" component={Profile} />
    </Tab.Navigator>
  );
}

export default MyTabs;
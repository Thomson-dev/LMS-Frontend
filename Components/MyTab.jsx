import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screens/HomeScreen";
import Profile from "../Screens/Profile";
import Courses from "../Screens/Courses";
import TabBar from "./MyTabBar";
import Search from "../Screens/Search";

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
      }}
      tabBar={(props) => <TabBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
     
      <Tab.Screen name="Courses" component={Courses} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default MyTabs;

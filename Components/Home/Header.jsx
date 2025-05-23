import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Raleway_700Bold } from "@expo-google-fonts/raleway";
import { useFonts } from "expo-font";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import useUser from "../../utils/useUser"; // Import the useUser hook

export default function Header() {
  const cart = useSelector((state) => state.cart.cart);
  const navigation = useNavigation();

  const { loading, user, error } = useUser(); // Use the useUser hook

  let [fontsLoaded, fontError] = useFonts({
    Raleway_700Bold,
  });
  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <View className="py-3" style={styles.container}>
      <View style={styles.headerWrapper}>
        <TouchableOpacity>
          <Image
            source={
              user?.avatar?.url
                ? { uri: user.avatar.url }
                : require("../../assets/User.png")
            }
            style={styles.image}
          />
        </TouchableOpacity>
        <View>
          <Text style={[styles.helloText, { fontFamily: "Raleway_700Bold" }]}>
            Hello,
          </Text>
          <Text style={[styles.text, { fontFamily: "Raleway_700Bold" }]}>
            {user?.name || "User"}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        style={styles.bellButton}
        onPress={() => navigation.navigate("CartScreen")}
      >
        <View>
          <Feather name="shopping-bag" size={26} color={"black"} />
          <View style={styles.bellContainer}>
            <Text style={{ color: "#fff", fontSize: 14 }}>{cart.length}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 16,
    marginBottom: 5,
    width: "90%",
  },

  headerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },

  image: {
    width: 45,
    height: 45,
    marginRight: 8,
    borderRadius: 100,
  },

  text: {
    fontSize: 16,
  },

  bellButton: {
    borderWidth: 1,
    borderColor: "#E1E2E5",
    width: 45,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },

  bellIcon: {
    alignSelf: "center",
  },

  bellContainer: {
    width: 20,
    height: 20,
    backgroundColor: "#2467EC",
    position: "absolute",
    borderRadius: 50,
    right: -5,
    top: -5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  helloText: { color: "#7C7C80", fontSize: 14 },
});
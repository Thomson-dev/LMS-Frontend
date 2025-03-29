import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  RefreshControl,
  Alert,
} from "react-native";
import { Entypo, FontAwesome } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../features/CartReducer";
import axiosInstance from "../utils/AxiosIntance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";

const SERVER_URI = "https://lms-server-oqfi.onrender.com";

export default function CartScreen() {
  const [refreshing, setRefreshing] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart({ _id: id }));
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const formattedTotal = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(total);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const handlePayment = async () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items before proceeding.");
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        Alert.alert("Authentication Error", "Please log in again.");
        return;
      }

      const amount = Math.round(total * 100);

      const paymentIntentResponse = await axiosInstance.post(
        `${SERVER_URI}/api/payment`,
        { amount },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      );

      console.log(paymentIntentResponse.data);
      const { client_secret: clientSecret } = paymentIntentResponse.data;

      const initSheetResponse = await initPaymentSheet({
        merchantDisplayName: "LMS.",
        paymentIntentClientSecret: clientSecret,
        paymentMethodTypes: ["card"], // Specify payment method types
        defaultBillingDetails: {
          name: "Naser", // Replace with actual customer name
        },
      });

      if (initSheetResponse.error) {
        console.error("Init Payment Sheet Error:", initSheetResponse.error);
        Alert.alert("Payment Error", initSheetResponse.error.message);
        return;
      }

      const paymentResponse = await presentPaymentSheet();
      if (paymentResponse.error) {
        console.error("Payment Response Error:", paymentResponse.error);
        Alert.alert("Payment Failed", paymentResponse.error.message);
        return;
      }

      await createOrder();
    } catch (error) {
      console.error("Payment Error:", error);
      Alert.alert("Payment Error", "Something went wrong. Please try again.");
    }
  };

  const createOrder = async () => {
    if (cart.length === 0) {
      Alert.alert("Cart is empty", "Please add items before proceeding.");
      return;
    }

    try {
      const accessToken = await AsyncStorage.getItem("access_token");
      const refreshToken = await AsyncStorage.getItem("refresh_token");

      if (!accessToken || !refreshToken) {
        Alert.alert("Authentication Error", "Please log in again.");
        return;
      }

      await axiosInstance.post(
        `${SERVER_URI}/api/create-mobile-order`,
        {
          courseId: cart[0]._id,
          payment_info: "card",
        },
        {
          headers: {
            "access-token": accessToken,
            "refresh-token": refreshToken,
          },
        }
      );

      setOrderSuccess(true);
      await AsyncStorage.removeItem("cart");
    } catch (error) {
      console.error("Order Creation Error:", error);
      Alert.alert("Could not complete the order.", error.response.data.message);
    }
  };

  return (
    <LinearGradient colors={["#E5ECF9", "#F6F7F9"]} style={{ flex: 1 }}>
      {orderSuccess ? (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ fontSize: 22, fontFamily: "Raleway_700Bold" }}>
            Payment Successful!
          </Text>
          <Text style={{ fontSize: 14, marginTop: 5, color: "#575757" }}>
            Thank you for your purchase! You will receive an email shortly.
          </Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item._id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={{
                  flexDirection: "row",
                  marginVertical: 8,
                  padding: 10,
                  backgroundColor: "white",
                  borderRadius: 8,
                }}
              >
                <Image
                  source={{ uri: item.thumbnail.url }}
                  style={{
                    width: 100,
                    height: 100,
                    marginRight: 16,
                    borderRadius: 8,
                  }}
                />
                <View style={{ flex: 1, justifyContent: "space-between" }}>
                  <Text style={{ fontSize: 16, fontFamily: "Nunito_700Bold" }}>
                    {item.name}
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Entypo name="dot-single" size={24} color={"gray"} />
                      <Text style={{ fontSize: 16, color: "#808080" }}>
                        {item.level}
                      </Text>
                    </View>
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <FontAwesome name="dollar" size={14} color={"#808080"} />
                      <Text
                        style={{
                          marginLeft: 3,
                          fontSize: 16,
                          color: "#808080",
                        }}
                      >
                        {item.price}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#FF6347",
                      borderRadius: 5,
                      padding: 5,
                      marginTop: 10,
                      width: 100,
                      alignSelf: "flex-start",
                    }}
                    onPress={() => handleRemoveItem(item._id)}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        textAlign: "center",
                      }}
                    >
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            )}
            ListEmptyComponent={() => (
              <View
                style={{
                  flex: 1,
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 20,
                }}
              >
                <Text
                  style={{
                    fontSize: 24,
                    color: "#333",
                    fontFamily: "Raleway_600SemiBold",
                  }}
                >
                  Your Cart is Empty!
                </Text>
              </View>
            )}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
          {cart.length > 0 && (
            <View style={{ marginBottom: 25 }}>
              <Text
                style={{ fontSize: 18, textAlign: "center", marginTop: 20 }}
              >
                Total Price: {formattedTotal}
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: "#007BFF",
                  borderRadius: 5,
                  padding: 10,
                  marginTop: 20,
                  width: "80%",
                  alignSelf: "center",
                }}
                onPress={handlePayment}
              >
                <Text
                  style={{ color: "white", fontSize: 18, textAlign: "center" }}
                >
                  Go for payment
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}
    </LinearGradient>
  );
}
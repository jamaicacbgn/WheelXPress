import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./src/screens/login/loginscreen";
import SignupScreen from "./src/screens/signup/signupscreen";
import HomeScreen from "./src/screens/HomeScreen";
import messageScreen from "./src/screens/MessageScreen";
import NotificationScreen from "./src/screens/NotificationScreen";
import BestSellerScreen from "./src/screens/BestSellerScreen";
import CartScreen from "./src/screens/CartScreen";
import BrandScreen from "./src/screens/BrandScreen";
import ProductDetailScreen from "./src/screens/ProductDetailScreen";
import CheckoutScreen from "./src/screens/CheckoutScreen";
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="SignupScreen" component={SignupScreen} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NotificationScreen" component={NotificationScreen} />
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="MessageScreen" component={messageScreen} />
        <Stack.Screen name="BrandScreen" component={BrandScreen} />
        <Stack.Screen name="BestSellerScreen" component={BestSellerScreen} />
        <Stack.Screen name="ProductDetailScreen" component={ProductDetailScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image,
  Alert
} from "react-native";
import styles from "../../styles/styles";

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = () => {
    if (!username) {
      Alert.alert("Error", "Username is required!");
      return;
    }
    if (!email) {
      Alert.alert("Error", "Email is required!");
      return;
    }
    if (!isValidEmail(email)) {
      Alert.alert("Error", "Please enter a valid email!");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Password is required!");
      return;
    }
    if (!confirmPassword) {
      Alert.alert("Error", "Confirm Password is required!");
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    Alert.alert("Success", "Account created successfully!");
    navigation.navigate("Login");
  };


  return (
    <ImageBackground source={require("../../assets/bg.png")} style={styles.background}>
    <View style={styles.opacity}>
      <View style={styles.container}>
      <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
        <Text style={styles.title}>Create your account</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={setconfirmPassword} />
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Login</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );
};
export default SignupScreen;

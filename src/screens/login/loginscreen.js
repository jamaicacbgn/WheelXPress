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

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // apply appropriate error handling
    if (!username) {
      Alert.alert("Error", "Username is required!");
      return;
    }
    if (!password) {
      Alert.alert("Error", "Password is required!");
      return;
    }
    Alert.alert("Success", "Login successfully!");
    navigation.navigate("Home");
  };


  return (
    <ImageBackground source={require("../../assets/bg.png")} style={styles.background}>
        <View style={styles.opacity}>
      <View style={styles.container}>
        <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
        <Text style={styles.title}>Sign In your account</Text>
        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={setUsername} />
        <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={setPassword} />
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          {/* mas maganda if yung sign up lang yung pinaka clickable */}
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </View>
      </View>
    </ImageBackground>
  );
};
export default LoginScreen;



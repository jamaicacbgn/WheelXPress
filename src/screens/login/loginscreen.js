import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Image
} from "react-native";
import styles from "../../styles/styles";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = () => {
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    } else {
      setUsernameError("");
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (isValid) {
      navigation.navigate("HomeScreen");
    }
  };

  return (
    <ImageBackground source={require("../../assets/bg.png")} style={styles.background}>
      <View style={styles.opacity}>
        <View style={styles.container}>
          <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
          <Text style={styles.title}>Sign in to your account</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <Text style={styles.link}> Don't have an account?
        <Text onPress={() => navigation.navigate("SignupScreen")}> Sign up </Text>
       </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default LoginScreen;



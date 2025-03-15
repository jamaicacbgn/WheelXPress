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

const SignupScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");

  const [formSubmitted, setFormSubmitted] = useState(false);


  const isValidEmail = (text) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text);
  const isValidUsername = (text) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(text);

  const handleUsernameChange = (text) => {
    setUsername(text);
    if (formSubmitted) {
      setUsernameError(isValidUsername(text) ? "" : "Must contain uppercase, lowercase, number, and special character.");
    }
  };

  const handleEmailChange = (text) => {
    setEmail(text);
    if (formSubmitted) {
      setEmailError(isValidEmail(text) ? "" : "Enter a valid email address.");
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (formSubmitted) {
      if (text.length < 6) {
        setPasswordError("Must be at least 6 characters.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (formSubmitted) {
      if (password.length < 6) {
        setConfirmPasswordError("");
      } else {
        setConfirmPasswordError(text === password ? "" : "Passwords do not match.");
      }
    }
  };

  const handleSignup = () => {
    setFormSubmitted(true);
    let isValid = true;

    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    } else if (!isValidUsername(username)) {
      setUsernameError("Must contain uppercase, lowercase, number, and special character.");
      isValid = false;
    }

    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Enter a valid email address.");
      isValid = false;
    }

    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError("Must be at least 6 characters.");
      isValid = false;
    } else {
      setPasswordError("");
    }

    if (!confirmPassword) {
      setConfirmPasswordError("Confirm Password is required.");
      isValid = false;
    } else if (password.length >= 6 && confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }

    if (isValid) {
      navigation.navigate("LoginScreen");
    }
  };

  return (
    <ImageBackground source={require("../../assets/bg.png")} style={styles.background}>
      <View style={styles.opacity}>
        <View style={styles.container}>
          <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
          <Text style={styles.title}>Create your account</Text>

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={handleUsernameChange}
          />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={handlePasswordChange}
          />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={handleConfirmPasswordChange}
          />
          {formSubmitted && confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

          <TouchableOpacity style={styles.button} onPress={handleSignup}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>

          <Text style={styles.link}> Already have an account?
        <Text onPress={() => navigation.navigate("LoginScreen")}> Login </Text>
       </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

export default SignupScreen;


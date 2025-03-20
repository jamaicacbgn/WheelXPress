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
  const [confirmPassword, setConfirmPassword] = useState("");


  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");


  const [formSubmitted, setFormSubmitted] = useState(false);


  const isValidEmail = (text) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const [localPart] = text.split("@");
    return emailRegex.test(text) && localPart.length >= 6 && localPart.length <= 30;
  };
 
  const isValidUsername = (text) => /^[A-Za-z\d]{4,20}$/.test(text);
  const isValidPassword = (text) =>
    text.length >= 8 &&
    /[A-Z]/.test(text) &&
    /[a-z]/.test(text) &&
    /\d/.test(text) &&
    /[@$!%*?&]/.test(text);


  const handleUsernameChange = (text) => {
    setUsername(text);
    if (formSubmitted) {
      setUsernameError(
        !text ? "Username is required." :
        isValidUsername(text) ? "" :
        "Username must be 4-20 characters long and contain only letters and numbers."
      );
    }
  };


  const handleEmailChange = (text) => {
    setEmail(text);
    if (formSubmitted) {
      setEmailError(
        !text ? "Email is required." :
        isValidEmail(text) ? "" :
        "Email username must be 6-30 characters and in a valid format."
      );
    }
  };


  const handlePasswordChange = (text) => {
    setPassword(text);
    if (formSubmitted) {
      const passwordValid = isValidPassword(text);
      setPasswordError(
        !text ? "Password is required." :
        passwordValid ? "" :
        "Password must have at least 8 characters, an uppercase, lowercase, number, and special character."
      );


      if (confirmPassword) {
        setConfirmPasswordError(
          text !== confirmPassword ? "Passwords do not match." : ""
        );
      }
    }
  };


  const handleConfirmPasswordChange = (text) => {
    setConfirmPassword(text);
    if (formSubmitted) {
      setConfirmPasswordError(
        !text ? "Confirm password is required." :
        text !== password ? "Passwords do not match." :
        ""
      );
    }
  };


  const handleSignup = () => {
    setFormSubmitted(true);
    let isValid = true;


    if (!username) {
      setUsernameError("Username is required.");
      isValid = false;
    } else if (!isValidUsername(username)) {
      setUsernameError("Username must be 4-20 characters long and contain only letters and numbers.");
      isValid = false;
    } else {
      setUsernameError("");
    }


    if (!email) {
      setEmailError("Email is required.");
      isValid = false;
    } else if (!isValidEmail(email)) {
      setEmailError("Email username must be 6-30 characters long and in a valid format.");
      isValid = false;
    } else {
      setEmailError("");
    }


    if (!password) {
      setPasswordError("Password is required.");
      isValid = false;
    } else if (!isValidPassword(password)) {
      setPasswordError("Password must have at least 8 characters, an uppercase, lowercase, number, and special character.");
      isValid = false;
    } else {
      setPasswordError("");
    }


    if (!confirmPassword) {
      setConfirmPasswordError("Confirm password is required.");
      isValid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError("Passwords do not match.");
      isValid = false;
    } else {
      setConfirmPasswordError("");
    }


    if (isValid) {
     Alert.alert("Success", "Successfully registered!", [{ text: "OK", onPress: () => navigation.navigate("LoginScreen") }]);
    }
  };


  return (
    <ImageBackground source={require("../../assets/bg.png")} style={styles.background}>
      <View style={styles.opacity}>
        <View style={styles.container}>
          <Image source={require("../../assets/logo.jpg")} style={styles.logo} />
          <Text style={styles.title}>Create your account</Text>


          <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={handleUsernameChange} />
          {usernameError ? <Text style={styles.errorText}>{usernameError}</Text> : null}


          <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={handleEmailChange} keyboardType="email-address" />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}


          <TextInput style={styles.input} placeholder="Password" secureTextEntry value={password} onChangeText={handlePasswordChange} />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}


          <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry value={confirmPassword} onChangeText={handleConfirmPasswordChange} />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}


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
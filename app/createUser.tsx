export const unstable_settings = {
  headerShown: false,
};

import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, Alert, TouchableOpacity, StyleSheet } from "react-native";
import axios from "axios";

export default function SignupScreen() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async () => {
    if (!fullName || !username || !password) {
      Alert.alert("Validation Error", "Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const { data } = await axios.post(
        "https://devapi-618v.onrender.com/api/auth/register",
        { fullname: fullName, username, password, type_id: 1 },
        { headers: { "Content-Type": "application/json" } }
      );
      console.log("Signup response:", data);

      router.push("/login");
    } catch (error) {
      console.error("Error during signup:", error.response?.data || error.message);
      const errorMessage = error.response?.data?.error || error.response?.data?.message;
      if (errorMessage && errorMessage.includes("Duplicate entry")) {
        Alert.alert("Sign Up Failed", "Username already taken. Please choose a different one.");
      } else {
        Alert.alert("Sign Up Failed", errorMessage || "An error occurred during sign up.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.appTitle}>SIGN IN TO READFLIX</Text>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          secureTextEntry
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={handleSignup} style={styles.signupButton} disabled={loading}>
          <Text style={styles.signupButtonText}>{loading ? "Signing up..." : "Sign Up"}</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text style={styles.loginLink}>Log In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  navbar: {
    width: "100%",
    padding: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 12,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#333",
    color: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    width: "100%",
    borderRadius: 20,
    fontSize: 16,
  },
  signupButton: {
    backgroundColor: "#ff4d4d", 
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 10,
    alignItems: "center",
  },
  signupButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  loginText: {
    color: "#fff",
    fontSize: 16,
  },
  loginLink: {
    color: "#66bb6a",
    fontSize: 16,
    fontWeight: "bold",
  },
});

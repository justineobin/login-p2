import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export default function LoginScreen() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://devapi-618v.onrender.com/api/auth/login",
        { username, password }
      );
      if (response.data && response.data.token) {
        await AsyncStorage.setItem("token", response.data.token);
        // Navigate to the home route
        router.replace("/home");
      } else {
        Alert.alert("Login Failed", "No token received from the server");
      }
    } catch (error) {
      Alert.alert("Login Failed", "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to ReadFlix</Text>

      <TextInput
        value={username}
        onChangeText={setUsername}
        style={styles.input}
        autoCapitalize="none"
        placeholder="Username"
        placeholderTextColor="#bbb"
      />
      
      <TextInput
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#bbb"
      />

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.loginButton, loading && styles.disabledButton]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.loginButtonText}>Login</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#000",  // Dark background
  },
  title: {
    fontSize: 36, // Increased font size for the title
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 40,
  },
  input: {
    width: "80%",
    height: 45,
    borderColor: "#fff",
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    color: "#fff",  // White text
    borderRadius: 8,  // Rounded corners for inputs
  },
  loginButton: {
    backgroundColor: "#ff4d4d",  // Red button
    paddingVertical: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#666",  // Darker color when disabled
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

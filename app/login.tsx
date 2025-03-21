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

      {/* Create User button */}
      <TouchableOpacity
        onPress={() => router.push("/createUser")} // Make sure you're using correct routing
        style={styles.createUserButton}
      >
        <Text style={styles.createUserButtonText}>Don't have an account? Create one</Text>
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
    backgroundColor: "#000",
  },
  title: {
    fontSize: 36,
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
    color: "#fff",
    borderRadius: 8,
  },
  loginButton: {
    backgroundColor: "#ff4d4d",
    paddingVertical: 12,
    borderRadius: 8,
    width: "80%",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#666",
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  createUserButton: {
    marginTop: 20,
  },
  createUserButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

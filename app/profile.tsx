import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Button,
  Alert,
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
import { getUserById, updateUser, deleteUser } from "./api";

interface Profile {
  id?: string | number;
  _id?: string;
  fullname?: string;
  firstName?: string;
  lastName?: string;
  username?: string;
  type_id?: number;
  exp?: number;
}

export default function ProfileScreen({ route }: any) {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  // Editable fields
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [typeId, setTypeId] = useState(""); // For type_id
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        let userId = route?.params?.id;
        console.log("Route params userId:", userId);
        if (!userId) {
          userId = await AsyncStorage.getItem("userId");
          console.log("UserId from AsyncStorage:", userId);
        }
        if (!userId) {
          Alert.alert("Error", "No user ID provided or stored.");
          setLoading(false);
          return;
        }
        const numericId = Number(userId);
        console.log("Using numeric userId:", numericId);

        const userData = await getUserById(numericId);
        console.log("User data:", userData);
        if (!userData) {
          Alert.alert("Error", "No user data returned.");
          setLoading(false);
          return;
        }
        setProfile(userData);

        // Set profile form fields based on user data
        if (userData.fullname) {
          setFullName(userData.fullname);
        } else if (userData.firstName || userData.lastName) {
          setFullName(`${userData.firstName || ""} ${userData.lastName || ""}`.trim());
        }
        setUsername(userData.username || "");
        setTypeId(userData.type_id?.toString() || "1");
      } catch (error) {
        Alert.alert("Error", "Failed to load user data.");
        console.log("fetchUserDetails error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [route?.params?.id]);

  const handleUpdateProfile = async () => {
    try {
      const userId = (profile?._id || profile?.id)?.toString();
      if (!userId) {
        Alert.alert("Error", "User ID not found in profile data.");
        return;
      }

      const payload: any = {
        fullname: fullName,
        username,
        type_id: Number(typeId),
      };
      if (password) payload.password = password;

      console.log("Sending update payload:", payload);
      const updatedData = await updateUser(userId, payload);
      console.log("Update response data:", updatedData);

      Alert.alert("Success", "Profile updated successfully");
      setProfile((prev) => ({
        ...prev,
        ...updatedData,
      }));
    } catch (error: any) {
      console.log("Update profile error:", error.response?.data || error.message);
      Alert.alert("Error", "Failed to update profile. Please try again.");
    }
  };

  const handleDeleteProfile = async () => {
    try {
      const numericUserId = Number(profile?._id || profile?.id);
      if (!numericUserId) {
        Alert.alert("Error", "User ID not found in profile data.");
        return;
      }
      console.log("Attempting to delete profile with userId:", numericUserId);
      await deleteUser(numericUserId);
      console.log("Profile deletion successful");
      
      Alert.alert("Profile deleted", "Your profile has been deleted", [
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("userId");
            router.replace("/login");
          },
        },
      ]);
    } catch (error: any) {
      console.log("Delete profile error:", error.response?.data || error.message);
      if (error.response?.data?.error === "Invalid token") {
        Alert.alert("Session expired", "Your session has expired. Please log in again.");
        await AsyncStorage.removeItem("token");
        router.replace("/login");
      } else {
        Alert.alert(
          "Error",
          `Failed to delete profile: ${error.response?.data?.message || error.message}`
        );
      }
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      "Confirm Delete",
      "Are you sure you want to delete your profile?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", style: "destructive", onPress: handleDeleteProfile },
      ]
    );
  };

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  if (loading) {
    return (
      <View style={styles.background}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <TouchableOpacity style={styles.backButton} onPress={() => router.push("/home")}>
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Edit Profile</Text>

          <TextInput
            style={styles.input}
            value={fullName}
            onChangeText={setFullName}
            placeholder="Full Name"
            placeholderTextColor="#fff"
          />

          <TextInput
            style={styles.input}
            value={username}
            onChangeText={setUsername}
            placeholder="Username"
            placeholderTextColor="#fff"
          />

          <TextInput
            style={styles.input}
            value={typeId}
            onChangeText={setTypeId}
            placeholder="Type ID"
            placeholderTextColor="#fff"
            keyboardType="numeric"
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={[styles.input, styles.passwordInput]}
              value={password}
              onChangeText={setPassword}
              placeholder="New Password"
              placeholderTextColor="#fff"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={toggleShowPassword} style={styles.iconContainer}>
              <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <View style={styles.buttonContainer}>
            <Button title="Update Profile" onPress={handleUpdateProfile} color="#E50914" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Delete Profile" onPress={confirmDelete} color="#E50914" />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000",
    justifyContent: "center",
  },
  backButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  backButtonText: {
    color: "#E50914",
    fontSize: 18,
    fontWeight: "bold",
  },
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  formContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 15,
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  text: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  input: {
    flex: 1,
    width: "100%",
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: "#fff",
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 10,
    position: "relative",
  },
  passwordInput: {
    paddingRight: 40,
  },
  iconContainer: {
    position: "absolute",
    right: 10,
    padding: 5,
  },
  buttonContainer: {
    width: "100%",
    marginVertical: 5,
  },
});

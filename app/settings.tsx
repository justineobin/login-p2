import React, { useState } from "react";
import { View, Text, Switch, Button, Alert, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SettingsScreen() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);
  const router = useRouter();

  const toggleNotifications = () => setNotificationsEnabled((previous) => !previous);
  const toggleDarkMode = () => setDarkModeEnabled((previous) => !previous);

  const handleLogout = () => {
    // Implement your logout logic here.
    Alert.alert("Logged Out", "You have been logged out.");
    router.push("/login");
  };

  return (
    <View style={styles.background}>
      <View style={styles.container}>
        <View style={styles.settingsContainer}>
          <Text style={styles.title}>Settings</Text>
          <View style={styles.settingItem}>
            <Text style={styles.label}>Enable Notifications</Text>
            <Switch value={notificationsEnabled} onValueChange={toggleNotifications} />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.label}>Dark Mode</Text>
            <Switch value={darkModeEnabled} onValueChange={toggleDarkMode} />
          </View>
          <Button title="Logout" color="#E50914" onPress={handleLogout} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "#000", // Set background to black
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  settingsContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.8)", // Semi-transparent black for settings container
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: "#fff", // White text for title
    textAlign: "center",
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: "#fff", // White text for labels
  },
});

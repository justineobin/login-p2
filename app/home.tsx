import React, { useLayoutEffect, useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";


// Manhwa images (your images...)
const manhwa1 = require("../app/img/1.jpg");
const manhwa2 = require("../app/img/2.jpg");
const manhwa3 = require("../app/img/3.png");
const manhwa4 = require("../app/img/4.jpeg");
const manhwa5 = require("../app/img/5.jpeg");
const manhwa6 = require("../app/img/6.jpg");
const manhwa7 = require("../app/img/7.jpeg");
const manhwa8 = require("../app/img/8.jpg");
const manhwa9 = require("../app/img/9.jpg");
const manhwa10 = require("../app/img/10.jpeg");
const manhwa11 = require("../app/img/11.jpg");
const manhwa12 = require("../app/img/12.jpg");
const manhwa13 = require("../app/img/13.jpeg");
const manhwa14 = require("../app/img/14.jpg");
const manhwa15 = require("../app/img/15.jpg");
const manhwa16 = require("../app/img/16.jpg");
const manhwa17 = require("../app/img/17.jpeg");
const manhwa18 = require("../app/img/18.jpeg");
const manhwa19 = require("../app/img/19.jpg");
const manhwa20 = require("../app/img/20.jpg");
const manhwa21 = require("../app/img/21.png");
const manhwa22 = require("../app/img/22.jpg");
const manhwa23 = require("../app/img/23.jpeg");
const manhwa24 = require("../app/img/24.jpeg");
const manhwa25 = require("../app/img/25.jpeg");
const manhwa26 = require("../app/img/26.jpg");
const manhwa27 = require("../app/img/27.jpg");
const manhwa28 = require("../app/img/28.jpg");
const manhwa29 = require("../app/img/29.jpg");
const manhwa30 = require("../app/img/30.jpg");

// Type for the manhwa
interface Manhwa {
  id: string;
  title: string;
  image: any;
}

const featuredManhwa: Manhwa[] = [
{ id: "1", title: "GREATEST STATE DEVELOPER", image: manhwa1 },
  { id: "2", title: "SOLO LEVELING", image: manhwa2 },
  { id: "3", title: "RETURN OF THE MOUNT HUA SECT", image: manhwa3 },
  { id: "4", title: "ELECEED", image: manhwa4 },
  { id: "5", title: "OMNICIENT READERS VIEWPOINT", image: manhwa5 },
  { id: "6", title: "TOWER OF GOD", image: manhwa6 },
  { id: "7", title: "THE BOXER", image: manhwa7 },
  { id: "8", title: "BASTARD", image: manhwa8 },
  { id: "9", title: "NOBLESSE", image: manhwa9 },
  { id: "10", title: "THE BEGINNING AFTER THE END", image: manhwa10 },
  { id: "11", title: "NANO MACHINE", image: manhwa11 },
  { id: "12", title: "LOOKISM", image: manhwa12 },
  { id: "13", title: "LEVIATHAN", image: manhwa13 },
  { id: "14", title: "SWEET HOME", image: manhwa14 },
  { id: "15", title: "THE GOD OF HIGHSCHOOL", image: manhwa15 },
  { id: "16", title: "LEGEND OF THE NORTHERN BLADE", image: manhwa16 },
  { id: "17", title: "WIND BREAKER", image: manhwa17 },
  { id: "18", title: "THE HORIZON", image: manhwa18 },
  { id: "19", title: "SEASONS OF BLOSSOM", image: manhwa19 },
  { id: "20", title: "SSS-CLASS REVIVAL HUNTER", image: manhwa20 },
  { id: "21", title: "THE S-CLASS THAT I RAISED", image: manhwa21 },
  { id: "22", title: "THE RETURNERS MAGIC SHOULD BE SPECIAL", image: manhwa22 },
  { id: "23", title: "THE WORLD AFTER THE END", image: manhwa23 },
  { id: "24", title: "THE MAX-LEVEL BEWBIE", image: manhwa24 },
  { id: "25", title: "LOVE STORY", image: manhwa25 },
  { id: "26", title: "HEART HEART HEART", image: manhwa26 },
  { id: "27", title: "PRINCESS", image: manhwa27 },
  { id: "28", title: "UNHOLY BLOOD", image: manhwa28 },
  { id: "29", title: "BUSINESS PROPOSAL", image: manhwa29 },
  { id: "30", title: "YOU AND I", image: manhwa30 }
];

const HomeScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [drawerVisible, setDrawerVisible] = useState(false); // State for drawer visibility
  const router = useRouter();

  const handleLogout = async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem("token");
      router.replace("/login");
    } catch (error) {
      console.error("Logout error", error);
      Alert.alert("Logout failed", "Something went wrong while logging out.");
    }
  };

  const filteredManhwa = featuredManhwa.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderManhwaItem = ({ item }: { item: Manhwa }) => (
    <View style={styles.manhwaItem}>
      <Image source={item.image} style={styles.manhwaImage} />
      <Text style={styles.manhwaTitle}>{item.title}</Text>
    </View>
  );

  const toggleDrawer = () => {
    setDrawerVisible(!drawerVisible);
  };

  // Function to handle navigation to the Profile screen
  const navigateToProfile = (userId: string) => {
    setDrawerVisible(false);
    router.push(`/profile?id=${userId}`);
  };

  // Function to handle navigation to the Settings screen
  const navigateToSettings = () => {
    setDrawerVisible(false);
    router.push("/settings");
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.appTitle}>READFLIX</Text>
        <TextInput
          style={styles.searchBar}
          placeholder="Search Manhwa"
          placeholderTextColor="#888"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={filteredManhwa}
        renderItem={renderManhwaItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.flatListContent}
      />

      {/* Drawer Menu Button */}
      <TouchableOpacity style={styles.drawerButton} onPress={toggleDrawer}>
        <Text style={styles.drawerButtonText}>☰</Text>
      </TouchableOpacity>

      {/* Drawer Menu */}
      {drawerVisible && (
        <View style={styles.drawerMenu}>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={() => {
              const userId = "1"; // Replace with the actual user ID from your app logic
              navigateToProfile(userId);
            }}
          >
            <Text style={styles.menuItemText}>Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={handleLogout}
          >
            <Text style={styles.menuItemText}>Logout</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menuItem}
            onPress={navigateToSettings}
          >
            <Text style={styles.menuItemText}>Settings</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#000",
  },
  navbar: {
    position: "absolute",
    top: 10,
    width: "100%",
    paddingHorizontal: 20,
    zIndex: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingBottom: 10,
    borderRadius: 8,
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 5,
  },
  searchBar: {
    backgroundColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#fff",
    fontSize: 16,
    width: "100%",
  },
  flatListContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: 120,
  },
  manhwaItem: {
    flex: 1,
    margin: 5,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#333",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
    elevation: 5,
  },
  manhwaImage: {
    width: 160,
    height: 220,
    borderRadius: 8,
    resizeMode: "cover",
    marginBottom: 5,
  },
  manhwaTitle: {
    marginTop: 5,
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
  drawerButton: {
    position: "absolute",
    top: 40,
    right: 20,
    padding: 10,
    zIndex: 10,
  },
  drawerButtonText: {
    color: "#fff",
    fontSize: 24,
  },
  drawerMenu: {
    position: "absolute",
    top: 70,
    right: 20,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    zIndex: 10,
  },
  menuItem: {
    color: "#fff",
    fontSize: 18,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  menuItemText: {
    fontSize: 18,
    color: "#fff",
  },
});

export default HomeScreen;

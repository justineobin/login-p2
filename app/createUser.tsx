import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import { createUser } from './api';  
import { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  AddUser: undefined;
};

type AddUserNavigationProp = StackNavigationProp<RootStackParamList, 'AddUser'>;

interface AddUserProps {
  navigation: AddUserNavigationProp;
}

const AddUser: React.FC<AddUserProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCreateUser = async () => {
    setLoading(true);
    try {

      console.log("Creating user with", username, password);


      await createUser(username, password);
      
      // Show success alert
      Alert.alert('Success', 'User Created Successfully');
      
    
      navigation.goBack();  
    } catch (error: any) {

      console.log("Error while creating user:", error.message);
      Alert.alert('Error', error.message || 'Failed to create user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add New User</Text>

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
        onPress={handleCreateUser}
        style={[styles.createUserButton, loading && styles.disabledButton]}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.createUserButtonText}>Create User</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
  },
  input: {
    width: '80%',
    height: 45,
    borderColor: '#fff',
    borderWidth: 1,
    marginBottom: 15,
    paddingLeft: 10,
    color: '#fff',
    borderRadius: 8,
  },
  createUserButton: {
    backgroundColor: '#ff4d4d',
    paddingVertical: 12,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#666',
  },
  createUserButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});


export default AddUser;

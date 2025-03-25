import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';
import { getUserById, updateUser } from './api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AxiosError } from 'axios';  


type RootStackParamList = {
  EditUser: { id: number };
};


type EditUserNavigationProp = StackNavigationProp<RootStackParamList, 'EditUser'>;
type EditUserRouteProp = RouteProp<RootStackParamList, 'EditUser'>;

interface Props {
  route: EditUserRouteProp;
  navigation: EditUserNavigationProp;
}

const EditUser: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;
  const [username, setUsername] = useState('');

  useEffect(() => {

    getUserById(id).then((user) => setUsername(user.username));
  }, [id]); 

  const handleUpdateUser = async () => {
    try {
  
      await updateUser(username);
      Alert.alert('Success', 'User updated');
      navigation.goBack();
    } catch (error) {
     
      if (error instanceof AxiosError) {
        const errorMessage = error.response?.data?.message || 'Failed to update user';
        Alert.alert('Error', errorMessage);
      } else {
        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View>
      <Text>Edit User</Text>
      <TextInput
        value={username}
        onChangeText={setUsername}
        placeholder="Username"
      />
      <Button title="Update User" onPress={handleUpdateUser} />
    </View>
  );
};

export default EditUser;

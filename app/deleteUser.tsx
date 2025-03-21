import React from 'react';
import { View, Text, Button, Alert } from 'react-native';
import { deleteUser } from './api';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { AxiosError } from 'axios'; 

type RootStackParamList = {
  DeleteUser: { id: number };
};

type DeleteUserNavigationProp = StackNavigationProp<RootStackParamList, 'DeleteUser'>;
type DeleteUserRouteProp = RouteProp<RootStackParamList, 'DeleteUser'>;

interface Props {
  route: DeleteUserRouteProp;
  navigation: DeleteUserNavigationProp;
}

const DeleteUser: React.FC<Props> = ({ route, navigation }) => {
  const { id } = route.params;

  const handleDeleteUser = async () => {
    try {
      await deleteUser(id);
      Alert.alert('Success', 'User deleted');
      navigation.goBack();
    } catch (error) {

      if (error instanceof AxiosError) {

        const errorMessage = error.response?.data?.message || 'Failed to delete user';
        Alert.alert('Error', errorMessage);
      } else {

        Alert.alert('Error', 'An unexpected error occurred');
      }
    }
  };

  return (
    <View>
      <Text>Are you sure you want to delete this user?</Text>
      <Button title="Delete" onPress={handleDeleteUser} />
    </View>
  );
};

export default DeleteUser;
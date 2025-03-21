import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { getUserById } from './api';
import { RouteProp } from '@react-navigation/native'; 


interface User {
  username: string;

}


type RootStackParamList = {
  UserDetail: { id: number };
};

type UserDetailRouteProp = RouteProp<RootStackParamList, 'UserDetail'>;

interface Props {
  route: UserDetailRouteProp;
}

const UserDetail: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [user, setUser] = useState<User | null>(null); 

  useEffect(() => {
    getUserById(id).then(setUser);
  }, [id]); 

  if (!user) return <Text>Loading...</Text>;

  return (
    <View>
      <Text>User Detail</Text>
      <Text>Username: {user.username}</Text>
    </View>
  );
};

export default UserDetail;

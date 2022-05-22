import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { listUsers } from '../src/graphql/queries';
import { API, graphqlOperation } from 'aws-amplify';

export default function MatchMakingScreen({ navigation }: RootTabScreenProps<'MatchMaking'>) {

  // List of all registered users
  const [userList, setUserList] = useState([]);

  useEffect( () => {
    const fetchUsers = async () => {
      try {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        setUserList(usersData.data.listUsers.items);
      } catch (e) {
        console.log(e);
      }
    }
    fetchUsers();
  }, []);

  const onPress = () => {
    // Choose random user to chat with
    const min = 0
    const max = userList.length - 1 
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    const user = userList[index]; 

    console.log(userList);
    setCurrId(user.id); 
    console.log(user.name);
    navigation.navigate('ChatRoom', { id: user.id, name: user.name})
  }

  const [currId, setCurrId] = React.useState();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{"id " + currId}</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <EditScreenInfo path="/screens/MatchMakingScreen.tsx" />
      <Pressable 
        onPress={onPress} 
        style={({ pressed }) => [{opacity: pressed ? 0.5 : 1,}, styles.button]}>
        <Text style={styles.buttonText}>Randomize</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  button: {
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: Colors.light.secTint,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: "bold",
    alignSelf: "center",
  },
});

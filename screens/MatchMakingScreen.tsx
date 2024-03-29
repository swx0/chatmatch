import { RootTabScreenProps } from '../types';
import React, { useEffect, useState,  } from 'react';
import { listUsers } from '../src/graphql/queries';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import MatchList from '../components/MatchList';
import { useIsFocused } from '@react-navigation/native';
import { ImageBackground, View, StyleSheet } from 'react-native';

export default function MatchMakingScreen({ navigation }: RootTabScreenProps<'MatchMaking'>) {

  const isFocused = useIsFocused();
  // List of all registered users
  const [userList, setUserList] = useState(null);

  const [myUser, setMyUser] = useState(null);


  useEffect( () => {
    if (isFocused) {
      setUserList(null);
      setMyUser(null);
      const fetchUsers = async () => {
        try {
          const usersData = await API.graphql(graphqlOperation(listUsers));
          const userID = await Auth.currentAuthenticatedUser();
          setUserList(usersData.data.listUsers.items);
          setMyUser(userID);
          
        } catch (e) {
          console.log(e);
        }
      };
      fetchUsers();
    } 
  }, [isFocused]);

  return (userList && myUser 
            ? <MatchList userList={userList} myUser={myUser} navigation={navigation}/>
            : <View style={styles.container}>
                <ImageBackground source={require('../assets/images/3dotsloading.gif')} style={styles.image}/>
              </View>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center', 
    alignItems:'center',
  },
  image: {
    width: 100, 
    height: 100,
  }
});

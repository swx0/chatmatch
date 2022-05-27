

import { Text } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import React, { useEffect, useState,  } from 'react';
import { listUsers } from '../src/graphql/queries';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import MatchList from '../components/MatchList';
export default function MatchMakingScreen({ navigation }: RootTabScreenProps<'MatchMaking'>) {

  // List of all registered users
  const [userList, setUserList] = useState(null);

  const [myUser, setMyUser] = useState(null);


  useEffect( () => {
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
  }, []);

  return (userList && myUser ? <MatchList userList={userList} myUser={myUser} navigation={navigation}/>: <Text>Loading</Text>)
};

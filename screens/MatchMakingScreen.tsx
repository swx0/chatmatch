import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import Colors from '../constants/Colors';
import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getUser, listUsers } from '../src/graphql/queries';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createChatRoom, createChatRoomUser } from '../src/graphql/mutations';
import { getOtherUsers } from './queries';

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

  const onPress = async () => {
    const myUser = await Auth.currentAuthenticatedUser();
    
    // Generate list of all other users, excluding logged in user
    const otherUserList = userList.filter(x => x.id !== myUser.attributes.sub);
    //console.log(otherUserList);
    
    // Choose random other user to chat with
    const min = 0
    const max = otherUserList.length - 1 
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    const otherUser = otherUserList[index]; 
    
    // Check if a ChatRoom with these 2 users already exists

    // List of [chatRoomID, otherUserID], where other user is already in a ChatRoom with logged in user
    const otherUsersCRData = await API.graphql(graphqlOperation(getOtherUsers, { id: myUser.attributes.sub }));
    const otherUsersCR = otherUsersCRData.data.getUser.chatRoomUserList.items;
    const otherUsersCRList = otherUsersCR.map(userPair => userPair.chatRoom.chatRoomUserList.items[0].user.id === myUser.attributes.sub 
                                                          ? [userPair.chatRoom.chatRoomUserList.items[1].user.id, userPair.chatRoom.chatRoomUserList.items[1].chatRoomID] 
                                                          : [userPair.chatRoom.chatRoomUserList.items[0].user.id, userPair.chatRoom.chatRoomUserList.items[0].chatRoomID]);
    console.log(otherUsersCRList);

    // List of ChatRoom associated with logged in user
    // const chatRoomListData = await API.graphql(graphqlOperation(getUser, { id: myUser.attributes.sub })); 
    
    // Directly enter existing ChatRoom (without creating new ChatRoom)
    for (var i = 0; i < otherUsersCRList.length; i++) {
      if (otherUsersCRList[i][0] === otherUser.id) {
        console.log("Chat Room already exists");
        setCurrId(otherUser.id); 
        console.log(otherUser.name);
        const oldChatRoomID = otherUsersCRList[i][1];
        navigation.navigate('ChatRoom', { id: oldChatRoomID, name: otherUser.name});
        return;
      }
    }

    // Create a new ChatRoom
    const newChatRoomOperation = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));
    if (newChatRoomOperation.data) {
      console.log("Chat Room created");
    } else {
      console.log("Chat Room not created");
    }
    const newChatRoomID = newChatRoomOperation.data.createChatRoom.id;

    // Add logged in user to ChatRoom
    const currUserAdded = await API.graphql(graphqlOperation(createChatRoomUser, { input: { userID: myUser.attributes.sub, chatRoomID: newChatRoomID } }));
    if (currUserAdded.data) {
      console.log("Logged in user added to Chat Room");
    } else {
      console.log("Logged in user not added to Chat Room");
    }

    // Add other user to ChatRoom
    const otherUserAdded = await API.graphql(graphqlOperation(createChatRoomUser, { input: { userID: otherUser.id, chatRoomID: newChatRoomID } }))
    if (otherUserAdded.data) {
      console.log("Other user added to Chat Room");
    } else {
      console.log("Other user not added to Chat Room");
    }

    setCurrId(otherUser.id); 
    console.log(otherUser.name);
    navigation.navigate('ChatRoom', { id: newChatRoomID, name: otherUser.name});
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

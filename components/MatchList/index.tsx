
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native';
import { matchByType, matchByMods, totalMatch } from '../../matchBy';
import { Card } from 'react-native-elements'
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import Colors from '../../constants/Colors';
import { getOtherUsers } from '../../screens/queries';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';


export default function MatchList ({ myUser, userList, navigation }) {
    
    const [myUserData, setMyUserData] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            const myData = await API.graphql(graphqlOperation(getUser, { id: myUser.attributes.sub }));
            setMyUserData(myData);
        };
        fetchUsers();
    }, []);

    if (!myUserData) {
        return null;
    }

    // Check whether user has input details
    if (myUserData.data.getUser.personalityType == null) {
        return navigation.navigate('InputInfo');
    }

    const myType = myUserData.data.getUser.personalityType;
    const myModsString = myUserData.data.getUser.modules;
    const myMods = myModsString.split(', ');

    // Generate list of all other users, excluding logged in user
    const otherUserList = userList.filter(x => x.id !== myUserData.data.getUser.id);

    const onPress = async (otherID, otherName) => {

    // Check if a ChatRoom with these 2 users already exists
    // List of [chatRoomID, otherUserID], where other user is already in a ChatRoom with logged in user
    const otherUsersCRData = await API.graphql(graphqlOperation(getOtherUsers, { id: myUser.attributes.sub }));
    const otherUsersCR = otherUsersCRData.data.getUser.chatRoomUserList.items;
    const otherUsersCRList = otherUsersCR.map(userPair => userPair.chatRoom.chatRoomUserList.items[0].user.id === myUser.attributes.sub 
                                                          ? [userPair.chatRoom.chatRoomUserList.items[1].user.id, userPair.chatRoom.chatRoomUserList.items[1].chatRoomID] 
                                                          : [userPair.chatRoom.chatRoomUserList.items[0].user.id, userPair.chatRoom.chatRoomUserList.items[0].chatRoomID]);
    
    // Directly enter existing ChatRoom (without creating new ChatRoom)
    for (var i = 0; i < otherUsersCRList.length; i++) {
        if (otherUsersCRList[i][0] === otherID) {
          console.log("Chat Room already exists");
          const oldChatRoomID = otherUsersCRList[i][1];
          navigation.navigate('ChatRoom', { id: oldChatRoomID, name: otherName});
          return;
        }
    }

    // Else, create a new ChatRoom
    const newChatRoomOperation = await API.graphql(graphqlOperation(createChatRoom, { input: {} }));
    if (newChatRoomOperation.data) {
        console.log("Chat Room created");
    }
    const newChatRoomID = newChatRoomOperation.data.createChatRoom.id;

    // Add logged in user to ChatRoom
    const currUserAdded = await API.graphql(graphqlOperation(createChatRoomUser, { input: { userID: myUser.attributes.sub, chatRoomID: newChatRoomID } }));
    if (currUserAdded.data) {
        console.log("Logged in user added to Chat Room");
    }

    // Add other user to ChatRoom
    const otherUserAdded = await API.graphql(graphqlOperation(createChatRoomUser, { input: { userID: otherID, chatRoomID: newChatRoomID } }))
    if (otherUserAdded.data) {
        console.log("Other user added to Chat Room");
    }
    navigation.navigate('ChatRoom', { id: newChatRoomID, name: otherName});
    
    };

    return (
		<ScrollView contentContainerStyle={styles.outer}>
			<View style={styles.container}>
                {
                    otherUserList.map((item) => {
                        const otherModsString = item.modules;
                        const otherMods = otherModsString.split(', ');
                        return (<TouchableOpacity style={styles.card} key={item.id} onPress={() => onPress(item.id, item.name)}>
                                    <View>
                                        <Card>
                                            <View style={{alignItems: 'flex-start'}}>
                                                <Text>{item.name}</Text>
                                                <Text>Type compatibility: {matchByType(myType, item.personalityType)}%</Text>
                                                <Text>No. of same mods taken: {matchByMods(myMods, otherMods)}</Text>
                                                <Text>Overall Match: {totalMatch(matchByType(myType, item.personalityType), matchByMods(myMods, otherMods), myMods.length, otherMods.length).toFixed(1)}%</Text>
                                            </View>
                                        </Card>
                                    </View>
                                </TouchableOpacity>)})
                }
			</View>
		</ScrollView>
    );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
	flexDirection: 'column',
	padding: 0,
    backgroundColor: "#0aa",
    alignItems: 'center',
    justifyContent: 'center'
  },

  card: {
	  flex: 1,
	  width: '100%',
	  padding: 0,
	  backgroundColor: Colors.light.tint,
	  alignItems: 'stretch',
  }
});


import React, { useEffect, useState, useCallback } from 'react'
import { RefreshControl, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from 'react-native';
import { matchByType, matchByMods, totalMatch, matchByHobbies } from '../../matchBy';
import { Card } from 'react-native-elements'
import { API, graphqlOperation } from 'aws-amplify';
import { getUser } from '../../src/graphql/queries';
import Colors from '../../constants/Colors';
import { getOtherUsers } from '../../screens/queries';
import { createChatRoom, createChatRoomUser } from '../../src/graphql/mutations';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import SwitchSelector from 'react-native-switch-selector';
import { showMessage, hideMessage } from "react-native-flash-message";
import { Dropdown } from 'react-native-element-dropdown'
import { MaterialIcons } from '@expo/vector-icons';

export default function MatchList ({ myUser, userList, navigation }) {
    
    const [myUserData, setMyUserData] = useState(null);
    const [config, setConfig] = useState("Default");
    const [refreshing, setRefreshing] = useState(false);
    const [sortState, setSortState] = useState("none");
    const sortMethods = {
        'none': { method: (a, b) => null},
        'name': { method: (a, b) => a.name < b.name ? -1 : 1}
    };
    const sort = [{ label: 'Default', value: 'none'}, { label: 'Name', value: 'name'}];

    const onRefresh = useCallback(async () => {
      setRefreshing(true);
      // insert retrieving of db here
      setTimeout(() => { setRefreshing(false) }, 2000);
    }, [refreshing]);


    const switchOptions = [
        { label: "", value: "Module-heavy", imageIcon: require('../../assets/images/module.png')},
        { label: "", value: "Default", imageIcon: require('../../assets/images/default2.png') },
        { label: "", value: "Personality-heavy", imageIcon: require('../../assets/images/personality.png') }
      ];

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


    const myType = myUserData.data.getUser.personalityType;
    const myModsString = myUserData.data.getUser.modules;
    const myMods = myModsString.split(', ');
    const myHobbiesString = myUserData.data.getUser.hobbies;
    const myHobbies = myHobbiesString.split(', ');

    // Generate list of all other users, excluding logged in user
    const otherUserList = userList.filter(x => x.id !== myUserData.data.getUser.id);
    const onPress = async (otherID, otherName) => {

    // Check if a ChatRoom with these 2 users already exists
    // List of [chatRoomID, otherUserID], where other user is already in a ChatRoom with logged in user
    const otherUsersCRData = await API.graphql(graphqlOperation(getOtherUsers, { id: myUser.attributes.sub }));
    const otherUsersCR = otherUsersCRData.data.getUser.chatRoomUserList.items;
    console.log(otherUsersCR)
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
    <SafeAreaView>
        <ScrollView 
        contentContainerStyle={styles.outer}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
        >
			<View style={styles.container}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <SwitchSelector
                    hasPadding
                    fontSize={13}
                    borderRadius={5}
                    buttonColor='#821752'
                    options={switchOptions}
                    initial={1}
                    onPress={value => {
                        setConfig(value);
                        showMessage({
                            message: "Selected " + value + " configuration",
                            type: "success",
                        });
                    }}
                    style={{ marginTop: 12, width: 200, paddingLeft: 15,}}
                    />
                    <Dropdown
                        style={{width: 99, paddingTop: 13, marginRight: 5,}}
                        selectedTextStyle={{color: 'white', fontSize: 15}}
                        placeholder={sortState}
                        data={sort}
                        value={sortState}
                        labelField='label'
                        valueField='value'
                        onChange={item => setSortState(item.value)}
                        renderRightIcon={() => null}
                        renderLeftIcon={() => (<MaterialIcons name="sort" size={24} color="white" />)}
                    />
                </View>
                {
                    otherUserList.sort(sortMethods[sortState].method).map((item) => {
                        const otherModsString = item.modules;
                        const otherMods = otherModsString.split(', ');
                        const otherHobbiesString = item.hobbies;
                        const otherHobbies = otherHobbiesString.split(', ');
                        const typeMatch = matchByType(myType, item.personalityType);
                        const modMatch = matchByMods(myMods, otherMods);
                        const hobbiesMatch = matchByHobbies(myHobbies, otherHobbies);
                        const total = totalMatch(typeMatch, modMatch, myMods.length, otherMods.length, hobbiesMatch, config);
                        return (<TouchableOpacity style={styles.card} key={item.id} onPress={() => onPress(item.id, item.name)}>
                                    <View>
                                        <Card containerStyle={{borderRadius:10}}>
                                            <View style={{alignItems: 'stretch'}}>
                                                <Text style={{textTransform: 'capitalize', fontWeight: "bold"}}>{item.name}</Text>     
                                                <Text style={{color: 'lightslategrey'}}>Modules matched: {modMatch}</Text>
                                                <View style={{flexDirection: 'row', justifyContent:'space-around', }}>
                                                    <View>
                                                        <AnimatedCircularProgress
                                                            size={100}
                                                            style={{marginTop:-25, marginLeft: 10}}
                                                            width={15}
                                                            arcSweepAngle={135}
                                                            fill={typeMatch}
                                                            tintColor='#821752'
                                                            backgroundColor="#3d5875">
                                                            {
                                                                (fill) => (
                                                                    <Text>{typeMatch}%</Text>
                                                                )
                                                            }
                                                        </AnimatedCircularProgress>
                                                        <Text style={{color: 'darkslategrey', }}>Type Compatibility</Text>
                                                    </View>

                                                    <View>
                                                        <AnimatedCircularProgress
                                                            size={100}
                                                            style={{marginTop:-25}}
                                                            width={20}
                                                            arcSweepAngle={135}
                                                            fill={Math.round(total)}
                                                            tintColor='#821752'
                                                            backgroundColor="#3d5875">
                                                            {
                                                                (fill) => (
                                                                    <Text style={{color: 'darkslategrey'}}>{total.toFixed(1)}%</Text>
                                                                )
                                                            }
                                                        </AnimatedCircularProgress>
                                                        <Text style={{color: 'darkslategrey', fontWeight: "bold", paddingLeft: 3}}>Overall Match</Text>
                                                    </View>
                                                </View>
                                            </View>
                                        </Card>
                                    </View>
                                </TouchableOpacity>)})
                }
			</View>
		</ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
	flexDirection: 'column',
	padding: 0,
    backgroundColor: Colors.light.tint,
    //alignItems: 'center',
    justifyContent: 'center'
  },
  outer: {
    
  },
  card: {
	  flex: 1,
	  width: '100%',
	  paddingBottom: 12,
	  backgroundColor: Colors.light.tint,
	  alignItems: 'stretch',
  }
});

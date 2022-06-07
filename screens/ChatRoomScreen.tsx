// @ts-nocheck
import { Text, View } from '../components/Themed';

import { useRoute } from '@react-navigation/native';
import { FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import ChatMessage from '../components/ChatMessage';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useEffect, useState, useRef } from 'react';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { createMessage } from '../src/graphql/mutations';
import { getMessagesByChatRoom } from './queries';
import { useIsFocused } from '@react-navigation/native';
import { onCreateMessage, onCreateMessageByChatRoomID } from '../src/graphql/subscriptions';

const ChatRoomScreen = () => {
  const flatListRef = useRef();
  const isFocused = useIsFocused();
  const route = useRoute();

  //console.log(route.params);

  const [noSelect, setNoSelect] = useState(false);
  const [text, setText] = useState('');
  const [myUser, setMyUser] = useState(null);
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {

    // User has not selected person to chat with
    if (route.params === undefined) {
      setNoSelect(true)
      return () => {};
    } else {
      setNoSelect(false);
    }
    
    if (isFocused) {
      const getMyUser = async () => {
        const myUserData = await Auth.currentAuthenticatedUser();
        setMyUser(myUserData.attributes.sub);
      };
      getMyUser();

      // Load messages for this ChatRoom
      const getAllMessagesData = async () => {
        // Customized query
        const allMessagesData = await API.graphql(graphqlOperation(getMessagesByChatRoom, { chatRoomID: route.params.id }));
        //console.log(allMessagesData.data.messagesByChatRoomByCreatedAt.items); 
        setMessages(allMessagesData.data.messagesByChatRoomByCreatedAt.items);
      };
      getAllMessagesData();

      // Subscribe to new messages for this ChatRoom
      const subscribeMessage = API.graphql(graphqlOperation(onCreateMessageByChatRoomID, { chatRoomID: route.params.id }))
                                    .subscribe({
                                      next: (data) => {
                                        //console.log(data);
                                        const newMessage = data.value.data.onCreateMessageByChatRoomID;

                                        // Add new message to existing messages
                                        setMessages(messages => [...messages, newMessage]);
                                      }});
      
      return () => subscribeMessage.unsubscribe();

    }
  }, [isFocused]); 

  // User has not selected person to chat with
  if (noSelect) {
    return <Text>Choose user to chat with first!</Text>;
  }
  

  // Send myUser's message
  const onPress = async () => {
    console.log("sending message:" + text);

    await API.graphql(graphqlOperation(createMessage, { input: { userID: myUser, body: text, chatRoomID: route.params.id, } }))
    setText(''); // Reset field
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={messages}
        ref={flatListRef}
        renderItem={({ item }) => <ChatMessage message={item} myUser={myUser}/>}
        onContentSizeChange={() => flatListRef.current.scrollToEnd()}
        onLayout={() => flatListRef.current.scrollToEnd()}
      />
      <View style={styles.inputContainer}>
        <TextInput 
          multiline 
          placeholder= {'Type your message'} 
          defaultValue={text} 
          onChangeText={newText => setText(newText)}
          style={styles.inputText}/>
        <Pressable
              onPress={onPress}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}>
        <MaterialCommunityIcons name="send" size={24} color="black"/>
        </Pressable>
      </View>
    </View>
    
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#d0f5f3',
    padding: 15,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 30,
  
  },
  inputText: {
    flex: 1,
    marginHorizontal: 5,
  },

});

export default ChatRoomScreen;
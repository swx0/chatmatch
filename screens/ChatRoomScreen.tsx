// @ts-nocheck
import { Text, View } from '../components/Themed';

import { useRoute } from '@react-navigation/native';
import { FlatList, StyleSheet, TextInput, Pressable } from 'react-native';
import SampleChat from '../data/SampleChat';
import ChatMessage from '../components/ChatMessage';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import { useState } from 'react';

const ChatRoomScreen = () => {

  const route = useRoute();

  //console.log(route.params)

  const [text, setText] = useState('');

  const onPress = () => {
    console.log("sending message:" + text);

    // Reset field
    setText('');
  };

  return (
    <View style={styles.container}>
      <FlatList 
        data={SampleChat.messages}
        renderItem={({ item }) => <ChatMessage message={item} />}
        inverted
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
    backgroundColor: '#e2d4f8',
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
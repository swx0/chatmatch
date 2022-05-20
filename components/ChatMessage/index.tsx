import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Message } from "../../types";
import { format } from 'date-fns';

export type ChatMessageProps = {
    message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
    const message = props.message;
    var dateTime = message.createdAt.valueOf();
    var time = dateTime.split(/T|Z/)[1].slice(0,5);
    var chatbox;

    // Check whether is my message 
    const checkMyMessage = (message: Message) => message.user.id === 'u1';

    return (
        <View>
            <View style={checkMyMessage(message) ? styles.myItem : styles.otherItem}>
                <Text>{message.content}</Text>
                <Text style={{textAlign:"right", color: "#868686"}}>{time}</Text>
            </View>
        </View>

    );
}

const styles = StyleSheet.create({
    otherItem: {
      backgroundColor: '#e0e0e0',
      padding: 15,
      marginVertical: 10,
      marginHorizontal: 16,
      marginRight: 60,
      borderRadius: 10,
    },
    myItem: {
        backgroundColor: '#f4f4f4',
        padding: 15,
        marginVertical: 10,
        marginHorizontal: 16,
        marginLeft: 60,
        borderRadius: 10,
      },
  });

export default ChatMessage;
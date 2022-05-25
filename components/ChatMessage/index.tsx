import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Message } from "../../types";

export type ChatMessageProps = {
    message: Message;
}

const ChatMessage = (props: ChatMessageProps) => {
    const message = props.message;
    const myUser = props.myUser;
    var dateTime = message.createdAt.valueOf();
    var time = dateTime.split(/T|Z/)[1].slice(0,5);

    // Check whether is my message 
    const checkMyMessage = (message: Message) => message.user.id === myUser;

    return (
        <View>
            <View style={checkMyMessage(message) ? styles.myItem : styles.otherItem}>
                <Text>{message.body}</Text>
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
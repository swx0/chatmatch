import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import Colors from '../../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { RootTabScreenProps } from '../../types';
import { Text } from "react-native";
import { MaterialIcons } from '@expo/vector-icons'; 
import React from 'react';

const ChatPopout = ({navigation, reportUserName, reportUserID}) => {
    const onSelect = (value: string) => {
        if (value == 'Report User') {
            return navigation.navigate('Report', {reportUserName: reportUserName, reportUserID: reportUserID});
        } 
    }

    return (
        <Menu onSelect={onSelect}>
            <MenuTrigger>
                <Entypo name="dots-three-horizontal" size={24} color={Colors.light.background} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                <MenuOption value={'Report User'} style={{flexDirection:'row'}}>
                    <MaterialIcons name="report" size={24} color="black" />
                    <Text style={{marginLeft:10, marginTop:2}}>Report User</Text>
                </MenuOption>
            </MenuOptions>
        </Menu>

    )
}

const optionsStyles = {
    optionWrapper: {
        padding: 10,
    }
} 

export default ChatPopout


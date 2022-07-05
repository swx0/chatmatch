import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
  } from 'react-native-popup-menu';
import Colors from '../../constants/Colors';
import { Entypo } from '@expo/vector-icons';
import { Auth } from 'aws-amplify';
import { RootTabScreenProps } from '../../types';
import { Text } from "react-native";
import { Feather } from '@expo/vector-icons'; 
import { Octicons } from '@expo/vector-icons'; 

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

const MatchMakingPopout = ({ navigation }: RootTabScreenProps<'MatchMaking'>) => {

    const onSelect = (value: string) => {
        if (value === 'Settings') {
            return navigation.navigate('Modal');
        } else if (value === 'Sign out') {
            signOut();
        } else {

        }
    }

    return (
        <Menu onSelect={onSelect}>
            <MenuTrigger>
                <Entypo name="dots-three-horizontal" size={24} color={Colors.light.background} />
            </MenuTrigger>
            <MenuOptions customStyles={optionsStyles}>
                <MenuOption value={'Settings'} style={{flexDirection:'row'}}>
                    <Feather name="settings" size={24} color="black" />
                    <Text style={{marginLeft: 10, marginTop: 2}}>Settings</Text>
                </MenuOption>
                <MenuOption value={'Sign out'} style={{flexDirection:'row'}}>
                    <Octicons name="sign-out" size={24} color="black" style={{marginLeft:3.5}}/>
                    <Text style={{marginLeft: 10, marginTop: 2}}>Sign out</Text>
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

export default MatchMakingPopout


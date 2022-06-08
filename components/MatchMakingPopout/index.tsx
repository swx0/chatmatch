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
            alert(`Settings`)
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
                <MenuOption value={'Settings'} text='Settings' />
                <MenuOption value={'Sign out'} text='Sign out'/>
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


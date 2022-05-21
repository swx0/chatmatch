import { Pressable, StyleSheet } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import generated from '../data/generated'
import Colors from '../constants/Colors';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function MatchMakingScreen({ navigation }: RootTabScreenProps<'MatchMaking'>) {

  const onPress = () => {
    const min = 0
    const max = generated.length - 1 
    const index = Math.floor(Math.random() * (max - min + 1)) + min;
    const userData = generated[index]; 
    setCurrId(userData._id);
    console.log(userData.name);
    navigation.navigate('ChatRoom', { id: userData._id, name: userData.name})
  }

  const [currId, setCurrId] = React.useState(generated[0]._id);

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

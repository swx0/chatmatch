import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';

export default function InputInfoScreen({ navigation }) {
  const [userName, setuserName] = useState('');
  const [userYear, setuserYear] = useState('');
  const [userType, setType] = useState('');
  const [userMods, setuserMods] = useState('');
  
  return (
    <SafeAreaView style={{ flex: 1}}>
      <View style={styles.container}>
        <Text style={{marginBottom: 20, color: '#eee'}}>Hi, please input your info below!</Text>
	<TextInput
		value={userName}
		onChangeText={(userName) => setuserName(userName)}
		placeholder={'Name'}
		style={styles.input}
	/>
	<View style={{flexDirection: 'column', marginBottom: 20}}>
		<Text style={{color: '#eee'}}>which year are you currently in?    </Text>
		<Picker
			style={{color: '#eee'}}
			selectedValue={userYear}
			onValueChange={(itemValue, itemIndex) => setuserYear(itemValue)}>
			<Picker.Item label='Y1' value='1' />
			<Picker.Item label='Y2' value='2' />
			<Picker.Item label='Y3' value='3' />
			<Picker.Item label='Y4' value='4' />
		</Picker>
	</View>
	<View style={{flexDirection: 'column'}}>
		<Text style={{color: '#eee'}}>myers-briggs personality type?    </Text>
		<Picker
			style={{color: '#eee'}}
		    selectedValue={userType}
		    onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
		    <Picker.Item label='INTP' value='INTP' />
		    <Picker.Item label='INTJ' value='INTJ' />
		    <Picker.Item label='INFP' value='INFP' />
		    <Picker.Item label='INFJ' value='INFJ' />
		    <Picker.Item label='ISTP' value='ISTP' />
		    <Picker.Item label='ISTJ' value='ISTJ' />
		    <Picker.Item label='ISFP' value='ISFP' />
		    <Picker.Item label='ISFJ' value='ISFJ' />
		    <Picker.Item label='ESTJ' value='ESTJ' />
		    <Picker.Item label='ESTP' value='ESTP' />
		    <Picker.Item label='ESFP' value='ESFP' />
		    <Picker.Item label='ESFJ' value='ESFJ' />
		    <Picker.Item label='ENFP' value='ENFP' />
		    <Picker.Item label='ENFJ' value='ENFJ' />
		    <Picker.Item label='ENTP' value='ENTP' />
		    <Picker.Item label='ENTJ' value='ENTJ' />
          	</Picker>
	</View>

        <TextInput
              value={userMods}
              onChangeText={(userMods) => setuserMods(userMods)}
              placeholder={'mods taking e.g. cs1101s'}
              style={styles.input}
            />
            <Button
              title="save"
              onPress={() => userMods=='' ? alert('pls enter a subject') : navigation.navigate('List', {type: userType, mods: userMods.split(', ')})}
		//to be added to database: userName, userYear, userType, userMods.split(', ')
            />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#000",
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
		margin: 20,
        backgroundColor: '#e8e8e8'
      },
});

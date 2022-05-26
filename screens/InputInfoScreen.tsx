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
        <Text style={{marginBottom: '20'}}>Hi, please input your info below!</Text>
	<TextInput
		value={userName}
		onChangeText={(userName) => setuserName(userName)}
		placeholder={'Name'}
		style={styles.input}
	/>
	<View style={{flexDirection: 'row'}}>
		<Text>which year are you in currently?    </Text>
		<Picker
			selectedValue={userYear}
			onValueChange={(itemValue, itemIndex) => setuserYear(itemValue)}>
			<Picker.Item label='Y1' value='1' />
			<Picker.Item label='Y2' value='2' />
			<Picker.Item label='Y3' value='3' />
			<Picker.Item label='Y4' value='4' />
		</Picker>
	</View>
	<View style={{flexDirection: 'row'}}>
		<Text>myers-briggs personality type:    </Text>
		<Picker
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
              placeholder={'subjects e.g. math, science, english'}
              style={styles.input}
            />
            <Button
              title="enter"
              onPress={() => userMods=='' ? {} : navigation.navigate('List', {type: userType, mods: userMods.split(', ')})}
            />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      padding: '50',
      backgroundColor: "#0aa",
      alignItems: 'center',
      justifyContent: 'center'
    },
    input: {
        width: 250,
        height: 44,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,
        backgroundColor: '#e8e8e8'
      },
});

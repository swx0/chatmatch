import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import Toast from 'react-native-root-toast';
export default function InputInfoScreen({ navigation }) {
  const [userYear, setuserYear] = useState(''); //need to set useState to whatever the current info is
  const [userType, setType] = useState('');
  const [userMods, setuserMods] = useState('');
  
  return (
    <SafeAreaView style={{ flex: 1, alignItems: 'center'}}>
      <View style={styles.container}>
        <Text style={{marginBottom: 20, color: '#000'}}>Hi, please input your info below!</Text>
				<View style={styles.fields}>
					<Text style={{color: '#000', textAlign: 'center'}}>Which year are you currently in?</Text>
					<Picker
						style={{ backgroundColor: '#e8e8e8' }}
						selectedValue={userYear}
						onValueChange={(itemValue, itemIndex) => setuserYear(itemValue)}>
						<Picker.Item label='Y1' value='1' />
						<Picker.Item label='Y2' value='2' />
						<Picker.Item label='Y3' value='3' />
						<Picker.Item label='Y4' value='4' />
					</Picker>
				</View>
				<View style={styles.fields}>
					<Text style={{color: '#000', textAlign: 'center'}}>Myers-Briggs Personality type?</Text>
					<Picker
						style={{ backgroundColor: '#e8e8e8' }}
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
				<View style={styles.fields}>
					<Text style={{textAlign: 'center'}}>What mods are you taking?</Text>
					<TextInput
						value={userMods}
						onChangeText={(userMods) => setuserMods(userMods)}
						placeholder={'e.g. cs1101s, ma2001'}
						style={styles.input}
					/>
				</View>
					<Button
						title="save"
						onPress={() => {
							if (userMods=='') {
								alert('Pls have at least 1 mod!');
							} else {
								//include updating of database here. userYear, userType, userMods.split(', ')
								let toast = Toast.show('Profile saved!', {
									backgroundColor: '#555',
									shadow: true
								});
							}}
						}
					/>	
  		</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#efefefef",
      alignItems: 'center',
      justifyContent: 'center',
			width: '100%'
    },
    input: {
			width: '100%',
			height: 50,
			padding: 10,
      backgroundColor: '#e8e8e8'
    },
		fields: {
			flexDirection: 'column',
			marginBottom: 20,
			width: '80%',
		}
});

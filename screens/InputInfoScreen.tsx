import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../src/graphql/mutations';

export default function InputInfoScreen({ navigation }) {
  const [userYear, setuserYear] = useState('Y1');
  const [userType, setType] = useState('INTP');
  const [userMods, setuserMods] = useState('');
  
  const typeList = ['INTP','INTJ','INFP','INFJ','ISTP','ISTJ','ISFP','ISFJ','ESTJ',
  					'ESTP','ESFP','ESFJ','ENFP','ENFJ','ENTP','ENTJ'];

  const onPress = async () => {
	  if (userMods == '') {
		alert('Indicate at least 1 module');
	  } else {
		const myUser = await Auth.currentAuthenticatedUser();
		await API.graphql(graphqlOperation(updateUser, { input: { id: myUser.attributes.sub, modules: userMods, personalityType: userType, year: userYear } }));
		return navigation.navigate('MatchMaking', {type: userType, mods: userMods.split(', ')});
	  }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={{marginBottom: 20, color: '#000'}}>Hi, please input your info below!</Text>
	<View style={{flexDirection: 'column', marginBottom: 20}}>
		<Text style={{color: '#000'}}>which year are you currently in?    </Text>
		<Picker
			selectedValue={userYear}
			onValueChange={(itemValue, itemIndex) => setuserYear(itemValue)}>
			<Picker.Item label='Y1' value='1' />
			<Picker.Item label='Y2' value='2' />
			<Picker.Item label='Y3' value='3' />
			<Picker.Item label='Y4' value='4' />
		</Picker>
	</View>
	<View style={{flexDirection: 'column'}}>
		<Text style={{color: '#000'}}>myers-briggs personality type?    </Text>
		<Picker
		    selectedValue={userType}
		    onValueChange={(itemValue, itemIndex) => setType(itemValue)}>
			{typeList.map(type => <Picker.Item key="{type}" label={type} value={type}/>)}
        </Picker>
	</View>

        <TextInput
              value={userMods}
              onChangeText={(userMods) => setuserMods(userMods)}
              placeholder={'mods taking e.g. cs1101s'}
              style={styles.input} />
        
        <Button title="save" onPress={onPress} />
		
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#eee",
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

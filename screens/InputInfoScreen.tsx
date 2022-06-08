import React, {useState} from 'react'
import { StyleSheet, Text, View, SafeAreaView, TextInput, Button, Pressable, ScrollView, LogBox } from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import { updateUser } from '../src/graphql/mutations';
import SelectBox from 'react-native-multi-selectbox';
import { xorBy } from 'lodash';
import moduleList from '../data/moduleList';
import typeList from '../data/typeList';

LogBox.ignoreAllLogs();

export default function InputInfoScreen({ navigation }) {
  const [userYear, setuserYear] = useState({});
  const [userType, setType] = useState({});
  const [selectedModules, setSelectedModules] = useState([])

  const yearList = [{item: 'Y1', id: 'Y1'}, {item: 'Y2', id: 'Y2'}, {item: 'Y3', id: 'Y3'}, {item: 'Y4', id: 'Y4'},];

  const onPress = async () => {
	  if (selectedModules.length == 0) {
		  alert('Indicate at least 1 module');
    } else if (userYear.id === undefined) {
      alert('Indicate Year of Study')
    } else if (userType.id === undefined) {
      alert('Indicate MBTI')
    } else {
      const selectedModulesString = selectedModules.map(mod => mod.id).join(', ');
      const myUser = await Auth.currentAuthenticatedUser();
      await API.graphql(graphqlOperation(updateUser, { input: { id: myUser.attributes.sub, modules: selectedModulesString, personalityType: userType.id, year: userYear.id } }));
      return navigation.navigate('MatchMaking', {type: userType, mods: selectedModules});
	  }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>  
    <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled = {true} >
      <View style={styles.container}>
        

        <View style={{height:40}}/>
          <Text style={{ fontSize: 20, paddingBottom: 10 }}>Year of Study</Text>
          <SelectBox
            label="Select single"
            options={yearList}
            value={userYear}
            onChange={(val) => setuserYear(val)}
            hideInputFilter={false}
            width="90%"
            listOptionProps={{ nestedScrollEnabled: true }}
          />
        <View style={{height:40}}/>

        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Myers-Briggs Type Indicator</Text>
        <SelectBox
          label="Select single"
          options={typeList}
          value={userType}
          onChange={(val) => {
            setType(val);
          }}
          hideInputFilter={false}
          width="90%"
          listOptionProps={{ nestedScrollEnabled: true }}
        />
        <View style={{height:40}}/>
        
        <Text style={{ fontSize: 20, paddingBottom: 10 }}>Current Modules</Text>
        <SelectBox
          label="Select multiple"
          options={moduleList}
          selectedValues={selectedModules}
          onMultiSelect={(item) => {
            setSelectedModules(xorBy(selectedModules, [item], 'id'));
          }}
          onTapClose={(item) => {
            setSelectedModules(xorBy(selectedModules, [item], 'id'));
          }}
          width="90%"
          isMulti
          listOptionProps={{ nestedScrollEnabled: true }}
        />
        <View style={{height:40}}/>

        
        <Pressable 
          onPress={onPress}
          style={({pressed}) => [
            {
              opacity: pressed
                ? 0.5
                : 1
            },
            styles.button
          ]}>
          <Text style={styles.buttonText}>SAVE</Text>
        </Pressable>

        </View>
        </ScrollView>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#eee",
      alignItems: 'flex-start',
      marginLeft: 20,
    },
    scrollContainer: {
      backgroundColor: "#eee",
    },
    input: {
        width: 270,
        height: 44,
        padding: 10,
		    margin: 20,
        backgroundColor: '#e8e8e8'
      },
    button: {
      margin: 20,
      marginLeft: 0,
      width: '80%',
      height: 44,
      alignSelf: 'center',
      backgroundColor: '#821752'
    },
    buttonText: {
      textAlign: 'center',
      marginTop: 11,
      color: 'white'
    }
});

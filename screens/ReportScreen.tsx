import { StyleSheet, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { View, Text } from '../components/Themed';
import React, { useState } from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import { Icon } from 'react-native-elements';
import { RootTabScreenProps } from '../types';

export default function ReportScreen({ navigation, route }) {

  const [reason, setReason] = useState("");

  const onPress = () => {
    if (reason == "") {
      alert("Select a reason");
    } else {
      return navigation.goBack();
    }
  }

  const data = [
    {
      label: 'Spam'
     },
     {
      label: 'Violence'
     },
     {
      label: 'Pornography'
     },
     {
      label: 'Harsassment / Bullying'
     }
    ];
    
  return (
    <SafeAreaView style={{ flex: 1 }}>  
      <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled = {true} >
        <View style={styles.container}>
          <Text>
            <Text>Reason to report </Text>
            <Text style={{textTransform: 'capitalize'}}>{route.params.reportUserName} </Text>
            <Text>:</Text>
          </Text>

        <RadioButtonRN
          data={data}
          textStyle={{fontWeight: 'bold'}}
          selectedBtn={(e) => {
            setReason(e.label);
          }}
          activeColor="#821752"
          icon={
            <Icon
              name="check-circle"
              size={25}
              color="#821752"
            />
          }
        />
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
            <Text style={styles.buttonText}>SEND</Text>
          </Pressable>
        </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#eee",
    flex: 1,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#eee",
    margin: 30,
  },
  button: {
    marginTop: 30,
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

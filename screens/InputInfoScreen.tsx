import React, {useEffect, useState} from 'react'
import { StyleSheet, View, LogBox, ImageBackground } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import EditProfile from '../components/EditProfile';
import { getUser } from '../src/graphql/queries';


LogBox.ignoreAllLogs();

export default function InputInfoScreen({ navigation }) {
  
  const isFocused = useIsFocused();
  const [myUserData, setMyUserData] = useState(null);

  useEffect( () => {
    if (isFocused) {
      setMyUserData(null);
      const fetchUsers = async () => {
        try {
          const userID = await Auth.currentAuthenticatedUser();
          const myData = await API.graphql(graphqlOperation(getUser, { id: userID.attributes.sub }));
          setMyUserData(myData.data.getUser);
          
        } catch (e) {
          console.log(e);
        }
      };
      fetchUsers();
    } 
  }, [isFocused]);

  return (myUserData 
    ? <EditProfile myUserYear={myUserData.year} myUserType = {myUserData.personalityType} myUserMods={myUserData.modules.split(', ')} navigation={navigation}/>
    : <View style={styles.container}>
        <ImageBackground source={require('../assets/images/3dotsloading.gif')} style={styles.image}/>
      </View>)
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent:'center', 
    alignItems:'center',
  },
  image: {
    width: 100, 
    height: 100,
  }
});

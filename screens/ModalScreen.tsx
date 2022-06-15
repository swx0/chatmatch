import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, SafeAreaView, ScrollView } from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import { Text, View } from '../components/Themed';
import SelectBox from 'react-native-multi-selectbox';
import React, { useState } from 'react';

export default function ModalScreen() {
  const [userYear, setuserYear] = useState({});
  const yearList = [{item: 'Y1', id: 'Y1'}, {item: 'Y2', id: 'Y2'}, {item: 'Y3', id: 'Y3'}, {item: 'Y4', id: 'Y4'},];
  return (
    <SafeAreaView style={{ flex: 1 }}>  
      <ScrollView contentContainerStyle={styles.scrollContainer} nestedScrollEnabled = {true} >
        <View style={styles.container}>

          </View>
        </ScrollView>
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: "#eee",
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: "#eee",
    alignItems: 'flex-start',
    marginLeft: 20,
  },
});

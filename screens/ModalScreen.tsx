
import { StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { View } from '../components/Themed';
import React from 'react';

export default function ModalScreen() {

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

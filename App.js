import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import Stopwatch from './src/stopwatch';





function App() {


  return (
    <SafeAreaView style={{flex:1 ,backgroundColor:'#1c1c1c'}}>
      <Stopwatch/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

});

export default App;

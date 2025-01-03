// CustomTimerDisplay.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomTimerDisplay = ({time, title}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.timer}>{time}</Text>
    </View>
  );
};

export default CustomTimerDisplay;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  timer: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#fff',
  },
});

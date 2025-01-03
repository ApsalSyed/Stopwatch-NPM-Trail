// CustomLapItem.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const CustomLapItem = ({index, time, totalLaps}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Lap {totalLaps - index}</Text>
      <Text style={styles.time}>{time}</Text>
    </View>
  );
};

export default CustomLapItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  time: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.7,
  },
});

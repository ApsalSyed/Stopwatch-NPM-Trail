import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';

const Stopwatch = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [inputTime, setInputTime] = useState('');
  const [isTimeSet, setIsTimeSet] = useState(false);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(intervalId);
    } else {
      const id = setInterval(() => {
        setSecondsRemaining(prevSeconds => {
          if (prevSeconds <= 0) {
            clearInterval(id);
            return 0;
          }
          return prevSeconds - 1;
        });
      }, 1000);
      setIntervalId(id);
    }
    setIsRunning(!isRunning);
  };

  const timerReset = () => {
    clearInterval(intervalId);
    setSecondsRemaining(0);
    setIsRunning(false);
    setIsTimeSet(false);
    setInputTime('');
  };

  const setEndTime = () => {
    const minutes = parseInt(inputTime, 10);
    if (isNaN(minutes) || minutes <= 0) {
      alert('Please enter a valid time in minutes.');
      return;
    }
    setSecondsRemaining(minutes * 60);
    setIsTimeSet(true);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' + minutes : minutes}:${
      seconds < 10 ? '0' + seconds : seconds
    }`;
  };

  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);
  
  useEffect(() => {
    if (secondsRemaining === 0 && isTimeSet) {
      alert('Time has ended!');
    }
  }, [secondsRemaining, isTimeSet]);

  return (
    <View style={styles.container}>
      {!isTimeSet ? (
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Set Time (in minutes):</Text>
          <TextInput
            style={styles.input}
            value={inputTime}
            onChangeText={setInputTime}
            keyboardType="numeric"
            placeholder="Enter minutes"
          />
          <TouchableOpacity style={styles.button} onPress={setEndTime}>
            <Text style={styles.buttonText}>Set Time</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <React.Fragment>
          <Text style={styles.time}>{formatTime(secondsRemaining)}</Text>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleTimer}>
              <Text style={styles.buttonText}>
                {isRunning ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={timerReset}>
              <Text style={styles.buttonText}>Reset</Text>
            </TouchableOpacity>
          </View>
          
        </React.Fragment>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  inputContainer: {
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingHorizontal: 10,
    fontSize: 18,
    marginBottom: 20,
    width: 150,
    textAlign: 'center',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '60%',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Stopwatch;

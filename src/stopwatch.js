import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';

const Stopwatch = () => {
  const [secondsRemaining, setSecondsRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [inputMinutes, setInputMinutes] = useState('');
  const [inputSeconds, setInputSeconds] = useState('');
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
    setInputMinutes('');
    setInputSeconds('');
  };

  const setEndTime = () => {
    const minutes = parseInt(inputMinutes, 10) || 0;
    const seconds = parseInt(inputSeconds, 10) || 0;

    // Validation for minutes and seconds
    if (isNaN(minutes) || minutes < 0) {
      Alert.alert('Invalid Input', 'Minutes must be a non-negative number.');
      return;
    }

    if (isNaN(seconds) || seconds < 0 || seconds > 59) {
      Alert.alert('Invalid Input', 'Seconds must be between 0 and 59.');
      return;
    }

    if (minutes === 0 && seconds === 0) {
      Alert.alert('Invalid Input', 'Timer cannot be set to 0:00.');
      return;
    }

    const totalSeconds = minutes * 60 + seconds;

    setSecondsRemaining(totalSeconds);
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
      if (intervalId) clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    if (secondsRemaining === 0 && isTimeSet) {
      Alert.alert('Time Ended!', 'Your timer has completed.');
    }
  }, [secondsRemaining, isTimeSet]);

  return (
    <View style={styles.container}>
      {!isTimeSet ? (
        <View style={styles.inputContainer}>
          <Text style={styles.title}>Set Timer</Text>
          <View style={styles.timeInputs}>
            <TextInput
              style={styles.input}
              value={inputMinutes}
              onChangeText={setInputMinutes}
              keyboardType="numeric"
              placeholder="Minutes"
            />
            <TextInput
              style={styles.input}
              value={inputSeconds}
              onChangeText={setInputSeconds}
              keyboardType="numeric"
              placeholder="Seconds"
            />
          </View>
          <TouchableOpacity style={styles.setButton} onPress={setEndTime}>
            <Text style={styles.setButtonText}>Set Timer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <React.Fragment>
          <View style={styles.progressCircle}>
            <Text style={styles.time}>{formatTime(secondsRemaining)}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleTimer}>
              <Text style={styles.controlButtonText}>
                {isRunning ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.controlButton} onPress={timerReset}>
              <Text style={styles.controlButtonText}>Reset</Text>
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
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    alignItems: 'center',
  },
  timeInputs: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    fontSize: 18,
    marginHorizontal: 10,
    width: 100,
    textAlign: 'center',
    backgroundColor: '#fff',
  },
  setButton: {
    backgroundColor: '#28a745',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 8,
  },
  setButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  progressCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 10,
    borderColor: '#007bff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#e6f7ff',
  },
  time: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007bff',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  controlButton: {
    backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Stopwatch;

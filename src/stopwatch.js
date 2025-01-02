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
            setIsRunning(false);
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
      setIsTimeSet(false);
    }
  }, [secondsRemaining, isTimeSet]);

  return (
    <View style={styles.container}>
      {!isTimeSet ? (
        <View style={styles.card}>
          <Text style={styles.title}>Set Timer</Text>
          <View style={styles.inputContainer}>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={inputMinutes}
                onChangeText={setInputMinutes}
                keyboardType="numeric"
                placeholder="00"
                maxLength={2}
              />
              <Text style={styles.inputLabel}>min</Text>
            </View>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={inputSeconds}
                onChangeText={setInputSeconds}
                keyboardType="numeric"
                placeholder="00"
                maxLength={2}
              />
              <Text style={styles.inputLabel}>sec</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.setButton} onPress={setEndTime}>
            <Text style={styles.setButtonText}>Set Timer</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.card}>
          <View style={styles.timeDisplay}>
            <Text style={styles.time}>{formatTime(secondsRemaining)}</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={[
                styles.controlButton,
                isRunning ? styles.pauseButton : styles.startButton,
              ]}
              onPress={toggleTimer}>
              <Text style={styles.controlButtonText}>
                {isRunning ? 'Pause' : 'Start'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.resetButton} onPress={timerReset}>
              <Text style={styles.controlButtonText}>Reset</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    width: '90%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    height: 64,
    width: 80,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 20,
    textAlign: 'center',
    marginRight: 8,
  },
  inputLabel: {
    fontSize: 16,
    color: '#777',
  },
  setButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 16,
    borderRadius: 8,
    alignSelf: 'stretch',
  },
  setButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
  },
  timeDisplay: {
    marginBottom: 32,
    alignItems: 'center',
  },
  time: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlButton: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#F44336',
  },
  resetButton: {
    backgroundColor: '#FFEB3B',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  controlButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default Stopwatch;

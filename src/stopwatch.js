import React, {useState, useEffect, useRef} from 'react';
import {View, FlatList, StyleSheet,Text} from 'react-native';
import CustomButton from './atom/custom-text';
import CustomTimerDisplay from './atom/custom-timer-display';
import CustomInputField from './atom/custom-input';
import CustomLapItem from './atom/custom-lap-item';


const Stopwatch = () => {
  const [milliseconds, setMilliseconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [title, setTitle] = useState('');
  const [isInTitleMode, setIsInTitleMode] = useState(true);
  const intervalRef = useRef(null);

  const toggleStartPause = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    } else {
      intervalRef.current = setInterval(() => {
        setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
      }, 10);
    }
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
    setMilliseconds(0);
    setLaps([]);
    setIsRunning(false);
  };

  const handleLap = () => {
    if (!isRunning) return;
    setLaps(prevLaps => [formatTime(milliseconds), ...prevLaps]);
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const millis = Math.floor((time % 1000) / 10);
    return `${minutes.toString().padStart(2, '0')}:${seconds
      .toString()
      .padStart(2, '0')}:${millis.toString().padStart(2, '0')}`;
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      {isInTitleMode ? (
        <View style={styles.titleInputContainer}>
            <Text style={{fontSize:20,fontWeight:'bold',color:'#fff',padding:10}}>Enter Timer Title</Text>
          <CustomInputField
            value={title}
            onChangeText={setTitle}
            placeholder="Enter Timer Title"
          />
          <CustomButton
            title="Start Timer"
            onPress={() => setIsInTitleMode(false)}
            style={styles.startButton}
          />
        </View>
      ) : (
        <>
          <CustomTimerDisplay
            time={formatTime(milliseconds)}
            title={title || 'Timer'}
          />
          <View style={styles.buttonsContainer}>
            <CustomButton
              title={isRunning ? 'Pause' : 'Start'}
              onPress={toggleStartPause}
              style={isRunning ? styles.pauseButton : styles.startButton}
            />
            <CustomButton
              title="Lap"
              onPress={handleLap}
              style={styles.lapButton}
            />
            <CustomButton
              title="Reset"
              onPress={handleReset}
              style={styles.resetButton}
            />
          </View>
          <View style={styles.lapsContainer}>
            <FlatList
              data={laps}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item, index}) => (
                <CustomLapItem
                  index={index}
                  time={item}
                  totalLaps={laps.length}
                />
              )}
            />
          </View>
          <CustomButton
            title="Change Title"
            onPress={() => setIsInTitleMode(true)}
            style={styles.backButton}
          />
        </>
      )}
    </View>
  );
};

export default Stopwatch;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#1c1c1c',
  },
  titleInputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: '#4CAF50',
  },
  pauseButton: {
    backgroundColor: '#FF5722',
  },
  lapButton: {
    backgroundColor: '#2196F3',
  },
  resetButton: {
    backgroundColor: '#f44336',
  },
  backButton: {
    backgroundColor: '#2196F3',
    marginTop: 20,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    marginHorizontal: 20,
  },
  lapsContainer: {
    flex: 1,
    width: '100%',
    marginTop: 30,
  },
});

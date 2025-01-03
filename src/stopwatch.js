import React, {useState, useEffect, useRef} from 'react';
import {View, Text, FlatList, TextInput, StyleSheet} from 'react-native';
import CustomButton from './atom/custom-text';

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
                    <Text style={styles.titleInputLabel}>Enter Timer Title</Text>
                    <TextInput
                        style={styles.titleInput}
                        value={title}
                        onChangeText={setTitle}
                        placeholder="Type a title"
                        placeholderTextColor="#888"
                    />
                    <CustomButton
                        title="Start Timer"
                        onPress={() => setIsInTitleMode(false)}
                        style={styles.startButton}
                    />
                </View>
            ) : (
                <>
                    <Text style={styles.timerTitle}>{title || 'Timer'}</Text>
                    <View style={styles.timerContainer}>
                        <Text style={styles.timer}>{formatTime(milliseconds)}</Text>
                    </View>
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
                        <Text style={styles.lapsTitle}>Laps</Text>
                        <FlatList
                            data={laps}
                            keyExtractor={(_, index) => index.toString()}
                            renderItem={({item, index}) => (
                                <View style={styles.lapItem}>
                                    <Text style={styles.lapText}>Lap {laps.length - index}</Text>
                                    <Text style={styles.lapTime}>{item}</Text>
                                </View>
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
    titleInputLabel: {
        fontSize: 24,
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 15,
    },
    titleInput: {
        height: 50,
        width: '80%',
        borderColor: '#fff',
        borderWidth: 2,
        borderRadius: 15,
        paddingHorizontal: 15,
        fontSize: 18,
        color: '#fff',
        marginBottom: 30,
    },
    timerTitle: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 20,
    },
    timerContainer: {
        marginBottom: 40,
        borderRadius: 20,
        backgroundColor: '#333',
        paddingVertical: 40,
        paddingHorizontal: 80,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 10},
        shadowOpacity: 0.1,
        shadowRadius: 10,
        elevation: 5,
    },
    timer: {
        fontSize: 70,
        fontWeight: 'bold',
        color: '#fff',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
        marginHorizontal: 20,
    },
    button: {
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#444',
        borderWidth: 2,
        borderColor: '#fff',
        marginHorizontal: 10,
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
    buttonText: {
        fontSize: 18,
        color: '#fff',
        fontWeight: 'bold',
        textAlign: 'center',
        flexShrink: 1,
    },

    lapsTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 15,
    },
    lapItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#444',
    },
    lapText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
    },
    lapTime: {
        fontSize: 18,
        color: '#fff',
        opacity: 0.7,
    },
    lapsContainer: {
        flex: 1,
        width: '100%',
        marginTop: 30,
    },
    lapList: {
        flexGrow: 0,
    },
    fixedBottom: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
    },
});

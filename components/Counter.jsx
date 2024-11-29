import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { CounterContext } from "../context/CounterContext";
import { BoxShadow } from "react-native-shadow";
import Icon from "react-native-vector-icons/FontAwesome6";

const Counter = () => {
  const { mode, setMode, counterLap, setCounterLap, modes, initialCounterLap } =
    useContext(CounterContext);

  /////////////// STATE ///////////////
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(modes[mode].minutes);
  const [playPause, setPlayPause] = useState(false);
  const [started, setStarted] = useState(false);
  const [bgColor, setBgColor] = useState(modes[mode].bgColor);

  useEffect(() => {
    setSeconds(0);
    setMinutes(modes[mode].minutes);
    setBgColor(modes[mode].bgColor);
    setPlayPause(false);
    setStarted(false);
  }, [mode, modes]);

  const setModeHandler = (newMode) => {
    setMode(newMode);
  };

  ////////////// HANDLERS //////////////

  const onStartHandler = () => {
    if (!started) setStarted(true);
    setPlayPause(!playPause);
  };

  const onResetHandler = () => {
    setModeHandler("work");
    setSeconds(0);
    setMinutes(modes["work"].minutes);
    setPlayPause(false);
    setStarted(false);
    setCounterLap(initialCounterLap);
  };

  const onSkipHandler = () => {
    setSeconds(0);
    setPlayPause(false);
    setStarted(false);

    if (mode === "work") {
      if (counterLap > 1) {
        Alert.alert("Good job!", "Have a short rest!");
        setCounterLap((prev) => prev - 1);
        setModeHandler("shortBreak");
      } else {
        Alert.alert("Great work!", "Let's have a long rest now!");
        setModeHandler("longBreak");
        setCounterLap(initialCounterLap);
      }
    } else if (mode === "shortBreak" || mode === "longBreak") {
      Alert.alert("Time to work!", "Time to get back to work!");
      setModeHandler("work");
    }
  };

  //////////// COUNTER /////////////////

  useEffect(() => {
    let intervalId;

    if (playPause && started) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        } else {
          onSkipHandler();
        }
      }, 1000);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [playPause, seconds, minutes, started, mode]);

  // Configuración de la sombra
  const shadowOpt = {
    width: 320, // Ancho del contenedor
    height: 240, // Alto del contenedor
    color: "#000", // Color de la sombra
    border: 10, // Grosor del borde de la sombra
    radius: 16, // Radio de borde
    opacity: 0.2, // Opacidad de la sombra
    x: 0, // Desplazamiento horizontal
    y: 8, // Desplazamiento vertical
    style: { marginVertical: 10 },
  };

  return (
    <View style={styles.container}>
      {/* Contenedor de sombra */}
      <BoxShadow setting={shadowOpt}>
        {/* Contenedor del contador */}
        <View style={[styles.counterContainer, { backgroundColor: bgColor }]}>
          <View style={styles.timer}>
            <Text style={styles.timeText}>
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Text>
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={onStartHandler}>
              <Text style={styles.buttonText}>{playPause ?  <Icon name="pause" size={30} color="#fffff" /> :  <Icon name="play" size={30} color="#fffff" />}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onResetHandler}>
              <Text style={styles.buttonText}>
              <Icon name="rotate-left" size={30} color="#fffff" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={onSkipHandler}>
              <Text style={styles.buttonText}><Icon name="forward-step" size={30} color="#fffff" /></Text>
            </TouchableOpacity>
          </View>
        </View>
      </BoxShadow>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  counterContainer: {
    width: 320, 
    height: 240, 
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
    padding: 16,
  },
  timer: {
    paddingVertical: 16,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#00000",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 16,
  },
  button: {
    backgroundColor: "#1F2937",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: "30%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default Counter;

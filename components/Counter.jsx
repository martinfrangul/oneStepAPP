import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { CounterContext } from "../context/CounterContext";
import Icon from "react-native-vector-icons/FontAwesome6";
import CustomAlert from "./CustomAlert";
// Quitar SoundAlert, ya no lo usamos
// import SoundAlert from "./SoundAlert";
import * as Notifications from "expo-notifications";

const Counter = () => {
  const { mode, setMode, counterLap, setCounterLap, modes, initialCounterLap } =
    useContext(CounterContext);

  // timeLeft: cuántos segundos faltan (para mostrar en pantalla)
  const [timeLeft, setTimeLeft] = useState(0);

  // Guardamos la "hora" (timestamp) en la que termina el Pomodoro
  const [endTime, setEndTime] = useState(null);

  const [playPause, setPlayPause] = useState(false);
  const [started, setStarted] = useState(false);
  const [bgColor, setBgColor] = useState(modes[mode].bgColor);

  // Manejo de la alerta visual
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState(null);

  // Para manejar la ID de la notificación programada (si la hay)
  const [notificationId, setNotificationId] = useState(null);
  

  // Cada vez que cambia el modo, reiniciamos valores visuales
  useEffect(() => {
    setBgColor(modes[mode].bgColor);
    setPlayPause(false);
    setStarted(false);

    // Al cambiar de modo, actualiza timeLeft con los minutos definidos
    const initialSeconds = modes[mode].minutes * 60;
    setTimeLeft(initialSeconds);
    setEndTime(null);
  }, [mode, modes]);


  // Función para programar la notificación local
  const schedulePomodoroNotification = async (secondsToCount) => {
  try {
    if (secondsToCount > 0) {
      const id = await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Pomodoro finalizado!",
          body: "Ya pasaron los 25 minutos...",
          sound: "default",
        },
        trigger: {
          seconds: secondsToCount, // Se programa para el tiempo correcto
        },
      });
      setNotificationId(id);
      console.log("Notificación programada con ID:", id, "y segundos:", secondsToCount);
    } else {
      console.error("Tiempo restante no válido para programar notificación.");
    }
  } catch (error) {
    console.error("Error programando notificación:", error);
  }
};


  // Función para cancelar notificación pendiente
  const cancelScheduledNotification = async () => {
    if (notificationId) {
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      console.log("Notificación cancelada con ID:", notificationId);
      setNotificationId(null);
    }
  };

  // Actualiza el timeLeft cada segundo
  // Si se acaba el tiempo, llamamos a "onTimeUpHandler"
  useEffect(() => {
    let intervalId;

    if (playPause && started && endTime) {
      intervalId = setInterval(() => {
        const now = Date.now();
        const diff = endTime - now; // milisegundos

        if (diff <= 0) {
          // Se acabó el tiempo
          setTimeLeft(0);
          clearInterval(intervalId);
          onTimeUpHandler();
        } else {
          // Actualizamos timeLeft en segundos
          setTimeLeft(Math.ceil(diff / 1000));
        }
      }, 1000);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [playPause, started, endTime]);

  const onStartHandler = () => {
    if (!started) {
      setStarted(true);
      const newEndTime = Date.now() + timeLeft * 1000;
      setEndTime(newEndTime);
    }
    setPlayPause(!playPause);
  };
  

  // Handler cuando el tiempo llega a 0 (no el skip manual)
  const onTimeUpHandler = async () => {
    try {
      // Programa una notificación inmediata
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "¡Pomodoro finalizado!",
          body: "Ya pasaron los 25 minutos...",
          sound: "default", // Usa default o configura un sonido personalizado
        },
        trigger: null, // Dispara inmediatamente
      });
  
      console.log("Notificación programada al finalizar el tiempo.");
  
      // Lógica de cambio de modo
      if (mode === "work") {
        if (counterLap > 1) {
          setAlertMessage("Good job! Have a short rest!");
          setCounterLap((prev) => prev - 1);
          setMode("shortBreak");
        } else {
          setAlertMessage("Great work! Let's have a long rest now!");
          setMode("longBreak");
          setCounterLap(initialCounterLap);
        }
      } else if (mode === "shortBreak" || mode === "longBreak") {
        setAlertMessage("Time to get back to work!");
        setMode("work");
      }
  
      setShowAlert(true);
      setPlayPause(false);
      setStarted(false);
    } catch (error) {
      console.error("Error al programar la notificación al finalizar el tiempo:", error);
    }
  };
  
  

  // "Saltar" al siguiente modo (cuando el usuario aprieta skip)
  // No mostramos alerta ni sonido aquí
  const onSkipHandler = async () => {
    await cancelScheduledNotification();

    setPlayPause(false);
    setStarted(false);

    // Cambia al siguiente modo, pero sin alertar con CustomAlert
    if (mode === "work") {
      if (counterLap > 1) {
        setCounterLap((prev) => prev - 1);
        setMode("shortBreak");
      } else {
        setMode("longBreak");
        setCounterLap(initialCounterLap);
      }
    } else if (mode === "shortBreak" || mode === "longBreak") {
      setMode("work");
    }

    // No seteamos showAlert ni alertMessage
  };

  // Reset completo
  const onResetHandler = async () => {
    await cancelScheduledNotification();

    setMode("work");
    setCounterLap(initialCounterLap);

    setStarted(false);
    setPlayPause(false);
    setAlertMessage(null);
    setShowAlert(false);

    // Reiniciamos a los minutos de "work"
    const workSeconds = modes["work"].minutes * 60;
    setTimeLeft(workSeconds);
    setEndTime(null);
  };

  // Calculamos minutos/segundos para mostrar
  const displayMinutes = Math.floor(timeLeft / 60);
  const displaySeconds = timeLeft % 60;

  return (
    <View style={styles.container}>
      <View style={[styles.counterContainer, { backgroundColor: bgColor }]}>
        <View style={styles.timer}>
          <Text
            style={[
              styles.timeText,
              mode === "longBreak" && { color: "#FFFFFF" },
            ]}
          >
            {displayMinutes}:
            {displaySeconds < 10 ? `0${displaySeconds}` : displaySeconds}
          </Text>
        </View>
        <View style={styles.buttonContainer}>
          {/* Play/Pause */}
          <TouchableOpacity style={styles.button} onPress={onStartHandler}>
            <Text style={styles.buttonText}>
              {playPause ? (
                <Icon name="pause" size={30} color="#fff" />
              ) : (
                <Icon name="play" size={30} color="#fff" />
              )}
            </Text>
          </TouchableOpacity>

          {/* Reset */}
          <TouchableOpacity style={styles.button} onPress={onResetHandler}>
            <Text style={styles.buttonText}>
              <Icon name="rotate-left" size={30} color="#fff" />
            </Text>
          </TouchableOpacity>

          {/* Skip */}
          <TouchableOpacity style={styles.button} onPress={onSkipHandler}>
            <Text style={styles.buttonText}>
              <Icon name="forward-step" size={30} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Alerta visual SOLO cuando llega a 0 (onTimeUpHandler) */}
      <CustomAlert
        visible={showAlert}
        message={alertMessage}
        onClose={() => setShowAlert(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  counterContainer: {
    flex: 1,
    borderRadius: 16,
    padding: 36,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  timer: {
    paddingVertical: 16,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#000",
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

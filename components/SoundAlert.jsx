import React, { useContext } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { AlertContext } from "../context/AlertContext";
import PropTypes from "prop-types";

const Alert = ({ showAlert, setShowAlert, message }) => {
  const context = useContext(AlertContext);
  const { soundToggle } = context;

  // Función para reproducir sonido
  const playSound = async () => {
    if (soundToggle) {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(require("../assets/sounds/alert.mp3"));
        await sound.playAsync();
        sound.setOnPlaybackStatusUpdate((status) => {
          if (status.didJustFinish) {
            sound.unloadAsync(); // Descargar el sonido después de reproducirlo
          }
        });
      } catch (error) {
        console.error("Error al reproducir sonido", error);
      }
    }
  };

  // Reproducir sonido cuando se muestra la alerta
  React.useEffect(() => {
    if (showAlert) {
      playSound();
    }
  }, [showAlert, soundToggle]);

  return (
    <Modal
      visible={showAlert}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setShowAlert(false)}
    >
      <View style={styles.overlay}>
        <View style={styles.alertBox}>
          <View style={styles.header}>
            <View style={styles.iconContainer}>
              <Text style={styles.icon}>❗</Text>
            </View>
            <Text style={styles.title}>¡Alerta!</Text>
          </View>
          <View style={styles.body}>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setShowAlert(false)}
            >
              <Text style={styles.closeButtonText}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

Alert.propTypes = {
  showAlert: PropTypes.bool.isRequired,
  setShowAlert: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default Alert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  iconContainer: {
    width: 40,
    height: 40,
    backgroundColor: "#FEE2E2",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 18,
    color: "#DC2626",
  },
  title: {
    marginLeft: 10,
    fontSize: 18,
    fontWeight: "bold",
    color: "#DC2626",
  },
  body: {
    marginBottom: 20,
  },
  message: {
    fontSize: 16,
    color: "#4B5563",
  },
  footer: {
    alignItems: "flex-end",
  },
  closeButton: {
    backgroundColor: "#DC2626",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

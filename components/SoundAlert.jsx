import { useContext, useEffect } from "react";
import { StyleSheet } from "react-native";
import { Audio } from "expo-av";
import { AlertContext } from "../context/AlertContext";

const SoundAlert = ({ showAlert }) => {
  const context = useContext(AlertContext);
  const { soundToggle } = context;


  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/sounds/alert.mp3")
      );
      await sound.playAsync();
      sound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          sound.unloadAsync();
        }
      });
    } catch (error) {
      console.error("Error al reproducir sonido:", error);
    }
  };
  

  // Reproducir sonido cuando se muestra la alerta
  useEffect(() => {
    if (showAlert && soundToggle) {
      playSound();
    }
  }, [showAlert, soundToggle]);

  return null;
};


export default SoundAlert;

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

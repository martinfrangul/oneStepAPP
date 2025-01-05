import React, { useContext, useCallback } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import { AlertContext } from "../../context/AlertContext";

const SoundToggleButton = () => {
  const context = useContext(AlertContext);
  const { setSoundToggle, soundToggle } = context;

  const handleToggle = useCallback(() => {
    setSoundToggle((prev) => !prev);
  }, [setSoundToggle]);

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={handleToggle}>
        {soundToggle ? (
            <Icon name="volume-high" size={24} color="black" />
        ) : (
            <Icon name="volume-xmark" size={24} color="black" />
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    button: {
        backgroundColor: "#D8D8DD", // Color de fondo del botón
        padding: 12,
        width: 55,
        height: 55,
        borderRadius: 50, // Hace que sea circular
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5, // Sombra en Android
      },
});

export default SoundToggleButton;

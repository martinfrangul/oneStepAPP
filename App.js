import React from "react";
import { StyleSheet, ImageBackground, SafeAreaView, View } from "react-native";
import Navbar from "./components/Navbar";
import { CounterContextProvider } from "./context/CounterContext";
import Counter from "./components/Counter";

export default function App() {
  return (
    <CounterContextProvider>
      <ImageBackground
        source={require("./assets/images/bg-app-lg.jpg")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <SafeAreaView style={styles.safeArea}>
          <Navbar />
          <View style={styles.counterContainer}>
            <Counter />
          </View>
        </SafeAreaView>
      </ImageBackground>
    </CounterContextProvider>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1, // Ocupa toda la pantalla
  },
  backgroundImage: {
    opacity: 1, // Opcional: Ajusta la opacidad del fondo
  },
  safeArea: {
    flex: 1, // Asegura que todo ocupe el espacio disponible
  },
  counterContainer: {
    flex: 1, // Ocupa el espacio restante debajo de la navbar
    justifyContent: "flex-start", // Asegura que el contenido inicie desde la parte superior
    alignItems: "center", // Centra horizontalmente el contenido si es necesario
  },
});

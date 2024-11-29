import React from "react";
import { StyleSheet, ImageBackground, SafeAreaView, View, StatusBar } from "react-native";
import Navbar from "./components/Navbar";
import { CounterContextProvider } from "./context/CounterContext";
import Counter from "./components/Counter";
import { IMAGES } from "./config/colors";

export default function App() {
  return (
    <CounterContextProvider>
      <ImageBackground
        source={IMAGES.backgroundLG}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <StatusBar />
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
    flex: 1,
  },
  backgroundImage: {
    opacity: 1,
  },
  safeArea: {
    flex: 1, 
  },
  counterContainer: {
    flex: 1,
    justifyContent: "flex-start", 
    alignItems: "center", 
  },
});

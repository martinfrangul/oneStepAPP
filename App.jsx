import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  Text
} from "react-native";
import Navbar from "./components/Navbar";
import { CounterContextProvider } from "./context/CounterContext";
import Counter from "./components/Counter";
import CounterConfig from "./components/CounterConfig";
import { IMAGES } from "./config/colors";
import TaskManager from "./components/tasks/TaskManager";
import TaskPanel from "./components/tasks/TaskPanel";
import { TasksDataProvider } from "./context/TasksData";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";
import ButtonsGorup from "./components/ButtonsGroup";
import { AlertContextProvider } from "./context/AlertContext";
import { Provider as PaperProvider } from "react-native-paper";

SplashScreen.preventAutoHideAsync(); // Evita que la splash screen se oculte automáticamente

export default function App() {

  const [fontsLoaded] = useFonts({
    Raleway: require("./assets/fonts/Raleway/Raleway-VariableFont_wght.ttf"),
    RalewayMedium: require("./assets/fonts/Raleway/Raleway-Medium.ttf"),
    BarlowCondensedLight: require("./assets/fonts/BarlowCondensed-Light.ttf"),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);
  

// Configuración de audio y preparación de la app
useEffect(() => {
  const prepareApp = async () => {
    try {
      if (fontsLoaded) {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          playsInSilentModeIOS: true,
          shouldDuckAndroid: true,
          playThroughEarpieceAndroid: false,
        });
        console.log("Modo de audio configurado correctamente.");
        setIsAppReady(true);
        await SplashScreen.hideAsync();
      }
    } catch (error) {
      console.error("Error preparando la aplicación:", error);
    }
  };

  prepareApp();
}, [fontsLoaded]);

if (!isAppReady) {
  return (
    <View style={styles.loadingScreen}>
      <Text>Cargando...</Text>
    </View>
  );
}

  // Bloques de contenido
  const content = [
    { key: "counter", component: <Counter /> },
    { key: "buttonsGropu", component: <ButtonsGorup /> },
    { key: "taskManager", component: <TaskManager /> },
    { key: "taskPanel", component: <TaskPanel /> },
  ];

  return (
    <TasksDataProvider>
      <PaperProvider>
        <AlertContextProvider>
          <CounterContextProvider>
            <ImageBackground
              source={IMAGES.backgroundLG}
              resizeMode="cover"
              style={styles.rootScreen}
              imageStyle={styles.backgroundImage}
            >
              <SafeAreaView style={styles.safeArea}>
              <StatusBar />
                <KeyboardAvoidingView
                  style={{ flex: 1 }}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                  <View style={{ flex: 1 }}>
                    <Navbar />
                    <FlatList
                      data={content}
                      renderItem={({ item }) => (
                        <View style={styles.componentContainer}>
                          {item.component}
                        </View>
                      )}
                      keyExtractor={(item) => item.key}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps="handled"
                      contentContainerStyle={styles.listContent}
                    />
                  </View>
                </KeyboardAvoidingView>
                <CounterConfig
                  visible={modalVisible}
                  onClose={() => setModalVisible(false)}
                />
              </SafeAreaView>
            </ImageBackground>
          </CounterContextProvider>
        </AlertContextProvider>
      </PaperProvider>
    </TasksDataProvider>
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
  listContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  componentContainer: {
    width: "90%",
    alignSelf: "center",
    padding: 4,
    borderRadius: 12,
  },
  loadingScreen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  
});

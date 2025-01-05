import React, { useState, useCallback, useEffect} from "react";
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
  Button
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
import ClearStorage from "./components/ClearStorage";

SplashScreen.preventAutoHideAsync(); // Evita que la splash screen se oculte automáticamente

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);



  useEffect(() => {
    const configureAudio = async () => {
      try {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false, // No se permite grabar en iOS
          playsInSilentModeIOS: true, // Permite reproducir en modo silencioso en iOS
          shouldDuckAndroid: true, // Permitir "ducking" en Android
          playThroughEarpieceAndroid: false, // No reproducir a través del auricular
        });
        console.log("Modo de audio configurado correctamente.");
      } catch (error) {
        console.error("Error configurando el modo de audio:", error);
      }
    };
  
    configureAudio();
  }, []);
  
  const content = [
    { key: "counter", component: <Counter /> },
    { key: "buttonsGropu", component: <ButtonsGorup /> },
    { key: "taskManager", component: <TaskManager /> },
    { key: "taskPanel", component: <TaskPanel /> },
  ];

  const [fontsLoaded] = useFonts({
    Raleway: require("./assets/fonts/Raleway/Raleway-VariableFont_wght.ttf"),
    RalewayMedium: require("./assets/fonts/Raleway/Raleway-Medium.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync(); // Oculta la splash screen cuando las fuentes estén listas
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null; // Muestra una pantalla en blanco mientras se cargan las fuentes
  }

  return (
    <TasksDataProvider>
      <AlertContextProvider>
      <CounterContextProvider>
        <ImageBackground
          source={IMAGES.backgroundLG}
          resizeMode="cover"
          style={styles.rootScreen}
          imageStyle={styles.backgroundImage}
        >
          <StatusBar />
          <SafeAreaView
            style={styles.safeArea}
            onLayout={onLayoutRootView}
          >
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
            {/* <ClearStorage /> */}
            
          </SafeAreaView>
        </ImageBackground>
      </CounterContextProvider>
      </AlertContextProvider>
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
});

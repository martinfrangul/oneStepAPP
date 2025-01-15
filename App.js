import React, { useState, useEffect } from "react";
import { Audio } from "expo-av";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
  KeyboardAvoidingView,
  Platform,
  FlatList,
  StatusBar,
  Text,
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
import ButtonsGroup from "./components/ButtonsGroup";
import { AlertContextProvider } from "./context/AlertContext";
import { Provider as PaperProvider } from "react-native-paper";
import "./config/notification-handler";
import * as Notifications from "expo-notifications";
import * as BackgroundFetch from "expo-background-fetch";
import "./config/backgroundTask";

const registerBackgroundTask = async () => {
  try {
    await BackgroundFetch.registerTaskAsync("background-pomodoro-task", {
      minimumInterval: 60, // Tiempo mínimo entre ejecuciones (en segundos)
      stopOnTerminate: false, // Continuar después de cerrar la app
      startOnBoot: true, // Iniciar después de reiniciar el dispositivo
    });
    console.log("Tarea en background registrada.");
  } catch (err) {
    console.error("Error al registrar la tarea en background:", err);
  }
};

SplashScreen.preventAutoHideAsync(); // Evita que la splash screen se oculte automáticamente

export default function App() {
  const [fontsLoaded] = useFonts({
    Raleway: require("./assets/fonts/Raleway/Raleway-VariableFont_wght.ttf"),
    RalewayMedium: require("./assets/fonts/Raleway/Raleway-Medium.ttf"),
    BarlowCondensedLight: require("./assets/fonts/BarlowCondensed-Light.ttf"),
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    registerBackgroundTask();
  }, []);

  // Pedimos permisos y configuramos el canal de notificaciones
  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== "granted") {
        alert("Se necesitan permisos para mostrar notificaciones.");
      }
    };
  
    const configureNotificationChannel = async () => {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("pomodoro-channel", {
          name: "Pomodoro Channel",
          importance: Notifications.AndroidImportance.HIGH,
          sound: "default", // Usa default o tu sonido personalizado
        });
      }
    };
  
    requestPermissions();
    configureNotificationChannel();
  }, []);
  

  // Configuración de audio y preparación de la app
  useEffect(() => {
    const prepareApp = async () => {
      try {
        if (fontsLoaded) {
          // Configuración de audio en la app (para otros usos, p.e. reproducir música)
          await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
          });
          console.log("Modo de audio configurado correctamente.");

          setIsAppReady(true); // Marca la app como lista
          await SplashScreen.hideAsync(); // Oculta la pantalla splash
        }
      } catch (error) {
        console.error("Error preparando la aplicación:", error);
      }
    };

    if (fontsLoaded) {
      prepareApp();
    }
  }, [fontsLoaded]);

  if (!isAppReady) {
    return (
      <View style={styles.loadingScreen}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Cargando...</Text>
      </View>
    );
  }

  // Bloques de contenido
  const content = [
    { key: "counter", component: <Counter /> },
    { key: "buttonsGroup", component: <ButtonsGroup /> },
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
                <StatusBar
                  translucent={false}
                  backgroundColor="#FFC1BD"
                  barStyle="dark-content"
                />
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
    backgroundColor: "transparent",
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

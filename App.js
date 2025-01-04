import React, { useState, useCallback } from "react";
import {
  StyleSheet,
  ImageBackground,
  SafeAreaView,
  View,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import Navbar from "./components/Navbar";
import { CounterContextProvider } from "./context/CounterContext";
import Counter from "./components/Counter";
import CounterConfigButton from "./components/buttons/CounterConfigButton";
import CounterConfig from "./components/CounterConfig";
import { IMAGES } from "./config/colors";
import TaskManager from "./components/tasks/TaskManager";
import TaskPanel from "./components/tasks/TaskPanel";
import { TasksDataProvider } from "./context/TasksData";
import * as SplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

SplashScreen.preventAutoHideAsync(); // Evita que la splash screen se oculte automáticamente

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const content = [
    { key: "counter", component: <Counter /> },
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
            <View style={styles.floatingButton}>
              <CounterConfigButton onPress={() => setModalVisible(true)} />
            </View>
            <CounterConfig
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          </SafeAreaView>
        </ImageBackground>
      </CounterContextProvider>
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
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
});

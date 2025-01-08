import React, { useState } from "react";
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

export default function App() {
  const [modalVisible, setModalVisible] = useState(false);

  const content = [
    { key: "counter", component: <Counter /> },
    { key: "taskManager", component: <TaskManager /> },
    { key: "taskPanel", component: <TaskPanel /> },
  ];

  const renderItem = ({ item }) => (
    <View style={styles.componentContainer}>{item.component}</View>
  );

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
          <SafeAreaView style={styles.safeArea}>
            <KeyboardAvoidingView
              style={{ flex: 1 }}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
              <View style={{ flex: 1 }}>
                <Navbar />
                <FlatList
                  data={content}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.key}
                  showsVerticalScrollIndicator={false}
                  keyboardShouldPersistTaps="handled" // Mantiene el teclado abierto en botones
                  keyboardDismissMode="on-drag" // Cierra el teclado al arrastrar
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
    paddingBottom: 20, // Espacio adicional para que el último componente no sea cortado
  },
  componentContainer: {
    width: "90%",
    alignSelf: "center",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  floatingButton: {
    position: "absolute",
    bottom: 30,
    right: 30,
    zIndex: 10,
  },
});

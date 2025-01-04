import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Keyboard } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TasksData } from "../../context/TasksData";
import Icon from "react-native-vector-icons/Feather";

const TaskManager = () => {
  const [newTask, setNewTask] = useState("");
  const { tasks, setTasks } = useContext(TasksData);

  const addTask = () => {
    if (newTask.trim() !== "" && tasks.filter(task => !task.completed).length < 5) {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }]);
      setNewTask("");
      Keyboard.dismiss();
    }
  };

  return (
    <LinearGradient
      colors={["#FFC1BD", "#C8E8E3"]}
      style={styles.gradientContainer}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Add new task</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="New task"
            value={newTask}
            onChangeText={setNewTask}
            onSubmitEditing={addTask}
          />
          <TouchableOpacity
            style={[
              styles.addButton,
              tasks.filter(task => !task.completed).length >= 5 && styles.disabledButton,
            ]}
            onPress={addTask}
            disabled={tasks.filter(task => !task.completed).length >= 5}
          >
            <Icon name="plus" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
        <Text style={styles.taskCount}>
          Active tasks: {tasks.filter(task => !task.completed).length}/5
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    marginTop: 16,
    padding: 8, // Espacio para mostrar el degradado alrededor del contenedor
    borderRadius: 16,
    marginBottom: 16,
  },
  container: {
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#155263",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
  },
  input: {
    flex: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#FFF",
    fontSize: 16,
    marginRight: 8,
  },
  addButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#155263",
    justifyContent: "center",
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  taskCount: {
    fontSize: 14,
    color: "#155263",
    marginTop: 8,
  },
});

export default TaskManager;

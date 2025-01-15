import React, { useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import { TasksData } from "../../context/TasksData";
import Icon from "react-native-vector-icons/Feather";

const TaskPanel = () => {
  const { tasks, setTasks, setCompletedTasks } = useContext(TasksData);

  const completeTask = (id) => {
    const completedTask = tasks.find((task) => task.id === id);
    setCompletedTasks((prev) => [
      ...prev,
      { ...completedTask, completed: true },
    ]);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  return (
      <View style={styles.container}>
        <Text style={styles.title}>Tasks list</Text>
        <View style={styles.separator} />
        {tasks.length ? (
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.taskItem}>
                <Text style={styles.taskText}>{item.text}</Text>
                <View style={styles.actionContainer}>
                  <TouchableOpacity onPress={() => completeTask(item.id)}>
                    <Icon name="check-circle" size={24} color="#4CAF50" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => deleteTask(item.id)}>
                    <Icon name="trash" size={24} color="#FF5722" />
                  </TouchableOpacity>
                </View>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noTasks}>No tasks yet</Text>
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    padding: 3,
    borderRadius: 16,
    marginTop: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#FFF",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#155263",
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
    marginVertical: 8,
  },
  taskItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  noTasks: {
    flex: 1,
    fontSize: 16,
    padding: 12,
    color: "#000",
    textAlign: "center",
    fontStyle: "italic"
  },
  actionContainer: {
    flexDirection: "row",
    gap: 12,
  },
});

export default TaskPanel;

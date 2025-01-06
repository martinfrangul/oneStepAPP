import React, { useState, useContext } from "react";
import { StyleSheet, FlatList, View } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { TasksData } from "../context/TasksData";
import ConfirmationModal from "../components/tasks/ConfirmationModal";

const CompletedTasks = ({ visible, onClose }) => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const { completedTasks, setCompletedTasks } = useContext(TasksData);

  const handleDeleteAll = () => {
    setCompletedTasks([]);
    setConfirmationVisible(false);
    onClose(); // Cierra ambos modales
  };

  return (
    <Portal>
      {/* Modal principal */}
      <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
        <Dialog.Title style={styles.title}>Completed Tasks</Dialog.Title>
        <Dialog.Content>
          {completedTasks.length > 0 ? (
            <FlatList
              data={completedTasks.slice(-8)}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <View style={styles.taskItem}>
                  <Text style={styles.taskText}>{item.text}</Text>
                  {item.completedAt && (
                    <Text style={styles.taskDate}>
                      {new Date(item.completedAt).toLocaleDateString()}
                    </Text>
                  )}
                </View>
              )}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          ) : (
            <Text style={styles.noTasksText}>No completed tasks yet</Text>
          )}
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          {completedTasks.length > 0 && (
            <Button
              mode="contained"
              onPress={() => setConfirmationVisible(true)}
              style={styles.deleteButton}
            >
              Delete All
            </Button>
          )}
          <Button onPress={onClose}>Close</Button>
        </Dialog.Actions>
      </Dialog>

      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={confirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        onConfirm={handleDeleteAll}
        title="Confirm Deletion"
        message="Are you sure you want to delete all completed tasks? This action cannot be undone."
      />
    </Portal>
  );
};

export default CompletedTasks;

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 12,
    backgroundColor: "#ffffff",
  },
  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
  },
  taskItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 6,
    backgroundColor: "#f9f9f9",
    borderWidth: 1,
    borderColor: "#e0e0e0",
    marginVertical: 4,
  },
  taskText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "500",
    marginBottom: 4,
  },
  taskDate: {
    fontSize: 12,
    color: "#777",
  },
  separator: {
    height: 8,
  },
  noTasksText: {
    textAlign: "center",
    fontSize: 14,
    color: "#999",
    marginVertical: 20,
  },
  actions: {
    justifyContent: "flex-end",
    marginBottom: 10,
  },
  deleteButton: {
    backgroundColor: "#ff6347",
  },
});

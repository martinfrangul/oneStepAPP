import React, { useState, useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Modal, FlatList } from "react-native";
import ConfirmationModal from "./tasks/ConfirmationModal";
import { TasksData } from "../context/TasksData";

const CompletedTasks = ({ visible, onClose }) => {
  const [confirmationVisible, setConfirmationVisible] = useState(false);

  const { completedTasks } = useContext(TasksData);

  return (
    <>
      {/* Modal principal */}
      <Modal
        visible={visible}
        transparent={true}
        animationType="slide"
        onRequestClose={onClose}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <View style={styles.header}>
              <Text style={styles.title}>Latest completed tasks</Text>
            </View>
            <View style={styles.content}>
              {completedTasks.length !== 0 ? (
                <FlatList
                  data={completedTasks.slice(-8)}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View style={styles.taskItem}>
                      <Text style={styles.taskText}>{item.text}</Text>
                    </View>
                  )}
                />
              ) : (
                <Text style={styles.noTasksText}>No completed tasks yet</Text>
              )}
            </View>
            <View style={styles.actions}>
            {completedTasks.length > 0 && (
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => setConfirmationVisible(true)}
              >
                <Text style={styles.deleteButtonText}>Delete all</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
          </View>
        </View>
      </Modal>

      {/* Modal de confirmación */}
      <ConfirmationModal
        visible={confirmationVisible}
        onClose={() => setConfirmationVisible(false)}
        completedTasksDialogRef={onClose}
      />
    </>
  );
};

export default CompletedTasks;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBox: {
    width: "90%",
    backgroundColor: "#ffffff",
    borderRadius: 20,
    overflow: "hidden",
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    alignItems: "center",
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    maxHeight: 300,
    marginBottom: 16,
  },
  taskItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    borderBottomWidth: 0.5,
    borderColor: "#000",
  },
  taskText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  noTasksText: {
    fontStyle: "italic",
    textAlign: "center",
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },
  deleteButton: {
    borderWidth: 2,
    borderColor: "#FF0000",
    padding: 8,
    borderRadius: 5,
    backgroundColor: "transparent",
  },
  deleteButtonText: {
    color: "#FF0000",
    fontWeight: "bold",
  },
  closeButton: {
    borderWidth: 1,
    borderColor: "#000",
    padding: 8,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#000",
    fontWeight: "bold",
  },
});

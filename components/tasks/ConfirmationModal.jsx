import React from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useContext } from "react";
import { TasksData } from "../../context/TasksData";

const ConfirmationModal = ({ visible, onClose, completedTasksDialogRef }) => {
  const { setCompletedTasks } = useContext(TasksData);

  const onCleanCompletedTasks = () => {
    // Limpiar las tareas completadas
    setCompletedTasks([]);

    // Cerrar modales
    if (completedTasksDialogRef) {
      completedTasksDialogRef();
    }

    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalBox}>
          <View style={styles.content}>
            <Text style={styles.title}>
              Are you sure you want to clean your tasks history?
            </Text>
            <Text style={styles.subtitle}>This action cannot be undone.</Text>
          </View>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cleanButton}
              onPress={onCleanCompletedTasks}
            >
              <Text style={styles.cleanButtonText}>Clean list</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmationModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    width: "80%",
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  content: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  cleanButton: {
    backgroundColor: "#FF6347", // Tomate para la acción crítica
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
  },
  cleanButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  cancelButton: {
    backgroundColor: "#DCDCDC", // Gris claro para cancelar
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: "#333",
    fontWeight: "bold",
  },
});

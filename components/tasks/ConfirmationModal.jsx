import React from "react";
import { StyleSheet } from "react-native";
import { Dialog, Portal, Button, Text } from "react-native-paper";

const ConfirmationModal = ({ visible, onClose, onConfirm, message, title }) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onClose} style={styles.dialog}>
        <Dialog.Title style={styles.title}>{title || "Confirm Action"}</Dialog.Title>
        <Dialog.Content>
          <Text style={styles.message}>
            {message || "Are you sure you want to proceed?"}
          </Text>
        </Dialog.Content>
        <Dialog.Actions style={styles.actions}>
          <Button mode="contained" onPress={onConfirm} style={styles.confirmButton}>
            Confirm
          </Button>
          <Button onPress={onClose}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 12,
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
  },
  message: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 10,
    color: "#555",
  },
  actions: {
    justifyContent: "space-between",
  },
  confirmButton: {
    backgroundColor: "#ff6347",
  },
});

export default ConfirmationModal;

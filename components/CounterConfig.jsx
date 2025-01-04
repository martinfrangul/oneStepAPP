import React, { useContext, useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { CounterContext } from "../context/CounterContext";

const CounterConfig = ({ visible, onClose }) => {
  const context = useContext(CounterContext);
  const {
    counterLap,
    setCounterLap,
    setWorkMinutes,
    setSRMinutes,
    setLRMinutes,
    workMinutes,
    SRMinutes,
    LRMinutes,
    setInitialCounterLap,
  } = context;

  // Estados temporales
  const [tempWorkMinutes, setTempWorkMinutes] = useState(workMinutes);
  const [tempSRMinutes, setTempSRMinutes] = useState(SRMinutes);
  const [tempLRMinutes, setTempLRMinutes] = useState(LRMinutes);
  const [tempCounterLap, setTempCounterLap] = useState(counterLap);

  const [errors, setErrors] = useState({});

  // Sincroniza los valores originales cuando se abre el modal
  useEffect(() => {
    if (visible) {
      setTempWorkMinutes(workMinutes);
      setTempSRMinutes(SRMinutes);
      setTempLRMinutes(LRMinutes);
      setTempCounterLap(counterLap);
    }
  }, [visible, workMinutes, SRMinutes, LRMinutes, counterLap]);

  const handleAccept = () => {
    const validationErrors = {};

    if (!tempWorkMinutes || isNaN(tempWorkMinutes) || tempWorkMinutes <= 0) {
      validationErrors.workMinutes = "Please enter a valid work time.";
    }
    if (!tempSRMinutes || isNaN(tempSRMinutes) || tempSRMinutes <= 0) {
      validationErrors.SRMinutes = "Please enter a valid short rest time.";
    }
    if (!tempLRMinutes || isNaN(tempLRMinutes) || tempLRMinutes <= 0) {
      validationErrors.LRMinutes = "Please enter a valid long rest time.";
    }
    if (!tempCounterLap || isNaN(tempCounterLap) || tempCounterLap <= 0) {
      validationErrors.counterLap = "Please enter a valid lap interval.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setWorkMinutes(tempWorkMinutes);
    setSRMinutes(tempSRMinutes);
    setLRMinutes(tempLRMinutes);
    setCounterLap(tempCounterLap);
    setInitialCounterLap(tempCounterLap);
    setErrors({});
    onClose();
  };

  const handleResetDefault = () => {
    setTempWorkMinutes(25);
    setTempSRMinutes(5);
    setTempLRMinutes(15);
    setTempCounterLap(4);
    setErrors({});
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.modalBackground}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.modalContainer}>
            <Text style={styles.title}>Configuration</Text>

            <Text style={styles.label}>Work</Text>
            <TextInput
              style={[styles.input, errors.workMinutes && styles.inputError]}
              value={String(tempWorkMinutes)}
              onChangeText={(value) => setTempWorkMinutes(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.workMinutes && (
              <Text style={styles.errorText}>{errors.workMinutes}</Text>
            )}

            <Text style={styles.label}>Short rest</Text>
            <TextInput
              style={[styles.input, errors.SRMinutes && styles.inputError]}
              value={String(tempSRMinutes)}
              onChangeText={(value) => setTempSRMinutes(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.SRMinutes && (
              <Text style={styles.errorText}>{errors.SRMinutes}</Text>
            )}

            <Text style={styles.label}>Long rest</Text>
            <TextInput
              style={[styles.input, errors.LRMinutes && styles.inputError]}
              value={String(tempLRMinutes)}
              onChangeText={(value) => setTempLRMinutes(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.LRMinutes && (
              <Text style={styles.errorText}>{errors.LRMinutes}</Text>
            )}

            <Text style={styles.label}>Lap interval</Text>
            <TextInput
              style={[styles.input, errors.counterLap && styles.inputError]}
              value={String(tempCounterLap)}
              onChangeText={(value) => setTempCounterLap(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.counterLap && (
              <Text style={styles.errorText}>{errors.counterLap}</Text>
            )}

            <View style={styles.actions}>
              <TouchableOpacity
                style={styles.buttonDefault}
                onPress={handleResetDefault}
              >
                <Text style={styles.buttonText}>Default</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonAccept}
                onPress={handleAccept}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonCancel} onPress={onClose}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    width: "80%",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  buttonAccept: {
    padding: 10,
    backgroundColor: "#c8e9e2",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonDefault: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonCancel: {
    padding: 10,
    backgroundColor: "#f78886",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  buttonText: {
    color: "black",
    fontWeight: "bold",
  },
});

export default CounterConfig;

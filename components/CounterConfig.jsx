import React, { useContext, useState } from "react";
import { 
  Modal, 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  Alert, 
  KeyboardAvoidingView, 
  Platform, 
  TouchableWithoutFeedback, 
  Keyboard 
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
    initialCounterLap,
  } = context;

  const [errors, setErrors] = useState({});

  const handleAccept = () => {
    const validationErrors = {};

    if (!workMinutes || isNaN(workMinutes) || workMinutes <= 0) {
      validationErrors.workMinutes = "Please enter a valid work time.";
    }
    if (!SRMinutes || isNaN(SRMinutes) || SRMinutes <= 0) {
      validationErrors.SRMinutes = "Please enter a valid short rest time.";
    }
    if (!LRMinutes || isNaN(LRMinutes) || LRMinutes <= 0) {
      validationErrors.LRMinutes = "Please enter a valid long rest time.";
    }
    if (!counterLap || isNaN(counterLap) || counterLap <= 0) {
      validationErrors.counterLap = "Please enter a valid lap interval.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setWorkMinutes(workMinutes);
    setSRMinutes(SRMinutes);
    setLRMinutes(LRMinutes);
    setCounterLap(counterLap);
    setInitialCounterLap(counterLap);
    setErrors({});
    onClose();
  };

  const handleResetDefault = () => {
    setWorkMinutes(25);
    setSRMinutes(5);
    setLRMinutes(15);
    setCounterLap(4);
    setInitialCounterLap(4);
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
              style={[
                styles.input,
                errors.workMinutes && styles.inputError,
              ]}
              value={String(workMinutes)}
              onChangeText={(value) => setWorkMinutes(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.workMinutes && <Text style={styles.errorText}>{errors.workMinutes}</Text>}

            <Text style={styles.label}>Short rest</Text>
            <TextInput
              style={[
                styles.input,
                errors.SRMinutes && styles.inputError,
              ]}
              value={String(SRMinutes)}
              onChangeText={(value) => setSRMinutes(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.SRMinutes && <Text style={styles.errorText}>{errors.SRMinutes}</Text>}

            <Text style={styles.label}>Long rest</Text>
            <TextInput
              style={[
                styles.input,
                errors.LRMinutes && styles.inputError,
              ]}
              value={String(LRMinutes)}
              onChangeText={(value) => setLRMinutes(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.LRMinutes && <Text style={styles.errorText}>{errors.LRMinutes}</Text>}

            <Text style={styles.label}>Lap interval</Text>
            <TextInput
              style={[
                styles.input,
                errors.counterLap && styles.inputError,
              ]}
              value={String(counterLap)}
              onChangeText={(value) => setCounterLap(parseInt(value) || "")}
              keyboardType="numeric"
            />
            {errors.counterLap && <Text style={styles.errorText}>{errors.counterLap}</Text>}

            <View style={styles.actions}>
              <TouchableOpacity style={styles.buttonDefault} onPress={handleResetDefault}>
                <Text style={styles.buttonText}>Default</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.buttonAccept} onPress={handleAccept}>
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

import { View, StyleSheet } from "react-native";
import React, { useState } from "react";
import CounterConfigButton from "./buttons/CounterConfigButton";
import CompletedTasksButton from "./buttons/CompletedTasksButton";
import SoundToggleButton from "./buttons/SoundToggleButton";
import CounterConfig from "./CounterConfig";
import CompletedTasks from "./CompletedTasks";

const ButtonsGorup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [completedTasksVisible, setCompletedTasksVisible] = useState(false);

  return (
    <View>
      <View style={styles.buttonsContainer}>
        <CompletedTasksButton onPress={() => setCompletedTasksVisible(true)} />
        <CounterConfigButton onPress={() => setModalVisible(true)} />
        
        <SoundToggleButton />
      </View>
      <CounterConfig
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      <CompletedTasks
        visible={completedTasksVisible}
        onClose={() => setCompletedTasksVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "60%",
    marginHorizontal: 'auto',
    paddingVertical: 10,
  },
});

export default ButtonsGorup;

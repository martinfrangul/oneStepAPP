import logo from "../assets/images/logoOneStep.png";
import { useContext } from "react";
import { CounterContext } from "../context/CounterContext";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
} from "react-native";

const Navbar = () => {
  const context = useContext(CounterContext);
  const { mode, setMode, setCounterLap, initialCounterLap } = context;

  const selecWModeHandler = () => {
    setMode("work");
    setCounterLap(initialCounterLap);
  };

  const selectSRModeHandler = () => {
    setMode("shortBreak");
    setCounterLap(initialCounterLap);
  };

  const selectLRModeHandler = () => {
    setMode("longBreak");
    setCounterLap(initialCounterLap);
  };

  return (
    <View style={styles.container}>
      {/* Left Section */}
      <View style={styles.buttonContainer}>
        {/* Work Button */}
        <TouchableOpacity
          style={[styles.button, mode === "work" && styles.buttonActiveWork]}
          onPress={selecWModeHandler}
        >
          <Text style={styles.buttonText}>Time to work!</Text>
        </TouchableOpacity>
        {/* Short Break Button */}
        <TouchableOpacity
          style={[
            styles.button,
            mode === "shortBreak" && styles.buttonActiveShortBreak,
          ]}
          onPress={selectSRModeHandler}
        >
          <Text style={styles.buttonText}>Short rest</Text>
        </TouchableOpacity>
        {/* Long Break Button */}
        <TouchableOpacity
          style={[
            styles.button,
            mode === "longBreak" && styles.buttonActiveLongBreak,
          ]}
          onPress={selectLRModeHandler}
        >
          <Text style={styles.buttonText}>Long rest!</Text>
        </TouchableOpacity>
      </View>

      {/* Right Section */}
      <View style={styles.logoContainer}>
        <Image source={logo} style={styles.logo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 2,
    borderBottomColor: "#4B5563", // gray-700
    shadowColor: "#374151", // gray-500
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.2)", // bg-black bg-opacity-20
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
    gap: 12, // Spacing between buttons
  },
  button: {
    width: "90%",
    minWidth: 100,
    textAlign: "center",
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    borderWidth: 0.5,
    borderColor: "black",
    paddingHorizontal: 8,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "white", // Default background
  },
  buttonActiveWork: {
    backgroundColor: "#D8D8FE",
  },
  buttonActiveShortBreak: {
    backgroundColor: "#D8E6C6",
  },
  buttonActiveLongBreak: {
    backgroundColor: "#f68986",
    color: "#FDFDAC",
  },

  // Ajuste por plataforma

  buttonText: {
    textAlign: "center",
    fontWeight: Platform.OS === "android" ? "normal" : "600",
    fontSize: 16,
    fontFamily: Platform.OS === "ios" ? "Raleway" : "RalewayMedium",
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 16,
  },
  logo: {
    width: 110,
    height: 110,
    resizeMode: "contain",
  },
});

export default Navbar;

import { useState, createContext } from "react";
import PropTypes from "prop-types";
import useAsyncStorageState from "../hooks/useAsyncStorageState";

const CounterContext = createContext();

const CounterContextProvider = ({ children }) => {
  const [mode, setMode] = useAsyncStorageState("mode", "work");
  const [counterLap, setCounterLap] = useAsyncStorageState("counterLap", 4);
  const [initialCounterLap, setInitialCounterLap] = useAsyncStorageState("initialCounterLap", 4);
  const [workMinutes, setWorkMinutes] = useAsyncStorageState("workMinutes", 25);
  const [SRMinutes, setSRMinutes] = useAsyncStorageState("SRMinutes", 5);
  const [LRMinutes, setLRMinutes] = useAsyncStorageState("LRMinutes", 15);
  const [soundToggle, setSoundToggle] = useState(false); // Este no necesita persistencia

  const modes = {
    work: { minutes: workMinutes, bgColor: "background-W" },
    shortBreak: { minutes: SRMinutes, bgColor: "background-SB" },
    longBreak: { minutes: LRMinutes, bgColor: "background-LB" },
  };

  return (
    <CounterContext.Provider
      value={{
        mode,
        setMode,
        counterLap,
        setCounterLap,
        modes,
        setWorkMinutes,
        setSRMinutes,
        setLRMinutes,
        workMinutes,
        SRMinutes,
        LRMinutes,
        initialCounterLap,
        setInitialCounterLap,
        soundToggle,
        setSoundToggle,
      }}
    >
      {children}
    </CounterContext.Provider>
  );
};

CounterContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CounterContext, CounterContextProvider };

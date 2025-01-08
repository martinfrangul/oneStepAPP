import { useState, createContext } from "react";

const AlertContext = createContext();

const AlertContextProvider = ({ children }) => {
  const [soundToggle, setSoundToggle] = useState(false);
  const [soundConsent, setSoundConsent] = useState(false);

  return (
    <AlertContext.Provider
      value={{
        soundToggle,
        setSoundToggle,soundConsent, setSoundConsent
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export { AlertContext, AlertContextProvider };

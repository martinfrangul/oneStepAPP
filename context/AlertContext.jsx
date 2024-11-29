import { useState, createContext } from "react";
import PropTypes from "prop-types";

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

AlertContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AlertContext, AlertContextProvider };

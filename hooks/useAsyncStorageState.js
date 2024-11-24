import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const useAsyncStorageState = (key, defaultValue) => {
  const [state, setState] = useState(defaultValue);
  const [isLoaded, setIsLoaded] = useState(false); // Para controlar la carga inicial

  // Cargar el valor desde AsyncStorage al montar el componente
  useEffect(() => {
    const loadStorage = async () => {
      try {
        const saved = await AsyncStorage.getItem(key);
        if (saved !== null) {
          setState(JSON.parse(saved));
        }
      } catch (error) {
        console.error("Error al cargar el estado desde AsyncStorage:", error);
      } finally {
        setIsLoaded(true);
      }
    };

    loadStorage();
  }, [key]);

  // Guardar el estado en AsyncStorage cuando cambie
  useEffect(() => {
    const saveStorage = async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(state));
      } catch (error) {
        console.error("Error al guardar el estado en AsyncStorage:", error);
      }
    };

    // Guardar solo si está completamente cargado
    if (isLoaded) {
      saveStorage();
    }
  }, [key, state, isLoaded]);

  return [state, setState];
};

export default useAsyncStorageState;

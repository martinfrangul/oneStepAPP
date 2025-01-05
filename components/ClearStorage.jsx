import React from 'react';
import { View, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClearStorage = () => {
  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      Alert.alert('Limpieza Completa', 'Todos los datos se han eliminado.');
      console.log('AsyncStorage limpiado');
    } catch (e) {
      console.error('Error al limpiar el almacenamiento:', e);
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Button
        title="Borrar Todo el Almacenamiento"
        onPress={clearAllData}
        color="red"
      />
    </View>
  );
};

export default ClearStorage;

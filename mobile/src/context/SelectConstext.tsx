import React, { useState, createContext } from 'react';
import { View } from 'react-native';

export const SelectContext = createContext({})

const SelectProvider: React.FC = ({ children }) => {
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')

  const saveUf = (value: string) => setUf(value)
  const saveCity = (value: string) => setCity(value)

  return (

    <SelectContext.Provider value={{
      uf,
      saveUf,
      city,
      saveCity
    }}>{children}</SelectContext.Provider>

  );
}

export default SelectProvider;
import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios'
import { SelectContext } from '../context/SelectConstext';

interface SelectProps {
  label: string
  value: string
}



const Select: React.FC = ({ uf, city }) => {
  const [selectUF, setSelectUF] = useState<SelectProps[]>([])
  const [selectCity, setSelectCity] = useState<SelectProps[]>([])
  const { saveUf, saveCity } = useContext(SelectContext)




  useEffect(() => {

    if (!uf) return

    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`)
      .then(response => {
        const obj: SelectProps[] = []
        response.data.map(item => {
          let arr = { label: '', value: '' }
          arr.label = item.nome
          arr.value = item.nome
          obj.push(arr)
        })
        setSelectCity(obj)
      })


  }, [uf])


  useEffect(() => {


    axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
      .then(response => {
        const obj: SelectProps[] = []
        response.data.map(item => {
          let arr = { label: '', value: '' }
          arr.label = item.sigla
          arr.value = item.sigla
          obj.push(arr)
        })
        setSelectUF(obj)
      })


  }, [])

  return (
    <>

      <RNPickerSelect
        onValueChange={(value) => saveUf(value)}
        items={selectUF}
        value={uf}
        style={pickerSelectStyles}

      />
      <RNPickerSelect
        onValueChange={(value) => saveCity(value)}
        items={selectCity}
        value={city}
        style={pickerSelectStyles}
      />

    </>
  );
}


const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 24,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    paddingRight: 30, // to ensure the text is never behind the icon
    height: 60,
    marginBottom: 8,


  },
});


export default Select;
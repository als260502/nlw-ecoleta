import React, { useState, useEffect } from 'react';
import {StyleSheet} from 'react-native'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

interface ISelect{
  handleSelectUf:(value:string) => void
  handleSelectCity:(value:string) => void
}

interface SelectProps {
  label: string
  value: string
}
interface IBGEUFResponse {
  id: number
  sigla: string
}
interface IBGECityResponse {
  id: number,
  nome: string
}

const Select: React.FC<ISelect> = ({handleSelectUf, handleSelectCity}) => {
const [selectUf, setSelectUf] = useState<SelectProps[]>([])
const [selectCity, setSelectCity] = useState<SelectProps[]>([])
const [ufValue, setUfValue] = useState<string>('')
const [cityValue, setCityValue] = useState<string>('')


  useEffect(() => {
    if (!ufValue) return
    axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`)
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
          handleSelectUf(ufValue)
          handleSelectCity(cityValue)
  }, [ufValue, cityValue])

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
        setSelectUf(obj)
      })    

  }, []) 
  
return (
<>
  <RNPickerSelect
    onValueChange={(value)=>setUfValue(value)}
    items={selectUf}
    value={ufValue}
    style={pickerSelectStyles}
  />
  <RNPickerSelect
    onValueChange={(value)=>setCityValue(value)}
    items={selectCity}
    value={cityValue}
    style={pickerSelectStyles}
  />

</>
)}
 

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

  }
})
  
export default Select;
import React, { useState, useEffect } from 'react';
import {
  View, StyleSheet, StatusBar,
  Image, Text, ImageBackground,
  TextInput, KeyboardAvoidingView, Platform
} from 'react-native';
import { useNavigation } from '@react-navigation/native'

import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import RNPickerSelect from 'react-native-picker-select'
import axios from 'axios'

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


const Home: React.FC = () => {
  const [uf, setUf] = useState('')
  const [city, setCity] = useState('')

  const [selectUF, setSelectUF] = useState<SelectProps[]>([])
  const [selectCity, setSelectCity] = useState<SelectProps[]>([])

  const navigation = useNavigation()

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: 'RJ',
      city: "Niterói"
    })
  }


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
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        source={require('../../assets/home-background.png')}
        style={styles.container}
        imageStyle={{ width: 274, height: 368 }}
      >
        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <View>
            <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
            <Text style={styles.description}>Ajudamos a encontrarem pontos de coleta de forma eficiente.</Text>
          </View>

        </View>

        <View style={styles.footer}>

          <RNPickerSelect
            onValueChange={(value) => setUf(value)}
            items={selectUF}
            value={uf}
            style={pickerSelectStyles}

          />
          <RNPickerSelect
            onValueChange={(value) => setCity(value)}
            items={selectCity}
            value={city}
            style={pickerSelectStyles}
          />

          <RectButton
            style={styles.button}
            onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name='arrow-right' color='#fff' size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>Entrar</Text>
          </RectButton>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>

  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,

  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  }
});


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


export default Home;
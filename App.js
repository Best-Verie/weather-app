import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'

const WEATHER_API_KEY = "e523383c69b71446cff3758efc8f254d"
const BASE_WEATHER_URL = "api.openweathermap.org/data/2.5/weather"
export default function App() {

  const [errorMessage, setErrorMessage]=useState(null)

  const [currentWeather, setCurrentWeather] = useState(null)
  useEffect(() =>{
    load()
  }, [])

  async function load(){
    try {
      let {status} = await Location.requestForegroundPermissionsAsync()
      if(status !== 'granted'){
        setErrorMessage('Access to location is allowed!')
        return
      }
      const location =  await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log(location)
      const {latitude, longitude} = location.coords
      alert(`latitude ${latitude} and longitude: ${longitude}`)

      const url = `${BASE_WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`

      const response = await fetch(url)

      const result = await response.json()

      if(response.ok){
        setCurrentWeather(result)
      }
      else{
        setErrorMessage(result.message)
      }

    }catch(error) {
      console.log(error.message);
   }
  }
 
  return (
    <View style={styles.container}>
      <Text>Bonjour Elois!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ecb202',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

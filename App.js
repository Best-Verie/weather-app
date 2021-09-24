import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import * as Location from 'expo-location'
import { colors } from './utils/index'
import WeatherInfo from './components/WeatherInfo'

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
        setErrorMessage('Access to location is needed!')
        return
      }
      const location =  await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      console.log(location)
      const {latitude, longitude} = location.coords
      alert(`latitude ${latitude} and longitude: ${longitude}`)

      const url = `${BASE_WEATHER_URL}?lat=${latitude}&lon=${longitude}&appid=${WEATHER_API_KEY}`

      const response = await fetch(url)
      console.log(response)

      const result = JSON.stringify(response)

      console.log("rresult: " + result)

      if(response.ok){
        setCurrentWeather(result)
       }
      else{
        setErrorMessage(result.message)
      }

    }catch(error) {
      console.log(error.message)
   }
  }

  if(currentWeather){
    return (
      <View style={styles.container}>
          <StatusBar style="auto" />
          <View style={styles.main}>
              {/* <UnitsPicker unitsSystem={unitsSystem} setUnitsSystem={setUnitsSystem} /> */}
              {/* <ReloadIcon load={load} /> */}
              {/* <WeatherInfo currentWeather={currentWeather} /> */}
              <Text>{currentWeather}</Text>
          </View>
          {/* <WeatherDetails currentWeather={currentWeather} unitsSystem={unitsSystem} /> */}
      </View>
  )
  }
 else if(errorMessage){
  return (
    <View style={styles.container}>
      <Text>{errorMessage}</Text>
      <StatusBar style="auto" />
    </View>
  );
 }  else {
  return (
      <View style={styles.container}>
          <ActivityIndicator size="large" color={colors.PRIMARY_COLOR} />
          <StatusBar style="auto" />
      </View>
  )
}
 
 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
},
main: {
    justifyContent: 'center',
    flex: 1,
},
});

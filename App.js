import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location'

export default function App() {

  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() =>{

    console.log("hey")
    const load = async () =>{
      try{
    console.log("hey2")

        let {status} =  Location.requestForegroundPermissionsAsync()
        if(status !== 'granted'){
    console.log("hey5")

          setErrorMessage('Access to location is needed to run the app')
          return
        }
        console.log("hlo")

        const location =  Location.getCurrentPositionAsync()
        const {latitude, longitude} = location.coords
        alert(`latitude: ${latitude}, longitude: ${longitude}` )
        console.log(`latitude: ${latitude}, longitude: ${longitude}`)
        

      }catch(err){
        console.log(err.message)
      }

    }

    load()
  }, [])

 
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

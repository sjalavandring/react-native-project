import React from 'react';
import { Text, View, Image, FlatList, SafeAreaView} from 'react-native';
import WeatherCard from './Components/WeatherCard/WeatherCard';
import { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './StyleSheet';

import * as Location from 'expo-location'; 
import Map from './Components/Map/Map';

export default function App() {
  apiKey = '31d7fed8e69148a58cd193626230212'

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [weatherInfo, setWeatherInfo] = useState();
  const [weatherMeasurSystem, setWeatherMeasurSystem] = useState('celsius');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос разрешения на геолокацию
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        if (locationPermission.status === 'granted') {
          // Получение текущей позиции
          const position = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          // const latitude = position.coords.latitude;
          // const longitude = position.coords.longitude;
  
          // Здесь вы можете установить значение в состояние
          setLatitude(() => position.coords.latitude);
          setLongitude(() => position.coords.longitude);
          // Запрос погодных данных
          const response = await axios.get(
            // `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`
          );

          setWeatherInfo(response.data)
          weatherInfo && console.log(weatherInfo.forecast.forecastday[0].hour)
        } else {
          console.log('Location permission not granted');
        }
      } catch (error) {
        console.error('Error:', error); 
      }
    };
    fetchData(); // Вызываем функцию fetchData внутри useEffect
  }, [latitude, longitude]);

  if (!weatherInfo) {
      return null;
  }

  function toggleMeasurSystem(systemName) {
    return (systemName == 'celsius') ?  setWeatherMeasurSystem('fahrenheit') : setWeatherMeasurSystem('celsius')
  }

  function setNewCoords(latitude, longitude) {
    setLatitude(latitude)
    setLongitude(longitude)
  }

  return (
    <React.Fragment>
      <View style={styles.body}>

        <View style={styles.header}>
          <View style={[styles.container, styles.headerContent]}>

            <View style={styles.location}>
              <Image style={styles.locationImage} source={require('./assets/location.png')}/>
              <Text style={styles.locationName}>{weatherInfo.location.country}, {weatherInfo.location.name}</Text>
            </View>

            <View style={styles.headerMenu}>
              <View style={styles.headerMenuLine} />
              <View style={styles.headerMenuLine} />
              <View style={styles.headerMenuLine} />
            </View>

          </View>
        </View>

        <View style={styles.main}>
          <SafeAreaView style={[ styles.mainContent]}>
            {weatherInfo ? (
              <FlatList 
                data={weatherInfo.forecast.forecastday[0].hour}
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                    return <WeatherCard weatherInfo={item} currentHour={index} weatherMeasurSystem={weatherMeasurSystem} toggleMeasurSystem={toggleMeasurSystem}/>;
                }}
              />
            ) : (
              <Text>Error fetching weather data</Text>
            )}
          </SafeAreaView>
        </View>

        <Map latitude={latitude} longitude={longitude} setNewCoords={setNewCoords}/>

      </View>
    </React.Fragment>
  );
}

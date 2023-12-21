import React, { lazy, Suspense} from 'react';
import { Text, View, Image, FlatList, SafeAreaView, TouchableOpacity} from 'react-native';
import WeatherCard from './Components/WeatherCard/WeatherCard';
import { useEffect, useState } from 'react'
import axios from 'axios';
import styles from './StyleSheet';

import * as Location from 'expo-location'; 
const Map = lazy(() => import('./Components/Map/Map'));

export default function App() {
  apiKey = '31d7fed8e69148a58cd193626230212'

  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [isMapVisible, setMapVisibility] = useState(false)
  const [weatherInfo, setWeatherInfo] = useState();
  const [weatherMeasurSystem, setWeatherMeasurSystem] = useState('celsius');

  useEffect(() => {
    console.log(weatherInfo.forecast.forecastday[0].hour[1])
  }, [weatherInfo])

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
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${position.coords.latitude},${position.coords.longitude}`
          );
  
          setWeatherInfo(response.data);
          // weatherInfo && console.log(weatherInfo.forecast.forecastday[0].hour);
        } else {
          console.log('Location permission not granted');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
    fetchData(); // Вызываем функцию fetchData внутри useEffect
  }, []); // Empty dependency array for initial fetching
   
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос погодных данных на основе новых координат
        const response = await axios.get(
          // `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${latitude},${longitude}`
        );
  
        setWeatherInfo(response.data);
        weatherInfo && console.log(weatherInfo.forecast.forecastday[0].hour);
      } catch (error) {
        console.error('Error:', error);
      }
    };
    
    // Вызываем функцию fetchData только при изменении latitude или longitude
    fetchData();
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

  function changeMapVisibility(newVisibilityvalue) {
    console.log("Button Pressed");
    setMapVisibility(newVisibilityvalue)
  }

  return (
    <React.Fragment>
      <View style={styles.body}>

        <View style={styles.header}>
          <View style={[styles.container, styles.headerContent]}>

            <View style={styles.location}>
              <TouchableOpacity onPress={() => changeMapVisibility(true)}>
                <Image style={styles.locationImage} source={require('./assets/location.png')} />
              </TouchableOpacity>
              <Text style={styles.locationName}>{latitude && longitude ? weatherInfo.location.country : 'Страна не определена'}, {weatherInfo.location.name}</Text>
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
            {weatherInfo.forecast ? (
              <FlatList 
                data={weatherInfo.forecast.forecastday[0].hour}
                showsVerticalScrollIndicator={false}
                // extraData={latitude}
                renderItem={({ item, index }) => {
                    return <WeatherCard weatherInfo={item} currentHour={index} weatherMeasurSystem={weatherMeasurSystem} toggleMeasurSystem={toggleMeasurSystem}/>;
                }}
              />
              // weatherInfo.forecast.forecastday[0].hour.map((item, index) => {
              //   return <WeatherCard weatherInfo={item} currentHour={index} weatherMeasurSystem={weatherMeasurSystem} toggleMeasurSystem={toggleMeasurSystem}/>;
              // })
            ) : (
              <Text>Error fetching weather data</Text>
            )}
          </SafeAreaView>
          <SafeAreaView style={[styles.mainContent]}>
            {weatherInfo.forecast ? (
              <FlatList 
                data={weatherInfo.forecast.forecastday[0].hour}
                keyExtractor={(item, index) => index.toString()} // Добавьте keyExtractor
                showsVerticalScrollIndicator={false}
                renderItem={({ item, index }) => {
                  // return <Text>{weatherInfo.forecast.forecastday[0].hour[index].time}</Text>
                  return <WeatherCard weatherInfo={item} currentHour={index} weatherMeasurSystem={weatherMeasurSystem} toggleMeasurSystem={toggleMeasurSystem}/>;
                }}
              />
              // weatherInfo.forecast.forecastday[0].hour.map((item, index) => {
              //   return <WeatherCard weatherInfo={item} currentHour={index} weatherMeasurSystem={weatherMeasurSystem} toggleMeasurSystem={toggleMeasurSystem}/>;
              // })
            ) : (
              <Text>Error fetching weather data</Text>
            )}
          </SafeAreaView>
          </View>
            <Suspense fallback={<Text>Loading...</Text>}>
              {
                isMapVisible ? <Map latitude={latitude} longitude={longitude} setNewCoords={setNewCoords} changeMapVisibility={changeMapVisibility}/> : null
              }
            </Suspense>
          </View>
    </React.Fragment>
  );
}

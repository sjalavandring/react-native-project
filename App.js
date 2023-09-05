import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import styles from './StyleSheet';
import { useEffect, useState } from 'react'
import axios from 'axios';

import * as Location from 'expo-location'; 

export default function App() {
  const apiKey = '17ce59ebe9bfc2a094ca4ab9d2389caa';

  let [latitude, setLatitude] = useState(0)
  let [longitude, setLongitude] = useState(0)
  let [weatherImages, setWeatherImages] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Запрос разрешения на геолокацию
        const locationPermission = await Location.requestForegroundPermissionsAsync();
        if (locationPermission.status === 'granted') {
          // Получение текущей позиции
          const position = await Location.getCurrentPositionAsync({ enableHighAccuracy: true });
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude, longitude);
  
          // Здесь вы можете установить значение в состояние
          setLatitude(latitude);
          setLongitude(longitude);
  
          // Запрос погодных данных
          const response = await axios.get(
            `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
          );
          setWeatherImages((weatherImages) => [`http://openweathermap.org/img/w/${response.data.weather[0].icon}`])
          console.log(response.data);
          console.log(weatherImages);
        } else {
          console.log('Location permission not granted');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    fetchData(); // Вызываем функцию fetchData внутри useEffect
  }, []);

  return (
    <View style={styles.container}>
      {/* <StatusBar style="dark-content" /> */}
      <Text style={{ color: '#000' }}>Test text</Text>
      <Image style={styles.weatherImage} source={{ uri: 'https://reactnative.dev/img/tiny_logo.png',}}/>
      <Image
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
        style={
          {
            maxWidth: 300,
            width: 100,
            height: 100
          }
        }
      />
    </View>
  );
}

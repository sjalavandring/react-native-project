import { StatusBar } from 'expo-status-bar';
import { Text, View, Image } from 'react-native';
import styles from './StyleSheet';
import { useEffect, useState } from 'react'
import axios from 'axios';

import * as Location from 'expo-location'; 

export default function App() {
  // const apiKey = '17ce59ebe9bfc2a094ca4ab9d2389caa';
  apiKey = 'db4cbd26af4a4d54b16175322230709'

  let [latitude, setLatitude] = useState(0);
  let [longitude, setLongitude] = useState(0);
  let [weatherImages, setWeatherImages] = useState([]);

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
  
          // Здесь вы можете установить значение в состояние
          setLatitude(latitude);
          setLongitude(longitude);
  
          // Запрос погодных данных
          const response = await axios.get(
            // `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
            // `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&timezone=Europe%2FMoscow`
            // `https://api.weatherapi.com/v1/current.json?key=db4cbd26af4a4d54b16175322230709&q=${latitude},${longitude}`
            `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${latitude},${longitude}`
          );
          console.log(response.data.current.condition.icon) 
          setWeatherImages((weatherImages) => [`https:${response.data.current.condition.icon}`])
          // setWeatherImages((weatherImages) => [`https://openweathermap.org/img/wn/10d@2x.png`])
          console.log(response);
          // console.log(weatherImages);
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
    <View style={styles.main}>
      <View style={styles.container}>
        <View style={styles.weatherBlock}>
          <Image style={styles.weatherImage} source={{ uri: weatherImages[0],}}/>
          <Text style={{ color: '#000' }}>Test text</Text>
        </View>
      </View>
    </View>
  );
}

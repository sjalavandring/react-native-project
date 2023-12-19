import React, {useEffect, memo} from 'react'
import { Text, View, ImageBackground} from 'react-native'
import styles from '../../StyleSheet'

function dayTimeImage (hour) {
  if (hour >= 0 && hour <= 7) 
    return require("../../assets/night.png")
  if (hour > 7 && hour <= 12)
    return require("../../assets/morning.png")
  if (hour > 12 && hour <= 18)
    return require("../../assets/moon.jpg") 
  if (hour > 18 && hour <= 23)
    return require("../../assets/evening.jpg")
}

formatDateTime = (inputString) => {
  const inputDate = new Date(inputString);

  function getWeekDay(date) {
    let days = ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"];
  
    return days[date.getDay()];
  }
  const day = getWeekDay(inputDate)
  
  // Получаем время в формате "HH:MM"
  let time = inputDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  // Получаем день и месяц в формате "DD.MM"
  const dayMonth = inputDate.toLocaleDateString([], { day: '2-digit', month: '2-digit' });

  // Формируем конечную строку
  const resultString = `${day} ${time} ${dayMonth}`;
  
  return resultString;
}

const WeatherCard = memo(({weatherInfo, currentHour, weatherMeasurSystem, toggleMeasurSystem}) => {
  const date = new Date();
  if (!weatherInfo || (currentHour > date.getHours())) {
    return null;
  }

  function determinateMeasurSustem() {
    return weatherMeasurSystem ==  'celsius' ? weatherInfo.temp_c + '°C' : weatherInfo.temp_f + '°F'
  }

  return (
    <ImageBackground style={[styles.weatherBlockBackground, currentHour < 23 ? null : styles.weatherBlockBackgroundLastChild]} source={dayTimeImage(currentHour)} resizeMode='cover'>
      <View style={[styles.container, styles.weatherBlock]}>

          <View style={styles.weatherInfo}>
            <Text style={styles.weatherInfoTime}>{formatDateTime(weatherInfo.time)}</Text>
            <Text style={styles.weatherInfoTemp} onPress={() => toggleMeasurSystem(weatherMeasurSystem)}>{determinateMeasurSustem()}</Text>
          </View>

          <View style={styles.weatherInfo}>
            <Text style={[styles.weatherInfoPrecip, styles.weatherInfoItem]}>Вероятность осадков: {weatherInfo.chance_of_rain + weatherInfo.chance_of_snow}%</Text>
            <Text style={[styles.weatherInfoStatus, styles.weatherInfoItem]}>Влажность: {weatherInfo.humidity}%</Text>
            <Text style={[styles.weatherInfoWind, styles.weatherInfoItem]}>Ветер: {Math.floor(+weatherInfo.gust_mph * 1609.34 / 3600)} м/c</Text>
          </View>

      </View>
    </ImageBackground>
  )
})

export default WeatherCard
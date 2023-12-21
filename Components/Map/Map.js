import React, { useEffect, useState } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import styles from '../../StyleSheet';

export default function Map({latitude, longitude, setNewCoords, changeMapVisibility}) {
  // const [selectedCoordinate, setSelectedCoordinate] = useState({"latitude": latitude, "longitude": longitude})

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    // setSelectedCoordinate(coordinate);
    setNewCoords(coordinate.latitude, coordinate.longitude)
  };

  return (
    <React.Fragment>
      <MapView 
        style={styles.map} 
        // showsUserLocation={true} 
        onPress={handleMapPress}
        // onPress={(event) => console.log(event.nativeEvent.coordinate) }
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}
      > 
        {latitude && longitude && (
          <Marker
            title="Погода в этой точке"
            coordinate={{"latitude": latitude, "longitude": longitude}}
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.mapButton} onPress={() => changeMapVisibility(false)}>
          <Text style={styles.mapButtonFirstChild}/>
          <Text style={styles.mapButtonLastChild}/>
      </TouchableOpacity>
    </React.Fragment>
  )
}

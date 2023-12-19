import React, { useState } from 'react'
import { View } from 'react-native'
import MapView, { Marker } from 'react-native-maps';
import styles from '../../StyleSheet';

export default function Map({latitude, longitude, setNewCoords}) {
  const [selectedCoordinate, setSelectedCoordinate] = useState(null)

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoordinate(coordinate);
    setNewCoords(coordinate.latitude, coordinate.longitude)
  };

  return (
    <React.Fragment>
      <MapView 
        style={styles.map} 
        showsUserLocation={true} 
        onPress={handleMapPress}
        // onPress={(event) => console.log(event.nativeEvent.coordinate) }
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
      > 
        {selectedCoordinate && (
          <Marker
            title="Погода в этой точке"
            coordinate={selectedCoordinate}
          />
        )}
      </MapView>
      <View style={styles.mapButton}/>
    </React.Fragment>
  )
}

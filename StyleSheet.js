import { StyleSheet } from 'react-native';
import weatherCardStyles from './Components/WeatherCard/WeatherCardStyles';
import MapStyles from './Components/Map/MapStyles';

const mainStyles = StyleSheet.create({
  body: {
    height: "100%",
    width: "100%",
    
  },

  header: {
    marginTop: 30,
    flexDirection: 'row', 
    justifyContent: 'center',
  },

  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    resizeMode: 'cover',
  },

  headerMenuLine: {
    width: 40,
    height: 5,
    marginVertical: 4,
    borderRadius: 10,
    backgroundColor: 'black',
  },

  location: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },

  locationImage: {
    width: 35,
    height: 35,
    marginHorizontal: 5,
  },

  locationName: {
    fontSize: 20,
  },

  main: {
    justifyContent: 'center',
  },

  container: {
    width: '90%',
    height: '100%',
  },

  statusBar: {
    margin: 10,
    padding: 10,
  },

  weatherImage: {
    width: 64,
    height: 64,
    borderWidth: 1,
    borderColor: 'black',
  },

  weatherImageLine: {
    width: 2,
    height: 70,
    backgroundColor: '#000'
  },
});

const styles = {...mainStyles, ...weatherCardStyles, ...MapStyles};

export default styles;
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Занимает всю доступную высоту
    backgroundColor: 'white', 
    borderWidth: 2,
    borderColor: 'red',
    marginHorizontal: 10,
    padding: 10,
  },
  statusBar: {
    borderWidth: 2,
    borderColor: 'red',
    margin: 10,
    padding: 10,
  },
  weatherImage: {
    width: 100,
    height: 100,
    borderWidth: 2,
    borderColor: 'black',
  }
  // text: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
});

export default styles;
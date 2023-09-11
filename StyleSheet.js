import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  main: {
    flex: 1, // Занимает всю доступную высоту
    flexDirection: 'row', 
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'blue',
    paddingTop: 30,
  },
  container: {
    flex: 1, // Занимает всю доступную высоту
    width: '90%',
    backgroundColor: 'white', 
    borderWidth: 1,
    borderColor: 'red',
    marginHorizontal: 10,
  },
  weatherBlock: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: 'red',
    paddingRight: 20,
    paddingLeft: 15,
  },
  statusBar: {
    // borderWidth: 2,
    // borderColor: 'red',
    margin: 10,
    padding: 10,
  },
  weatherImage: {
    width: 64,
    height: 64,
  }
  // text: {
  //   fontSize: 20,
  //   fontWeight: 'bold',
  //   color: 'white',
  // },
});

export default styles;
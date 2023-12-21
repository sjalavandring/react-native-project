import { StyleSheet } from 'react-native'; 

const MapStyles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },

    mapButton: {
        position: 'absolute',
        width: 45,
        height: 45,
        right: 10,
        top: 30,
        // borderWidth: 2,
        // borderColor: 'fff',
        // borderRadius: 5,
    },

    mapButtonFirstChild: {
        position: 'absolute',
        top: 22,
        width: 45,
        height: 4,
        backgroundColor: '#000',
        transform: [{rotate: ('45deg')}],
        borderRadius: 10
    }, 

    mapButtonLastChild: {
        position: 'absolute',
        top: 22,
        width: 45,
        height: 4,
        backgroundColor: '#000',
        transform: 'rotate(-45deg)',
        borderRadius: 10
    },
});

export default MapStyles

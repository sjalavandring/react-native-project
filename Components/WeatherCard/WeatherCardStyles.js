import { StyleSheet } from 'react-native';

const weatherCardStyles = StyleSheet.create({
    weatherBlockBackground: {
        display: "flex",
        flexDirection: 'row', 
        justifyContent: 'center',
        height: 400,

    },

    weatherBlockBackgroundLastChild: {
        marginBottom: 92,
    },

    weatherBlock: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },

    weatherInfo: {
        height: 100,
        flex: 1,
        marginBottom: 10,
        alignItems: 'flex-start'
    },

    weatherInfoTime: {
        color: 'white',
        alignSelf: 'center',
    },

    weatherInfoTemp: {
        textAlign: 'right',
        fontSize: 40,
        color: 'white',
        alignSelf: 'center',
    },
    
    weatherInfoItem: {
        marginBottom: 5,
    },

    weatherInfoPrecip: {
        textAlign: 'right',
        color: 'white',
        fontSize: 13,
    },

    weatherInfoStatus: {
        textAlign: 'right',
        color: 'white',
        fontSize: 13,
    },

    weatherInfoWind: {
        textAlign: 'right',
        fontSize: 13,
        color: 'white'
    },
});

export default weatherCardStyles


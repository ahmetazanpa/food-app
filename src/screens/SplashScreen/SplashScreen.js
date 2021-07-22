import React, {useEffect} from 'react'
import { StatusBar } from 'react-native';
import {colors} from '../../components/Constant';
import { View, Text, StyleSheet } from 'react-native'

const SplashScreen = ({ navigation }) => {

    useEffect(() => {
        setTimeout(() => {
            navigation.navigate('Home')
        }, 1500);
    })

    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.logoContainer}>
                <Text style={styles.logoText}>Yemek Tariflerim</Text>
            </View>
        </View>
    )
}

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.darkBg
    },
    logoContainer:{
        top: '35%',
        alignSelf: 'center',
    },  
    logoText: {
        fontSize: 70,
        letterSpacing: 7,
        color: colors.lightText,
        fontFamily: 'Lobster-Regular'
    }
})

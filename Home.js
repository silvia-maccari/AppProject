import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function HomeScreen(props) {
    return (
        <View style={styles.container}>
            <View style={styles.button}>
                <Button 
                    title='Enter a new recipe'
                    onPress={() => props.navigation.navigate('NewRecipes')} />
            </View>
            <View style={styles.button}>
                <Button title='View saved recipes'/>
            </View>
            <StatusBar
                animated={true}
                backgroundColor="#61dafb" />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 10,
        backgroundColor: 'aliceblue',
        borderColor: 'black',
        borderWidth: 4,
        marginBottom: 16,
        color: 'black'
    }
  });
import React from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';

export default function RecipeBox( {recipeName, removeHandler} ) {
    return (
        <View style={styles.box} >
            <Text>{recipeName}</Text>
            <View>
                <Button
                    title = 'Remove'
                    onPress = {
                        () =>removeHandler({recipeName})
                    }
                />
            </View>
        </View>
    )
};

const styles = StyleSheet.create({
    box: {
      flexDirection: 'row',
      alignItems: 'center',
      flex:1,
      borderRadius: 10,
      borderWidth: 4,
      padding: 20,
      paddingVertical: 12,
      paddingHorizontal: 32,
      width: 370,
      marginBottom: 4
    }
});
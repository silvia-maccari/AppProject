import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from "./Home";
import NewToDos from "./NewToDos";

const Stack = createStackNavigator()
    
export default function AppNavigator() {
    return(
        <Stack.Navigator>
            <Stack.Screen
                name="Home"
                component={HomeScreen}
            />
            <Stack.Screen 
                name="NewToDos" 
                component={NewToDos} 
            />
        </Stack.Navigator>
    )
}

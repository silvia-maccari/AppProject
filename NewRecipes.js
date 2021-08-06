import React, { useState, useRef, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, Button, FlatList } from 'react-native';
import RecipeBox from "./components/RecipeBox"
import { generate } from "shortid"
import AsyncStorage from '@react-native-async-storage/async-storage';

const UseRecipes = () => {
  const [recipes, setRecipes] = useState([])

  const loadRecipes = async () => {
    const recipeData = await AsyncStorage.getItem('@RecipeStore:Recipes');
    if (recipeData) {
      const recipes = JSON.parse(recipeData);
      setRecipes(recipes);
    }
  }

  useEffect(() => {
    if (recipes.length) return;
    loadRecipes();
  },[])

  useEffect(() => {
    AsyncStorage.setItem('@RecipeStore:Recipes', JSON.stringify(recipes));
  },[recipes])

  const addRecipe = recipe => {
    const newRecipe = {id: generate(), recipe}
    setRecipes([newRecipe,...recipes])
  };
  
  const removeRecipe = recipe => {
    const index = recipes.findIndex( item => item.recipe === recipe );
    let recipesCopy = [...recipes]
    recipesCopy.splice( index, 1 );
    setRecipes(recipesCopy)
  };
  return { recipes, addRecipe, removeRecipe };
};

export default function NewRepcipes() {
    const [name, setName] = useState('');
    const nameInput = useRef();
    const { recipes, addRecipe, removeRecipe } = UseRecipes();

    return (
        <View style = {styles.container}>
          <View style = {styles.container2} >
          <View>
            <TextInput
              ref = {nameInput} 
              style = {styles.input}
              placeholder="Enter recipe details..."
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.button}>
              <Button 
                title='Add'
                onPress={() => {
                  nameInput.current.blur();
                  addRecipe(name);
                  setName("");
                }}
              />
          </View>
          </View>
          <FlatList
            data = {recipes}
            renderItem = {
              ({item}) => {
                return (
                  <RecipeBox recipeName = {item.recipe} removeHandler = {removeRecipe}/>
                )
              }
            }
          />
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      padding: 20
    },
    container2: {
      flexDirection: 'row',
      backgroundColor: '#fff',
      alignItems: 'center'
    },
    input: {
      borderWidth: 3,
      borderRadius: 10,
      width: 250,
      height: 100,
      padding: 10,
      margin: 10
    },
    button: {
      paddingVertical: 12,
      paddingHorizontal: 32,
      borderRadius: 10,
      backgroundColor: 'aliceblue',
      borderColor: 'black',
      borderWidth: 4,
      color: 'black'
    }
  });
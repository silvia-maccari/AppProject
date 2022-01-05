import React, { useState, useRef, useEffect } from 'react';
import { Text, TextInput, StyleSheet, View, Button, FlatList } from 'react-native';
import TodoBox from "./components/TodoBox"
import { generate } from "shortid"
import AsyncStorage from '@react-native-async-storage/async-storage';

const UseToDos = () => {
  const [todos, setTodos] = useState([])

  const loadTodos = async () => {
    const todoData = await AsyncStorage.getItem('@TodoStore:Todos');
    if (todoData) {
      const todos = JSON.parse(todoData);
      setTodos(todos);
    }
  }

  // load all the items that are currently saved on every render. OnPress causes the component to rerender
  useEffect(() => {
    if (todos.length) return;
    loadTodos();
  },[])

  // saves any additional items that get added. This runs on the first render and any time the dependency value changes
  useEffect(() => {
    AsyncStorage.setItem('@TodoStore:Todos', JSON.stringify(todos));
  },[todos])

  const addTodo = todo => {
    const newTodo = {id: generate(), todo}
    setTodos([newTodo,...todos])
  };
  
  const removeTodo = todo => {
    const index = todos.findIndex( item => item.todo === todo );
    let todosCopy = [...todos]
    todosCopy.splice( index, 1 );
    setTodos(todosCopy)
  };
  return { todos, addTodo, removeTodo };
};

export default function NewToDos() {
    const [name, setName] = useState('');
    const nameInput = useRef();
    const { todos, addTodo, removeTodo } = UseToDos();

    return (
        <View style = {styles.container}>
          <View style = {styles.container2} >
          <View>
            <TextInput
              ref = {nameInput} 
              style = {styles.input}
              placeholder="Enter to do details..."
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.button}>
              <Button 
                title='Add'
                onPress={() => {
                  nameInput.current.blur();
                  addTodo(name);
                  setName("");
                }}
              />
          </View>
          </View>
          <FlatList
            data = {todos}
            renderItem = {
              ({item}) => {
                return (
                  <TodoBox todoName = {item.todo} removeHandler = {removeTodo}/>
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
import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import List from './src/screens/List/List';
import Article from './src/screens/Article/Article';

export default class App extends Component {
  render() {
    const Stack = createStackNavigator();

    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="List"
            component={List}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Article"
            component={Article}
            // options={{title: 'Article Screen', headerTitleAlign: 'center'}}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

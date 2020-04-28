import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, Dimensions} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Camping from './src/screens/Camping';
import Setting from './src/screens/Setting';

const Stack = createStackNavigator();
const {width, height} = Dimensions.get('window');

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: 'transparent',
              height: height * 0.08
            },
            headerTitle: null,
            headerBackTitleVisible: false,
            headerBackImage: () => { return null}

          }}>
          <Stack.Screen name="Camping" component={Camping} />
          <Stack.Screen name="Setting" component={Setting} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

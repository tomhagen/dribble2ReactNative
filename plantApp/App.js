import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Text, View, Image, Settings} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Welcome from './src/screens/Welcome';
import Login from './src/screens/Login';
import Signup from './src/screens/Signup';
import Forgot from './src/screens/Forgot';
import Browse from './src/screens/Browse';
import Explore from './src/screens/Explore';
import Setting from './src/screens/Setting';
import * as theme from './src/constants/theme';
import Product from './src/screens/Product';
import {Button} from './src/components';
import EntypoIcon from 'react-native-vector-icons/Entypo';

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    // const {navigation} = this.props;
    // console.log(navigation); 
    // --> Ở ngoài App không có đối tượng navigation ?

    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              height: theme.sizes.base * 5,
              backgroundColor: theme.colors.white,
              borderBottomColor: '#fff',
            },

            headerTitle: null,
            headerBackImage: () => (
              <Image source={require('./src/assets/icons/back.png')} />
            ),
            headerBackTitleVisible: false,
            headerLeftContainerStyle: {
              paddingLeft: theme.sizes.padding,
              paddingTop: theme.sizes.padding,
            },
          }}>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Forgot" component={Forgot} />
          <Stack.Screen name="Browse" component={Browse} />
          <Stack.Screen name="Explore" component={Explore} />
          <Stack.Screen name="Setting" component={Setting} />
          <Stack.Screen
            name="Product"
            component={Product}
            options={{
              headerRight: () => (
                <Button style={{marginRight: 20, justifyContent: 'flex-end'}}>
                  <EntypoIcon
                    name="dots-three-horizontal"
                    size={16}
                    color={theme.colors.gray2}
                  />
                </Button>
              ),
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

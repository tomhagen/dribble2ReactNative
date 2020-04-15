import React from 'react';
import * as theme from './theme';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export default {
  light: {
    name: 'Light',
    icon: ({size, color, ...props}) => {
      return (
        <EntypoIcon name="light-up" size={size} color={color} {...props} />
      );
    },
  },
  ac: {
    name: 'AC',
    icon: ({size, color, ...props}) => {
      return (
        <MaterialIcon
          name="air-conditioner"
          size={size}
          color={color}
          {...props}
        />
      );
    },
  },
  temperature: {
    name: 'Temperature',
    icon: ({size, color, ...props}) => {
      return (
        <FontAwesome5
          name="temperature-high"
          size={size}
          color={color}
          {...props}
        />
      );
    },
  },
  fan: {
    name: 'Fan',
    icon: ({size, color, ...props}) => {
      return <MaterialIcon name="fan" size={size} color={color} {...props} />;
    },
  },
  wifi: {
    name: 'Wifi',
    icon: ({size, color, ...props}) => {
      return <FontAwesome5 name="wifi" size={size} color={color} {...props} />;
    },
  },
  electricity: {
    name: 'Electricity',
    icon: ({size, color, ...props}) => {
      return (
        <MaterialIcon
          name="weather-lightning"
          size={size}
          color={color}
          {...props}
        />
      );
    },
  },
};

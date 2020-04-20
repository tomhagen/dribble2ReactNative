import React, {Component} from 'react';
import {Text, View, Switch, Platform} from 'react-native';
import * as theme from '../constants/theme';

const GRAY_COLOR = 'rgba(168, 182, 200, 0.30)';

export default class SwitchInput extends Component {
  render() {
    const {value, ...props} = this.props;
    let thumbColor = null;
    if (Platform.OS === 'android') {
      thumbColor = GRAY_COLOR;
      if (props.value) thumbColor = theme.colors.secondary;
    }
    return (
      <Switch
        thumbColor={thumbColor}
        ios_backgroundColor={GRAY_COLOR}
        trackColor={{true: theme.colors.secondary}}
        value={value}
        {...props}
      />
    );
  }
}

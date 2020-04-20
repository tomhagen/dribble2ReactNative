import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import * as theme from '../constants/theme';

export default class Divider extends Component {
  render() {
    const {color, style, ...props} = this.props;

    const dividerStyle = [style, styles.divider];

    return (
      <View
        style={dividerStyle}
        color={color || theme.colors.gray2}
        {...props}
      />
    );
  }
}

const styles = StyleSheet.create({
  divider: {
    height: 0,
    marginVertical: theme.sizes.base * 2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: theme.colors.gray2,
  },
});

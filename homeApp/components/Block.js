import React, {Component} from 'react';
import {Text, View, StyleSheet} from 'react-native';

export default class Block extends Component {
  render() {
    const {
      flex,
      row,
      column,
      center,
      middle,
      right,
      space,
      style,
      children,
      ...props
    } = this.props;
    const blockStyles = [
      flex && {flex},
      flex === 'disabled' && {flex: 0},
      center && styles.center,
      middle && styles.middle,
      right && styles.right,
      row && styles.row,
      column && styles.column,
      style
    ];
    return (
      <View style={blockStyles} {...props}>
        {children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween:{
    justifyContent:'space-between'
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
});

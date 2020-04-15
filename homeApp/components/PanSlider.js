import React, {Component} from 'react';
import {Text, View, Dimensions, StyleSheet, PanResponder} from 'react-native';
import * as theme from '../theme';

const {width, height} = Dimensions.get('window');
const CONTROLLER_HEIGHT = height * 0.3;

export default class PanSlider extends Component {
  state = {
    panValue: 0,
    rangeValue: 0,
    percentage: 0,
  };
  handleMove = moveValue => {
    const {panValue} = this.state;
    const {minValue, maxValue} = this.props;
    const max = maxValue > CONTROLLER_HEIGHT ? maxValue : CONTROLLER_HEIGHT;
    const range = (maxValue || max) - minValue;

    let value = panValue - moveValue / range;
    if (value > max) value = max;
    if (value < minValue) value = minValue;
    const percentage = (value / max) * 100;
    const rangeValue = (range * percentage)/ 100;
    this.setState({panValue: value, rangeValue, percentage});
  };
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onStartShouldSetPanResponderCapture: () => true,
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, {dy}) => this.handleMove(dy),
  });
  render() {
    const {minValue} = this.props;
    const {rangeValue, percentage, panValue} = this.state;
    return (
      <View style={[styles.controller]} {...this.panResponder.panHandlers}>
        <View style={styles.controllerValue}>
          <Text>{rangeValue ? rangeValue.toFixed(0) : minValue}</Text>
        </View>
        <View style={[styles.controllerOverlay, {height: `${percentage || minValue}%`}]} />
      </View>
    );
  }
}

PanSlider.defaultProps = {
  value: 0,
  minValue: 10,
  maxValue: 45,
};
const styles = StyleSheet.create({
  controller: {
    // flex: 0.5,
    width: 85,
    height: CONTROLLER_HEIGHT,
    backgroundColor: theme.colors.gray,
    borderRadius: 10,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  controllerValue: {
    position: 'absolute',
    top: CONTROLLER_HEIGHT * 0.2,
    left: 0,
    right: 0,
    zIndex: 2,
  },
  controllerOverlay: {
    width: 85,

    backgroundColor: theme.colors.primary,
  },
});

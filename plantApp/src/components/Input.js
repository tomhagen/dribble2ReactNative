import React, {Component} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import * as theme from '../constants/theme';
import {Button} from '../components';
import EntypoIcon from 'react-native-vector-icons/Entypo';

export default class Input extends Component {
  state = {
    toggleSecure: false,
  };

  renderLable = () => {
    const {label, error} = this.props;
    return (
      <View style={{marginTop: theme.sizes.margin}}>
        {label ? (
          <Text style={{color: theme.colors.gray, fontSize: theme.fonts.body}}>
            {label}
          </Text>
        ) : null}
      </View>
    );
  };

  renderToggle = () => {
    const {secure} = this.props;
    const {toggleSecure} = this.state;

    if (!secure) return null;
    return (
      <Button
        style={styles.toggle}
        onPress={() => this.setState({toggleSecure: !toggleSecure})}>
        <EntypoIcon name={!toggleSecure ? 'eye-with-line' : 'eye'} size={20} />
      </Button>
    );
  };

  renderRightIcon = () => {
    const {rightLable, rightStyle, onRightPress} = this.props;
    if (!rightLable) return null;

    return (
      <Button
        style={[styles.toggle, rightStyle]}
        onPress={() => onRightPress && onRightPress()}>
        {rightLable}
      </Button>
    );
  };
  render() {
    const {
      email,
      phone,
      number,
      error,
      secure,
      style,
      defaultValue,
      ...props
    } = this.props;
    const inputStyles = [
      styles.input,
      error && {borderColor: theme.colors.accent},
      style,
    ];
    const {toggleSecure} = this.state;
    const isSecure = toggleSecure ? false : secure;

    const keyboardType = email
      ? 'email-address'
      : number
      ? 'numeric'
      : phone
      ? 'phone-pad'
      : 'default';
    return (
      <View>
        {this.renderLable()}
        <TextInput
          style={inputStyles}
          secureTextEntry={isSecure}
          autoCompleteType="off"
          autoCapitalize="none"
          autoCorrect={false}
          keyboardType={keyboardType}
          defaultValue={defaultValue}
          {...props}
        />

        {this.renderToggle()}
        {this.renderRightIcon()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  input: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray,
    borderRadius: theme.sizes.radius,
    fontSize: theme.fonts.h3,
    fontWeight: '500',
    color: theme.colors.black,
    height: theme.sizes.base * 3,
  },
  toggle: {
    position: 'absolute',
    top: theme.sizes.base * 2,
    right: 0,
    width: theme.sizes.base * 2,
    height: theme.sizes.base * 2,
  },
});

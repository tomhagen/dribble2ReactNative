import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  KeyboardAvoidingView,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import * as theme from '../constants/theme';
import {Button, Input} from '../components';

const {width, height} = Dimensions.get('window');
const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = 'subscribe';

export default class Login extends Component {
  state = {
    email: VALID_EMAIL,
    password: VALID_PASSWORD,
    error: [],
    loading: false,
  };

  handleLogin = () => {
    const {navigation} = this.props;
    const {email, password} = this.state;
    const error = [];

    Keyboard.dismiss();

    this.setState({loading: true});

    // Fake validation

    if (email !== VALID_EMAIL) {
      error.push('email');
    }
    if (password !== VALID_PASSWORD) {
      error.push('password');
    }
    setTimeout(() => {
      this.setState({error, loading: false});
    }, 1500);
    if (!error.length) {
      Alert.alert('Login success !', 'Redirecting...', [
        {
          text: 'OK.',
          onPress: () => {
            navigation.navigate('Browse');
          },
        },
      ]);
      // navigation.navigate('Browse');
    }
  };
  
  render() {
    const {navigation} = this.props;
    const {error, loading} = this.state;

    const hasError = key => (error.includes(key) ? styles.hasError : null);

    return (
      <View style={(styles.flex, styles.container)}>
        <Text style={{fontSize: theme.fonts.h1, color: theme.colors.black}}>
          Login
        </Text>
        <View style={[{marginTop: theme.sizes.margin}]}>
          <Input
            label="Email"
            email
            style={[styles.input, hasError('email')]}
            error={hasError('email')}
            defaultValue={this.state.email}
            onChangeText={text => this.setState({email: text})}
          />
          <Input
            secure
            label="Password"
            error={hasError('password')}
            style={[styles.input, hasError('password')]}
            defaultValue={this.state.password}
            onChangeText={text => this.setState({password: text})}
          />
          <Button
            gradient
            style={{marginTop: theme.sizes.margin}}
            onPress={() => this.handleLogin()}>
            {loading ? (
              <ActivityIndicator color="white" size="small" />
            ) : (
              <Text style={{color: theme.colors.white, textAlign: 'center'}}>
                Login
              </Text>
            )}
          </Button>
          <Button onPress={() => navigation.navigate('Forgot')}>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                textAlign: 'center',
                textDecorationLine: 'underline',
              }}>
              Forgot your password?
            </Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding,
    height: height,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: theme.fonts.body,
  },
  hasError: {
    borderBottomColor: 'red',
  },
});

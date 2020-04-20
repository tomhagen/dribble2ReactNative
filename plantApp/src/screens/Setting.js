import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';
import * as theme from '../constants/theme';
import * as mock from '../constants/mocks';
import {Divider, Switch} from '../components';
import Slider from '@react-native-community/slider';

const {width, height} = Dimensions.get('window');

export default class Setting extends Component {
  state = {
    profile: {},
    editing: null,
    budget: 1000,
    monthly: 5000,
    notification: true,
    newsletter: false,
  };
  componentDidMount() {
    this.setState({profile: this.props.profile});
  }

  handleChangeText = (name, value) => {
    const {profile} = this.state;
    profile[name] = value;
    this.setState({profile});
  };

  renderInput = name => {
    const {profile, editing} = this.state;
    if (editing === name) {
      return (
        <TextInput
          defaultValue={profile[name]}
          onChangeText={value => this.handleChangeText([name], value)}
        />
      );
    }
    return <Text>{profile[name]}</Text>;
  };

  toggleInputEdit = name => {
    const {editing} = this.state;
    this.setState({editing: !editing ? name : null});
  };
  render() {
    const {profile, editing} = this.state;
    return (
      <View style={[styles.flex, styles.container]}>
        <View style={[styles.row, styles.header]}>
          <Text style={{fontSize: theme.fonts.h1, color: theme.colors.black}}>
            Settings
          </Text>
          <TouchableOpacity>
            <Image source={profile && profile.avatar} style={styles.avatar} />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={[styles.info]}>
            <View style={[styles.row, styles.inputRow]}>
              <View>
                <Text
                  style={{
                    fontSize: theme.fonts.body,
                    color: theme.colors.gray,
                    marginBottom: 10,
                  }}>
                  Username
                </Text>
                {this.renderInput('username')}
              </View>
              <Text
                style={{
                  fontSize: theme.fonts.body,
                  color: theme.colors.primary,
                }}
                onPress={() => this.toggleInputEdit('username')}>
                {editing === 'username' ? 'Save' : 'Edit'}
              </Text>
            </View>
            <View
              style={[
                styles.row,
                styles.inputRow,
                {marginTop: theme.sizes.padding},
              ]}>
              <View>
                <Text
                  style={{
                    fontSize: theme.fonts.body,
                    color: theme.colors.gray,
                    marginBottom: 10,
                  }}>
                  Location
                </Text>
                {this.renderInput('location')}
              </View>
              <Text
                style={{
                  fontSize: theme.fonts.body,
                  color: theme.colors.primary,
                }}
                onPress={() => this.toggleInputEdit('location')}>
                {editing === 'location' ? 'Save' : 'Edit'}
              </Text>
            </View>
            <View
              style={[
                styles.row,
                styles.inputRow,
                {marginTop: theme.sizes.padding},
              ]}>
              <View>
                <Text
                  style={{
                    fontSize: theme.fonts.body,
                    color: theme.colors.gray,
                    marginBottom: 10,
                  }}>
                  Email
                </Text>
                {this.renderInput('email')}
              </View>
            </View>
          </View>
          <Divider />
          <View style={[styles.sliders]}>
            <View>
              <Text
                style={{fontSize: theme.fonts.body, color: theme.colors.gray2}}>
                Budgets
              </Text>
              <Slider
                maximumValue={1200}
                minimumValue={0}
                //   trackStyle={{ height: 6, borderRadius: 6 }} --> deprecated
                //   thumbStyle={styles.thumb}   // --> deprecated
                thumbImage={require('../assets/icons/plants.png')}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.budget}
                onValueChange={value => this.setState({budget: value})}
              />
              <Text
                style={{
                  fontSize: theme.fonts.caption,
                  color: theme.colors.gray2,
                  textAlign: 'right',
                }}>
                ${this.state.budget.toFixed(0)}
              </Text>
            </View>
            <View>
              <Text
                style={{fontSize: theme.fonts.body, color: theme.colors.gray2}}>
                Monthly Cap
              </Text>
              <Slider
                maximumValue={15000}
                minimumValue={0}
                //   trackStyle={{ height: 6, borderRadius: 6 }} --> deprecated
                //   thumbStyle={styles.thumb}   // --> deprecated
                thumbImage={require('../assets/icons/sprayers.png')}
                minimumTrackTintColor={theme.colors.secondary}
                maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
                value={this.state.monthly}
                onValueChange={value => this.setState({monthly: value})}
              />
              <Text
                style={{
                  fontSize: theme.fonts.caption,
                  color: theme.colors.gray2,
                  textAlign: 'right',
                }}>
                ${this.state.monthly.toFixed(0)}
              </Text>
            </View>
          </View>
          <Divider />
          <View style={[styles.notification]}>
            <View
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  marginBottom: theme.sizes.base,
                },
              ]}>
              <Text>Notifications</Text>
              <Switch
                value={this.state.notification}
                onValueChange={value => this.setState({notification: value})}
              />
            </View>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <Text>Newsletter</Text>
              <Switch
                value={this.state.newsletter}
                onValueChange={value => this.setState({newsletter: value})}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Setting.defaultProps = {
  profile: mock.profile,
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
  },
  header: {
    // flex: 1,
    justifyContent: 'space-between',
    marginBottom: theme.sizes.margin
  },
  avatar: {
    height: theme.sizes.base * 2,
    width: theme.sizes.base * 2,
  },
  info: {
    // flex: 3,
  },
  inputRow: {
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  sliders: {
    // flex: 2,
  },
  thumb: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderColor: 'white',
    borderWidth: 3,
    backgroundColor: theme.colors.secondary,
  },
  notification: {
    // flex: 1,
  },
});

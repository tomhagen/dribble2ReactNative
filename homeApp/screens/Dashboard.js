import React, {Component} from 'react';
import {
  Text,
  View,
  StyleShee,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import * as theme from '../theme';
import mocks from '../setting';

import {LineChart} from 'react-native-svg-charts';
import * as shape from 'd3-shape';
const {width, height} = Dimensions.get('window');

export default class Dashboard extends Component {
  render() {
    const {navigation, setting} = this.props;
    // console.log(this.props);
    const LightIcon = setting['light'].icon;
    const AcIcon = setting['ac'].icon;
    const TempIcon = setting['temperature'].icon;
    const FanIcon = setting['fan'].icon;
    const WifiIcon = setting['wifi'].icon;
    const ElectricityIcon = setting['electricity'].icon;

    return (
      <View style={[styles.container, styles.flex]}>
        <View style={[styles.welcome]}>
          <Text style={{fontSize: 14, color: theme.colors.gray_bold}}>
            Hello
          </Text>
          <Text style={{fontSize: 15, fontWeight: 'bold'}}>John Doe</Text>
        </View>
        <View style={[styles.info, styles.row]}>
          <View style={[styles.row, styles.flex, {alignItems: 'baseline'}]}>
            <Text style={{fontSize: 100, fontWeight: 'bold'}}>34</Text>
            <Text style={{fontSize: 30, fontWeight: 'bold'}}>°C</Text>
          </View>
          <View style={[styles.flex]}>
            <Text style={{fontSize: 14, color: theme.colors.gray_bold}}>
              Humidity
            </Text>
            <LineChart
              yMax={90}
              yMin={10}
              style={{ flex: 0.8 }}
              curve={shape.curveNatural}
              data={[0, 20, 25, 15, 20, 55, 70, 68]}
              svg={{stroke: theme.colors.primary, strokeWidth: 3}}
            />
          
          </View>
        </View>
        <View style={[styles.buttonContainer]}>
          <View>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', marginVertical: 5},
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Setting', {name: 'light'})}>
                <View style={[styles.button]}>
                  <LightIcon size={40} color={theme.colors.primary} />
                  <Text>{setting['light'].name}</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Setting', {name: 'ac'})}>
                <View style={[styles.button]}>
                  <AcIcon size={40} color={theme.colors.primary} />
                  <Text>{setting['ac'].name}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', marginVertical: 5},
              ]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Setting', {name: 'temperature'})
                }>
                <View style={[styles.button]}>
                  <TempIcon size={40} color={theme.colors.primary} />
                  <Text>Temperature</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('Setting', {name: 'fan'})}>
                <View style={[styles.button]}>
                  <FanIcon size={40} color={theme.colors.primary} />
                  <Text>Fan</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', marginVertical: 5},
              ]}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Setting', {name: 'wifi'})}>
                <View style={[styles.button]}>
                  <WifiIcon size={40} color={theme.colors.primary} />
                  <Text>Wifi</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Setting', {name: 'electricity'})
                }>
                <View style={[styles.button]}>
                  <ElectricityIcon size={40} color={theme.colors.primary} />
                  <Text>Electricity</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

Dashboard.defaultProps = {
  setting: mocks,
};
const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  column: {
    flexDirection: 'column',
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
  },
  welcome: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  info: {
    flex: 1.5,
  },
  buttonContainer: {
    flex: 6,
    paddingHorizontal: theme.sizes.padding / 2,
  },
  button: {
    backgroundColor: theme.colors.gray,
    width:
      (width - theme.sizes.padding * 1.5 * 2 - theme.sizes.padding * 2) / 2,
    height:
      (width - theme.sizes.padding * 1.5 * 2 - theme.sizes.padding * 2) / 2,
    borderRadius:
      (width - theme.sizes.padding * 1.5 * 2 - theme.sizes.padding * 2) / 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

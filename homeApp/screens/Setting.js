import React, {Component} from 'react';
import {
  Text,
  View,
  StyleShee,
  ScrollView,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Slider,
  PanResponder,
} from 'react-native';
import * as theme from '../theme';
import mocks from '../setting';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import PanSlider from '../components/PanSlider';

const {width, height} = Dimensions.get('window');

export default class Setting extends Component {
  state = {
    direction: 45,
    speed: 12,
  };

  render() {
    const {navigation, setting, route} = this.props;
    const {name} = this.props.route.params;

    const AcIcon = setting[name].icon;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <FontAwesome name="arrow-left" size={15} />
          </TouchableWithoutFeedback>
        </View>
        <View style={[styles.info, styles.row]}>
          <View style={[styles.infoNumber]}>
            <AcIcon size={60} color={theme.colors.gray_bold} />
            <View style={[styles.row, {alignItems: 'baseline'}]}>
              <Text style={{fontSize: 100, fontWeight: 'bold'}}>27</Text>
              <Text style={{fontSize: 30, fontWeight: 'bold'}}>°C</Text>
            </View>
            <Text style={{fontSize: 14, color: theme.colors.gray_bold}}>
              Temperature
            </Text>
          </View>
          <PanSlider />
        </View>
        <View style={styles.direction}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Text style={{fontSize: 17}}>Direction</Text>
            <Text style={{fontSize: 17}}>{this.state.direction}°</Text>
          </View>
          <Slider
            value={45}
            thumbTintColor={theme.colors.primary}
            minimumValue={0}
            maximumValue={100}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.gray}
            onValueChange={value =>
              this.setState({direction: parseInt(value, 10)})
            }
          />
        </View>
        <View style={styles.speed}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <Text style={{fontSize: 17}}>Speed</Text>
            <Text style={{fontSize: 17}}>{this.state.speed}</Text>
          </View>
          <Slider
            value={12}
            thumbTintColor={theme.colors.primary}
            minimumValue={0}
            maximumValue={30}
            minimumTrackTintColor={theme.colors.primary}
            maximumTrackTintColor={theme.colors.gray}
            onValueChange={value => this.setState({speed: parseInt(value, 10)})}
          />
        </View>
      </View>
    );
  }
}

Setting.defaultProps = {
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
    flex: 1,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
  },
  info: {
    flex: 4,

    paddingHorizontal: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoNumber: {
    flex: 1,
    justifyContent: 'center',
  },

  direction: {
    flex: 1,
  },
  speed: {
    flex: 4,
    marginTop: 20,
  },
});

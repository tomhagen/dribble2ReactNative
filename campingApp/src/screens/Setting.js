import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import * as theme from '../constants/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {setFilter} from '../reducers/camping';

const {width, height} = Dimensions.get('window');

class Setting extends Component {
  state = {
    sort: 'distance',
    type: 'all',
    price: 'free',
    option_full: true,
    option_rated: true,
    option_free: false,
  };

  renderHeader = () => {
    const {navigation} = this.props;
    return (
      <View style={[styles.row, {justifyContent: 'space-between'}]}>
        <TouchableOpacity onPress={() => navigation.navigate('Camping')}>
          <AntDesign name="arrowleft" size={20} color={theme.colors.black} />
        </TouchableOpacity>
        <Text style={{fontSize: theme.fonts.h2, color: theme.colors.black}}>
          Filter
        </Text>
        <AntDesign name="search1" size={20} color={theme.colors.black} />
      </View>
    );
  };

  renderSortBy = () => {
    const {
      sort,
      type,
      price,
      option_full,
      option_rated,
      option_free,
    } = this.props.filter;
    return (
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>Sort By</Text>
        </View>
        <View style={[styles.row, styles.group]}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.first,

              sort === 'distance' ? styles.activeButton : null,
            ]}
            onPress={() => this.props.onSetFilter({sort: 'distance'})}>
            <Text
              style={[
                styles.buttonText,
                sort === 'distance' ? styles.activeButtonText : null,
              ]}>
              Distance
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              sort === 'ratings' ? styles.activeButton : null,
            ]}
            onPress={() => this.props.onSetFilter({sort: 'ratings'})}>
            <Text
              style={[
                styles.buttonText,
                sort === 'ratings' ? styles.activeButtonText : null,
              ]}>
              Ratings
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.last,
              sort === 'review' ? styles.activeButton : null,
            ]}
            onPress={() => this.props.onSetFilter({sort: 'review'})}>
            <Text
              style={[
                styles.buttonText,
                sort === 'review' ? styles.activeButtonText : null,
              ]}>
              Review
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderType = () => {
    const {
      sort,
      type,
      price,
      option_full,
      option_rated,
      option_free,
    } = this.props.filter;

    const activeType = (key) => type === key;

    return (
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>Type</Text>
        </View>
        <View style={[styles.row, styles.group]}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.first,
              activeType('all') ? styles.activeButton : null,
            ]}
            onPress={() => this.props.onSetFilter({type: 'all'})}>
            <View style={styles.row}>
              <Fontisto
                name="tent"
                size={20}
                color={
                  activeType('all')
                    ? theme.colors.white
                    : theme.colors.secondary
                }
              />
              <FontAwesome
                name="truck"
                size={20}
                color={
                  activeType('all')
                    ? theme.colors.white
                    : theme.colors.secondary
                }
              />
            </View>
            <Text
              style={[
                styles.buttonText,
                {marginTop: 10},
                activeType('all') ? styles.activeButtonText : null,
              ]}>
              All
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              activeType('tenting') ? styles.activeButton : null,
            ]}
            onPress={() => this.props.onSetFilter({type: 'tenting'})}>
            <Fontisto
              name="tent"
              size={20}
              color={
                activeType('tenting')
                  ? theme.colors.white
                  : theme.colors.primary
              }
            />
            <Text
              style={[
                styles.buttonText,
                activeType('tenting') ? styles.activeButtonText : null,
                {marginTop: 10},
              ]}>
              Tenting
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              styles.last,
              activeType('rv') ? styles.activeButton : null,
            ]}
            onPress={() => this.props.onSetFilter({type: 'rv'})}>
            <FontAwesome
              name="truck"
              size={20}
              color={
                activeType('rv') ? theme.colors.white : theme.colors.secondary
              }
            />
            <Text
              style={
                (styles.buttonText,
                activeType('rv') ? styles.activeButtonText : null,
                {marginTop: 10})
              }>
              RV Camping
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderPrice = () => {
    return (
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>Price</Text>
        </View>
        <View style={[styles.row, styles.group]}>
          <TouchableOpacity
            style={[styles.button, styles.first, styles.activeButton]}>
            <Text style={[styles.buttonText, styles.activeButtonText]}>
              Free
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>$$</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>$$$</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.last]}>
            <Text style={styles.buttonText}>$$$</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  renderOptions = () => {
    return (
      <View style={styles.section}>
        <View>
          <Text style={styles.title}>More Options</Text>
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.sizes.margin,
            },
          ]}>
          <Text style={{fontSize: theme.fonts.header, fontWeight: '500'}}>
            Show spots that are full
          </Text>
          <Switch
            trackColor={{false: theme.colors.gray, true: theme.colors.primary}}
            thumbColor={theme.colors.white}
            ios_backgroundColor={theme.colors.primary}
            value={true}
          />
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.sizes.margin,
            },
          ]}>
          <Text style={{fontSize: theme.fonts.header, fontWeight: '500'}}>
            Show only highly rated spots
          </Text>
          <Switch
            trackColor={{false: theme.colors.gray, true: theme.colors.primary}}
            thumbColor={theme.colors.white}
            ios_backgroundColor={theme.colors.primary}
            value={true}
          />
        </View>
        <View
          style={[
            styles.row,
            {
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: theme.sizes.margin,
            },
          ]}>
          <Text style={{fontSize: theme.fonts.header, fontWeight: '500'}}>
            Show only Free Spots
          </Text>
          <Switch
            trackColor={{false: theme.colors.gray, true: theme.colors.primary}}
            thumbColor={theme.colors.white}
            ios_backgroundColor={theme.colors.gray_light}
            value={false}
          />
        </View>
      </View>
    );
  };
  render() {
    console.log('setting props', this.props);

    return (
      <View style={[styles.flex, styles.container]}>
        {this.renderHeader()}
        {this.renderSortBy()}
        {this.renderType()}
        {this.renderPrice()}
        {this.renderOptions()}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filter: state.filter,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSetFilter: (payload) => {
      dispatch(setFilter(payload));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Setting);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.white,
  },
  section: {
    paddingVertical: theme.sizes.padding,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.gray_light,
  },
  title: {
    fontSize: theme.fonts.h2,
    color: theme.colors.black,
    marginBottom: theme.sizes.margin,
  },
  group: {
    borderColor: theme.colors.primary,
    borderWidth: 1,
    borderRadius: theme.sizes.radius * 2 + 1,
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    // paddingHorizontal: theme.sizes.padding,s
    paddingVertical: theme.sizes.padding / 1.5,
    alignItems: 'center',
  },
  first: {
    borderTopLeftRadius: theme.sizes.radius * 2,
    borderBottomLeftRadius: theme.sizes.radius * 2,
  },
  last: {
    borderTopRightRadius: theme.sizes.radius * 2,
    borderBottomRightRadius: theme.sizes.radius * 2,
  },
  buttonText: {
    fontWeight: '500',
    textAlign: 'center',
  },
  activeButtonText: {
    color: theme.colors.white,
  },
  activeButton: {
    backgroundColor: theme.colors.primary,
  },
});

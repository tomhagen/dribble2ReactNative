import React, {Component} from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
} from 'react-native';
import * as theme from '../constants/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import MapView from 'react-native-maps';
import {connect} from 'react-redux';
import {setFilter} from '../reducers/camping';


const {Marker} = MapView;
const {width, height} = Dimensions.get('window');

class Camping extends Component {
  state = {
    campingList: this.props.camping,
    active: 'all',
  };
  renderHeader = () => {
    const {navigation} = this.props;

    return (
      <View style={[styles.flex, styles.row, styles.header]}>
        <View style={[styles.row, {alignItems: 'center'}]}>
          <View style={styles.locationIcon}>
            <FontAwesome
              name="location-arrow"
              size={10}
              color={theme.colors.white}
            />
          </View>
          <View style={styles.options}>
            <Text
              style={{
                fontSize: theme.fonts.caption,
                color: theme.colors.gray,
              }}>
              Detected Locations
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.h3,
                color: theme.colors.black,
              }}>
              Northern Island <Ionicon name="ios-arrow-down" />{' '}
            </Text>
          </View>
        </View>
        <View style={styles.settingIcon}>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <AntDesign name="setting" size={24} color={theme.colors.black} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  handleTab = (tabKey) => {
    // const {campingList, active} = this.state;
    // const {}
    // let newCampings = campingList;
    // if (tabKey !== 'all') {
    //   newCampings = campingList.filter((camping) => camping.type === tabKey);
    // }

    // this.setState({active: tabKey, campingList: newCampings});
    this.props.onSetFilter({type: tabKey});
  };

  renderTabs = () => {
    const {filter} = this.props;

    return (
      <View style={[styles.row, styles.tabs]}>
        <View
          style={[styles.tab, filter.type === 'all' ? styles.active : null]}>
          <Text
            style={{
              fontSize: theme.fonts.header,
              fontWeight: '500',
              color: `${
                filter.type === 'all'
                  ? theme.colors.primary
                  : theme.colors.black
              }`,
            }}
            onPress={() => this.handleTab('all')}>
            All Spots
          </Text>
        </View>
        <View
          style={[
            styles.tab,
            filter.type === 'tenting' ? styles.active : null,
          ]}>
          <Text
            style={{
              fontSize: theme.fonts.header,
              fontWeight: '500',
              color: `${
                filter.type === 'tenting'
                  ? theme.colors.primary
                  : theme.colors.black
              }`,
            }}
            onPress={() => this.handleTab('tenting')}>
            Tenting
          </Text>
        </View>
        <View style={[styles.tab, filter.type === 'rv' ? styles.active : null]}>
          <Text
            style={{
              fontSize: theme.fonts.header,
              fontWeight: '500',
              color: `${
                filter.type === 'rv' ? theme.colors.primary : theme.colors.black
              }`,
            }}
            onPress={() => this.handleTab('rv')}>
            RV Camping
          </Text>
        </View>
      </View>
    );
  };
  renderMapView = () => {
    const campingMarker = ({type}) => (
      <View style={[styles.marker, styles[`${type}Marker`]]}>
        {type === 'rv' ? (
          <FontAwesome name="truck" size={20} color={theme.colors.white} />
        ) : (
          <Fontisto name="tent" size={20} color={theme.colors.white} />
        )}
      </View>
    );
    const {filter, camping} = this.props;

    const mapList =
      filter.type === 'all'
        ? camping
        : camping.filter((camp) => camp.type === filter.type);

    return (
      <View style={{flex: 12}}>
        <MapView
          style={{width: width, height: 0.5 * height}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <Marker coordinate={this.props.location}>
            <View style={styles.myMarker}>
              <View style={styles.markerDot}></View>
            </View>
          </Marker>
          {mapList.map((marker, index) => (
            <Marker key={index} coordinate={marker.latlng}>
              {campingMarker(marker)}
            </Marker>
          ))}
        </MapView>
      </View>
    );
  };

  renderCampingList = () => {
    const {filter, camping} = this.props;

    const mapList =
      filter.type === 'all'
        ? camping
        : camping.filter((camp) => camp.type === filter.type);

    return mapList.map((item, index) => {
      return (
        <View style={[styles.flex, styles.camping]} key={index}>
          <ImageBackground
            source={{uri: item.image}}
            imageStyle={styles.imageCamping}
            style={styles.imageCamping}
          />
          <View style={{}}>
            <Text
              style={{
                fontSize: theme.fonts.h3,
                color: theme.colors.black,
                fontWeight: '600',
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.header,
                color: theme.colors.gray,
                marginVertical: theme.sizes.base / 2,
              }}>
              {item.description}
            </Text>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <View style={[styles.row, {alignItems: 'baseline'}]}>
                <Entypo
                  name="star"
                  size={theme.fonts.header}
                  color={theme.colors.secondary}
                />
                <Text
                  style={{
                    fontSize: theme.fonts.header,
                    color: theme.colors.secondary,
                  }}>
                  {item.rating}
                </Text>
              </View>
              <View style={[styles.row, {alignItems: 'baseline'}]}>
                <FontAwesome
                  name="location-arrow"
                  size={theme.fonts.header}
                  color={theme.colors.primary}
                />
                <Text
                  style={{
                    fontSize: theme.fonts.header,
                    color: theme.colors.primary,
                  }}>
                  {item.distance} miles
                </Text>
              </View>
              <View style={[styles.row, {alignItems: 'baseline'}]}>
                <Entypo
                  name="price-tag"
                  size={theme.fonts.header}
                  color={theme.colors.black}
                />
                <Text
                  style={{
                    fontSize: theme.fonts.header,
                    color: theme.colors.black,
                  }}>
                  Free
                </Text>
              </View>
            </View>
          </View>
          <Entypo
            name="dots-three-vertical"
            size={25}
            color={theme.colors.gray}
          />
        </View>
      );
    });
  };
  render() {
    console.log(this.state);
    console.log('reducer state', this.props);

    return (
      <View style={[styles.flex, styles.container]}>
        {this.renderHeader()}
        <View style={{flex: 9}}>
          <ScrollView>
            {this.renderTabs()}
            {this.renderMapView()}
            {this.renderCampingList()}
          </ScrollView>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    camping: state.camping,
    location: state.location,
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
export default connect(mapStateToProps, mapDispatchToProps)(Camping);

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
  },
  header: {
    marginHorizontal: theme.sizes.margin,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationIcon: {
    width: theme.sizes.base,
    height: theme.sizes.base,
    borderRadius: theme.sizes.base / 2,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.white,
  },
  rvMarker: {
    backgroundColor: theme.colors.secondary,
  },
  tentingMarker: {
    backgroundColor: theme.colors.primary,
  },
  options: {
    marginLeft: 20,
  },

  tabs: {
    marginHorizontal: theme.sizes.margin * 2.5,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    flex: 1,
  },
  tab: {
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: 'transparent',
  },
  active: {
    borderBottomColor: theme.colors.primary,
  },
  camping: {
    flexDirection: 'row',
    borderBottomColor: theme.colors.gray_light,
    borderBottomWidth: 0.5,
    marginHorizontal: theme.sizes.margin,
    paddingVertical: theme.sizes.padding,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  imageCamping: {
    width: 0.3 * width,
    height: 0.3 * width,
    borderRadius: 10,
  },
  myMarker: {
    zIndex: 2,
    width: 60,
    height: 60,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(51, 83, 251, 0.2)',
  },
  markerDot: {
    width: 12,
    height: 12,
    borderRadius: 12,
    backgroundColor: '#3353FB',
  },
});

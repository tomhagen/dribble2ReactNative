import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableWithoutFeedback,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import * as theme from '../../../theme';
import IconEntypo from 'react-native-vector-icons/Entypo';
import Ionicon from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import {Marker} from 'react-native-maps';
import Modal from 'react-native-modal';
// import Dropdown from 'react-native-modal-dropdown';
// import {Dropdown} from 'react-native-material-dropdown';
// import {Picker} from '@react-native-community/picker';

const {width, height} = Dimensions.get('window');

const parkingsSpots = [
  {
    id: 1,
    title: 'Paid Street Parking',
    price: 5,
    rating: 4.2,
    spots: 20,
    free: 10,
    coordinate: {
      latitude: 37.78975,
      longitude: -122.4334,
    },
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software",
  },
  {
    id: 2,
    title: 'Parking 2',
    price: 7,
    rating: 3.8,
    spots: 25,
    free: 20,
    coordinate: {
      latitude: 37.78845,
      longitude: -122.4344,
    },
    description:
      'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.',
  },
  {
    id: 3,
    title: 'Parking 3',
    price: 10,
    rating: 4.9,
    spots: 50,
    free: 25,
    coordinate: {
      latitude: 37.78615,
      longitude: -122.4314,
    },
    description:
      "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary",
  },
];

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  container: {
    flex: 1,
    backgroundColor: theme.colors.white,
    width: width,
  },
  header: {
    flex: 0.5,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width,
    paddingTop: 30,
    paddingHorizontal: 24,
    // paddingBottom: 12
  },
  directionIcon: {
    width: 18,
    height: 18,
    backgroundColor: theme.colors.main,
    borderRadius: 9,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  directionInfo: {
    marginLeft: 10,
  },
  directionInfoTitleText: {
    color: theme.colors.gray,
    fontSize: 11,
    fontWeight: '500',
  },
  directionInfoLocationText: {
    fontSize: 15,
  },
  map: {
    flex: 4,
  },
  marker: {
    alignItems: 'center',
    backgroundColor: theme.colors.white,
    borderRadius: theme.sizes.radius * 2,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: theme.colors.white,
    position: 'relative',
  },
  markerPrice: {
    color: theme.colors.main,
    fontSize: 15,
    fontWeight: '500',
  },
  markerStatus: {
    color: theme.colors.gray,
    fontSize: 12,
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 5,
    borderRightWidth: 5,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: 'white',
    position: 'absolute',
    bottom: -8,
    left: '50%',
  },
  parkings: {
    position: 'absolute',
    right: 0,
    left: 0,
    bottom: 0,
    paddingBottom: 20,
    // flex: 1,
  },
  parking: {
    backgroundColor: theme.colors.white,
    padding: 12,
    marginHorizontal: 6,
    borderRadius: theme.sizes.radius / 2,
    width: width - 12 * 2,
  },
  parkingHours: {
    justifyContent: 'space-evenly',
  },
  parkingHoursTitle: {
    fontSize: theme.sizes.font * 0.9,
    fontWeight: '500',
  },
  parkingInfoContainer: {},
  parkingInfo: {
    justifyContent: 'center',
    marginHorizontal: 12,
  },
  parkingIcon: {
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  parkingBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    backgroundColor: theme.colors.main,
  },
  active: {
    borderColor: theme.colors.main,
    borderWidth: 2,
    borderTopColor: theme.colors.main,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    height: height * 0.75,
    padding: theme.sizes.base * 2,
    backgroundColor: theme.colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalInfo: {
    paddingVertical: theme.sizes.base,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    justifyContent: 'space-between',
  },
  parkingIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  modalHours: {
    paddingVertical: theme.sizes.base * 2.5,
  },
  modalHoursDropdown: {
    marginTop: 20,
  },
  modalPayBtn: {
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 16,
    borderRadius: 6,
    backgroundColor: theme.colors.main,
  },
  hoursDropdown: {
    borderColor: theme.colors.overlay,
    padding: 12,
    borderWidth: 1,
    borderRadius: 5,
  },
});

export default class Map extends Component {
  state = {
    active: null,
    activeModal: null,
    hours: {},
  };
  renderHeader = () => {
    return (
      <View style={[styles.flex, styles.row, styles.header]}>
        <View
          style={[
            styles.row,
            {justifyContent: 'center', alignItems: 'center'},
          ]}>
          <View style={styles.directionIcon}>
            <IconEntypo name="direction" color={theme.colors.white} size={10} />
          </View>
          <View style={[styles.column, styles.directionInfo]}>
            <Text style={styles.directionInfoTitleText}>Detected Location</Text>
            <View style={[styles.row, {alignItems: 'center'}]}>
              <Text style={styles.directionInfoLocationText}>
                Chennai, India
              </Text>
              <Ionicon
                name="ios-arrow-down"
                size={theme.sizes.icon}
                style={{paddingHorizontal: 10}}
              />
            </View>
          </View>
        </View>
        <TouchableWithoutFeedback>
          <View style={[styles.flex, styles.row, {justifyContent: 'flex-end'}]}>
            <Ionicon name="ios-menu" size={theme.sizes.icon * 2.5} />
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  };

  renderMapView = () => {
    return (
      <MapView
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0142,
          longitudeDelta: 0.0121,
        }}
        style={styles.map}>
        {parkingsSpots.map((parking, index) => (
          <Marker coordinate={parking.coordinate} key={`markerr-${parking.id}`}>
            <TouchableWithoutFeedback
              onPress={() => this.setState({active: parking.id})}>
              <React.Fragment>
                <View
                  style={[
                    styles.row,
                    styles.marker,
                    styles.shadow,
                    this.state.active === parking.id ? styles.active : null,
                  ]}>
                  <Text style={styles.markerPrice}>${parking.price} </Text>
                  <Text style={styles.markerStatus}>
                    {' '}
                    ({parking.free}/{parking.spots})
                  </Text>
                </View>
                <View
                  style={[
                    styles.triangle,
                    styles.shadow,
                    this.state.active === parking.id ? styles.active : null,
                  ]}
                />
              </React.Fragment>
            </TouchableWithoutFeedback>
          </Marker>
        ))}
      </MapView>
    );
  };

  renderParkings = () => {
    return (
      <FlatList
        horizontal
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        data={parkingsSpots}
        scrollEventThrottle={16}
        snapToAlignment="center"
        style={styles.parkings}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => this.renderParking(item)}
      />
    );
  };

  renderParking = item => {
    return (
      <TouchableWithoutFeedback
        onPress={() => this.setState({active: item.id})}>
        <View style={[styles.row, styles.parking, styles.shadow]}>
          <View style={[styles.flex, styles.column, styles.parkingHours]}>
            <Text style={styles.parkingHoursTitle}>
              x{item.spots} {item.title}
            </Text>
            <View style={[styles.row, {alignItems: 'center', marginTop: 10}]}>
              <View
                style={{
                  borderWidth: 1,
                  borderColor: theme.colors.gray,
                  paddingHorizontal: 10,
                  paddingVertical: 8,
                  borderRadius: 5,
                }}>
                <Text>05:00</Text>
              </View>
              <Text style={{color: theme.colors.gray}}> hrs</Text>
            </View>
          </View>
          <View style={[styles.flex, styles.row, styles.parkingInfoContainer]}>
            <View style={[styles.parkingInfo]}>
              <View style={[styles.row, styles.parkingIcon]}>
                <EntypoIcon
                  name="price-tag"
                  size={15}
                  color={theme.colors.gray}
                />
                <Text style={{marginLeft: 5}}> ${item.price}</Text>
              </View>
              <View style={[styles.row, styles.parkingIcon]}>
                <EntypoIcon name="star" size={15} color={theme.colors.gray} />
                <Text style={{marginLeft: 5}}> {item.rating}</Text>
              </View>
            </View>
            <TouchableOpacity
              style={[styles.row, styles.parkingBtn]}
              onPress={() => this.setState({activeModal: item})}>
              <View style={[styles.column, {alignItems: 'flex-start'}]}>
                <View style={[styles.row, {alignItems: 'center'}]}>
                  <FontAwesomeIcon
                    name="dollar"
                    size={22}
                    color={theme.colors.white}
                  />
                  <Text style={{color: theme.colors.white, fontSize: 25}}>
                    {item.price}
                  </Text>
                </View>
                <Text style={{color: theme.colors.white, fontSize: 12}}>
                  {item.price} x 4 hrs
                </Text>
              </View>
              <View style={{marginLeft: 10}}>
                <FontAwesomeIcon
                  name="angle-right"
                  size={30}
                  color={theme.colors.white}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  renderModal = () => {
    const {activeModal} = this.state;

    if (!activeModal) return null;

    return (
      <Modal
        isVisible
        backdropColor={theme.colors.overlay}
        onBackButtonPress={() => this.setState({activeModal: null})}
        onBackdropPress={() => this.setState({activeModal: null})}
        onSwipeComplete={() => this.setState({activeModal: null})}
        style={styles.modalContainer}>
        <View style={[styles.column, styles.modal]}>
          <View
            style={[
              styles.row,
              {justifyContent: 'space-between', alignItems: 'center'},
            ]}>
            <Text style={{fontSize: theme.sizes.font * 1.5, fontWeight: '300'}}>
              x{activeModal.spots} {activeModal.title}
            </Text>
            <EntypoIcon
              name="dots-three-vertical"
              size={20}
              color={theme.colors.gray}
            />
          </View>
          <View style={{paddingVertical: theme.sizes.base}}>
            <Text style={{fontSize: 14, color: theme.colors.gray}}>
              {activeModal.description}
            </Text>
          </View>
          <View style={[styles.row, styles.modalInfo]}>
            <View style={[styles.row, styles.parkingIcon]}>
              <EntypoIcon
                name="price-tag"
                size={15}
                color={theme.colors.gray}
              />
              <Text style={{marginLeft: 5}}> ${activeModal.price}</Text>
            </View>
            <View style={[styles.row, styles.parkingIcon]}>
              <EntypoIcon name="star" size={15} color={theme.colors.gray} />
              <Text style={{marginLeft: 5}}> {activeModal.rating}</Text>
            </View>

            <View style={[styles.row, styles.parkingIcon]}>
              <EntypoIcon
                name="location-pin"
                size={15}
                color={theme.colors.gray}
              />
              <Text style={{marginLeft: 5}}> {activeModal.price}km</Text>
            </View>

            <View style={[styles.row, styles.parkingIcon]}>
              <FontAwesomeIcon name="car" size={15} color={theme.colors.gray} />
              <Text style={{marginLeft: 5}}>
                {' '}
                {activeModal.free} / {activeModal.spots}
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.column,
              styles.modalHours,
              {justifyContent: 'space-between'},
            ]}>
            <Text style={{textAlign: 'center', fontWeight: '500'}}>
              Choose your Booking Period:
            </Text>
            <View style={[styles.modalHoursDropdown]}>
              <Text>hrs</Text>
            </View>
          </View>
          <View>
            <TouchableOpacity style={[styles.row, styles.modalPayBtn]}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontSize: 15,
                  fontWeight: 'bold',
                }}>
                Proceed to pay ${activeModal.price}
              </Text>
              <Ionicon
                name="ios-arrow-forward"
                size={20}
                color={theme.colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    );
  };

  /*  -------------> BUG: when install package react-native-modal-dropdown */

  // renderHours = id => {
  //   const {hours} = this.state;
  //   const availableHours = [1, 2, 3, 4, 5, 6];
  //   return (
  //     <Dropdown
  //       options={availableHours}
  //       defaultValue={'01:00'}
  //       style={styles.hoursDropdown}
  //       onSelect={(index,value) => this.handleHours(id, value)}
  //     />
  //   );
  // };

  /*  -------------> BUG: when install package react-native-material-dropdown*/

  // renderHours = id => {
  //   const {hours} = this.state;
  //   let data = [{
  //     value: 'Banana',
  //   }, {
  //     value: 'Mango',
  //   }, {
  //     value: 'Pear',
  //   }];
  //   return <Dropdown label="Pick an hours" data={data} />;
  // };

  /*  -------------> BUG: cannot show Picker to UI View ?*/

  // renderHours = id => {
  //   const {hours} = this.state;
  //   var options = ['Home', 'Savings', 'Car', 'GirlFriend'];
  //   return (
  //     <Picker
  //       selectedValue={this.state.language}
  //       style={{height: 50, width: 100}}
  //       onValueChange={(itemValue, itemIndex) =>
  //         this.setState({language: itemValue})
  //       }>
  //       <Picker.Item label="Java" value="java" />
  //       <Picker.Item label="JavaScript" value="js" />
  //     </Picker>
  //   );
  // };

  render() {
    console.log('parkingSport', this.props.parkings);
    console.log('positions', this.props.currentPosition);
    console.log('active', this.state.active);
    console.log('modal', this.state.activeModal);
    this.state.hours[5] = 'herere';
    console.log(this.state.hours);
    return (
      <View style={styles.container}>
        {this.renderHeader()}

        {this.renderMapView()}

        {this.renderParkings()}

        {this.renderModal()}
      </View>
    );
  }
}

Map.defaultProps = {
  currentPosition: {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0122,
    longitudeDelta: 0.0121,
  },
  parkings: parkingsSpots,
};

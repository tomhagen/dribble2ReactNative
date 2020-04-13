import React, {Component} from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {images, theme, servers} from '../../constants';
import AntIcon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

const {icons} = images;
const {width, height} = Dimensions.get('window');

export default class vpn extends Component {
  state = {
    isConnected: false,
    isShowModal: false,
    server: null,

    automatic: {
      name: 'Automatic',
      icon: icons.automatic,
    },
  };

  handleServer = item => {
    this.setState({
      server: item,
      isShowModal: false,
      isConnected: false,
    });
  };
  handleConnected = () => {
    this.setState({isConnected: !this.state.isConnected});
  };

  handleServers = () => {
    const {server, isShowModal, automatic} = this.state;
    const connection = server || automatic;

    return (
      <Modal
        isVisible={this.state.isShowModal}
        backdropColor={theme.colors.gray}
        onBackButtonPress={() => this.setState({isShowModal: false})}
        onBackdropPress={() => this.setState({isShowModal: false})}
        onSwipeComplete={() => this.setState({isShowModal: false})}
        style={[styles.modalContainer]}>
        <View style={styles.modal}>
          <Text
            style={{
              fontSize: 13,
              color: theme.colors.gray,
              textAlign: 'center',
            }}>
            Pick your Server
          </Text>
          <ScrollView>
            {servers.map((item, index) => {
              const connected = connection.name === item.name;
              const isChecked = icons[connected ? 'checked' : 'unchecked'];
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => this.handleServer(item)}>
                  <View
                    style={[
                      styles.row,
                      {justifyContent: 'space-between', marginVertical: 10},
                    ]}>
                    <View style={[styles.row]}>
                      <Image source={item.icon} />
                      <Text style={{fontSize: 16, marginLeft: 10}}>
                        {item.name}
                      </Text>
                    </View>
                    <Image source={isChecked} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
    );
  };

  renderServerHome = () => {
    const {server, automatic} = this.state;
    const connection = server || automatic;
    return (
      <View style={[styles.row, {alignItems: 'center'}]}>
        <Image source={connection.icon} />
        <Text style={{fontSize: 16, marginHorizontal: 10}}>
          {connection.name}
        </Text>
        <AntIcon name="down" size={13} />
      </View>
    );
  };
  render() {
    const {isConnected, server} = this.state;
    // console.log('item', this.state.server);

    return (
      <React.Fragment>
        <TouchableOpacity style={styles.barIcon}>
          <FontAwesome name="bars" size={22} />
        </TouchableOpacity>
        <View style={[styles.flex, styles.container]}>
          <View style={[styles.header]}>
            <Text style={{fontSize: 18}}>VPN</Text>
          </View>

          <View style={[styles.column, styles.connectZone]}>
            <View style={[styles.row, styles.connectStatus, styles.shadow]}>
              <Text style={styles.connectStatusText}>
                {isConnected ? 'Disconnected' : 'Connected'}
              </Text>
              <View
                style={[
                  styles.connectStatusDotActive,
                  isConnected && styles.connectStatusDotUnActive,
                ]}
              />
            </View>
            <View style={styles.images}>
              <Image
                source={isConnected ? icons.offline : icons.online}
                style={{width: width * 0.5}}
                resizeMode="center"
              />
            </View>
            <TouchableOpacity onPress={() => this.handleConnected()}>
              <View
                style={[
                  styles.connectBtn,
                  isConnected && styles.connectBtnActive,
                ]}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '300',
                    color: `${isConnected ? 'white' : 'black'}`,
                  }}>
                  {isConnected ? 'CONNECT NOW' : 'DISCONNECT'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableWithoutFeedback
            onPress={() => this.setState({isShowModal: true})}>
            <View style={[styles.footer, styles.shadow]}>
              {this.renderServerHome()}
            </View>
          </TouchableWithoutFeedback>
          {this.handleServers()}
        </View>
      </React.Fragment>
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
  column: {
    flexDirection: 'column',
  },
  container: {
    position: 'relative',
  },
  header: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  barIcon: {
    position: 'absolute',
    top: '9%',
    left: '5%',
  },
  connectZone: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectStatus: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectStatusText: {
    fontSize: 13,
    color: theme.colors.text_gray,
  },
  connectStatusDotActive: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.green,
    marginLeft: 5,
  },
  connectStatusDotUnActive: {
    backgroundColor: theme.colors.gray,
  },
  images: {
    marginVertical: 30,
    width: width,
    alignItems: 'center',
  },
  connectBtn: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: 35,
    paddingVertical: 10,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'black',
  },
  connectBtnActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  footer: {
    flex: 0.7,
    backgroundColor: theme.colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 3.84,

    elevation: 10,
  },
  modalContainer: {
    margin: 0,
    justifyContent: 'flex-end',
  },
  modal: {
    height: 0.6 * height,
    backgroundColor: theme.colors.white,
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

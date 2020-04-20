import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import * as theme from '../constants/theme';
import {Button} from '../components';

const {width, height} = Dimensions.get('window');

export default class Welcome extends Component {
  scrollX = new Animated.Value(0);

  state = {
    isShowTerm: false,
  };

  renderIllustrations = () => {
    const {illustrations} = this.props;
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <Image
            source={item.source}
            resizeMode="cover"
            style={{width: width, height: height / 2, overflow: 'visible'}}
          />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
          {useNativeDriver: true},
        )}
      />
    );
  };

  renderDots = () => {
    const {illustrations} = this.props;
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View
        style={[styles.dotContainer, styles.row, {justifyContent: 'center'}]}>
        {illustrations.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dots, {opacity}]} />;
        })}
      </View>
    );
  };

  renderTermServiceModal = () => {
    return (
      <Modal visible={this.state.isShowTerm} animationType="slide">
        <View style={[styles.flex, styles.modal]}>
          <Text
            style={{
              fontSize: theme.fonts.h2,
              color: theme.colors.gray,
              marginBottom: 20,
            }}>
            Terms of Service
          </Text>
          <ScrollView>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              1. Your use of the Service is at your sole risk. The service is
              provided on an "as is" and "as available" basis.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              2. Support for Expo services is only available in English, via
              e-mail.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              3. You understand that Expo uses third-party vendors and hosting
              partners to provide the necessary hardware, software, networking,
              storage, and related technology required to run the Service.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              4. You must not modify, adapt or hack the Service or modify
              another website so as to falsely imply that it is associated with
              the Service, Expo, or any other Expo service.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              5. You may use the Expo Pages static hosting service solely as
              permitted and intended to host your organization pages, personal
              pages, or project pages, and for no other purpose. You may not use
              Expo Pages in violation of Expo's trademark or other rights or in
              violation of applicable law. Expo reserves the right at all times
              to reclaim any Expo subdomain without liability to you.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              6. You agree not to reproduce, duplicate, copy, sell, resell or
              exploit any portion of the Service, use of the Service, or access
              to the Service without the express written permission by Expo.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              7. We may, but have no obligation to, remove Content and Accounts
              containing Content that we determine in our sole discretion are
              unlawful, offensive, threatening, libelous, defamatory,
              pornographic, obscene or otherwise objectionable or violates any
              party's intellectual property or these Terms of
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              8. Verbal, physical, written or other abuse (including threats of
              abuse or retribution) of any Expo customer, employee, member, or
              officer will result in immediate account termination.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              9. You understand that the technical processing and transmission
              of the Service, including your Content, may be transferred
              unencrypted and involve (a) transmissions over various networks;
              and (b) changes to conform and adapt to technical requirements of
              connecting networks or devices.
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.caption,
                marginBottom: 10,
              }}>
              10. You must not upload, post, host, or transmit unsolicited
              e-mail, SMSs, or "spam" messages.
            </Text>
          </ScrollView>
          <View>
            <Button gradient onPress={() => this.setState({isShowTerm: false})}>
              <Text style={{color: theme.colors.white, textAlign: 'center'}}>
                I Understand
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };
  
  render() {
    const {navigation} = this.props;

    return (
      <View style={[styles.container, styles.flex]}>
        <View style={styles.header}>
          <Text style={{color: theme.colors.black, fontSize: theme.fonts.h1}}>
            Your Home.
            <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>
              {'   '}Greener.
            </Text>
          </Text>
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: theme.fonts.h2,
              marginTop: 10,
            }}>
            Enjoy the experience.
          </Text>
        </View>
        <ScrollView>
          <View style={styles.illustrations}>
            {this.renderIllustrations()}
            {this.renderDots()}
          </View>
          <View
            style={[
              styles.btnContainer,
              {marginHorizontal: theme.sizes.padding * 2},
            ]}>
            <Button gradient onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </Button>
            <Button shadow onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  textAlign: 'center',
                }}>
                Signup
              </Text>
            </Button>
            <Button onPress={() => this.setState({isShowTerm: true})}>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.colors.gray,
                }}>
                Terms of service
              </Text>
            </Button>
          </View>
          {this.renderTermServiceModal()}
        </ScrollView>
      </View>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    {
      id: 1,
      source: require('../assets/images/illustration_1.png'),
    },
    {
      id: 2,
      source: require('../assets/images/illustration_2.png'),
    },
    {
      id: 3,
      source: require('../assets/images/illustration_3.png'),
    },
  ],
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
  },
  header: {
    flex: 1.5,

    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrations: {
    flex: 6,
    marginTop: 20,
  },
  btnContainer: {
    flex: 2,
  },
  dotContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    left: 0,
    right: 0,
  },
  dots: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    backgroundColor: theme.colors.gray,
  },
  modal: {
    height: height * 0.8,
    paddingVertical: theme.sizes.padding * 2,
    paddingHorizontal: theme.sizes.padding,
  },
});

// BUG: Cannot use package React-native-text-gradient
// --> Error: Text string must be render in Text Component

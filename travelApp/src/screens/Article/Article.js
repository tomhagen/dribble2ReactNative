import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  Animated,
  TouchableOpacity,
} from 'react-native';

import * as theme from '../../../theme';
import IconLocation from 'react-native-vector-icons/EvilIcons';
import IconArrow from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconDots from 'react-native-vector-icons/Entypo';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  flex: {
    flex: 0,
  },
  row: {
    flexDirection: 'row',
  },
  column: {
    flexDirection: 'column',
  },
  header: {
    position: 'absolute',
    left: 0,
    right: 0,
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 36,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    // bottom: 10,
  },
  dots: {
    width: 10,
    height: 10,
    backgroundColor: '#DCE0E9',
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  contentHeader: {
    paddingVertical: theme.sizes.padding * 0.5,
    paddingHorizontal: theme.sizes.padding,
    backgroundColor: theme.colors.white,
    marginTop: -theme.sizes.margin / 3,
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
  },
  avatar: {
    width: theme.sizes.padding * 1.2,
    height: theme.sizes.padding * 1.2,
    borderRadius: (theme.sizes.padding * 1.2) / 2,
    position: 'absolute',
    top: -(theme.sizes.margin * 1.2) / 2,
    right: theme.sizes.margin,
  },
  shadow: {
    shadowColor: theme.colors.black,
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: theme.sizes.font,
    color: theme.colors.active,
    marginRight: 10,
  },
  review: {
    fontSize: theme.sizes.font,
    color: theme.colors.gray,
  },
  description: {
    fontSize: theme.sizes.font,
    color: theme.colors.gray,
  },
  readmore: {
    fontSize: theme.sizes.font,
    color: theme.colors.active,
    marginLeft: 10
  },
});
export default class Article extends Component {
  scrollX = new Animated.Value(0);

  renderRatings = rating => {
    const stars = new Array(5).fill(0);
    return stars.map((_, index) => {
      const isActiveStar = Math.floor(rating) >= index + 1;
      return (
        <IconAwesome
          name="star"
          key={index}
          fontSize={12}
          style={{margin: 3}}
          color={isActiveStar ? theme.colors.active : theme.colors.subActive}
        />
      );
    });
  };

  renderDots = () => {
    const {route} = this.props;
    const {images} = route.params.destination;
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View
        style={[
          styles.flex,
          styles.row,
          styles.dotsContainer,
          {justifyContent: 'center', alignItems: 'center'},
        ]}>
        {images.map((img, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.5, 1, 0.5],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dots, {opacity}]} />;
        })}
      </View>
    );
  };

  render() {
    const {route, navigation} = this.props;
    const {images} = route.params.destination;
    const {destination} = route.params;

    // console.log(navigation, navigation.goBack());
    console.log(route);
    console.log(images);

    return (
      <View style={styles.flex}>
        <View style={styles.flex}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            scrollEnabled
            decelerationRate={0}
            snapToAlignment="center"
            scrollEventThrottle={16}>
            {images.map((item, index) => {
              return (
                <Image
                  key={index}
                  source={{
                    uri: item,
                  }}
                  resizeMode="cover"
                  style={{width: width, height: width * 0.9}}
                />
              );
            })}
          </ScrollView>
          <View style={[styles.header, styles.row]}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconArrow name="ios-arrow-back" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity>
              <IconDots name="dots-three-horizontal" size={20} color="white" />
            </TouchableOpacity>
          </View>
          {this.renderDots()}
        </View>
        <View style={styles.flex}>
          <View style={[styles.flex, styles.contentHeader]}>
            <Image
              source={{uri: destination.user.avatar}}
              style={[styles.avatar, styles.shadow]}
            />
            <Text style={styles.title}>{destination.title}</Text>
            <View style={[styles.row, {alignItems: 'center', marginTop: 10, marginBottom: 20}]}>
              {this.renderRatings(destination.rating)}
              <Text style={styles.rating}>{destination.rating}</Text>
              <Text style={styles.review}>({destination.reviews}) Reviews</Text>
            </View>
            <TouchableOpacity>
              <Text style={styles.description}>
                {destination.description}...
                <Text style={styles.readmore}>Read more</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={[styles.flex, {backgroundColor:'white', height: 200}]}></View>
      </View>
    );
  }
}

import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
  ImageBackground,
  FlatList,
  Animated,
} from 'react-native';

import * as theme from '../../../theme';
import IconLocation from 'react-native-vector-icons/EvilIcons';
import IconArrow from 'react-native-vector-icons/Ionicons';
import IconAwesome from 'react-native-vector-icons/FontAwesome';

const {width, height} = Dimensions.get('window');

const mocks = [
  {
    id: 1,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
    location: 'Santorini, Greece',
    temperature: 34,
    title: 'Santorini',
    description:
      'Santorini is one of the Cyclades islands in the Aegean Sea. It was devastated by a volcanic eruption in the 16th century BC, forever shaping its rugged landscape. The whitewashed, cubiform houses of its 2 principal towns, Fira and Oia, cling to cliffs above an underwater caldera (crater). They overlook the sea, small islands to the west and beaches made up of black, red and white lava pebbles.',
    rating: 4.3,
    reviews: 3212,
    preview:
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 2,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: false,
    location: 'Loutraki, Greece',
    temperature: 34,
    title: 'Loutraki',
    description: 'This attractive small town, 80 kilometers from Athens',
    rating: 4.6,
    reviews: 3212,
    preview:
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 3,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    saved: true,
    location: 'Santorini, Greece',
    temperature: 34,
    title: 'Santorini',
    description: 'Santorini - Description',
    rating: 3.2,
    reviews: 3212,
    preview:
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507501336603-6e31db2be093?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 4,
    user: {
      name: 'Lelia Chavez',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    location: 'Loutraki, Greece',
    temperature: 34,
    title: 'Loutraki',
    description: 'This attractive small town, 80 kilometers from Athens',
    rating: 5,
    reviews: 3212,
    preview:
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1458906931852-47d88574a008?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1446903572544-8888a0e60687?auto=format&fit=crop&w=800&q=80',
    ],
  },
];

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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    paddingBottom: theme.sizes.padding / 1.2,
  },
  destinations: {
    justifyContent: 'center',
    paddingBottom: theme.sizes.padding / 1.2,
    paddingHorizontal: theme.sizes.padding,
  },
  destination: {
    width: width - theme.sizes.padding * 2,
    height: height * 0.35,
    paddingHorizontal: 20,
    marginRight: theme.sizes.margin / 1.8,
    paddingTop: theme.sizes.margin / 1.8,
    position: 'relative',
    zIndex: 2,
    overflow: 'visible',
  },
  avatar: {
    width: theme.sizes.padding,
    height: theme.sizes.padding,
    borderRadius: 18,
  },
  name: {
    color: theme.colors.white,
    fontSize: theme.sizes.font,
    fontWeight: 'bold',
  },
  location: {
    color: 'white',
    fontSize: theme.sizes.font * 0.8,
  },
  rating: {
    color: theme.colors.white,
    fontSize: theme.sizes.font * 2,
    fontWeight: 'bold',
  },
  destinationInfo: {
    position: 'absolute',
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding * 0.6,
    paddingVertical: theme.sizes.padding / 3,
    borderRadius: theme.sizes.radius,
    bottom: -theme.sizes.padding,
    right: theme.sizes.padding,
    left: theme.sizes.padding,
    zIndex: 10,
  },
  title: {
    fontSize: theme.sizes.font,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  caption: {
    fontSize: theme.sizes.font * 0.8,
    color: theme.colors.gray,
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
  dots: {
    width: 10,
    height: 10,
    backgroundColor: '#DCE0E9',
    marginHorizontal: 5,
    borderRadius: 5,
    borderWidth: 2.5,
    borderColor: 'transparent',
  },
  activeDot: {
    width: 12.5,
    height: 12.5,
    borderRadius: 7,
    borderColor: '#0073FF',
  },
  recommmendations: {
    justifyContent: 'center',
    paddingBottom: theme.sizes.padding / 3.6,
    paddingHorizontal: theme.sizes.padding,
  },
  recommendation: {
    marginHorizontal: 8,
  },
  recommendationHeader: {
    borderTopLeftRadius: theme.sizes.radius,
    borderTopRightRadius: theme.sizes.radius,
    overflow: 'hidden',
  },
  recommendationImage: {
    width: (width - theme.sizes.padding * 2 - 8 * 2) / 2,
    height: (width - theme.sizes.padding * 2) / 2,
  },
  recommendationOption: {
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.sizes.padding / 3.6,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  recommendationTemp: {
    color: theme.colors.white,
    fontSize: theme.sizes.base,
  },
  recommendationFooter: {
    justifyContent: 'space-evenly',
    padding: theme.sizes.padding / 2,
    backgroundColor: theme.colors.white,
    borderBottomLeftRadius: theme.sizes.radius,
    borderBottomRightRadius: theme.sizes.radius,
  },
});

export default class List extends Component {
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
          color={isActiveStar ? theme.colors.active : theme.colors.subActive}
        />
      );
    });
  };
  renderDots = () => {
    const {destinations} = this.props;
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View
        style={[
          styles.flex,
          styles.row,
          {justifyContent: 'center', alignItems: 'center', marginTop: 50},
        ]}>
        {destinations.map((item, index) => {
          const width = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0, 2.5, 0],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={index}
              style={[styles.dots, styles.activeDot, {borderWidth: width}]}
            />
          );
        })}
      </View>
    );
  };
  renderDestinations = () => {
    return (
      <View style={[styles.destinations]}>
        <FlatList
          horizontal
          scrollEnabled
          //   pagingEnabled // scroll một lần nhiều item
          showsHorizontalScrollIndicator={false}
          decelerationRate={0} // liên quan trải nghiệm tốc độ scroll và finger
          snapToAlignment="center" // bắt điểm cho dừng tại các vị trí giữa khi scroll
          onScroll={Animated.event([
            {nativeEvent: {contentOffset: {x: this.scrollX}}},
          ])}
          style={{overflow: 'visible'}}
          data={this.props.destinations}
          keyExtractor={(item, index) => `${item.id}`}
          renderItem={({item}) => this.renderDestination(item)}
        />
        {this.renderDots()}
      </View>
    );
  };

  renderDestination = item => {
    let {navigation} = this.props;

    return (
      <TouchableOpacity onPress={() => navigation.navigate('Article', {destination: item})}>
        <ImageBackground
          style={[styles.destination]}
          source={{
            uri: item.preview,
          }}
          imageStyle={{borderRadius: theme.sizes.radius}}>
          <View style={[styles.row, {justifyContent: 'space-between'}]}>
            <View style={{flex: 0}}>
              <Image
                source={{
                  uri: item.user.avatar,
                }}
                style={styles.avatar}
              />
            </View>
            <View
              style={{flex: 2, marginHorizontal: theme.sizes.margin * 0.55}}>
              <Text style={[styles.name]}> {item.user.name}</Text>
              <View style={[styles.flex, styles.row, {alignItems: 'center'}]}>
                <IconLocation
                  name="location"
                  fontSize={theme.sizes.font}
                  color={theme.colors.white}
                />
                <Text style={styles.location}>{item.location}</Text>
              </View>
            </View>
            <View
              style={{
                flex: 0,
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <Text style={styles.rating}>{item.rating}</Text>
            </View>
          </View>
          <View style={[styles.column, styles.destinationInfo, styles.shadow]}>
            <Text style={styles.title}>{item.title}</Text>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', alignItems: 'flex-end'},
              ]}>
              <Text style={styles.caption}>
                {item.description.split('').slice(0, 50)}...
              </Text>
              <IconArrow
                name="ios-arrow-forward"
                fontSize={11}
                style={{color: theme.colors.gray}}
              />
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    );
  };

  renderRecommendations = () => {
    return (
      <View style={[styles.flex, styles.column, styles.recommmendations]}>
        <View
          style={[styles.flex, styles.row, {justifyContent: 'space-between'}]}>
          <Text style={{fontWeight: 'bold'}}>Recommended</Text>
          <Text style={{color: theme.colors.gray}}>More</Text>
        </View>
        <View style={styles.flex}>
          <FlatList
            horizontal
            scrollEnabled
            //   pagingEnabled // scroll một lần nhiều item
            showsHorizontalScrollIndicator={false}
            decelerationRate={0} // liên quan trải nghiệm tốc độ scroll và finger
            snapToAlignment="center" // bắt điểm cho dừng tại các vị trí giữa khi scroll
            style={{overflow: 'visible', marginTop: 20}}
            data={this.props.destinations}
            keyExtractor={(item, index) => `${item.id}`}
            renderItem={({item, index}) =>
              this.renderRecommendation(item, index)
            }
          />
        </View>
      </View>
    );
  };

  renderRecommendation = (item, index) => {
    const {destinations} = this.props;
    const isLastItem = index === destinations.length - 1;
    return (
      <TouchableOpacity>
        <View
          style={[
            styles.recommendation,
            isLastItem ? {marginRight: 0} : null,
            index === 0 ? {marginLeft: 0} : null,
          ]}>
          <View style={styles.recommendationHeader}>
            <Image
              source={{
                uri: item.preview,
              }}
              style={styles.recommendationImage}
            />
            <View
              style={[styles.flex, styles.row, styles.recommendationOption]}>
              <Text style={styles.recommendationTemp}>
                {item.temperature} ℃
              </Text>
              <IconAwesome
                name={item.saved ? 'bookmark' : 'bookmark-o'}
                fontSize={theme.sizes.font}
                style={{color: theme.colors.white}}
              />
            </View>
          </View>
          <View style={[styles.recommendationFooter, styles.shadow]}>
            <Text style={{fontSize: theme.sizes.font, fontWeight: 'bold'}}>
              {item.title}
            </Text>
            <Text
              style={{fontSize: 11, color: theme.colors.gray, marginTop: 8}}>
              {item.location}
            </Text>
            <View
              style={[
                styles.row,
                {
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginTop: 10,
                },
              ]}>
              {this.renderRatings(item.rating)}
              <Text style={{color: theme.colors.active}}>{item.rating}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  renderHeader = () => {
    return (
      <View style={[styles.flex, styles.row, styles.header]}>
        <View>
          <Text style={{color: theme.colors.gray}}>Search for place</Text>

          <Text style={{fontSize: theme.sizes.font * 1.5, fontWeight: 'bold'}}>
            Destination
            <IconArrow
              name="ios-arrow-down"
              fontSize={theme.sizes.font}
              style={{color: theme.colors.gray}}
            />
          </Text>
        </View>
        <View>
          <Image
            source={{
              uri: 'https://randomuser.me/api/portraits/women/44.jpg',
            }}
            style={styles.avatar}
          />
        </View>
      </View>
    );
  };
  render() {
    return (
      <ScrollView>
        <View style={[styles.flex]}>
          {this.renderHeader()}
          {this.renderDestinations()}
          {this.renderRecommendations()}
        </View>
      </ScrollView>
    );
  }
}

List.defaultProps = {
  destinations: mocks,
};

import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Dimensions,
  Animated,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import * as theme from '../constants/theme';
import * as mock from '../constants/mocks';
import {Input, Button} from '../components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
const {width, height} = Dimensions.get('window');

export default class Explore extends Component {
  state = {
    searchFocus: new Animated.Value(0.6),
    searchString: null,
  };
  handleSearchFocus = status => {
    const {searchFocus} = this.state;
    Animated.timing(searchFocus, {
      toValue: status ? 0.9 : 0.6,
      duration: 500,
      useNativeDriver: false,
    }).start();
  };
  renderSearch = () => {
    const {searchFocus, searchString} = this.state;
    const isEditing = searchFocus && searchString;

    return (
      <Animated.View style={[styles.search, {flex: searchFocus}]}>
        <Input
          placeholder="Search"
          placeholderTextColor={theme.colors.gray2}
          style={styles.searchInput}
          onFocus={() => this.handleSearchFocus(true)}
          onBlur={() => this.handleSearchFocus(false)}
          onChangeText={value => this.setState({searchString: value})}
          value={searchString}
          onRightPress={() => {
            isEditing ? this.setState({searchString: null}) : null;
          }}
          rightStyle={styles.searchRight}
          rightLable={
            <FontAwesome
              name={isEditing ? 'search-minus' : 'search'}
              size={theme.sizes.base}
              color={theme.colors.gray2}
              style={styles.searchIcon}
            />
          }
        />
      </Animated.View>
    );
  };

  renderExplore = () => {
    const {images, navigation} = this.props;
    const mainImage = images[0];
    return (
      <View
        style={{
          marginTop: theme.sizes.margin,
          marginBottom: theme.sizes.margin,
        }}>
        <TouchableOpacity
          style={styles.mainImage}
          onPress={() => navigation.navigate('Product')}>
          <Image source={mainImage} style={styles.image} resizeMode="cover" />
        </TouchableOpacity>
        <View
          style={[
            styles.row,
            {flexWrap: 'wrap', justifyContent: 'space-between'},
          ]}>
          {images.slice(1).map((img, index) => this.renderImage(img, index))}
        </View>
      </View>
    );
  };

  renderImage = (img, index) => {
    const {navigation} = this.props;
    const sizes = Image.resolveAssetSource(img);
    const fullWidth = width - theme.sizes.padding * 2.5;
    const resize = (sizes.width * 100) / fullWidth;
    const imgWidth = resize > 75 ? fullWidth : sizes.width;
    return (
      <TouchableOpacity
        key={index}
        onPress={() => navigation.navigate('Product')}>
        <Image
          source={img}
          style={[styles.image, {minWidth: imgWidth, maxWidth: imgWidth}]}
        />
      </TouchableOpacity>
    );
  };

  renderFooter = () => {
    return (
      <View style={styles.footer}>
        <LinearGradient
          locations={[0.5, 1]}
          colors={['rgba(255,255,255,0)', 'rgba(255,255,255,0.6)']}>
          <Button gradient style={{width: width / 2}}>
            <Text style={{color: theme.colors.white, textAlign: 'center'}}>
              Filters
            </Text>
          </Button>
        </LinearGradient>
      </View>
    );
  };
  render() {
    console.log(this.props);

    return (
      <View style={styles.container}>
        <View style={[styles.row, styles.header]}>
          <Text style={{fontSize: theme.fonts.h1, color: theme.colors.black}}>
            Explore
          </Text>

          {this.renderSearch()}
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {this.renderExplore()}
        </ScrollView>
        {this.renderFooter()}
      </View>
    );
  }
}

Explore.defaultProps = {
  images: mock.explore,
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
    // paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
    position: 'relative',
  },
  header: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    // marginBottom: theme.sizes.margin,
  },
  searchInput: {
    fontSize: theme.fonts.body,
    height: theme.sizes.base * 2.5,
    backgroundColor: 'rgba(142, 142, 147, 0.06)',
    borderColor: 'rgba(142, 142, 147, 0.06)',
    paddingHorizontal: theme.sizes.base,
    borderRadius: theme.sizes.radius,
  },
  search: {
    // width: width / 2 - theme.sizes.base * 2,
    // flex: 0.6
  },

  searchRight: {
    backgroundColor: 'transparent',
    marginVertical: 0,
  },
  mainImage: {
    minWidth: width - theme.sizes.padding * 2,
  },
  image: {
    marginBottom: theme.sizes.base,
    borderRadius: theme.sizes.radius,
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'visible',
    paddingBottom: theme.sizes.base * 4.5
  },
});

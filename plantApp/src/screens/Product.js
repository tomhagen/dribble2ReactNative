import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
} from 'react-native';
import * as theme from '../constants/theme';
import * as mock from '../constants/mocks';
import {Input, Button, Divider} from '../components';
const {width, height} = Dimensions.get('window');

export default class Product extends Component {
  renderGallery = () => {
    const {product} = this.props;
    return (
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        scrollEnabled
        snapToAlignment="center"
        scrollEventThrottle={16}
        data={product.images}
        keyExtractor={(item, index) => `${index}`}
        renderItem={({item}) => (
          <Image
            source={item}
            resizeMode="cover"
            style={{width: width, height: height / 2.5}}
          />
        )}
      />
    );
  };
  render() {
    console.log(this.props.product);
    const {product} = this.props;

    return (
      <View >
        <ScrollView showsVerticalScrollIndicator={false} >
          <View>{this.renderGallery()}</View>
          <View style={styles.product}>
            <Text
              style={{
                fontSize: theme.fonts.h2,
                color: theme.colors.black,
                textAlign: 'left',
              }}>
              {product.name}
            </Text>
            <View style={[styles.row, {marginTop: theme.sizes.base}]}>
              {product.tags.map((item, index) => (
                <Text key={index} style={styles.tag}>
                  {item}
                </Text>
              ))}
            </View>
            <Text
              style={{
                fontSize: theme.fonts.body,
                color: theme.colors.gray,
                marginTop: theme.sizes.base,
              }}>
              {product.description}
            </Text>
            <Divider />
            <View>
              <Text
                style={{
                  fontSize: theme.fonts.body,
                  color: theme.colors.black,
                  marginBottom: theme.sizes.base,
                }}>
                Gallery
              </Text>
              <View style={[styles.row, {justifyContent: 'space-between'}]}>
                {product.images.slice(1, 3).map((image, index) => (
                  <Image source={image} key={index} style={styles.image} />
                ))}
                <View style={styles.more}>
                  <Text style={{color: theme.colors.gray}}>
                    +{product.images.slice(3).length}
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

Product.defaultProps = {
  product: mock.products[0],
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
    paddingHorizontal: theme.sizes.padding,
    position: 'relative',
  },
  header: {
    // flex: 1,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  product: {
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding,
  },
  tag: {
    paddingVertical: theme.sizes.base / 2.5,
    paddingHorizontal: theme.sizes.base,
    borderRadius: theme.sizes.base,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: theme.colors.gray2,
    marginRight: theme.sizes.base,
    color: theme.colors.gray,
    fontSize: theme.fonts.caption,
  },
  image: {
    width: width / 3,
    height: width / 3,
    // marginRight: 10,
  },
  more: {
    // paddingHorizontal: 10,
    // paddingVertical: 10,
    width: 50,
    height: 50,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor: theme.colors.gray2,
  },
});

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
} from 'react-native';
import {images, theme} from '../../constants';

const backgrounds = [
  {
    title: 'Secured, forever.',
    description:
      'Curabitur 1 lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.',
    img: images.background.welcome,
  },
  {
    title: 'Encrypted, forever.',
    description:
      'Curabitur 2 lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.',
    img: images.background.encrypted,
  },
  {
    title: 'Privacy, forever.',
    description:
      'Curabitur 3 lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis.',
    img: images.background.privacy,
  },
];

const {width, height} = Dimensions.get('window');

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
    // paddingVertical: theme.sizes.padding,
    // paddingHorizontal: theme.sizes.padding,
  },
  containerImages: {
    flex: 7,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  containerInfo: {
    flex: 3,
    // justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: theme.sizes.padding * 2,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
  },
  description: {
    textAlign: 'center',
    fontSize: 13,
    lineHeight: 20,
    color: theme.colors.text_gray,
    marginTop: 10,
  },
  dots: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.gray,
    opacity: 0.3,
    marginHorizontal: theme.sizes.base / 2,
    marginTop: 10,
  },
  btn: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.sizes.padding * 1.7,
    paddingVertical: theme.sizes.padding * 0.4,
    marginTop: 20,
    borderRadius: 20,
  },
  btnText: {
    textAlign: 'center',
    color: theme.colors.white,
    fontSize: 12,
  },
});
export default class welcome extends Component {
  scrollX = new Animated.Value(0);

  state = {
    slideIndex: 0,
  };

  componentDidMount() {
    this.scrollX.addListener(({value}) => {
      this.setState({slideIndex: Math.floor(value / width)});
    });
  }
  renderImages = () => {
    return (
      <Animated.ScrollView
        horizontal
        pagingEnabled
        scrollEnabled
        decelerationRate={0}
        scrollEventThrottle={1}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
          {useNativeDriver: true},
        )}>
        {backgrounds.map((item, index) => (
          <View key={index} style={{width: width, alignItems: 'center'}}>
            <Image
              source={item.img}
              resizeMode="center"
              style={{width: 0.8 * width, height: '100%'}}
            />
          </View>
        ))}
      </Animated.ScrollView>
    );
  };

  renderText = () => {
    const {slideIndex} = this.state;
    const background = backgrounds[slideIndex];

    return (
      <React.Fragment>
        <Text style={styles.title}>{background && background.title}</Text>
        <Text style={styles.description}>
          {background && background.description}
        </Text>
      </React.Fragment>
    );
  };

  renderDots = () => {
    const dotPosition = Animated.divide(this.scrollX, width);

    return (
      <View
        style={[styles.row, {justifyContent: 'center', alignItems: 'center'}]}>
        {backgrounds.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View style={[styles.dots, {opacity}]} key={index} />;
        })}
      </View>
    );
  };
  render() {
    const {navigation} = this.props;

    return (
      <View style={[styles.container, styles.flex]}>
        <View style={[styles.containerImages]}>{this.renderImages()}</View>
        <View style={[styles.containerInfo]}>
          {this.renderText()}
          {this.renderDots()}
          <TouchableOpacity onPress={() => navigation.navigate('VPN')}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>GET STARTED</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

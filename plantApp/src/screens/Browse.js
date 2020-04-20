import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import {Button} from '../components';
import * as theme from '../constants/theme';
import * as mock from '../constants/mocks';

const {width, height} = Dimensions.get('window');

export default class Browse extends Component {
  state = {
    active: 'Products',
    categories: [],
    profile: {},
  };

  componentDidMount() {
    this.setState({
      categories: this.props.categories,
      profile: this.props.profile,
    });
  }
  handleTab = tab => {
    const {categories} = this.props;
    const filterResult = categories.filter(category =>
      category.tags.includes(tab.toLowerCase()),
    );
    this.setState({categories: filterResult, active: tab});
  };
  renderTabs = (tab, index) => {
    const {active} = this.state;
    const isActive = active === tab;

    return (
      <TouchableOpacity
        key={index}
        style={[styles.tab, isActive ? styles.active : null]}
        onPress={() => this.handleTab(tab)}>
        <Text
          style={{
            fontSize: theme.fonts.header,
            color: `${isActive ? theme.colors.primary : theme.colors.gray}`,
          }}>
          {tab}
        </Text>
      </TouchableOpacity>
    );
  };

  renderCategories = () => {
    const {categories} = this.state;
    const {navigation} = this.props;

    return categories.map((item, index) => {
      return (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate('Explore', {category: item})}>
          <View style={[styles.category, {alignItems: 'center'}]}>
            <View style={styles.image}>
              <Image source={item.image} />
            </View>
            <Text
              style={{
                fontSize: theme.fonts.body,
                color: theme.colors.black,
                marginTop: 10,
                marginBottom: 5,
              }}>
              {item.name}
            </Text>
            <Text
              style={{
                fontSize: theme.fonts.caption,
                color: theme.colors.gray,
              }}>
              {item.count} products
            </Text>
          </View>
        </TouchableOpacity>
      );
    });
  };
  render() {
    const {profile} = this.state;
    const {navigation} = this.props;

    const tabs = ['Products', 'Inspirations', 'Shop'];

    return (
      <View style={[styles.flex, styles.container]}>
        <View style={[styles.row, styles.header]}>
          <Text style={{fontSize: theme.fonts.h1, color: theme.colors.black}}>
            Browse
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
            <Image source={profile.avatar} style={styles.avatar} />
          </TouchableOpacity>
        </View>
        <View style={[styles.row, styles.tabs]}>
          {tabs.map((tab, index) => this.renderTabs(tab, index))}
        </View>
        <View style={{flex: 6}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.row, styles.categories]}>
              {this.renderCategories()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

Browse.defaultProps = {
  profile: mock.profile,
  categories: mock.categories,
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
    paddingVertical: theme.sizes.padding,
    paddingHorizontal: theme.sizes.padding,
  },
  header: {
    flex: 1,
    justifyContent: 'space-between',
  },
  avatar: {
    height: theme.sizes.base * 2,
    width: theme.sizes.base * 2,
  },
  tabs: {
    // flex: 1,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  tab: {
    marginRight: theme.sizes.base * 2,
    paddingBottom: theme.sizes.base,
  },
  active: {
    borderBottomWidth: 3,
    borderBottomColor: theme.colors.primary,
  },
  categories: {
    // flex: 6,
    paddingHorizontal: theme.sizes.base * 2,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: theme.sizes.margin,
  },
  category: {
    width: (width - theme.sizes.padding * 2 - theme.sizes.base * 4 - 20) / 2,
    maxHeight: (width - theme.sizes.padding * 2 - theme.sizes.base) / 2,
    marginVertical: 10,
    paddingVertical: 10,
    borderRadius: theme.sizes.radius * 2,
  },
  image: {
    width: theme.sizes.padding * 2,
    height: theme.sizes.padding * 2,
    borderRadius: theme.sizes.padding,
    backgroundColor: 'rgba(43, 218, 142, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});

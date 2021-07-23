import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {setAppInfo} from '../../redux/actions';
import {connect} from 'react-redux';
import HomeScreen from './components/HomeScreen';
import NewsScreen from '../news/newsScreen';
import LoginScreen from '../loginFlow/components/Login';
import CitizenNewsScreen from '../citizen/components/NewsScreen';
import CitizenMapScreen from '../citizen/components/CitizenMapScreen';
import CitizenSaveScreen from '../citizen/components/CitizenSaveScreen';
import CitizenProgressScreen from '../citizen/components/CitizenProgressScreen';
// import CitizenFloatingAction from '../citizen/components/CitizenFloatingAction';
const HomeStackNav = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    News: {
      screen: NewsScreen,
    },
    NewsCarousel: {
      screen: CitizenNewsScreen,
    },
    
    CitizenMapScreen: {
      screen: CitizenMapScreen,
    },
    CitizenSaveScreen: {
      screen: CitizenSaveScreen,
    },
    CitizenProgressScreen: {
      screen: CitizenProgressScreen,
    },
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    mode: 'card',
  },
);

const HomeNavigator = createAppContainer(HomeStackNav);
export default HomeNavigator;

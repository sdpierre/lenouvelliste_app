import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import HomeScreen from './components/HomeScreen';
import NewsScreen from '../news/newsScreen';

const HomeStackNav = createStackNavigator({
    Home: {
        screen: HomeScreen
    },
    News: {
        screen: NewsScreen
    }
}, {
    initialRouteName: 'Home',
    headerMode: 'none',
    mode: 'card'
});

const HomeNavigator = createAppContainer(HomeStackNav);
export default HomeNavigator;

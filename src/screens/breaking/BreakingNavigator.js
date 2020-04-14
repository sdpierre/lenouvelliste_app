import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import BreakingScreen from './components/BreakingScreen';
import NewsScreen from './components/NewsScreen';
import CitizenMapScreen from '../citizen/components/CitizenMapScreen';
import CitizenSaveScreen from '../citizen/components/CitizenSaveScreen';
import CitizenProgressScreen from '../citizen/components/CitizenProgressScreen';

const BreakingStackNav = createStackNavigator({
    Breaking: {
        screen: BreakingScreen
    },
    News: {
        screen: NewsScreen
    },
    CitizenMapScreen: {
        screen: CitizenMapScreen
    },
    CitizenSaveScreen: {
        screen: CitizenSaveScreen
    },
    CitizenProgressScreen: {
        screen: CitizenProgressScreen
    },

}, {
    initialRouteName: 'Breaking',
    headerMode: 'none',
    mode: 'modal'
});

const BreakingNavigator = createAppContainer(BreakingStackNav);


export default BreakingNavigator;
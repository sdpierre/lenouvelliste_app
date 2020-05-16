import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import CitizenScreen from './components/CitizenScreen';
import NewsScreen from './components/NewsScreen';
import UserPost from './components/UserPostScreen';
import CitizenMapScreen from '../citizen/components/CitizenMapScreen';
import CitizenNewsMapScreen from '../citizen/components/CitizenNewsMapScreen';
import CitizenSaveScreen from '../citizen/components/CitizenSaveScreen';
import CitizenProgressScreen from '../citizen/components/CitizenProgressScreen';


const CitizenStackNav = createStackNavigator({
    Citizen: {
        screen: CitizenScreen
    },
    News: {
        screen: NewsScreen
    },  
    NewsMap: {
        screen: CitizenNewsMapScreen
    },    
    Profil: {
        screen: UserPost
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
    initialRouteName: 'Citizen',
    headerMode: 'none',
    mode: 'card'
});

const CitizenNavigator = createAppContainer(CitizenStackNav);
export default CitizenNavigator;
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import CitizenScreen from './components/CitizenScreen';
import NewsScreen from './components/NewsScreen';
import UserPost from './components/UserPostScreen';

const CitizenStackNav = createStackNavigator({
    Citizen: {
        screen: CitizenScreen
    },
    News: {
        screen: NewsScreen
    },    
    Profil: {
        screen: UserPost
    },
}, {
    initialRouteName: 'Citizen',
    headerMode: 'none',
    mode: 'card'
});

const CitizenNavigator = createAppContainer(CitizenStackNav);
export default CitizenNavigator;
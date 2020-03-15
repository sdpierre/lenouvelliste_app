import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MenuScreen from './components/MenuScreen';
// import LoginScreen from './components/LoginScreen';
import SettingScreen from './components/SettingScreen';
import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
// import RegisterScreen from './components/RegisterScreen';
// import ForgotpasswordScreen from './components/ForgotpasswordScreen';
// import ProfileScreen from './components/ProfileScreen';
import SectionScreen from './components/SectionScreen';
import NewsScreen from '../news/newsScreen';

const MenuStackNav = createStackNavigator({
    Menu: {
        screen: MenuScreen
    },
    Section:{
        screen: SectionScreen
    },
    News: {
        screen: NewsScreen
    }
}, {
    initialRouteName: 'Menu',
    headerMode: 'none',
    mode: 'card'
});

const MenuNavigator = createAppContainer(MenuStackNav);

export default MenuNavigator;


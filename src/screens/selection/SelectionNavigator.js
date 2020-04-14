import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import SelectionScreen from './components/SelectionScreen';
import NewsScreen from '../news/newsScreen';
import CitizenMapScreen from '../citizen/components/CitizenMapScreen';
import CitizenSaveScreen from '../citizen/components/CitizenSaveScreen';
import CitizenProgressScreen from '../citizen/components/CitizenProgressScreen';


const SelectionStackNav = createStackNavigator({
    Selection: {
        screen: SelectionScreen
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
    initialRouteName: 'Selection',
    headerMode: 'none',
    mode: 'card'
});

const SelectionNavigator = SelectionStackNav;
//const SelectionNavigator = createAppContainer(SelectionStackNav);
export default SelectionNavigator;

import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import SelectionScreen from './components/SelectionScreen';
import NewsScreen from '../news/newsScreen';

const SelectionStackNav = createStackNavigator({
    Selection: {
        screen: SelectionScreen
    },
    News: {
        screen: NewsScreen
    }
}, {
    initialRouteName: 'Selection',
    headerMode: 'none',
    mode: 'card'
});

const SelectionNavigator = SelectionStackNav;
//const SelectionNavigator = createAppContainer(SelectionStackNav);
export default SelectionNavigator;

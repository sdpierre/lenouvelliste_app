import React, { Component } from "react";
import { Text, View } from "react-native";
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from "react-redux";

import EmptyScreen from "../screens/EmptyScreen";

import SelectionScreen from "../screens/selection/SelectionNavigator";
import BreakingNavigator from "./breaking/BreakingNavigator";
import CitizenNavigator from "../screens/citizen/CitizenNavigator";
import HomeNavigator from "../screens/home/HomeNavigator";
import SelectionNavigator from './selection/SelectionNavigator'
import MenuNavigator from './menu/MenuNavigator'

const getScreenRegisteredFunctions = navState => {
  // When we use stack navigators. 
  // Also needed for react-navigation@2
  const { routes, index, params } = navState;

  if (navState.hasOwnProperty('index')) {
    return getScreenRegisteredFunctions(routes[index]);
  }
  // When we have the final screen params
  else {
    return params;
  }
}

const AppNavigator = createBottomTabNavigator(

    {
      Home: HomeNavigator,
      Breaking: BreakingNavigator,
      Citizen: CitizenNavigator,
      Selection: SelectionNavigator,
      Menu: MenuNavigator,
    },
    {
      defaultNavigationOptions: ({ navigation }) => (
        {
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
          const { routeName } = navigation.state;
  
          let iconName;
          if (routeName === "Home") {
            iconName = `home${focused ? "" : "-outline"}`;
          } else if (routeName === "Breaking") {
            iconName = `bell${focused ? "" : "-outline"}`;
          } else if (routeName === "Citizen") {
            iconName = `comment${focused ? "" : "-outline"}`;
          } else if (routeName === "Selection") {
            iconName = `bookmark${focused ? "" : "-outline"}`;
          } else if (routeName === "Menu") {
            iconName = `menu${focused ? "" : ""}`;
          }
  
          // You can return any component that you like here!
          return <Ionicons name={iconName} size={25} color={tintColor} />;
        }
      }),
      tabBarOptions: {
        activeTintColor: "#267DEA",
        inactiveTintColor: "gray",
        style: {
          paddingTop: 5
        }
      }
    }
  );

  export default AppNavigator;
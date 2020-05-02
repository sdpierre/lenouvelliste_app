import React, { Component } from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import LoginNavigator from "./loginFlow/loginNavigator";
import BreakingNavigator from "./breaking/BreakingNavigator";
import CitizenNavigator from "../screens/citizen/CitizenNavigator";
import HomeNavigator from "../screens/home/HomeNavigator";
import SelectionNavigator from './selection/SelectionNavigator';
import MenuNavigator from './menu/MenuNavigator';

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
          paddingTop: 5,
        }
      }
    }
  );

  // const AppNavigator = createStackNavigator({
  //   Login: LoginNavigator,
  //   Home: BottomTabNavigator
  // });
  // export default AppNavigator;

  // const AppNavigator = createStackNavigator(
  //   {
  //     login: {
  //       screen: LoginNavigator
  //     },
  //     Breaking: {
  //       screen: BreakingNavigator
  //     },
  //     Citizen: {
  //       screen: CitizenNavigator
  //     },
  //     Home: {
  //       screen: HomeNavigator
  //     },
  //     Selection: {
  //       screen: SelectionNavigator
  //     },
  //     Menu: {
  //       screen: MenuNavigator
  //     },


  //     tabs: {
  //       screen: bottomTabNavigator
  //     }
  //   },
  //   {
  //     initialRouteName: "Home",
  //     headerMode: "none"
  //   }
  // );
  
  const AppContainer = createAppContainer(AppNavigator);
  export default AppContainer;



  // const ProfileStack = createStackNavigator({
  //   ScreenName: { screen: ScreenA },
  //   ..another screen
  // })
  
  // const caringAdviceStack = createStackNavigator({
  //   CaringAdvice: { screen: CaringAdvice },
  //   ..another screen
  // })
  
  // const FoodListStack = createStackNavigator({
  //   FoodList: { screen: FoodList }
  // })
  
  // const MenuStack = createStackNavigator({
  //   Menu: { screen: DrawerContent },
  //   About: { screen: About },
  //   CaringAdvice: {screen: caringAdviceStack}
  // })
  
  // const MainTabs = createBottomTabNavigator({
  //   DrawerTab: { screen: MenuStack },
  //   FoodList: { screen: FoodListStack },
  //   Profile: { screen: ProfileStack }
  // }, {
  //   headerMode: 'none',
  //   navigationOptions: {
  //     headerStyle: styles.header,
  //     headerTitleStyle: styles.headerTitle,
  //     drawerLabel: 'Application',
  //     drawerIcon: ({ focused }) => (
  //       <Icon name='dashboard' color={Colors.primary} />
  //     )
  //   },
  //   tabBarOptions: {
  //     activeTintColor: Colors.darkPrimary,
  //     inactiveTintColor: Colors.tabbarInactive,
  //     allowFontScaling: true,
  //     showLabel: false,
  //     showIcon: true,
  //     style: styles.tabBackground,
  //     tabStyle: styles.tab,
  //     labelStyle: styles.tabLabel,
  //     indicatorStyle: styles.tabIndicator,
  //     upperCaseLabel: false
  //   },
  //   tabBarPosition: 'bottom',
  //   swipeEnabled: true,
  //   animationEnabled: true,
  //   lazy: true
  // })
  
  // const PrimaryNav = createStackNavigator({
  //   MainTabs: { screen: MainTabs },
  //   UpgradeScreen: { screen: UpgradeScreen }
  // }, {
  //   headerMode: 'none',
  //   initialRouteName: 'MainTabs',
  //   defaultNavigationOptions: {
  //     headerStyle: styles.header,
  //     headerTitleStyle: styles.headerTitle,
  //     headerTintColor: Colors.snow
  //   }
  // })
  
  // export default createAppContainer(PrimaryNav)
  
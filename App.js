/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';

import {Provider} from 'react-redux';
import {createReduxContainer} from 'react-navigation-redux-helpers';
import {connect} from 'react-redux';
import {store} from './src/redux/store';
import AppNavigator from './src/screens/AppNavigator';
// import CitizenSaveScreen from './src/screens/citizen/components/CitizenSaveScreen';

//OneSignal
import OneSignal from 'react-native-onesignal';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';

const AppNav = createReduxContainer(AppNavigator);
const mapStateToProps = state => ({
  state: state.nav,
});
const AppContainer = connect(mapStateToProps)(AppNav);
console.disableYellowBox = true;

export default class App extends Component {
  constructor(properties) {
    super(properties);

    this.state = {
      userId: '',
    };

  if (Platform.OS == 'ios') {
      console.log('In ios');
      OneSignal.init('3728d7a9-c5b3-4c83-a88d-a085f6765274'); //iOS App ID
    } else {
      console.log('In Android');
      OneSignal.init('40ff38fc-96c8-4c8b-9f7d-4f9f0936a746'); //Android App ID
    }

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }
  openCamera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      mediaType: 'video',
    }).then(image => {
      console.log(image);
    });
  }
  render() {
    const buttons = ['Map', 'Satellite'];
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

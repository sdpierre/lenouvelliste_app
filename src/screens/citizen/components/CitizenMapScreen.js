import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  PermissionsAndroid,
  Image,
  FlatList,
  ScrollView,
  TouchableHighlight, Dimensions, TouchableOpacity
} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import RetroMapStyles from './MapStyles/RetroMapStyles.json';

import MapView, { Marker } from 'react-native-maps';

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 18.533333;
const LONGITUDE = -72.333336;
const LATITUDE_DELTA = 0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { Container, Header, Left, Body, Right, Icon, Title, Content } from 'native-base';
import { Button, ButtonGroup } from 'react-native-elements';

export default class CitizenMapScreen extends Component {
  constructor() {
    super();
    global.latlng = { latitude: 18.533333, longitude: -72.333336 },
      global.region = {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },

      this.state = {
        mapTypeIndex: 0,
        imageData: '',
        videoData: '',
        locationGot: false
      };
    this.chooseMapType = this.chooseMapType.bind(this);
  }
  componentDidMount() {

    if (Platform.OS == 'ios') {
      console.log(' ios Did mount calling')

      Geolocation.getCurrentPosition(
        (position) => {
           
          global.latlng = { latitude: position.coords.latitude, longitude: position.coords.longitude }
          global.region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }
          this.setState({
            locationGot: true
          })
          //console.log("lat long.....", this.state.latlng.latitude + " " + this.state.latlng.longitude);
        },
        error => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
      return true;
    } else {
      this.getLocation_Android()
    }
  }
   getLocation_Android = async() => {
    console.log(' android Did mount calling')
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Access Required',
          message: 'This App needs to Access your location',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        Geolocation.getCurrentPosition(
          (position) => {
            global.latlng = { latitude: position.coords.latitude, longitude: position.coords.longitude }
              global.region = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }
            this.setState({
              locationGot: true
            })
            console.log("lat long.....android....", global.latlng);
          },
          error => {
            // See error code charts below.
            console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });

        return true;
      } else {
        alert('Permission Denied');
        return false;
      }
    } catch (err) {
      console.warn(err);
      return false;
    }
  }
  chooseMapType = index => {
    this.setState({ mapTypeIndex: index });
  };
  
  goToSaveCitizen = () => {
    const { navigation } = this.props;
    const strImageData = navigation.getParam('imageData');

    if (strImageData == undefined) {
      const videoData = navigation.getParam('videoData');
      this.props.navigation.navigate('CitizenSaveScreen', {
        'videoData': videoData
      })
    } else {
      this.props.navigation.navigate('CitizenSaveScreen', {
        'imageData': strImageData
      })
    }
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }
  render() {


    const buttons = ['Map', 'Satellite'];
    return (
      <Container>
        <Header style={{ backgroundColor: 'white', }}>
          <Left>
            {/* <Button
                  transparent
                  onPress={() => {
                      this.props.navigation.goBack();
                  }}>
                  <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
              </Button> */}
          </Left>
          <Body>
            <Title>Où ?</Title>
          </Body>
          <Right></Right>
        </Header>
        <ScrollView>
          <View style={{ flex: 1 }}>
            <View
              style={{
                justifyContent: 'center',
                marginBottom: 10,
                height: '10%',
              }}>
              <ButtonGroup
                onPress={this.chooseMapType}
                selectedIndex={this.state.mapTypeIndex}
                buttons={buttons}
                containerStype={{ height: 10 }}
              />
            </View>

            <View style={{ height: 400 }}>
              {this.state.locationGot ?
                <MapView
                  style={{ flex: 1, height: '100%' }}
                  region={global.region}
                  followsUserLocation={true}
                  showsUserLocation={true}
                  zoomEnabled={true}
                  animateToRegion={global.region}
                  mapType={
                    this.state.mapTypeIndex === 0 ? 'standard' : 'satellite'
                  }>
                  <Marker
                    draggable
                    followsUserLocation={true}
                    coordinate={global.latlng}
                  />
                </MapView>
                : null}
            </View>

            <View style={{ flex: 1, padding: 35 }}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

                <Button
                  title="I confirm"
                  buttonStyle={{ backgroundColor: 'red', marginTop: 20 }}
                  onPress={this.goToSaveCitizen} />
              </View>
            </View>
          </View>
        </ScrollView>

      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  citizenSaveText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    //marginLeft:35
  },
  nextButton: {
    backgroundColor: '#0089d0',
    height: 50,
    alignItems: 'center'
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

  },

});
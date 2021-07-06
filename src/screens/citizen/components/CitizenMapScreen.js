import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
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
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { Container, Header, Left, Body, Right, Icon, Title, Content } from 'native-base';
import { Button, ButtonGroup } from 'react-native-elements';

export default class CitizenMapScreen extends Component {
  constructor() {
    super();
    this.state = {
      mapTypeIndex: 0,
      lat: null,
      lng: null,
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      imageData: '',
      videoData: ''
    };
    this.chooseMapType = this.chooseMapType.bind(this);
  }


  componentDidMount() {
    
    // console.log("Image Data Map",this.state.imageData);
    // navigator.geolocation.getCurrentPosition(
    //   position => {
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //       }
    //     });
    //   },
    // (error) => console.log(error.message),
    // { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
    // this.watchID = navigator.geolocation.watchPosition(
    //   position => {
    //     this.setState({
    //       region: {
    //         latitude: position.coords.latitude,
    //         longitude: position.coords.longitude,
    //         latitudeDelta: LATITUDE_DELTA,
    //         longitudeDelta: LONGITUDE_DELTA,
    //       }
    //     });
    //   }
    // );

  this.wathcId = Geolocation.getCurrentPosition(position => {
      this.setState({ lat: position.coords.latitude, lng: position.coords.longitude});
      },
      error => console.log(error)
    );
  }
  
  chooseMapType = index => {
    this.setState({ mapTypeIndex: index });
  };
  
  goToSaveCitizen = () => {
    const { navigation } = this.props;
    const strImageData = navigation.getParam('imageData');
    
    if (strImageData == undefined){
      const videoData = navigation.getParam('videoData');
      this.props.navigation.navigate('CitizenSaveScreen', {
        'videoData': videoData
      })
    }else{
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
        <View style={{flex:1}}>
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

            <MapView
              style={{ flex: 1, height: '100%' }}
              region={this.state.region}
              followsUserLocation={true}
              showsUserLocation={true}
              mapType={
                this.state.mapTypeIndex === 0 ? 'standard' : 'satellite'
              }>

              <Marker
                draggable
                followsUserLocation={true}
                // coordinate={this.state.latlng}
                coordinate={{latitude: this.state.lat,longitude: this.state.lng}}
                // onDragEnd={e =>
                //   this.setState({ latlng: e.nativeEvent.coordinate })
                // }
              />
            </MapView>
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
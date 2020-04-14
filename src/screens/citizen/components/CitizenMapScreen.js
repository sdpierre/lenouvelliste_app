import React, { Component } from 'react';
import { Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  TouchableHighlight,Dimensions,TouchableOpacity} from 'react-native';
//import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
// import RetroMapStyles from './MapStyles/RetroMapStyles.json';
let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';

export default class CitizenMapScreen extends Component {
  constructor() {
    super();
    this.state = {
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }
    };
  }
  componentDidMount() {
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
  }

  goToSaveCitizen = ()=>{

    this.props.navigation.navigate('CitizenProgressScreen')

  }
  componentWillUnmount() {
    //navigator.geolocation.clearWatch(this.watchID);
  }
  render() {
    return (
      <Container>
      <Header style={{ backgroundColor: 'white', }}>
          <Left>
              {/* <Button
                  transparent
                  onPress={() => {
                      this.props.navigation.goBack();
                  }}>
                  // <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
              </Button> */}
          </Left>
          <Body>
          <Title>MAP</Title>
          </Body>
          <Right></Right>
      </Header>
      <Content>
          <View style={{ flex: 1, height: 500, padding: 35 }}>
              <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

                  <Text style={styles.citizenSaveText}>MAP is coming soon</Text>

                  {/* <MapView */}
       {/* // provider={ PROVIDER_GOOGLE }
        style={ styles.container }
        // customMapStyle={ RetroMapStyles }
       // showsUserLocation={ true }
       // region={ this.state.region }
        //onRegionChange={ region => this.setState({region}) }
        //onRegionChangeComplete={ region => this.setState({region}) }
      > */}
        {/* <MapView.Marker
          coordinate={ this.state.region }
        /> */}
      {/* </MapView> */}


                  <View style={styles.nextButton}>
                      <TouchableOpacity
                          transparent
                          onPress={this.goToSaveCitizen}>
                          <View style={styles.buttonContainer}>
                              <Text style={{ color: 'white', fontSize: 20 }}>NEXT</Text>
                          </View>
                      </TouchableOpacity>

                  </View>



              </View>
          </View>
      </Content>
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
    height:50,
    alignItems:'center'
},
buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',

},

});
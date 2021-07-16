import React, {useState, useRef} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableHighlight,
  TouchableOpacity,
  Modal,
  Linking,
  Alert, ScrollView
} from 'react-native';

import { setAppInfo } from '../../../redux/actions';
import { connect } from 'react-redux';
import moment from "moment";
import "moment/min/locales";
import HTMLView from 'react-native-htmlview';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FitImage from 'react-native-fit-image';
import Video from 'react-native-video';
//import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
import MediaControls,{PLAYER_STATES}  from "react-native-media-controls";
import MapView, { Marker } from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

import { Typography, Colors, Spacing } from "../../../styles";
import { Container, Header, Left, Body, Right, Icon, Title, Content, ListItem, List } from 'native-base';
import { Button } from 'react-native-elements';

import ImageLoad from 'react-native-image-placeholder';

import Geocoder from 'react-native-geocoding';
// import { ScrollView } from 'react-native-gesture-handler';

import { getCitizenMedia } from "../../../library/networking/Api"
import NetInfo from '@react-native-community/netinfo';
let fetchOverNet;
let videoUrl;
var videoViewHeight=300;
var imageViewHeight=300;
import {
  IndicatorViewPager,
  PagerDotIndicator,
} from '@shankarmorwal/rn-viewpager';
import { element } from 'prop-types';
import { NavigationActions, StackActions } from 'react-navigation';


let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 0;
const LONGITUDE = 0;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO; 

class CitizenNewsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      latlng: { latitude: 18.533333, longitude: -72.333336 },
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      id: this.props.navigation.getParam('id'),
      title: this.props.navigation.getParam('title'),
      body: this.props.navigation.getParam('body'),
      date: this.props.navigation.getParam('date'),
      category: this.props.navigation.getParam('category'),
      headline: this.props.navigation.getParam('headline'),
      username: this.props.navigation.getParam('username'),
      media: this.props.navigation.getParam('media'),
      userphoto: this.props.navigation.getParam('userphoto'),
      type: this.props.navigation.getParam('type'),
      long: this.props.navigation.getParam('long'),
      lat: this.props.navigation.getParam('lat'),
      duration: 0,
      isVisible: false,
      address: '',
      imageArr:[],
      isVisibleImage:true,
      isVisibleVideo:false,
      paused: true,
    }
    this.fetchNews = this.fetchNews.bind(this);
  }
  componentDidMount() {
    NetInfo.fetch()
            .then(conn => {

                fetchOverNet = conn.isConnected;
            })
            .then(() => {

                if (fetchOverNet) this.fetchNews();
                else {
                    this.setState({
                        refreshing: false,
                        data: sectionDataDb,
                        visible:false

                    });
                }
            });
    if (this.state.type == "image"){
      videoViewHeight=0;
      imageViewHeight=300;
      console.log("videoViewHeight",videoViewHeight,"imageViewHeight",imageViewHeight)
      this.setState({isVisibleImage:true, isVisibleVideo:false})
    }else{
      imageViewHeight=0;
      videoViewHeight=300;
      console.log("videoViewHeight",videoViewHeight,"imageViewHeight",imageViewHeight)
      this.setState({isVisibleImage:false, isVisibleVideo:true})
    }
    console.log("newScreen id",this.state.id),
    
    Geocoder.init("AIzaSyA2SaIqhCmxkgyJsws5AoVK09IOZ0g9wYk"); // use a valid API key

    this.wathcId = Geolocation.getCurrentPosition(position => {
      const { latitude, longitude } = position.coords;
      this.getAddressFromLatLong(latitude, longitude)
    });
  }

  getAddressFromLatLong(lat, long) {

    console.log('lat', lat)
    console.log('long', long)
    Geocoder.from(41.89, 12.49)
      .then(json => {
        var addressComponent = json.results[0].address_components[0];
        console.log('Address', addressComponent);
        this.setState({
          address: addressComponent.long_name
        })
      })
      .catch(error => console.warn(error));

  }

  // hide show modal
  displayModal(show) {
    this.setState({ isVisible: show })
  }
  //Fetch citizenMedia from API
  fetchNews() {
    console.log(" fetchNews newScreen id",this.state.id),
    getCitizenMedia(this.state.id)
        .then(resp => {
          console.log("respose citizenMedia calling api",resp.news_media)
            
           this.setState({ imageArr: resp.news_media });
           console.log("imageArr",this.state.imageArr[0].media_url)
           videoUrl = this.state.imageArr[0].media_url
           console.log("imageArr2",videoUrl)
        })
        .catch(e => {
            console.log('ExceptionSection>>> citizenMedia', e);
            this.setState({ refreshing: false });
        });
}

  onLoad = data => this.setState({ duration: data.duration, isLoading: false });

  goToCitizenNewsMapScreen = () => {

    this.props.navigation.navigate('NewsMap')

  }
  
  _renderModalContent = (markers) => {

    console.log(markers);
    return (

      <View>
        <MapView
          region={{
            latitude: 18.533333,
            longitude: -72.333336,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          }}
          ref="map"
          loadingEnabled
          style={{ width: '100%', height: '100%' }}
          annotations={markers}
          zoomEnabled={true}
          minZoomLevel={15}>
          <Marker
            coordinate={{ latitude: 18.533333, longitude: -72.333336 }}
            image={require('../../../res/images/pin.png')}
          />
        </MapView>

        <View
          style={{
            position: 'absolute',//use absolute position to show button on top of the map
            top: '60%', //for center align
            alignSelf: 'center', //for align to right
          }}
        >
          <Button
            icon={
              <MaterialCommunityIcons
                name="close"
                size={15}
                color="white"
              />
            }
            style={{ marginTop: 40 }}
            onPress={() => {
              this.setState({ isVisible: !this.state.isVisible });
            }}
          />
        </View>

      </View>
    );
  }
  render() {
    const { title } = this.state;
    const { body } = this.state;
    const { date } = this.state;
    const { category } = this.state;
    const { headline } = this.state;
    const { username } = this.state;
    const { media } = this.state;
    const { userphoto } = this.state;
    const { type } = this.state;
    const { long } = this.state;
    const { lat } = this.state;
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';
    const { navigate } = this.props;
    var markers = [
      {
        latitude: 45.65,
        longitude: -78.90,
        title: 'Foo Place',
        subtitle: '1234 Foo Drive'
      }
    ];
     pauseVideo = () => {
     var curr = this.state.currentIndex;
     console.warn(curr);
     if(this.player[curr]) {
       this.setState({paused: true });
     }
   }

   playVideo = () => {
     var curr = this.state.currentIndex;
     console.warn(curr);
     if(this.player[curr]) {
     this.setState({paused: false});
     }
   }

   handlePlaying = (isVisible) => {
     isVisible ? this.playVideo() : this.pauseVideo();
   }

    return (
      
      <Container>
        <Header>
          <Left>
            <MaterialCommunityIcons name="arrow-left" size={25} style={Colors.gray} onPress={() => { this.props.navigation.goBack() }} />
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <ScrollView>

          <Modal
            animationType={"slide"}
            style={styles.modal}
            presentationStyle="formSheet"
            transparent={true}
            visible={this.state.isVisible}
            onRequestClose={() => {
              Alert.alert('Modal has now been closed.');
            }}>
            <View
              style={{
                backgroundColor: 'transparent',
                flex: 1,
                justifyContent: 'flex-end',
              }}>
              <View
                style={{
                  backgroundColor: 'white',
                  height: '40%'
                }}>
                {this._renderModalContent(markers)}
              </View>
            </View>
          </Modal>
          <View style={{height:videoViewHeight, width:'100%',top:0}}  visible={this.state.isVisibleVideo}> 
            <Video
                source={{uri: videoUrl}}
                resizeMode="contain"
                controls={true}
                repeat={false}
                ref={(ref) => {
                  this.player = ref
                }}
                onBuffer={this.onBuffer}
                onError={this.videoError}
                onLoad={this.onLoad}
                style={styles.backgroundVideo} />
            {/* <MediaControls
                duration={this.state.duration}
                isLoading={this.state.isLoading}
                mainColor="#333"
                onFullScreen={this.onFullScreen}
                onPaused={this.onPaused}
                onReplay={this.onReplay}
                onSeek={this.onSeek}
                onSeeking={this.onSeeking}
                playerState={this.state.playerState}
                progress={this.state.currentTime}
                toolbar={this.renderToolbar()}
            /> */}
          </View>

                {/* <FitImage
                  source={{ uri: media || nophoto }}
                  style={Spacing.fitImage}
                /> */}
          <View style={{flex: 1,height:imageViewHeight,width:"100%",top:0,overflow: 'hidden'}} visible={this.state.isVisibleImage}>
              <IndicatorViewPager
                style={styles.pagerStyle}
                visible={this.state.isVisibleImage}
                indicator={
                  <PagerDotIndicator pageCount={this.state.imageArr.length} 
                  selectedDotStyle={{backgroundColor:"#FFCD00"}} visible={this.state.isVisibleImage}/>
                }>
                {this.state.imageArr.map(element => (
                    <View key={element}>
                      {/* <Image style={{ width: "100%", height: "100%" }} source={{ uri: element.media_url }} /> */}
                      <ImageLoad
                        style={{ width: "100%", height: "100%" }}
                        placeholderSource={require('../../../../src/res/images/noimage.jpg')}
                        loadingStyle={{size: 'large', color: 'blue'}}
                        source={{ uri: element.media_url }}
                        //resizeMode="cover"
                      />
                    </View>
                  )
                )}
              </IndicatorViewPager>
          </View>
          <View style={styles.CitizennewsMainContainer}>

            <Text style={styles.CitizennewsCategoryStyle}>Address</Text>
            <TouchableOpacity
              onPress={() => {
                this.displayModal(true);
              }}>
              <Text style={styles.CitizennewsLocationStyle}>{this.state.address}</Text></TouchableOpacity>
            <Text style={styles.CitizennewsTitleStyle}>{title}</Text>


            <View style={{ marginTop: 10, flex: 1, flexDirection : "row"}}>
              <View>
                <Image
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 40 / 2,
                    overflow: "hidden",
                    borderWidth: 1,
                    borderColor: "#979797"
                  }}
                  source={{ uri: userphoto }}
                />
              </View>
              <View style={{ padding: 5 }}>
                <Text style={styles.CitizennewsUsernameStyle}>
                  {username}
                </Text>
                <Text style={styles.CitizennewsMomentStyle}>
                  {(time = moment(date || moment.now()).fromNow())}
                </Text>
              </View>
            </View>

            <View style={{ alignItems: 'center' }}>

            </View>
            <Text style={Typography.bodyWhite}>{body}</Text>

          </View>

        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  CitizennewsMainContainer: {
    ...Spacing.container,
    backgroundColor: "#191D25",
    flex: 1,
  },
  CitizennewsStyleContainer: {
    backgroundColor: "#191D25",
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden"
  },
  CitizennewsContentStyleContainer: {
    backgroundColor: "#191D25",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  CitizennewsCategoryStyle: {
    fontSize: 13,
    textTransform: "uppercase",
    fontFamily: "AkkoPro-BoldCondensed",
    color: "#FFCD00",
    marginBottom: 5
  },
  CitizennewsLocationStyle: {
    fontSize: 15,
    color: "#FFF",
    marginBottom: 20,
    marginTop: 10,
    fontFamily: "Gotham-book"
  },
  CitizennewsTitleStyle: {
    fontSize: 27,
    color: "#FFFFFF",
    fontFamily: "Georgia",
    marginBottom: 5
  },
  CitizennewsUsernameStyle: {
    fontSize: 12,
    color: "#FFCD00",
    marginBottom: 5,
    fontFamily: "Gotham-book"
  },
  CitizennewsMomentStyle: {
    fontSize: 11,
    color: "#FFFFFF",
    fontFamily: "Gotham-book",
  },
  Citizen: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "#0089D0"
  },
  ClaminuteTitre: {
    fontSize: 16,
    width: 350,
    marginBottom: 10,
    marginTop: 5,
    color: "#282929"
  },
  backgroundVideo: {
    flex:1,
    height:videoViewHeight, 
    width:'100%',
    //position: 'absolute',
    // top: 0,
    // left: 0,
    // bottom: 0,
    // right: 0,
    //justifyContent: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 80,
    padding: 40
  },
  background1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#C70039',
  },
  background2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF5733',
  },
  background3: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFC300',
  },
  textStyle: {
    color: 'white',
    fontSize: 30,
  },
  pagerStyle: {
    flex:1,
    backgroundColor: 'white',
  },
});

const mapStateToProps = (state) => ({
  appInfo: state.appInfo || "Please Wait...",
});

const mapDispatchToProps = (dispatch) => {
  return {
    setAppInfo: (info) => {
      dispatch(setAppInfo(info))
    }
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CitizenNewsScreen);
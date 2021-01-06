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
  FlatList,
  Alert, ScrollView
} from 'react-native';

import { Col, Row, Grid } from "react-native-easy-grid";
import { setAppInfo } from '../../../redux/actions';
import { connect } from 'react-redux';
import moment from "moment";
import "moment/min/locales";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
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

let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;



class CitizenNewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      imageArr: [],
      isVisibleImage: true,
      isVisibleVideo: false,
      paused: true,
    
    };
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
            visible: false,
          });
        }
      });
    if (this.state.type == 'image') {
      videoViewHeight = 0;
      imageViewHeight = 300;
      //console.log("videoViewHeight",videoViewHeight,"imageViewHeight",imageViewHeight)
      this.setState({isVisibleImage: true, isVisibleVideo: false});
    } else {
      imageViewHeight = 0;
      videoViewHeight = 300;
      // console.log("videoViewHeight",videoViewHeight,"imageViewHeight",imageViewHeight)
      this.setState({isVisibleImage: false, isVisibleVideo: true});
    }
    //console.log("newScreen id",this.state.id),

    // Geocoder
    Geocoder.init('AIzaSyA2SaIqhCmxkgyJsws5AoVK09IOZ0g9wYk'); // use a valid API key

    this.wathcId = Geolocation.getCurrentPosition(position => {
      const {latitude} = this.state.lat;
      const {longitude} = this.state.long;
      this.getAddressFromLatLong(latitude, longitude);
    });
  }

  getAddressFromLatLong() {
    Geolocation.getCurrentPosition(
      position => {
        this.setState({});
        Geocoder.from(this.state.lat, this.state.long)
          .then(json => {
            var addressComponent = json.results[0].formatted_address;
            this.setState({
              Address: addressComponent,
            });
          })
      },
    );
  }

  // hide show modal
  displayModal(show) {
    this.setState({isVisible: show});
  }
  //Fetch citizenMedia from API
  fetchNews() {
    //console.log(" fetchNews newScreen id",this.state.id),
    getCitizenMedia(this.state.id)
      .then(resp => {
        //console.log("respose citizenMedia calling api",resp.news_media)

        this.setState({imageArr: resp.news_media});
        //console.log("imageArr",this.state.imageArr[0].media_url)
        videoUrl = this.state.imageArr[0].media_url;
        //console.log("imageArr2",videoUrl)
      })
      .catch(e => {
        //console.log('ExceptionSection>>> citizenMedia', e);
        this.setState({refreshing: false});
      });
  }

  onLoad = data => this.setState({duration: data.duration, isLoading: false});

  goToCitizenNewsMapScreen = () => {
    this.props.navigation.navigate('NewsMap');
  };

  render() {
    const {title} = this.state;
    const {body} = this.state;
    const {date} = this.state;
    const {category} = this.state;
    const {headline} = this.state;
    const {username} = this.state;
    const {media} = this.state;
    const {userphoto} = this.state;
    const {type} = this.state;
    const {long} = this.state;
    const {lat} = this.state;
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';
    const {navigate} = this.props.navigation;

    pauseVideo = () => {
      var curr = this.state.currentIndex;
      console.warn(curr);
      if (this.player[curr]) {
        this.setState({paused: true});
      }
    };

    playVideo = () => {
      var curr = this.state.currentIndex;
      console.warn(curr);
      if (this.player[curr]) {
        this.setState({paused: false});
      }
    };

    handlePlaying = isVisible => {
      isVisible ? this.playVideo() : this.pauseVideo();
    };

    const DATA = [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'Craindre le pire pour secteur privé lorem ipsum dumy dolor standard',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Craindre le pire pour secteur privé lorem ipsum dumy dolor standard',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Craindre le pire pour secteur privé lorem ipsum dumy dolor standard',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Craindre le pire pour secteur privé lorem ipsum dumy dolor standard',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Craindre le pire pour secteur privé lorem ipsum dumy dolor standard',
      },
    ];

    const Item = ({ title }) => (
      <View style={{borderTopColor:'#656565',borderStyle:'solid',borderTopWidth:1, flex:1, flexDirection:'row', paddingTop:20, paddingBottom:20}}>

        <View>  
        <Image
        style={{ width: 25, height: 25, marginRight:15}}
        source={require('../../../res/images/imageIcon.png')}
      />
        </View>            
        <View> 
        <Text style={{fontFamily: 'Georgia',
            fontSize: 16,
            color: '#E7E7E7',
            letterSpacing: 0,
            lineHeight: 21}}>{title}</Text>
        </View>
        
      </View>
    );
    const renderItem = ({ item }) => (
      <Item title={item.title} />
    );
    

    return (
      <Container>
        <Header>
          <Left>
            <MaterialCommunityIcons
              name="arrow-left"
              size={25}
              style={Colors.gray}
              onPress={() => {
                this.props.navigation.goBack();
              }}
            />
          </Left>
          <Body />
          <Right />
        </Header>
        <ScrollView style={{backgroundColor: '#191D25'}}>
          <View
            style={{height: videoViewHeight, width: '100%', top: 0}}
            visible={this.state.isVisibleVideo}>
            <Video
              source={{uri: videoUrl}}
              resizeMode="contain"
              controls={true}
              repeat={false}
              ref={ref => {
                this.player = ref;
              }}
              onBuffer={this.onBuffer}
              onError={this.videoError}
              onLoad={this.onLoad}
              style={styles.backgroundVideo}
            />
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

          <View
            style={{
              flex: 1,
              height: imageViewHeight,
              width: '100%',
              top: 0,
              overflow: 'hidden',
            }}
            visible={this.state.isVisibleImage}>
            <IndicatorViewPager
              style={styles.pagerStyle}
              visible={this.state.isVisibleImage}
              indicator={
                <PagerDotIndicator
                  pageCount={this.state.imageArr.length}
                  selectedDotStyle={{backgroundColor: '#FFCD00'}}
                  visible={this.state.isVisibleImage}
                />
              }>
              {this.state.imageArr.map(element => (
                <View key={element}>
                  {/* <Image style={{ width: "100%", height: "100%" }} source={{ uri: element.media_url }} /> */}
                  <ImageLoad
                    style={{width: '100%', height: '100%'}}
                    placeholderSource={require('../../../../src/res/images/noimage.jpg')}
                    loadingStyle={{size: 'large', color: 'blue'}}
                    source={{uri: element.media_url}}
                    //resizeMode="cover"
                  />
                </View>
              ))}
            </IndicatorViewPager>
          </View>
          <View style={styles.CitizennewsMainContainer}>
            {/* 
            <Text style={styles.CitizennewsCategoryStyle}>Adresse</Text> */}
            <TouchableOpacity
              onPress={() => {
                this.displayModal(true);
              }}>
              <Text style={styles.CitizennewsLocationStyle}>
                {this.state.Address}{' '}
              </Text>
            </TouchableOpacity>

            <Text style={styles.CitizennewsTitleStyle}>{title}</Text>

            {/* Link to profil and report */}
            <View style={{flex: 1, flexDirection: 'row', marginTop: 20}}>
              <View
                style={{
                
                  flexGrow: 1,
                }}>
                <TouchableOpacity onPress={() => navigate('Profil')}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                      <View>
                        <Image
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: 40 / 2,
                            overflow: 'hidden',
                            borderWidth: 1,
                            borderColor: '#979797',
                            marginTop: 8,
                            marginRight: 6,
                          }}
                          source={{uri: userphoto}}
                        />
                      </View>
                      <View style={{padding: 5}}>
                        <Text style={styles.CitizennewsUsernameStyle}>
                          {username}
                        </Text>
                        <Text style={styles.CitizennewsMomentStyle}>
                          {(time = moment(date || moment.now()).fromNow())}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 30,
                 
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Text>
                  <MaterialCommunityIcons
                    name="flag"
                    size={20}
                    style={{color: 'red'}}
                    onPress={() => {
                      this.props.navigation.goBack();
                    }}
                  />
                </Text>
              </View>
            </View>
            {/* Link to profil and report */}
            <Image
              style={{
                width: 300,
                height: 50,
                marginRight: 15,
                marginTop: 30,
                marginBottom: 20,
                alignSelf: 'center',
                resizeMode: 'stretch',
              }}
              source={{uri: 'http://placeimg.com/300/50/any'}}
            />

            <Text style={Typography.bodyWhite}>{body}</Text>

            <View>
              <Text
                style={{
                  fontFamily: 'AkkoPro-BoldCondensed',
                  fontSize: 16,
                  color: '#EEEEEE',
                  marginTop: 30,
                  marginBottom: 10,
                  letterSpacing: 0.64,
                }}>
                RELATED ARTICLES
              </Text>

              <FlatList
                data={DATA}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  CitizennewsMainContainer: {
    ...Spacing.container,
   
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
    fontSize: 14,
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
import React from "react";

import { withNavigation, withNavigationFocus  } from "react-navigation";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
  AsyncStorage,
  PermissionsAndroid,
  Alert,
  Image,
} from "react-native";
import { Typography, Colors, Buttons, Spacing, Margins } from "../../styles";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Icon from "react-native-vector-icons/Ionicons";
import Article from "../../library/components/Article";
import CitizenFloatingAction from '../citizen/components/CitizenFloatingAction';
import ImageLoad from 'react-native-image-placeholder';
import Geolocation from 'react-native-geolocation-service';
import AnimatedLoader from "react-native-animated-loader";
import * as LeneovellisteConstants from '../../utils/LenouvellisteConstants'
import axios from 'axios';

import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Left,
  Button,
  Right,
} from "native-base";
//Realm
import Realm from 'realm';
let realm;
//Data To Show
let dataRender=[];
//var bookmarkData=[] ;


class SaveForLater extends React.Component {
  constructor(props) {
    super(props);
        global.lat = '';
        global.long = '';

        this.state = {
          userId: '',
          visible: false,
      }

      realm = new Realm({
        path: 'MediaPost.realm',
        schema: [
          {
            name: 'post_details',
            primaryKey: 'id',
            properties: {
                id: 'int',
                user_id: 'string',
                title: 'string',
                description: 'string',
                type: 'string',
                video: 'string',
                image: 'string[]',
            },
          },
        ],
    });

    dataRender=realm.objects('post_details');
    console.log('SelectionSize>>', dataRender.length);
    this.state = {
      title : "Saved Post",
      bookmarkData:dataRender
  }
  
  }

  changeListener(articles, changes) {
    if(articles.length>0){
      this.setState({
        bookmarkData:articles
    })
    }else{
      this.setState({
        bookmarkData:[]
      })
    }
  }    
  UNSAFE_componentWillMount() {
    AsyncStorage.getItem("loggedInUserDetails").then((value) => {
        if (value != null) {
            var dicLoginData = JSON.parse(value);
            console.log('userInfo====>', dicLoginData)

            this.setState({
                userId: dicLoginData.id
            });
            console.log("In right condition", this.state.userId)
        } else {
            console.log("In else condition", this.state.userId)
        }
        console.log("id:",dicLoginData.id.toString())

        var result = realm.objects('post_details');
        console.log("result>>>>",result)
        }).done(
    );
  }

  // Called after a component is mounted
  componentDidMount() {
    dataRender.addListener(this.changeListener.bind(this));    
    if (Platform.OS == 'ios') {
      console.log(' ios Did mount calling')
      Geolocation.getCurrentPosition(
          position => {
              global.lat = position.coords.latitude;
              global.long = position.coords.longitude;
          },
          error => {
              // See error code charts below.
              console.log(error.code, error.message);
          },
          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
      );
      return true;
      } else {
          async function requestLocationPermission() {
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
                          position => {
                              global.lat = position.coords.latitude;
                              global.long = position.coords.longitude;
                              console.log(global.lat + " " + global.long);
                          },
                          error => {
                              // See error code charts below.
                              console.log(error.code, error.message);
                          },
                          { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                      );
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
          requestLocationPermission();
      }
  }
  apiCallToSendCitizenPost = (item) => {

    this.setState({
        visible: !this.state.visible
    });
    const formData = new FormData()
    console.log("image length",item.image.length)
    if (item.image.length > 0) {

        var params = {
            'user_id': this.state.userId,
            'category_id': 1,
            'title': item.title,
            'description': item.description,
            'lat': global.lat,
            'long': global.long,
            'video': ''
        }
        console.log('Parameter is = ', params)
        item.image.forEach((element, i) => {
          console.log("item>>>>>>>",item)
            const newFile = {
              uri: element, type: "image/jpeg", name: element.split("/").pop()
            }
            formData.append('image[]', newFile)
        });
    } else {
        var params = {
            'user_id': this.state.userId,
            'category_id': 1,
            'title': item.title,
            'description': item.description,
            'lat': global.lat,
            'long': global.long,
            'image[]': []
        }

        const newFile = {
            uri: item.video, type: 'video/mp4', name: item.video.split("/").pop()
        }
        
        formData.append('video', newFile)
    }

    console.log(params);

    console.log("citizen post data = ", formData);

    const config = {
        method: 'post',
        url: LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kCITIZENPOST_API,
        data: formData,
        params,
        headers: {
            Accept: 'application/json',
            'Content-Type': 'multipart/form-data'
        }
    }

    axios(config)

        .then(response => {

            console.log("Citizen Post Response", response.data);

            let msg = response.data.message;

            if (response.data.status == true) {
              realm.write(() => {
                realm.delete(realm.objects('post_details').filtered('id =' + item.id));
              })
              
                Alert.alert(
                    'message',
                    msg,
                    [
                        {
                            text: 'OK', onPress: () => {
                                this.setState({
                                    visible: false
                                });
                                this.goToCitizenProgress()
                            }
                        },
                    ],
                    { cancelable: false }
                )

            } else {

                this.setState({
                    visible: false
                });

                console.log("Citizen post error", msg)
                alert(msg);
            }

        })
        .catch(function (error) {
            console.log(error);
            //alert(error.response)
            this.setState({
                visible: false
            });
            console.log('In case of undefined')

        });
  }
goToCitizenProgress = () => {

  this.props.navigation.navigate('CitizenProgressScreen')

}

  render() {
    const { title } = this.state;
    const { visible } = this.state;
    const { navigate } = this.props.navigation;
    const data= this.state.bookmarkData.length>0;
    
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';

    if(data){
      return (
        <Container style={Colors.grayBackground}>
          <Header style={{ backgroundColor: 'white' }}>
            <Left>
                <Button
                    transparent
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Icon name="ios-arrow-back" size={30} style={Colors.gray} />
                </Button>
            </Left>
            <Body><Title>{title}</Title></Body>
            <Right><View></View></Right>
          </Header>
        
          <View style={styles.MainContainer}>
            <FlatList
              data={this.state.bookmarkData}
              renderItem={({ item }) =>
                <View style={{flexDirection:"row",backgroundColor:"white",marginBottom:10}}>
                  <View style={{flex: 1,paddingLeft:20,marginTop:20}}>
                    <Text style={styles.articleTitle}>{item.title}</Text>
                    <Text style={styles.articleTitle}>{item.description}</Text>
                    <View style={{flexDirection:"row"}}>
                    <TouchableOpacity style={styles.styleButton}
                      onPress={() => {
                        this.apiCallToSendCitizenPost(item)
                      }}>
                      <Text style={{fontFamily: "Montserrat-SemiBold",color:"white"}}>
                        POST
                      </Text>
                    </TouchableOpacity>
                    <View style={{flex:1}}></View>
                    <TouchableOpacity style={styles.styleButton}
                      onPress={() => {
                        this.props.navigation.navigate("PostDetail",{
                          postData : item
                        })
                      }}>
                      <Text style={{fontFamily: "Montserrat-SemiBold",color:"white"}}>
                        EDIT
                      </Text>
                    </TouchableOpacity>
                    </View>
                    
                  </View>
                  <View style={styles.articleImage}>
                    {item.image.length > 0 ?
                    <ImageLoad
                      style={{width: 90, height: 90}}
                      placeholderSource={require('../../../src/res/images/noimage.jpg')}
                      loadingStyle={{size: 'large', color: 'blue'}}
                      source={{uri: item.image[0] }}
                    />
                    :
                    <TouchableOpacity>
                        <View style={styles.videoView}>
                            <Image source={require('../../library/images/blackBg.png')} style={{ height: 100, width: 100 }} />
                            <Image source={require('../../library/images/playIcon.png')} style={{ height: 40, width: 40, position: 'absolute' }} />
                        </View>
                    </TouchableOpacity>
              }
                  </View>
                </View>}
              keyExtractor={(item, index) => index.toString()}
            />
           
          </View>
          <AnimatedLoader
                visible={visible}
                overlayColor="rgba(255,255,255,0.75)"
                source={require("../../utils/loader.json")}
                animationStyle={styles.lottie}
                speed={1}
            />
        </Container>
      );
    } else{
      return(
        <Container>
        <Header style={{ backgroundColor: 'white' }}>
            <Left>
                <Button
                    transparent
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}>
                    <Icon name="ios-arrow-back" size={30} style={Colors.gray} />
                </Button>
            </Left>
            <Body><Title>{title}</Title></Body>
          </Header>
        
          <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          
          <Text style={styles.Title}> Empty </Text>
         
        </View>
        </Container>
              );
    }
  }
}
const styles = StyleSheet.create({
  button: {
    ...Buttons.smallRounded
  },
  MainContainer: {
    ...Colors.grayBackground,
    marginBottom:80,
  },
  container: {
    ...Colors.background,
    ...Spacing.container,
    ...Colors.whiteBackground
  },
  sectionTitle : {
    textTransform: 'uppercase',
    fontFamily: "AkkoPro-BoldCondensed",
    paddingLeft: 18,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 16,
    letterSpacing: 0.64,
    color: '#2E2E2D'
  },
  MainContainerNoData: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 200
  },
  Title: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
    fontFamily: 'Georgia',
  },
  Text: {
    fontSize: 14,
    width: 250,
    fontFamily: "Gotham-book",
    textAlign: "center",
    lineHeight:17,
    color:'#808080'
  },
  articleImage: {
    paddingLeft: 20,
    paddingTop: 20,
  },
  articleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    width: 230,
    fontFamily: 'Georgia',
    marginBottom: 7,
    lineHeight: 21,
  },
  videoView: {
    justifyContent: 'center',
    borderRadius: 2,
    marginLeft: 0,
    marginRight: 0,
    height: 90,
    width: 90,
    alignItems: 'center'
},
styleButton:{
  backgroundColor: "#0089d0",
  top: 5,
  justifyContent:"center",
  alignItems:"center",height:30,
  marginBottom:10 ,
  width:"45%",
  borderRadius:5
},
  lottie: {
    width: 100,
    height: 100
  },
});


export default withNavigationFocus(SaveForLater);
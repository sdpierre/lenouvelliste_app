import React from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight,TouchableOpacity } from 'react-native';

import {setAppInfo} from '../../../redux/actions';
import {connect} from 'react-redux';
import moment from "moment";
import "moment/min/locales";
import HTMLView from 'react-native-htmlview';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FitImage from 'react-native-fit-image';
import Video from 'react-native-video';

import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, List} from 'native-base';
class CitizenNewsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: this.props.navigation.getParam('title'),
      body: this.props.navigation.getParam('body'),
      date: this.props.navigation.getParam('date'),
      category: this.props.navigation.getParam('category'),
      headline: this.props.navigation.getParam('headline'),
      username: this.props.navigation.getParam('username'),
      media: this.props.navigation.getParam('media'),
      userphoto: this.props.navigation.getParam('userphoto'),
      type: this.props.navigation.getParam('type'),
      duration: 0,
    }

  } 

  onLoad = data => this.setState({ duration: data.duration, isLoading: false });

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
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';
    const { navigate } = this.props;

    return (
      
      <View style={{flex: 1}}>
        <Header>
          <Left>
            <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
              <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
            </Button>
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
        
        <View style={{height:300, width:'100%'}}> 
        <Video 
          source={{uri: media }}
          resizeMode={'cover'}
          controls={true}
          repeat={true}


       ref={(ref) => {
         this.player = ref
       }}
       onBuffer={this.onBuffer}
       onError={this.videoError}
       onLoad={this.onLoad}
       style={styles.backgroundVideo} />
      </View>

      

        <FitImage
          source={{ uri: media || nophoto }}
          style={Spacing.fitImage}
        />
          <View style={styles.CitizennewsMainContainer}> 
           
           <Text style={styles.CitizennewsCategoryStyle}>Port-au-Prince</Text>
           <Text style={styles.CitizennewsLocationStyle}>Location Goes Here</Text>
           <Text style={styles.CitizennewsTitleStyle}>{title}</Text>

          
           <View style={{ marginTop: 10, flex: 1, flexDirection: "row" }}>
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
                    <Text style={styles.CitizennewsUsernameStyle}
          >
                      {username}
                    </Text>
                    <Text style={styles.CitizennewsMomentStyle}>
                      {(time = moment(date || moment.now()).fromNow())}
                    </Text>
                  </View>
                  </View>

                  <View style={{ alignItems: 'center'}}>
   
      </View>
          <Text style={Typography.bodyWhite}>{body}</Text>
        
        </View>
        </Content>
      </View>
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
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
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
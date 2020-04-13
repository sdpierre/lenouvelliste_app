import React from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Dimensions,TouchableOpacity,Image,ScrollView,AsyncStorage,Alert } from 'react-native';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Title,
    Content
  } from "native-base";  
import { Colors } from '../../styles';
import Ionicons from "react-native-vector-icons/Ionicons";
// import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ValidationComponent from 'react-native-form-validator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import axios from 'axios';
import * as LeneovellisteConstants from '../../utils/LenouvellisteConstants'

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class Forgot extends ValidationComponent{
    constructor(props) {
        super(props)

        this.state ={
        }
    }

    logout = () =>{

        Alert.alert(
            'Message',
             'Are you sure you want to logout?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress:()=>{
                  
                AsyncStorage.removeItem('loggedInUserDetails');
                this.props.navigation.navigate('Account')
                }
             },
            ],
            { cancelable: false }
          )

    }

    render(){
        return(
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                            <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
                        </Button>
                    </Left>
                    <Body>
                    <Title>USER PROFILE</Title>
                    </Body>
                    <Right>
                         <Button transparent onPress={this.logout}>
                         <MaterialCommunityIcons name="logout" size={30} style={Colors.gray} /> 
                        </Button> 
                    </Right>
                </Header>
                <ScrollView style={{backgroundColor:'#ECECEC'}}>
                <View style={profileStyles.containerView}>

                  <View style={profileStyles.profileBlueBg}>
                  <View style={{height:120, width:140, backgroundColor:'white', alignSelf:'center'/*,justifyContent:'flex-start'*/,top:40,alignItems:'center',borderRadius:10}}>
                       <Image source={require('../../library/images/profile.png')} style={{height:120,width:120}}/> 
                  </View>
                  </View>

                  <View style={{alignItems:'center',height:50,marginTop:70}}> 
                       <Text style ={{color:'#0089d0',fontSize:22,fontWeight:'bold',fontFamily:'AkkoPro-BoldCondensed'}}>USER NAME</Text>
                       <Text style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}>Neena Mishra</Text>
                  </View>

                  <View style = {{backgroundColor:'lightgray',height:1,marginTop:20, marginLeft:20,marginRight:20}}></View>

                  <View style={{height:50,flexDirection:'row', top:10,marginRight:20,marginLeft:20}}>
                 
                  <View style={{flexDirection:'column',width:'25%',justifyContent:'center',alignItems:'center'}}> 
                       <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Video</Text>
                       <Text style ={{color:'#008BCA',fontSize:22,fontFamily:'Gotham-book'}}>54</Text>
                  </View>

                  <View style = {{backgroundColor:'lightgray',height:40, width:2, marginLeft:20, marginRight:20,alignSelf:'center'}}></View>

                  <View style={{flexDirection:'column',width:'25%',justifyContent:'center',alignItems:'center'}}> 
                       <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Video</Text>
                       <Text style ={{color:'#008BCA',fontSize:22,fontFamily:'Gotham-book'}}>54</Text>
                  </View>

                  <View style = {{backgroundColor:'lightgray',height:40, width:2, marginLeft:20, marginRight:20,alignSelf:'center'}}></View>

                  <View style={{flexDirection:'column',width:'25%',justifyContent:'center',alignItems:'center'}}> 
                       <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Video</Text>
                       <Text style ={{color:'#008BCA',fontSize:22,fontFamily:'Gotham-book'}}>54</Text>
                  </View>

                  </View>

                  <View style = {{backgroundColor:'lightgray',height:1,top:10, marginLeft:20,marginRight:20}}></View>

                  <View style={{flexDirection:'column',marginLeft:20,marginRight:20,marginBottom:10,marginTop:20}}> 
                       <Text style ={{color:'lightgray',fontSize:14,fontFamily:'Gotham-book'}}>Field Name</Text>
                       <Text style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}>Neena Mishra</Text>
                  </View>

                  <View style={{flexDirection:'column',marginLeft:20,marginRight:20,marginBottom:10,marginTop:10}}> 
                       <Text style ={{color:'lightgray',fontSize:14,fontFamily:'Gotham-book'}}>Field Name</Text>
                       <Text style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}>Neena Mishra</Text>
                  </View>

                  <View style={{flexDirection:'column',marginLeft:20,marginRight:20,marginBottom:10,marginTop:10}}> 
                       <Text style ={{color:'lightgray',fontSize:14,fontFamily:'Gotham-book'}}>Field Name</Text>
                       <Text style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}>Neena Mishra</Text>
                  </View>

                 <View style={{height:50,flexDirection:'row', top:20,marginRight:20,marginLeft:20}}>
                 <View style={{height:50,width:'45%',justifyContent:'center',alignItems:'center',backgroundColor:'#fff',marginRight:20}}> 
                      <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Edit Profile</Text>
                 </View>

                 <View style={{height:50,width:'45%',justifyContent:'center',alignItems:'center',backgroundColor:'#0089d0'}}> 
                      <Text style ={{color: "#fff",fontSize:16,fontFamily:'Gotham-book'}}>Save Changes</Text>
                 </View>
                 </View>

                </View>
                </ScrollView>
            </Container>

        );
    }
}

const profileStyles = StyleSheet.create({
    containerView:{
      flex:1,
      justifyContent:'flex-start',
      backgroundColor:'#ECECEC'
    },
    profileBlueBg:{
        backgroundColor:'#0089d0',
        height:100,
         // justifyContent:'flex-start'
    }
})
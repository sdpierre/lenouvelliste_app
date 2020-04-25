import React from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Dimensions, TouchableWithoutFeedback,TouchableOpacity,Alert,AsyncStorage} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title, Button,
    Content,
    Right, Left, Radio
} from "native-base"; 
import { Colors } from '../../styles';

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../utils/LenouvellisteConstants'

var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class ChangePassword extends ValidationComponent{
     constructor(props){
        super(props)
        this.state ={
          currentPassword:'',
          newPassword:'',
          confirmPassword:'',
          isOldPWSecured: true,
          isNewPWSecured:true,
          isConfirmPWSecured:true,
          userId:''
        }
     }

     componentDidMount(){

        AsyncStorage.getItem("loggedInUserDetails").then((value) => {
            if (value != null) {
                var dicLoginData = JSON.parse(value);
                console.log('userInfo====>', dicLoginData)
  
                this.setState({
                    userId:dicLoginData.id
                });
               console.log("In right condition",this.state.userId)
            }else{

                console.log("In else condition",this.state.userId)
  
            }
        }).done(
        );
     }


     handleCurrentPassword = (text) => {
        this.setState({
            currentPassword: text
        })
    }

    handleNewPassword = (text) => {
        this.setState({
            newPassword: text
        })
    }


    handleConfirmPassword = (text) => {
        this.setState({
            confirmPassword: text
        })
    }

    changePassword = () =>{

        this.validate({

            currentPassword:{required:true}
        })

        if (this.getErrorMessages()){

            alert(LeneovellisteConstants.kPasswordEmpty)

        }else{

            this.validate({

                newPassword:{required:true}
            })

            if (this.getErrorMessages()){

                alert(LeneovellisteConstants.kPasswordNewEmpty)

            }else{

                this.validate({

                    newPassword:{minLength:5}
                })

                if (this.getErrorMessages()){

                    alert(LeneovellisteConstants.kPasswordMinLength)
                }else{

                    this.validate({
                        confirmPassword:{required:true}
                    })

                    if (this.getErrorMessages()){
                        alert(LeneovellisteConstants.kPasswordConfirmEmpty)
                    }else{

                        this.validate({
                            confirmPassword:{minLength:5}
                        })

                        if (this.getErrorMessages()){
                            alert(LeneovellisteConstants.kPasswordMinLength)
                        }else{

                            if (this.state.confirmPassword != this.state.newPassword){

                              alert(LeneovellisteConstants.kPasswordsNotMatched)

                            }else{

                                var chagePWParams = {
                                    'user_id': this.state.userId, //once session work
                                    'current_password': this.state.currentPassword,
                                    'new_password': this.state.newPassword,
                                    'confirm_password': this.state.confirmPassword
                                  }
                
                                  console.log(chagePWParams);
                
                                  this.changePWAPICall(chagePWParams);

                            }
                        }
                    }
                }

            }
        }
    }

    changePWAPICall(params) {
    
        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kCHANGEPASSWORD_API, params)
    
          .then(response => {
    
             console.log("Change PW response",response.data);
        
             let msg = response.data.message;
    
            if (response.data.status == true) {
    
                Alert.alert(
                    'Message',
                     msg,
                    [
                      {text: 'OK', onPress:()=>{
                         
                        this.props.navigation.goBack();
                    }
                     },
                    ],
                    { cancelable: false }
                  )
  
            } else {
    
              alert(msg)
              console.log("Change PW error",msg)
              
            }
    
          })
          .catch(function (error) {
    
            console.log(error);
    
          });
    
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
                    <Body></Body>
                    <Right></Right>
                </Header>
                <View style={forgotStyles.rootContainer}>
                    <Text style={forgotStyles.info}>Enter OTP to reset your password.</Text>
                    <View style={{ flexDirection: 'row', alignSelf:'center',width: deviceWidth - 70}}>
                                    <TextInput
                                        ref={(input) => { this.passwordInput = input; }}
                                        secureTextEntry = {this.state.isOldPWSecured}
                                        placeholder="Current Password"
                                        placeholderTextColor='#9b9b9b'
                                        style={forgotStyles.input}
                                        onChangeText={this.handleCurrentPassword}
                                        value={this.state.currentPassword}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.lastInput.focus(); }}
                                        blurOnSubmit={false}
                                        ref={(input) => { this.firstInput = input; }}
    
                                    />
                                    <Icon style={forgotStyles.icon}
                                        name= {this.state.isOldPWSecured?'visibility-off':'visibility'}
                                        size={25}
                                        color='#D3D3D3'
                                        onPress={()=>{
                                            this.setState({
                                              isOldPWSecured:!this.state.isOldPWSecured
                                            })
                                        }}
                                    />
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf:'center',width: deviceWidth - 70}}>
                                    <TextInput
                                        ref={(input) => { this.passwordInput = input; }}
                                        secureTextEntry = {this.state.isNewPWSecured}
                                        placeholder="New Password"
                                        placeholderTextColor='#9b9b9b'
                                        style={forgotStyles.input}
                                        onChangeText={this.handleNewPassword}
                                        value={this.state.newPassword}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.lastInput.focus(); }}
                                        blurOnSubmit={false}    
                                    />
                                    <Icon style={forgotStyles.icon}
                                        name= {this.state.isNewPWSecured?'visibility-off':'visibility'}
                                        size={25}
                                        color='#D3D3D3'
                                        onPress={()=>{
                                            this.setState({
                                              isNewPWSecured:!this.state.isNewPWSecured
                                            })
                                        }}
                                    />
                    </View>

                    <View style={{ flexDirection: 'row', alignSelf:'center',width: deviceWidth - 70}}>
                                    <TextInput
                                        ref={(input) => { this.passwordInput = input; }}
                                        secureTextEntry = {this.state.isConfirmPWSecured}
                                        placeholder="Confirm Password"
                                        placeholderTextColor='#9b9b9b'
                                        style={forgotStyles.input}
                                        onChangeText={this.handleConfirmPassword}
                                        value={this.state.confirmPassword}    
                                    />
                                    <Icon style={forgotStyles.icon}
                                        name= {this.state.isConfirmPWSecured?'visibility-off':'visibility'}
                                        size={25}
                                        color='#D3D3D3'
                                        onPress={()=>{
                                            this.setState({
                                              isConfirmPWSecured:!this.state.isConfirmPWSecured
                                            })
                                        }}
                                    />
                    </View>

                    <View style={forgotStyles.loginButton}>
                        <TouchableOpacity
                            transparent
                            onPress={this.changePassword}>
                            <View style={forgotStyles.buttonContainer}>
                                <Text style={{ color: 'white', fontSize: 20 }}>CHANGE PASSWORD</Text>
                            </View>
                        </TouchableOpacity>
    
                    </View>
                </View>
            </Container>

         );
     }

    }

     const forgotStyles = StyleSheet.create({
        rootContainer: {
            flex: 1,
            justifyContent: 'flex-start',
            padding: 30
        },
        mainText: {
            fontSize: 25,
            fontWeight: 'bold',
            color: 'black',
            marginTop: 50
        },
        info: {
            fontSize: 16,
            color: '#D3D3D3',
            marginTop: 20,
            marginBottom:10
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
    
        },
        loginButton: {
            backgroundColor:'#0089d0',
            marginTop: 20,
            height:50,
            alignItems:'center'
        }, 
        input: {
            width: deviceWidth - 70,
            padding: 10,
            borderWidth: 1.8,
            borderColor: '#D3D3D3',
            marginBottom: 20,
            paddingLeft: 15,
           // color: '#D3D3D3',
            color:'#000',
            alignSelf: 'center',
        },
        icon: {
            top: 8,
            right: 30,
        }, 
        })

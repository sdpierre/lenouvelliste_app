import React from 'react';
import { TouchableWithoutFeedback, ActivityIndicator, NativeModules, Platform, StyleSheet, Text, Modal, View, TouchableOpacity, TextInput, Image, ScrollView, ImageBackground, Dimensions, AsyncStorage, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'

import {
    Container,
    Header,
    Body,
    Button,
    Right, Left,
    Content
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);


var buttonHeight = Platform.OS == 'android' ? 50 : 55
var elementSpacing = Platform.OS == 'android' ? 12 : 19

export default class Login extends ValidationComponent {
    constructor(props) {
        super(props)

        this.state ={
            email:'',
            password:'',
            isPasswordSecured:true        }
    }


    handlEmail = (text) => {
        this.setState({
            email: text
        })
    }
    handlePassword = (text) => {
        this.setState({
            password: text
        })
    }

    login = () =>{

        this.validate({
          email:{required:true}
        })

        if (this.getErrorMessages()){
            alert(LeneovellisteConstants.kEmailEmpty)

        }else{

            this.validate({
                email:{email:true}
            })

            if(this.getErrorMessages()){
                alert(LeneovellisteConstants.kEmailInvalid)

            }else{
                
                this.validate({
                    password:{required:true}
                })

                if (this.getErrorMessages()){
                    alert(LeneovellisteConstants.kPasswordEmpty)

                }else{
                    this.validate({
    
                        password: { minlength: 5 }
                      })
      
                      if (this.getErrorMessages()) {
      
                        alert(LeneovellisteConstants.kPasswordMinLength)
                      }else{
                        var loginParams = {
                            'username': this.state.email,
                            'password': this.state.password,
                          }
        
                          console.log(loginParams);
        
                          this.loginAPICall(loginParams);
        

                      }
                }
            }

        }
    }


    loginAPICall(params) {
    
        var dicLogin = {};
    
        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kLOGIN_API, params)
    
          .then(response => {
    
             console.log("Login Response",response.data);
            let msg = response.data.message;
            if (response.data.status == true) {
    
              dicLogin = response.data.user_detail;
    
              AsyncStorage.setItem('loggedInUserDetails', JSON.stringify(dicLogin));              
               console.log("Login Success",dicLogin)
               this.props.navigation.goBack();
            this.props.navigation.navigate('Menu',{
                userInfo:dicLogin
            });

            } else {
    
              console.log("Login error",msg)
              alert(msg);
             
            }
    
          })
          .catch(function (error) {
    
            // console.log(error);
            alert(error)
            console.log('In case of undefined')
    
          });
    
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
                        <Body></Body>
                        <Right></Right>
                    </Header>
                    <Content>
                        <View style={{ flex: 0, height: 500, padding: 35 }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

                                <Text style={styles.loginText}>Login</Text>


                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'email-address'}
                                    onChangeText={this.handlEmail}
                                    value={this.state.email}                                    
                                    style={styles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.secondTextInput.focus(); }}
                                    blurOnSubmit={false}
                                    autoCapitalize = 'none'
                                />
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        ref={(input) => { this.secondTextInput = input; }}
                                        secureTextEntry = {this.state.isPasswordSecured}
                                        placeholder="Password"
                                        placeholderTextColor='#9b9b9b'
                                        onChangeText={this.handlePassword}
                                        value={this.state.password}
                                        style={styles.input}
                                        
                                    />
                                    <Icon style={styles.icon}
                                        name= {this.state.isPasswordSecured?'visibility-off':'visibility'}
                                        size={25}
                                        color='#D3D3D3'
                                        onPress={()=>{
                                            this.setState({
                                              isPasswordSecured:!this.state.isPasswordSecured
                                            })
                                        }}
                                    />
                                </View>
                                <View style={styles.loginButton}>
                                    <TouchableOpacity
                                        transparent
                                        onPress={this.login
                                        //     () => {
                                        //     this.props.navigation.goBack();
                                        // }
                                        }>
                                        <View style={styles.buttonContainer}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>I connect</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>

                                <TouchableOpacity style={{ backgroundColor: 'transparent', width: '100%', marginTop: 30 }} onPress={() => { console.log('>>>Forgot Pressed<<<'); this.props.navigation.navigate('Forgot'); }}>
                                    <Text style={styles.forgot}>
                                        Forgot your password?
                                </Text>
                                </TouchableOpacity>

                                <TouchableOpacity style={{ backgroundColor: 'transparent', width: '100%', marginTop: 15 }} onPress={() => { this.props.navigation.navigate('Register'); }}>
                                    <Text style={styles.noAcc} >
                                        No account yet?
                            </Text>

                                </TouchableOpacity>


                            </View>
                        </View>
                    </Content>
                </Container>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 0,
        backgroundColor: 'transparent',
        marginTop: 20

        //height:deviceHeight+64
    },

    input: {
        width: deviceWidth - 70,
        height: 50,
        padding: 10,
        borderWidth: 1.8,
        borderColor: '#D3D3D3',
        marginBottom: 20,
        paddingLeft: 15,
       // color: '#D3D3D3',
       color:'#000',
        alignSelf: 'center',
    },

    loading: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'transparent'
    },

    forgot_password_test_style: {
        color: 'white',
        fontSize: 10.6,
        backgroundColor: 'transparent',
        //  left:(deviceWidth/2) +28,
        width: Platform.OS === 'ios' ? 125 : 165,
        height: 20
    },
    loginText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        //marginLeft:35
    },
    loginButton: {
        backgroundColor: 'red',
        height:50,
        alignItems:'center'
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    icon: {
        position: 'absolute',
        top: 15,
        right: 5
    },
    forgot: {

        color: 'black',
        fontSize: 12,
        backgroundColor: 'transparent',
        padding: 0,
        textAlign: 'center',
        height: 20

    },
    noAcc: {
        color: 'grey',
        fontSize: 12,
        backgroundColor: 'transparent',
        padding: 0,
        textAlign: 'center',
        //  left:(deviceWidth/2) +28,
        //  width:Platform.OS === 'ios' ? 125 : 165,
        height: 20
    }

});
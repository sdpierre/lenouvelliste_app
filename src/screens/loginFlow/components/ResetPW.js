import React from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Dimensions, TouchableWithoutFeedback,TouchableOpacity,Alert} from 'react-native';
import {
    Container,
    Header,
    Body,
    Title, Button,
    Content,
    Right, Left, Radio
} from "native-base";
import { Colors } from '../../../styles';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'

var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class ForgotPWOTP extends ValidationComponent{
     constructor(props){
        super(props)
        this.state ={
          oldPassword:'',
          newPassword:'',
          confirmPassword:'',
          isOldPWSecured: true,
          isNewPWSecured:true,
          isConfirmPWSecured:true,
          email:''
        }
     }

     componentDidMount(){

        const { navigation } = this.props;
        const strEmail = navigation.getParam('email', '');  
        this.setState({
            email:strEmail
        })
     }


     handleOldPassword = (text) => {
        this.setState({
            oldPassword: text
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

    resetPassword = () =>{

        this.validate({

            oldPassword:{required:true}
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

                                var resetPWParams = {
                                    'email': this.state.email,
                                    'password': this.state.newPassword,
                                  }
                
                                  console.log(resetPWParams);
                
                                  this.resetPWAPICall(resetPWParams);

                            }
                        }
                    }
                }

            }
        }
    }

    resetPWAPICall(params) {
    
        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kRESETPW_API, params)
    
          .then(response => {
    
             console.log("Reset PW response",response.data);
        
             let msg = response.data.message;
    
            if (response.data.status == true) {
    
                Alert.alert(
                    'Message',
                     msg,
                    [
                      {text: 'OK', onPress:()=>{
                         
                        this.props.navigation.goBack();
                        this.props.navigation.navigate('Account');
                    }
                     },
                    ],
                    { cancelable: false }
                  )
  
            } else {
    
              alert(msg)
              console.log("Reset PW error",msg)
              
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
                            <Ionicons name="close" size={30} style={Colors.gray} />
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
                                        placeholder="Old Password"
                                        placeholderTextColor='#9b9b9b'
                                        style={forgotStyles.input}
                                        onChangeText={this.handleOldPassword}
                                        value={this.state.oldPassword}
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
                            onPress={this.resetPassword}>
                            <View style={forgotStyles.buttonContainer}>
                                <Text style={{ color: 'white', fontSize: 20 }}>RESET PASSWORD</Text>
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
            backgroundColor: 'red',
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

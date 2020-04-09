import React from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Dimensions, TouchableWithoutFeedback,Alert } from 'react-native';
import {
    Container,
    Header,
    Body,
    Button,
    Right, Left
} from "native-base";
import { Colors } from '../../../styles';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'
import { TouchableOpacity } from 'react-native-gesture-handler';

var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class ForgotPWOTP extends ValidationComponent{
     constructor(props){
        super(props)
        this.state ={
          OTP:'',
          email:''
        }
     }


     componentDidMount(){

        const { navigation } = this.props;
        const strEmail = navigation.getParam('email', ''); 
        console.log(strEmail) 
        this.setState({
            email:strEmail
        })
     }

     handleOTP = (text) => {
        this.setState({
            OTP: text
        })
    }

    verifyOTP = () =>{

        this.validate({

            OTP:{required:true}
        })

        if (this.getErrorMessages()){
            
            alert(LeneovellisteConstants.kOTPEmpty)

        }else{

            var verifyOTPParams = {
                'email': this.state.email,
                'otp': this.state.OTP,
              }

              console.log(verifyOTPParams);

              this.verifyOTPAPICall(verifyOTPParams);

        }
    }

    verifyOTPAPICall(params) {

        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kVERIFYOTP_API, params)
    
          .then(response => {
    
             console.log("Verify OTP response",response.data);
        
             let msg = response.data.message;
    
            if (response.data.status == true) {
    
                Alert.alert(
                    'Message',
                     msg,
                    [
                      {text: 'OK', onPress:()=>{
                          
                        this.props.navigation.navigate('ResetPassword',{
                            email:this.state.email
                        });
                    }
                     },
                    ],
                    { cancelable: false }
                  )
    
            } else {
    
              alert(msg)
              console.log("Verify OTP error",msg)
              
            }
    
          })
          .catch(function (error) {
    
            console.log(error);
    
          });
    
      }


      resendOTP = () =>{

            var resendOTPParams = {
                'email': this.state.email,
                'otp': this.state.OTP,
              }

              console.log(resendOTPParams);

              this.resendOTPAPICall(resendOTPParams);

      }


      resendOTPAPICall(params) {
    
        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kRESENDOTP_API, params)
    
          .then(response => {
    
             console.log("Resend OTP response",response.data);
        
             let msg = response.data.message;
    
            if (response.data.status == true) {
    
                alert(LeneovellisteConstants.kOTPSent)
                
            } else {
    
              alert(msg)
              console.log("Resend OTP error",msg)
              
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
                    <TextInput
                        placeholder="Enter OTP"
                        placeholderTextColor='#9b9b9b'
                        style={forgotStyles.input}
                        onChangeText={this.handleOTP}
                        value={this.state.OTP}                                    
                    />

                 <View style={{flexDirection:'row'}}>
                     <Text style={{ color: 'gray', fontSize: 16, fontWeight:'bold'}}>Didn't receive OTP?</Text>
                     <TouchableOpacity
                            transparent
                            onPress={this.resendOTP}>
                    <Text style={{ color: 'blue', fontSize: 16, fontWeight:'bold',textDecorationLine:'underline' }}>Resend OTP</Text>
                    </TouchableOpacity>
                 </View>
    
                 <View style={forgotStyles.loginButton}>
                        <TouchableOpacity
                            transparent
                            onPress={this.verifyOTP}>
                            <View style={forgotStyles.buttonContainer}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Verify OTP</Text>
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
            marginTop: 20
        },
        buttonContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
    
        },
        loginButton: {
            backgroundColor: 'red',
            height:50,
            marginTop:20,
            alignItems:'center',
        }, 
        input: {
            width: '100%',
            height: 50,
            padding: 10,
            borderWidth: 1.8,
            borderColor: '#D3D3D3',
            marginBottom: 20,
            paddingLeft: 15,
            // color: '#D3D3D3',
            color:'#000',
            alignSelf: 'center',
            marginTop: 30
        },
    })

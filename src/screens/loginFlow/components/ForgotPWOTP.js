import React from 'react';
import { Text, View, StyleSheet, Modal, Dimensions, TouchableWithoutFeedback,Alert } from 'react-native';
import {
    Container,
    Header,
    Body,
    Right, Left
} from "native-base";
import { Colors } from '../../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'
import { TouchableOpacity } from 'react-native-gesture-handler';
import TextInput from 'react-native-material-textinput'
import {Button} from 'react-native-elements'
import OTPInputView from '@twotalltotems/react-native-otp-input'

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
                'type':'forgot'

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
                        type="clear"
                        icon={
                            <MaterialCommunityIcons
                            name="arrow-left"
                            type="clear"
                            size={30}
                            color="gray"
                            />
                        }
                            
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>

                <View style={forgotStyles.rootContainer}>

                    <Text style={forgotStyles.info}>Entrez OTP pour réinitialiser votre mot de passe.</Text>
                    
                    <View style={{flexDirection:'column', flex:0, justifyContent:"center", alignItems:"center"}}>
                    <OTPInputView 
                    style={{width: '80%', height: 100}}
                    autoFocusOnLoad
                    pinCount={6}
                    value={this.state.OTP} 
                    onCodeChanged = {code => { this.handleOTP}}
                    codeInputFieldStyle={forgotStyles.underlineStyleBase}
                    codeInputHighlightStyle={forgotStyles.underlineStyleHighLighted}
                    onCodeFilled = {(code => {
                        console.log(`Code is ${code}, you are good to go!`)
                    })}
                    />
                    </View>

                    <TextInput
                        label="Entrez le OTP"
                        tintColor="#0082c5"
                        onChangeText={this.handleOTP}
                        value={this.state.OTP}                                    
                    />

                <Button
                  style={{marginTop: 20}}
                  title="Vérifiez"
                  onPress={this.verifyOTP}
                />      
                 <View style={{flexDirection:'column', flex:0, justifyContent:"center", alignItems:"center"}}>
  
                     <View style={{marginTop:20}}> 
                        <Text style={{fontFamily: 'gotham-book'}}>Vous n'avez pas reçu le code</Text>
                     </View>
                     <View style={{marginTop:10}}> 
                     <TouchableOpacity
                            transparent
                            onPress={this.resendOTP}>
                    <Text style={{ color: '#0082c5', fontFamily: 'Montserrat-SemiBold'}}>Renvoyer le code</Text>
                    </TouchableOpacity>
                    </View>
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
        borderStyleBase: {
            width: 30,
            height: 45
          },
        
          borderStyleHighLighted: {
            borderColor: "#0082c5",
          },
        
          underlineStyleBase: {
            width: 30,
            height: 45,
            borderWidth: 0,
            borderBottomWidth: 1,
          },
        
          underlineStyleHighLighted: {
            borderColor: "#03DAC6",
          },
    })

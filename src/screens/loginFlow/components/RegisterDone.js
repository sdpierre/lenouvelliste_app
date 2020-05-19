import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableWithoutFeedback, Dimensions} from 'react-native';
import {
    Container,
    Header,
    Body,
    Content,
    Right, Left
} from "native-base";
import { Colors } from '../../../styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'

import { TouchableOpacity } from 'react-native-gesture-handler';

import TextInput from 'react-native-material-textinput';
import {Button} from 'react-native-elements';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);
export default class RegisterDone extends ValidationComponent {
    constructor(props) {
        super(props)
        this.state = {
            userName:'',
            email:'',
            OTP:'',

        }
    }

    componentDidMount(){

        const { navigation } = this.props;
        const strEmail = navigation.getParam('email', ''); 
        const strUserName = navigation.getParam('username', ''); 
        console.log(strUserName) 
        this.setState({
            userName:strUserName,
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
                          
                        this.props.navigation.goBack();
                        this.props.navigation.navigate('Menu');
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




    render() {
        return (
                <Container>
                    <Header style={{ backgroundColor: 'white', }}>
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
                         <Right>
                        </Right>
                    </Header>
                    <Content>
                        <View style={doneRegStyles.rootContainer}>
                            <Text style={doneRegStyles.welcomeText}>Welcome</Text>
                            <Text style={doneRegStyles.welcomeText}>{this.state.userName}</Text>
                            <Text style={doneRegStyles.email}>A confirmation email has been sent to you.</Text>
                            <TextInput
                        label="Entrez le OTP"
                        tintColor="#0082C6"
                        placeholderTextColor="#9b9b9b"
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


                            {/* <View style={{ backgroundColor: 'red', marginTop:30 }}>
                                    <Button
                                        transparent
                                        onPress={() => {
                                            this.props.navigation.goBack();
                                            this.props.navigation.navigate('Menu');
                                        }}>
                                        <View style={doneRegStyles.buttonContainer}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>Explore Lenouvelliste</Text>
                                        </View>
                                    </Button>
                                </View> */}
                        </View>
                        
                    </Content>
                </Container>
 
        )
    }
}

const doneRegStyles=StyleSheet.create({
    rootContainer:
    {
        flex:1,
        padding:40,
        justifyContent:'center',
        alignContent:'center',
    },
    welcomeText:{
        fontSize:30,
        fontWeight:'bold',
    },
    email :{
        fontSize:20,
        color:'#D3D3D3',
        marginTop:20,
    }, buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
})
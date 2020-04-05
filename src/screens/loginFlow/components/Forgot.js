import React from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
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

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class Forgot extends ValidationComponent{
    constructor(props) {
        super(props)

        this.state ={
            email:'',
            password:''        
        }
    }


    handlEmail = (text) => {
        this.setState({
            email: text
        })
    }

    forgotPassword = () =>{

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

                var forgotPWParams = {
                    'email': this.state.email
                }

                  console.log(forgotPWParams);

                  this.forgotPasswordAPICall(forgotPWParams);

            }

        }
    }


    forgotPasswordAPICall(params) {
        
        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kFORGOTPW_API, params)
    
          .then(response => {
    
             console.log("Forgot PW Response",response.data);
            let msg = response.data.message;
            if (response.data.status == true) {
    
            alert(msg);
        
            props.navigation.navigate('ForgotDone');
    
            } else {
    
              console.log("Forgot PW error",msg)
              alert(msg);
             
            }
    
          })
          .catch(function (error) {
    
            // console.log(error);
            alert(error)
            console.log('In case of undefined')
    
          });
    
      }


    render(){
        return (
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
                    <Text style={forgotStyles.mainText}>Forgot your Password?</Text>
                    <Text style={forgotStyles.info}>Enter your email to receive OTP and create a new password.</Text>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor='#9b9b9b'
                        keyboardType={'email-address'}
                        style={forgotStyles.input}
                        onChangeText={this.handlEmail}
                        value={this.state.email}                                    
                        autoCapitalize = 'none'
                    />
                    <View style={forgotStyles.loginButton}>
                        <TouchableOpacity
                            transparent
                            onPress={this.forgotPassword}>
                            <View style={forgotStyles.buttonContainer}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Send</Text>
                            </View>
                        </TouchableOpacity>
    
                    </View>
                </View>
            </Container>
    
    )    
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
        marginTop: 20,
        height:50,
        alignItems:'center'
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
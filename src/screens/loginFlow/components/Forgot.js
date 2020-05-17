import React from 'react';
import { Text, View, StyleSheet, Modal, Dimensions,TouchableOpacity,Alert } from 'react-native';
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
import TextInput from 'react-native-material-textinput'
import {Button, Input} from 'react-native-elements'

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
    
            // alert(msg);


            Alert.alert(
                'Message',
                 msg,
                [
                  {text: 'OK', onPress:()=>{
                      
                    this.props.navigation.navigate('ForgotPWOTP',{
                        email:this.state.email
                    });
                }
                 },
                ],
                { cancelable: false }
              )
    
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
                    <Text style={forgotStyles.mainText}>Vous avez oublié votre mot de passe?</Text>
                    <Text style={forgotStyles.info}>Entrez votre e-mail pour recevoir OTP et créez un nouveau mot de passe.</Text>
                    <TextInput
                        label="E-mail"
                        tintColor="#0082c5"
                        keyboardType={'email-address'}
                        onChangeText={this.handlEmail}
                        value={this.state.email}                                    
                        autoCapitalize = 'none'
                    />

                <Button
                  style={{marginTop: 20}}
                  title="Envoyer"
                  onPress={this.forgotPassword}
                />
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
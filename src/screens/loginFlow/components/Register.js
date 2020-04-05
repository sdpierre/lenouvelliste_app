import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput,ScrollView ,AsyncStorage,FlatList,Image,List} from 'react-native';
import Modal from 'react-native-modal';
//import { CheckBox } from 'react-native-elements'
import CheckBox from 'react-native-check-box';
import {
    Container,
    Header,
    Body,
    Title, Button,
    Content,
    Right, Left, Radio
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ValidationComponent from 'react-native-form-validator';
import { Typography, Colors, Spacing } from '../../../styles';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class Register extends ValidationComponent{
    constructor(props) {
        super(props)
        this.state = {
            genderSelected: 'F', //M or F
            checked1: false,
            checked2: false,
            checked3: false,
            isCountryModalVisible: false,
            userName: '',
           // firstName: '',
           // lastName: '',
            fullName:'',
            email: '',
            password: '',
            countryName:'',
            town:'',
            arrCountryList: [],
            selectedCountryItem:null,
            isPasswordSecured:true

        }
    }
    handleUserName = (text) => {
        this.setState({
            userName: text
        })
    }
    
    handleFullName = (text) => {
        this.setState({
            fullName: text
        })
    }
    // handleFirstName = (text) => {
    //     this.setState({
    //         firstName: text
    //     })
    // }

    // handleLastName = (text) => {
    //     this.setState({
    //         lastName: text
    //     })
    // }

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

    handleCountry = (text) => {
        this.setState({
            countryName: text
        })
    }

    handleTown = (text) => {
        this.setState({
            town: text
        })
    }

    // register = () =>{
    //     // Call ValidationComponent validate method
    //     this.validate({
    //       firstName: {minlength:2, maxlength:20, required: true},
    //       lastName: {minlength:2, maxlength:20, required: true},
    //       userName: {minlength:2, maxlength:20, required: true},
    //       email: {required: true,email: true, maxlength:50},
    //       password: {required:true,secureTextEntry:true,minlength:6,maxlength:15}
    //       //number: {numbers: true},
    //       //date: {date: 'YYYY-MM-DD'}
    //     });
    //   }

    componentDidMount(){

    this.getAllCountriesListAPICall()

    }

    register = () =>{

        this.validate({
    
            userName: {required:true/*minlength:2, maxlength:20*/}
    
        })
    
        if (this.getErrorMessages()) {
    
          alert(LeneovellisteConstants.kUserNameEmpty)
        }
        else {
    
          this.validate({
    
            fullName: {required:true /*minlength:2, maxlength:20*/}
    
          })
    
          if (this.getErrorMessages()) {
    
            alert(LeneovellisteConstants.kFullNameEmpty)
    
          }
          else {
    
            // this.validate({
    
            //  lastName: {required: true /*minlength:2, maxlength:20*/}
            // })
    
            // if (this.getErrorMessages()) {
    
            //     alert(LeneovellisteConstants.kLastNameEmpty)
    
            // } else {
    
              this.validate({
    
                email: {required: true/*,email: true, maxlength:50*/}
    
              })
    
              if (this.getErrorMessages()) {
    
                alert(LeneovellisteConstants.kEmailEmpty)
              }
              else {
    
                this.validate({
    
                  email: { email: true }
    
                })
    
                if (this.getErrorMessages()) {
    
                    alert(LeneovellisteConstants.kEmailInvalid)
                }
                else {
    
                  this.validate({
    
                    password: { required: true }
                  })
    
    
                  if (this.getErrorMessages()) {
    
                    alert(LeneovellisteConstants.kPasswordEmpty)
                  }
                  else {
    
                    this.validate({
    
                      password: { minlength: 5 }
                    })
    
                    if (this.getErrorMessages()) {
    
                      alert(LeneovellisteConstants.kPasswordMinLength)
                    }
                    else {
    
                         this.validate({
                             countryName: {required:true}
                         }) 
                         
                         
                         if (this.getErrorMessages()){
                             alert(LeneovellisteConstants.kCountryEmpty)
                         }
                        
                         else{
                             this.validate({

                                 town:{required:true}
                             })

                             if (this.getErrorMessages()){

                                alert(LeneovellisteConstants.kCountryEmpty)

                             }else{

                             //   let fullName = this.state.firstName + this.state.lastName
                                var registrationParams = {
                                    'name': this.state.fullName,
                                    'username': this.state.userName,
                                    'email': this.state.email,
                                    'password': this.state.password,
                                    'country': this.state.selectedCountryItem,
                                    'town': this.state.town,
                                    'gender': this.state.genderSelected
                                  }
                
                                  console.log(registrationParams);
                
                                  this.registrationAPICall(registrationParams);
                
                
                             }
                         }

                    }
    
                  }
    
                }
    
    
              }
    
           // }
          }
    
        }
    
      }
    
    
    
      registrationAPICall(params) {
    
        var dicRegistration= {};

        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kREGISTRATION_API, params)
    
          .then(response => {
    
                 console.log("Registration response",response.data);
    
            //  console.log("email", this.state.email);
    
             let msg = response.data.message;
    
            if (response.data.status == true) {
    
                dicRegistration = response.data.user_details;
    
                AsyncStorage.setItem('registeredUserDetails', JSON.stringify(dicRegistration));              
      
                this.props.navigation.goBack();
                this.props.navigation.navigate('RegisterDone');
  
            } else {
    
              alert(msg)
              console.log("Registration error",msg)
              
            }
    
          })
          .catch(function (error) {
    
            console.log(error);
    
          });
    
      }

      getAllCountriesListAPICall() {

        console.log(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kGETCOUNTRYLIST_API)

        axios.get(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kGETCOUNTRYLIST_API)

            .then(response => {

              //  let msg = response.data.message;

                console.log(response.data);
                if (response.data.status == true) {

                    this.setState({

                        arrCountryList: response.data.countries
                       //arrJobLists: response.data.success.jobLists,
    
                    })
    
                    console.log("Array of countries",this.state.arrCountryList)

                }else{

                    alert("Unable to get country list")
                }

            })
            .catch(function (error) {

                console.log(error);

            });

            
    }

    openCountryModal = () =>{
          this.setState({
              isCountryModalVisible:true
          })
      }

    closeCountryModal = () =>{
        this.setState({
        isCountryModalVisible:false
        })
    }

    renderItem = ({ item }) => {
        console.log("Getting called")

        return (
            <TouchableOpacity onPress={() => this._choosen(item)}>
                  <View style={registerStyles.flatview}>
            <Text style={registerStyles.countryName}>{item.country_name}</Text>
            {/* <Text style={registerStyles.CountryCode}>Hi</Text> */}
          </View>
          </TouchableOpacity>
        );
    }

    _choosen(selectedItem) {
        this.setState({ 
            selectedCountryItem:selectedItem.id, 
            countryName:selectedItem.country_name
        });
        this.closeCountryModal()


      }
      
    render() {
        return (
                <Container >
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
                        <Right>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Account') }}>
                                <Title style={registerStyles.already}>Already registered?</Title>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content style={{ flex: 1 }} >
                        <KeyboardAwareScrollView>
                            <ScrollView>
                            <View style={registerStyles.rootContainer}>
                                <Text style={registerStyles.title}>Create your Le Nouvelliste account</Text>
                                <Text style={registerStyles.allMedia}>You can take advantage of the Nouvelliste's free services on all media</Text>
                                <View style={registerStyles.radioContainer}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity onPress={() => this.setState({ genderSelected: 'M' })} style={{flexDirection:'row'}}>
                                        <Radio 
                                            selected={this.state.genderSelected == 'M'}
                                        />
                                        <Text style={{ marginStart: 10 }}>Male</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                    <TouchableOpacity onPress={() => this.setState({ genderSelected: 'F' })} style={{flexDirection:'row'}}>
                                        <Radio 
                                            selected={this.state.genderSelected == 'F'}
                                        />
                                        <Text style={{ marginStart: 10 }}>Female</Text>
                                    </TouchableOpacity>
                                    </View>
                                </View>
                                <TextInput
                                    placeholder="Username"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleUserName}
                                    value={this.state.userName}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.firstInput.focus(); }}
                                    blurOnSubmit={false}
                                />
                                  <TextInput
                                    placeholder="Name"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleFullName}
                                    value={this.state.fullName}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.lastInput.focus(); }}
                                    blurOnSubmit={false}
                                    ref={(input) => { this.firstInput = input; }}
                                />

                                {/* <TextInput
                                    placeholder="First Name"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleFirstName}
                                    value={this.state.firstName}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.lastInput.focus(); }}
                                    blurOnSubmit={false}
                                    ref={(input) => { this.firstInput = input; }}
                                /> */}
                                {/* <TextInput
                                    placeholder="Last Name"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleLastName}
                                    value={this.state.lastName}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.emailInput.focus(); }}
                                    blurOnSubmit={false}
                                    ref={(input) => { this.lastInput = input; }}
                                /> */}
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'email-address'}
                                    onChangeText={this.handlEmail}
                                    value={this.state.email}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    ref={(input) => { this.emailInput = input; }}
                                    onSubmitEditing={() => { this.passwordInput.focus() }}
                                    blurOnSubmit={false}
                                    autoCapitalize = 'none'
                                />
                              <View style={{ flexDirection: 'row', alignSelf:'center',width: deviceWidth - 70}}>
                                    <TextInput
                                        ref={(input) => { this.passwordInput = input; }}
                                        secureTextEntry = {this.state.isPasswordSecured}
                                        placeholder="Password"
                                        placeholderTextColor='#9b9b9b'
                                        style={registerStyles.input}
                                        onChangeText={this.handlePassword}
                                        value={this.state.password}
                                        returnKeyType={"next"}
                                        onSubmitEditing={() => { this.lastInput.focus(); }}
                                        blurOnSubmit={false}
                                        ref={(input) => { this.firstInput = input; }}
    
                                    />
                                    <Icon style={registerStyles.icon}
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

                                <View>
                                {/* <TouchableOpacity onPress={()=>this.openCountryModal()}> */}
                                <TextInput
                                    placeholder="Country"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleCountry}
                                    value={this.state.countryName}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.lastInput.focus(); }}
                                    blurOnSubmit={false}
                                    ref={(input) => { this.firstInput = input; }}
                                    onTouchStart = {()=>this.openCountryModal()}
                                />
                                {/* </TouchableOpacity> */}
                                <Modal isVisible={this.state.isCountryModalVisible} style={{backgroundColor:'white',maxHeight:Dimensions.get('window').height -100, top:50, bottom:50}} onBackdropPress={()=>this.closeCountryModal()} animationIn="slideInUp" animationOut="slideOutDown" swipeDirection="right">
                                <View style={{ flex:1}}>      
                                 {/* <Text>Will show country list here</Text> */}
<TouchableOpacity onPress={()=>this.closeCountryModal()} style={{bottom:20}}> 
<Image source={require('../../../library/images/close.png')} style={{left:20,top:20,height:40,width:30}}/>
</TouchableOpacity>

<FlatList
          data={this.state.arrCountryList}
          showsVerticalScrollIndicator={false}
          renderItem={this.renderItem}
        keyExtractor={(item, index) => `item-${index}`}
        />

         </View>
        </Modal>
        </View>

                                <TextInput
                                    placeholder="Town"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleTown}
                                    value={this.state.town}
                                    style={registerStyles.input}
                                />
 
                                <View style={registerStyles.checkContainer}>
                                    <CheckBox
                                        left
                                        style={{ flex: 1 }}
                                        title='Click Here'
                                        isChecked={this.state.checked1}
                                        onClick={() => {
                                            this.setState({
                                                checked1: !this.state.checked1
                                            })
                                        }}
                                        rightText='I accept the general terms of use'
                                    />
                                </View>
                                <View style={registerStyles.checkContainer}>

                                    <CheckBox
                                        left
                                        style={{ flex: 1 }}
                                        title='Click Here'
                                        isChecked={this.state.checked2}
                                        onClick={() => {
                                            this.setState({
                                                checked2: !this.state.checked2
                                            })
                                        }}
                                        rightText='I agree to receive the Nouvelliste offers'

                                    />
                                </View>

                                <View style={registerStyles.checkContainer}>

                                    <CheckBox
                                        left
                                        style={{ flex: 1 }}
                                        title='Click Here'
                                        isChecked={this.state.checked3}
                                        onClick={() => {
                                            this.setState({
                                                checked3: !this.state.checked3
                                            })
                                        }}
                                        rightText='I agree to receive offers from our partners'

                                    />
                                </View>

                            </View>
                            <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
                                <View style={{ backgroundColor: 'red' }}>
                                    <TouchableOpacity
                                        transparent
                                        onPress={this.register
                                        //     () => {
                                            // this.props.navigation.goBack();
                                            // this.props.navigation.navigate('RegisterDone');
                                        // }
                                        }>
                                        <View style={registerStyles.buttonContainer}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>I'm registering</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </KeyboardAwareScrollView>
                    </Content>

                </Container>
            )

    }
}

const registerStyles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,

    },
    already: {
        color: 'crimson',
        fontSize: 12,
        fontWeight: 'bold'
    },
    title: {
        fontSize: 25,
        fontWeight: 'bold'
    },
    allMedia: {
        color: '#D3D3D3',
        fontSize: 15,
        marginTop: 15,
        marginBottom: 15
    },
    radioContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        width: '50%',
        marginTop: 10,
        marginBottom: 20
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
    checkContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        width: '100%',
    }, 
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height:50

        
    },

    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
        left:20
      },
      countryName: {
        fontFamily: 'Verdana',
        fontSize: 18,
      },
      countryCode: {
        color: 'red',
      }
    
})
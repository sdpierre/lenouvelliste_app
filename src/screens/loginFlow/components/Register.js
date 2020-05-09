import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput,ScrollView ,AsyncStorage,FlatList,Image,List} from 'react-native';
import Modal from 'react-native-modal';
import { Button } from 'react-native-elements'
import CheckBox from 'react-native-check-box';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Right, Left, Radio, 
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ValidationComponent from 'react-native-form-validator';
import { Typography, Colors, Spacing } from '../../../styles';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class Register extends ValidationComponent{
    constructor(props) {
        super(props)
        this.state = {
            genderSelected: 'M', //M or F
            checked1: false,
            checked2: false,
            checked3: false,
            // isCountryModalVisible: false,
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

                                alert(LeneovellisteConstants.kTownEmpty)

                             }else{

                             //   let fullName = this.state.firstName + this.state.lastName
                                var registrationParams = {
                                    'name': this.state.fullName,
                                    'username': this.state.userName,
                                    'email': this.state.email,
                                    'password': this.state.password,
                                    'country': 1,//this.state.selectedCountryItem,
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
      
                var loginParams = {
                    'username': this.state.email,
                    'password': this.state.password,
                  }

                  console.log(loginParams);

                  this.loginAPICall(loginParams);
  
            } else {
    
              alert(msg)
              console.log("Registration error",msg)
              
            }
    
          })
          .catch(function (error) {
    
            console.log(error);
    
          });
    
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
    
              this.props.navigation.goBack();
              this.props.navigation.navigate('RegisterDone');
  
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
        return (
            <TouchableOpacity onPress={() => this._choosen(item)}>
                  <View style={registerStyles.flatview}>
            <Text style={registerStyles.countryName} key={item.country_name}>{item.country_name}</Text>
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
                            
                                <MaterialCommunityIcons name="arrow-left" size={25} style={Colors.gray} onPress={() => {
                                    this.props.navigation.goBack();
                                }}/>
                           
                        </Left>
                        <Body></Body>
                        <Right>
                            <TouchableOpacity onPress={() => { this.props.navigation.navigate('Account') }}>
                                <Title style={registerStyles.already}>Already registered ?</Title>
                            </TouchableOpacity>
                        </Right>
                    </Header>
                    <Content style={{ flex: 1 }} >
                        {/* <KeyboardAwareScrollView> */}
                            <ScrollView keyboardShouldPersistTaps="handled">
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
                                    onSubmitEditing={() => { this.nameInput.focus(); }}
                                    blurOnSubmit={false}
                                />
                                  <TextInput
                                    ref={(input) => { this.nameInput = input; }}
                                    placeholder="Name"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleFullName}
                                    value={this.state.fullName}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.emailInput.focus(); }}
                                    blurOnSubmit={false}
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
                                        // returnKeyType={"done"}
                                       // onSubmitEditing={() => { this.countryInput.focus(); }}
                                        blurOnSubmit={false}    
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

                                {/* <TextInput
                                    placeholder="Town"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleTown}
                                    value={this.state.town}
                                    style={registerStyles.input}
                                    // ref={(input) => { this.townInput = input; }}
                                    returnKeyType='done'
                                /> */}
                                <GooglePlacesAutocomplete
      placeholder='City'
      minLength={2} // minimum length of text to search
      autoFocus={false}
      returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
      keyboardAppearance={'light'} // Can be left out for default keyboardAppearance https://facebook.github.io/react-native/docs/textinput.html#keyboardappearance
      listViewDisplayed='auto'    // true/false/undefined
      fetchDetails={true}
      renderDescription={row => row.description} // custom description render
      onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
        // console.log('-------',data, details);
        // console.log('-------details',details);
        // console.log('-------address',details.formatted_address);
         this.setState({
          town: details.formatted_address,
          countryName:details.formatted_address
         })

      }}

      getDefaultValue={() => ''}

      query={{
        // available options: https://developers.google.com/places/web-service/autocomplete
        key: 'AIzaSyA2SaIqhCmxkgyJsws5AoVK09IOZ0g9wYk',
        language: 'en', // language of the results
        types: '(cities)' // default: 'geocode'
      }}
  
      // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      // currentLocationLabel="Current location"
      nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
      GoogleReverseGeocodingQuery={{
        // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
      }}
      GooglePlacesSearchQuery={{
        // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
        rankby: 'distance',
        type: 'cafe'
      }}
      
      GooglePlacesDetailsQuery={{
        // available options for GooglePlacesDetails API : https://developers.google.com/places/web-service/details
        fields: 'formatted_address',
      }}

      filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
    //   predefinedPlaces={[homePlace, workPlace]}

      debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.

  //  placeholder='City'
    // minLength={2}
  //  autoFocus={false}
  // returnKeyType={'default'}
  //  fetchDetails={true}
   styles={registerStyles.input}

//   styles={{
//     textInputContainer: {
//       backgroundColor: 'rgba(0,0,0,0)',
//       borderTopWidth: 0,
//       borderBottomWidth:0
//     },
//     textInput: {
//       marginLeft: 0,
//       marginRight: 0,
//       height: 38,
//       color: '#5d5d5d',
//       fontSize: 16
//     },
//     predefinedPlacesDescription: {
//       color: '#1faadb'
//     },
//   }}
//   currentLocation={false}
/>
                            <View style={{marginTop:20}}>
                            <View style={registerStyles.checkContainer}>
                                    <CheckBox
                                        left
                                        style={registerStyles.checkbox}
                                        title='Click Here'
                                        isChecked={this.state.checked1}
                                        onClick={() => {
                                            this.setState({
                                                checked1: !this.state.checked1
                                            })
                                        }}
                                        rightText="I accept the general terms of use."
                                        rightTextStyle={{fontFamily: "Gotham-book", fontSize:12}}
                                        checkBoxColor='#D3D3D3'
                                        checkedCheckBoxColor='#de6c72'
                                    />
                                </View>
                                <View style={registerStyles.checkContainer}>
                                    
                                    
                                    <CheckBox
                                        left
                                        style={registerStyles.checkbox}
                                        title='Click Here'
                                        isChecked={this.state.checked2}
                                        onClick={() => {
                                            this.setState({
                                                checked2: !this.state.checked2
                                            })
                                        }}
                                        rightText="I agree to receive the Nouvelliste offers."
                                        rightTextStyle={{fontFamily: "Gotham-book", fontSize:12}}
                                        checkBoxColor='#D3D3D3'
                                        checkedCheckBoxColor='#de6c72'

                                    />
                                </View>

                                <View style={registerStyles.checkContainer}>

                                    <CheckBox
                                        left
                                        style={registerStyles.checkbox}
                                        title='Click Here'
                                        isChecked={this.state.checked3}
                                        onClick={() => {
                                            this.setState({
                                                checked3: !this.state.checked3
                                            })
                                        }}
                                        rightText="I agree to receive offers from our partners."
                                        rightTextStyle={{fontFamily: "Gotham-book", fontSize:12}}
                                        checkBoxColor='#D3D3D3'
                                        checkedCheckBoxColor='#de6c72'
                                    />
                                </View>

                            </View>
                            

                            <Button
                            title="I'm registering"
                            buttonStyle={{backgroundColor:'red', marginTop:20}}
                            onPress={this.register
                                //     () => {
                                    // this.props.navigation.goBack();
                                    // this.props.navigation.navigate('RegisterDone');
                                // }
                                }
                            />

                       
                            </View>
                            
                          

                            {/* <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
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
                            </View> */}
                        </ScrollView>
                    {/* </KeyboardAwareScrollView> */}
                    </Content>

                </Container>
            )

    }
}

const registerStyles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'left',
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
        height:45,
        borderWidth: 1.8,
        borderRadius:5,
        borderColor: '#D3D3D3',
        marginBottom: 10,
        paddingLeft: 15,
       // color: '#D3D3D3',
        color:'#000',
        alignSelf: 'center',
    },
    checkbox: {
        flex:1,
        marginBottom:10,
        paddingLeft:5
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
        height:40,
        
    },

    flatview: {
        justifyContent: 'center',
        paddingTop: 30,
        borderRadius: 2,
        left:20
      },
      countryName: {
        fontFamily: "Gotham-book",
        fontSize: 16,
      },
      countryCode: {
        color: 'red',
      }
    
})
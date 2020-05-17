import React from 'react';
import { Text, View, StyleSheet, Dimensions,TouchableOpacity,ScrollView,AsyncStorage,Alert,FlatList, ImageBackground} from 'react-native';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
  } from "native-base";  
import { Colors,Typography } from '../../styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { setAppInfo, setUserInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ValidationComponent from 'react-native-form-validator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import {Button, Input} from 'react-native-elements';
import TextInput from 'react-native-material-textinput'
import axios from 'axios';
import * as LeneovellisteConstants from '../../utils/LenouvellisteConstants';
import { NavigationActions, StackActions } from 'react-navigation';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Image from 'react-native-image-progress';
import ProgressBar from 'react-native-progress/Bar';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);
  
class UserProfileScreen extends ValidationComponent{
    constructor(props) {
        super(props)

      

        this.state ={
            dicGetProfile:{},
            isCountryModalVisible: false,
            userName: '',
            fullName:'',
            email: '',
            countryName:'',
            town:'',
            arrCountryList: [],
            selectedCountryItem:null,
            userId:'',
            avatarPath:'',
            isImageUploaded: false,
            profilePictureURL:''

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
               this.getUserProfileAPICall()

            }else{

                console.log("In else condition",this.state.userId)
  
            }
        }).done(
        );


    }          

    getUserProfileAPICall = () => {
        var dicGetProfile = {};

        console.log(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kGETPROFILE_API + '?user_id=' + this.state.userId)

        axios.get(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kGETPROFILE_API + '?user_id=' + this.state.userId)

            .then(response => {

              //  let msg = response.data.message;

                console.log(response.data);
                if (response.data.status == true) {

                  dicGetProfile = response.data
                    this.setState({

                        // dicGetProfile: response.data,
                        userName: dicGetProfile.data.username,
                        fullName: dicGetProfile.data.name,
                        email:dicGetProfile.data.email,
                        countryName: dicGetProfile.data.country_name,
                        selectedCountryItem:dicGetProfile.data.country,
                        town:dicGetProfile.data.town,
                        profilePictureURL:dicGetProfile.data.photo
    
                    })
    
                    console.log("Get Profile",dicGetProfile)
                    console.log("Town",this.state.town)

                    this.getAllCountriesListAPICall()


                }else{

                    alert("Unable to get profile")
                }

            })
            .catch(function (error) {

                console.log(error);

            });
      
    }

    updateProfile = () =>{

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
                                var updateProfileParams = {
                                    'username': this.state.userName,
                                    'name': this.state.fullName,
                                    'email': this.state.email,
                                    'country': 1,//this.state.selectedCountryItem,
                                    'town': this.state.town,
                                    'user_id':this.state.userId
                                  }
                
                                  console.log(updateProfileParams);
                
                                  this.userProfileUpdateAPICall(updateProfileParams);
                
                
                             }
                         }
    
                  }
    
              }
    
          }
    
        }
    
      }
    
      userProfileUpdateAPICall(params) {
    
        var dicUpdateProfile = {};

        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kUPDATEPROFILE_API, params)
    
          .then(response => {
    
                 console.log("User Profile update response",response.data);
    
            //  console.log("email", this.state.email);
    
             let msg = response.data.message;
    
            if (response.data.status == true) {
    
                dicUpdateProfile = response.data
     
                 console.log("User profile updated successfully",dicUpdateProfile)  

                 Alert.alert(
                  'Message',
                   msg,
                  [
                    {text: 'OK', onPress:()=>{
                        
                      console.log('got called')
                        this.getUserProfileAPICall()
                    }
                   },
                  ],
                  { cancelable: false }
                )
  
            } else {
    
              alert(msg)
              console.log("Error in updating profile",msg)
              
            }
    
          })
          .catch(function (error) {
    
            console.log("In error",error);
    
          });
    
      }


      chooseAvatar = () => {
        var options = {
          title: 'Select Image',
        //   customButtons: [
        //     { name: 'customOptionKey', title: 'Choose Photo from Custom Option' },
        //   ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
             let source = response;
            // You can also display the image using data:
            // let source = { uri: 'data:image/jpeg;base64,' + response.data };
            this.setState({
              avatarPath: source,
              isImageUploaded:true
            });

            console.log('Calling profile image upload API')
            this.updateProfilePicture(source);
          }
        });
      };

      updateProfilePicture(source){

        // let sourceData = { uri: 'data:image/jpeg;base64,' + source };

        var updateProfileImageParam = {
          'user_id': this.state.userId, //Neena's ID 25
          'image':source.data
      }

      console.log('params',updateProfileImageParam);

        axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kUPDATEPROFILEIMAGE_API, updateProfileImageParam)
    
          .then(response => {
    
                 console.log("User Profile update response",response.data);
        
             let msg = response.data.message;
    
            if (response.data.status == true) {
        
              Alert.alert(
                'Message',
                 msg,
                [
                  {text: 'OK'},
                ],
                { cancelable: false }
              )

                 console.log("User profile image updated successfully")  
            } else {
    
              alert(msg)
              console.log("Error in updating profile",msg)
              
            }
    
          })
          .catch(function (error) {
    
            console.log(error.response);
    
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
              <View style={profileStyles.flatview}>
        <Text style={profileStyles.countryName} key={item.country_name}>{item.country_name}</Text>
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


    logout = () =>{

        Alert.alert(
            'Message',
             'Are you sure you want to logout?',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'OK', onPress:async()=>{
                
                  this.removeItemValue('loggedInUserDetails')
                // AsyncStorage.removeItem('loggedInUserDetails');
                let user = this.props.appInfo;
                await AsyncStorage.clear();
                this.props.setUserInfo(null);
                const resetAction = StackActions.reset({
                  index: 0,
                key: null,
                  actions: [NavigationActions.navigate({ routeName: 'login' })],
                });
                this.props.navigation.dispatch(resetAction);
           
                // const resetAction = NavigationActions.reset({
                //   index: 0,
                //   actions: [
                //     NavigationActions.navigate({routeName: 'Account'})
                //   ],
                //   key: null
                // })
                // dispatch(resetAction)          
                // this.props.navigation.navigate('Account')
                }
             },
            ],
            { cancelable: false }
          )

    }

    async removeItemValue(key) {
      try {
          await AsyncStorage.removeItem(key);
          console.log('Removed')
          return true;
      }
      catch(exception) {
        console.log('Removed',exception)
          return false;
      }
  }
  

    render(){

      const username = this.state.userName;
        return (
          <Container>
            <ScrollView>
            <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}

      scrollEnabled={true}
    >
              <ImageBackground
                source={require('../../res/images/bg.png')}
                style={profileStyles.image}>
                <Header
                  style={profileStyles.header}>
                  <Left>
                    <Ionicons
                      name="ios-arrow-back"
                      size={30}
                      style={Colors.white}
                      onPress={() => {
                        this.props.navigation.goBack();
                      }}
                    />
                  </Left>
                  <Body />
                  <Right>
                    <MaterialCommunityIcons
                      name="logout"
                      size={30}
                      style={Colors.white}
                      onPress={this.logout}
                    />
                  </Right>
                </Header>
                <View style={{justifyContent: 'center',  alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={this.chooseAvatar.bind(this)}>
                    <View
                      style={{
                        height: 130,
                        width: 130,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        // top: 40,
                        marginTop: 40,
                        alignItems: 'center',
                        borderRadius: 100,
                        overflow: 'hidden',
                        borderColor: '#fff',
                        borderWidth: 4,
                      }}>
                      {this.state.isImageUploaded ? (
                        <Image
                          source={{
                            // uri: this.state.avatarPath,
                            uri:
                              'data:image/jpeg;base64,' +
                              this.state.avatarPath.data,
                          }}
                          /*source={require('../../library/images/profile.png')}*/ style={{
                            height: 200,
                            width: 200,
                          }}
                        />
                      ) : (
                        <Image
                          source={{
                            uri: this.state.profilePictureURL,
                          }}
                          indicator={ProgressBar.Pie} 
                          indicatorProps={{
                            size: 80,
                            borderWidth: 0,
                            color: '#0082C0',
                            unfilledColor: 'rgba(200, 200, 200, 0.2)'
                          }}
                          style={{
                            height: 200,
                            width: 200,
                            resizeMode: 'contain',
                            
                          }}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                  <Text style={profileStyles.username}>
                    {' '}
                    {this.state.userName}{' '}
                  </Text>
                  <Text style={profileStyles.location}>
                  <MaterialCommunityIcons
                      name="map-marker"
                      size={15}
                      style={Colors.yellow}
                    />{this.state.town}
                  </Text>
                </View>
              </ImageBackground>

              <View style={{padding: 30}}>
                <Text style={Typography.sectionTitleBlack}>
                  Mon compte
                </Text>

                <TextInput
                  label="Pseudo"
                  tintColor="#0082c5"
                  placeholderTextColor="#9b9b9b"
                  keyboardType={'default'}
                  onChangeText={this.handleUserName}
                  value={this.state.userName}
                  returnKeyType={''}
                  blurOnSubmit={false}
                />

                <TextInput
                  label="Nom complet"
                  ref={this.nameInput}
                  keyboardType={'default'}
                  onChangeText={this.handleFullName}
                  value={this.state.fullName}
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                />

                <TextInput
                  keyboardType={'email-address'}
                  onChangeText={this.handlEmail}
                  label="E-mail"
                  value={this.state.email}
                  returnKeyType={'next'}
                  autoCapitalize="none"
                />

                <TextInput
                  keyboardType={'default'}
                  label="Location"
                  value={this.state.town}
                  returnKeyType={'done'}
                  autoCapitalize="none"
                  editable={false}
                />

                <Button
                  style={{marginTop: 20}}
                  title="Valider"
                  onPress={this.updateProfile}
                />

                <View>
                  <Text style={Typography.sectionTitleBlack}>
                    Mes identifiants
                  </Text>
                  <TouchableOpacity
                    onPress={() => {
                      this.props.navigation.navigate('ChangePassword');
                    }}>
                    <Text>
                      Modifier mon mot de passe
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              </KeyboardAwareScrollView>
              </ScrollView>
          </Container>
        );
    }
}

const mapStateToProps = (state) => ({
  user: state.user || "Please Wait...",
});

const mapDispatchToProps = (dispatch) => {
  return {
      setUserInfo: (info) => {
          dispatch(setUserInfo(info))
      }
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserProfileScreen);

const image = { src: "../res/" };

const profileStyles = StyleSheet.create({
    container: {
      backgroundColor:'#FFF'
    },
    header:{
      paddingLeft:15,
      paddingRight:15,
      backgroundColor: 'transparent',
      borderBottomColor:'transparent',
      shadowColor: 'transparent',
      shadowRadius: 0,
      shadowOffset: {
          height: 0,
      }
    },
    username: {
      fontFamily: "Montserrat-SemiBold",
      fontSize: 25,
      color:"#FFF",
      textAlign:"center",
      marginTop:10
    },
    location: {
      fontSize: 14,
      ...Colors.yellow,
      textAlign:"center",
      marginTop:5,
      fontWeight:"bold"
    },
    sectionTitle: {
      textTransform: 'uppercase',
      fontFamily: 'AkkoPro-BoldCondensed',
      paddingBottom: 10,
      paddingTop: 10,
      fontSize: 16,
      letterSpacing: 0.64,
      color: '#2E2E2D',
    },
    image: {
      // justifyContent:"center",
      // alignItems:"center",
      height:350,
      resizeMode: "cover",
      justifyContent: "center"
    },
    containerView:{
      flex:1,
      justifyContent:'flex-start',
      backgroundColor:'#FFF'
    },
    profileBlueBg:{
        backgroundColor:'#0089d0',
        height:100,
         // justifyContent:'flex-start'
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
import React from 'react';
import { Text, View, StyleSheet,TextInput, Dimensions,TouchableOpacity,Image,ScrollView,AsyncStorage,Alert,FlatList} from 'react-native';
import {
    Container,
    Header,
    Left,
    Body,
    Right,
    Button,
    Title,
    Content
  } from "native-base";  
import { Colors } from '../../styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from 'react-native-modal';
// import Icon from 'react-native-vector-icons/MaterialIcons';
import { setAppInfo, setUserInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ValidationComponent from 'react-native-form-validator';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

import axios from 'axios';
import * as LeneovellisteConstants from '../../utils/LenouvellisteConstants'

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
                                    'country': this.state.selectedCountryItem,
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
                  
                AsyncStorage.removeItem('loggedInUserDetails');
                let user = this.props.appInfo;
                await AsyncStorage.clear();
                this.props.setUserInfo(null);
                const resetAction = NavigationActions.reset({
                  index: 0,
                  actions: [
                    NavigationActions.navigate({routeName: 'Account'})
                  ],
                  key: null
                })
                dispatch(resetAction)          
                // this.props.navigation.navigate('Account')
                }
             },
            ],
            { cancelable: false }
          )

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
                            <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
                        </Button>
                    </Left>
                    <Body>
                    <Title>USER PROFILE</Title>
                    </Body>
                    <Right>
                         <Button transparent onPress={this.logout}>
                         <MaterialCommunityIcons name="logout" size={30} style={Colors.gray} /> 
                        </Button> 
                    </Right>
                </Header>
                <ScrollView style={{backgroundColor:'#ECECEC'}}>
                <View style={profileStyles.containerView}>

                <View style={profileStyles.profileBlueBg}>

                <TouchableOpacity onPress={this.chooseAvatar.bind(this)}>
                  <View style={{height:130, width:130, backgroundColor:'white', alignSelf:'center',justifyContent:'center',top:40,alignItems:'center',borderRadius:10}}>
                    {this.state.isImageUploaded?<Image 
                       source={{
                        // uri: this.state.avatarPath,
                        uri: 'data:image/jpeg;base64,' + this.state.avatarPath.data,

                      }}
                       /*source={require('../../library/images/profile.png')}*/ style={{height:120,width:120}}/>:<Image source={{
                        uri:this.state.profilePictureURL,

                      }}
                       /*source={require('../../library/images/profile.png')}*/ style={{height:120,width:120,resizeMode : 'stretch'}}/>
}
                  </View>
                </TouchableOpacity>

                </View>
                  
                 <View style={{alignItems:'center',height:50,marginTop:80}}> 
                       <Text style ={{color:'#0089d0',fontSize:22,fontWeight:'bold',fontFamily:'AkkoPro-BoldCondensed'}}>USER NAME</Text>
                       {/* <TextInput style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}>Neena Mishra</TextInput> */}
                       <TextInput
                                    // placeholder="Username"
                                    // placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleUserName}
                                    value={this.state.userName}
                                    style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}                                    
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.nameInput.focus(); }}
                                    blurOnSubmit={false}
                                />

                  </View>

                  <View style = {{backgroundColor:'lightgray',height:1,marginTop:20, marginLeft:20,marginRight:20}}></View>

                  <View style={{height:50,flexDirection:'row', top:10,marginRight:20,marginLeft:20}}>
                 
                  <View style={{flexDirection:'column',width:'25%',justifyContent:'center',alignItems:'center'}}> 
                       <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Video</Text>
                       <Text style ={{color:'#008BCA',fontSize:22,fontFamily:'Gotham-book'}}>54</Text>
                  </View>

                  <View style = {{backgroundColor:'lightgray',height:40, width:2, marginLeft:20, marginRight:20,alignSelf:'center'}}></View>

                  <View style={{flexDirection:'column',width:'25%',justifyContent:'center',alignItems:'center'}}> 
                       <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Video</Text>
                       <Text style ={{color:'#008BCA',fontSize:22,fontFamily:'Gotham-book'}}>54</Text>
                  </View>

                  <View style = {{backgroundColor:'lightgray',height:40, width:2, marginLeft:20, marginRight:20,alignSelf:'center'}}></View>

                  <View style={{flexDirection:'column',width:'25%',justifyContent:'center',alignItems:'center'}}> 
                       <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Video</Text>
                       <Text style ={{color:'#008BCA',fontSize:22,fontFamily:'Gotham-book'}}>54</Text>
                  </View>

                  </View>

                  <View style = {{backgroundColor:'lightgray',height:1,top:10, marginLeft:20,marginRight:20}}></View>

                  <View style={{flexDirection:'column',marginLeft:20,marginRight:20,marginBottom:10,marginTop:20}}> 
                       <Text style ={{color:'lightgray',fontSize:14,fontFamily:'Gotham-book'}}>Name</Text>
                       {/* <TextInput style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}>Neena Mishra</TextInput> */}
                       <TextInput
                                    ref={(input) => { this.nameInput = input; }}
                                    // placeholder="Name"
                                    // placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleFullName}
                                    value={this.state.fullName}
                                    style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}                                    
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.emailInput.focus(); }}
                                    blurOnSubmit={false}
                                />

                  </View>

                  <View style={{flexDirection:'column',marginLeft:20,marginRight:20,marginBottom:10,marginTop:20}}> 
                       <Text style ={{color:'lightgray',fontSize:14,fontFamily:'Gotham-book'}}>Email</Text>
                       <TextInput
                                    keyboardType={'email-address'}
                                    onChangeText={this.handlEmail}
                                    value={this.state.email}
                                    style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}                                    returnKeyType={"next"}
                                    ref={(input) => { this.emailInput = input; }}
                                    autoCapitalize = 'none'
                                />

                  </View>

 <View>
                  <View style={{flexDirection:'column',marginLeft:20,marginRight:20,marginBottom:10,marginTop:10}}> 
                       <Text style ={{color:'lightgray',fontSize:14,fontFamily:'Gotham-book'}}>Country</Text>
                       <TextInput
                                    // placeholder="Country"
                                    // placeholderTextColor='#9b9b9b'
                                    // keyboardType={'default'}
                                    onChangeText={this.handleCountry}
                                    value={this.state.countryName}
                                    style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}                                    // returnKeyType={"next"}
                                    // onSubmitEditing={() => { this.townInput.focus(); }}
                                    // blurOnSubmit={false}
                                   //  ref={(input) => { this.countryInput = input; }}
                                     onTouchStart = {()=>this.openCountryModal()}
                                    editable = {false}
                                />
                               <Modal isVisible={this.state.isCountryModalVisible} style={{backgroundColor:'white',maxHeight:Dimensions.get('window').height -200, top:50, bottom:50}} onBackdropPress={()=>this.closeCountryModal()} animationIn="slideInUp" animationOut="slideOutDown" swipeDirection="right">
                                <View style={{ flex:1}}>      
                                 {/* <Text>Will show country list here</Text>  */}
 <TouchableOpacity onPress={()=>this.closeCountryModal()} style={{bottom:20}}> 

<MaterialCommunityIcons name="window-close" size={30} style={[Colors.gray,{ left:20,top:30}]}/>


</TouchableOpacity>

<FlatList
          style={{marginBottom:10}}
          data={this.state.arrCountryList}
          showsVerticalScrollIndicator={true}
          renderItem={this.renderItem}
          initialNumToRender = {10}
        //   maxToRenderPerBatch = {2}
        //   windowSize={5}
          removeClippedSubviews = {true}
          //keyExtractor={(item, index) => `item-${index}`}
          keyExtractor={(item) => item.id}
        />

         </View>
        </Modal>

                  </View>
                 </View>

                  <View style={{flexDirection:'column',marginLeft:20,marginRight:20,marginBottom:10,marginTop:10}}> 
                       <Text style ={{color:'lightgray',fontSize:14,fontFamily:'Gotham-book'}}>Town</Text>
                       <TextInput
                                    // placeholder="Town"
                                    // placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleTown}
                                    value={this.state.town}
                                    style ={{color: "#4b4b4b",fontSize:18,fontFamily:'Gotham-book'}}
                                    // ref={(input) => { this.townInput = input; }}
                                    returnKeyType='done'
                                />

                  </View>

                 <View style={{height:50,flexDirection:'row', top:20,marginRight:20,marginLeft:20,marginBottom:40}}>
                 <TouchableOpacity style={{height:50,width:'45%',justifyContent:'center',alignItems:'center',backgroundColor:'#fff',marginRight:20}}>
                      <Text style ={{color: "#4b4b4b",fontSize:16,fontFamily:'Gotham-book'}}>Edit Profile</Text>
                  </TouchableOpacity>
                
                 <TouchableOpacity onPress={this.updateProfile} style={{height:50,width:'45%',justifyContent:'center',alignItems:'center',backgroundColor:'#0089d0'}}>
                   <Text style ={{color: "#fff",fontSize:16,fontFamily:'Gotham-book'}}>Save Changes</Text>
                 </TouchableOpacity>
                 </View>

                 <TouchableOpacity onPress= {()=>{
                   this.props.navigation.navigate('ChangePassword')
                 }}style={{height:50,width:'85%',justifyContent:'center',alignItems:'center',backgroundColor:'#0089d0',marginLeft:20,marginRight:20}}>
                      <Text style ={{color: "#fff",fontSize:16,fontFamily:'Gotham-book',fontWeight:'bold'}}>Change Password</Text>
                </TouchableOpacity>

                </View>
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

const profileStyles = StyleSheet.create({
    containerView:{
      flex:1,
      justifyContent:'flex-start',
      backgroundColor:'#ECECEC'
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
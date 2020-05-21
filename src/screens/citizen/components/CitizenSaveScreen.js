import React, { Component } from 'react';
import { TouchableWithoutFeedback, ActivityIndicator, NativeModules, Platform, StyleSheet, Text, Modal, View, TouchableOpacity, TextInput, Image, ScrollView, ImageBackground, Dimensions, AsyncStorage, Alert,FlatList } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'

import {
    Container,
    Header,
    Body,
    Right, Left,
    Content,
    Title
} from "native-base";
import { Button } from 'react-native-elements';
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Colors } from '../../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { FloatingAction } from "react-native-floating-action";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Image Picker
import ImagePicker from 'react-native-image-crop-picker';
import { withNavigation } from 'react-navigation';


//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);


var buttonHeight = Platform.OS == 'android' ? 50 : 55
var elementSpacing = Platform.OS == 'android' ? 12 : 19
var imageData = {};


export default class CitizenSaveScreen extends ValidationComponent {
    constructor(props) {
        super(props)

        this.state ={ 
            title:'',
            description:'',
            // imageData:{},
            arrPhotos:[],
            videoData:'',
            showAddButton:true,
            userId:''

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

            }else{

                console.log("In else condition",this.state.userId)
  
            }
        }).done(
        );

        const { navigation } = this.props;
        imageData = navigation.getParam('imageData'); 

        console.log('received image imagedata',imageData);

        this.state.arrPhotos.push(imageData)
        // this.getArrayOfImages();

    }

    getArrayOfImages = async () => {
        try {
            const myArray = await AsyncStorage.getItem('citizenImages');
            if (myArray !== null) {
              // We have data!!
              console.log('Saved images array length',JSON.parse(myArray.length));
               this.setState({
                   arrPhotos:myArray
               })
            //   console.log('Saved images array',JSON.parse(myArray));
            }
          } catch (error) {
            // Error retrieving data
            console.log('Array async error',error)
          }
    

    }

    sendClick = () =>{        
    
        this.validate({
        title:{required:true}
      })

      if (this.getErrorMessages()){
          alert(LeneovellisteConstants.kCitizenPostTitle)

      }else{

          this.validate({
              description:{required:true}
          })

          if(this.getErrorMessages()){
              alert(LeneovellisteConstants.kCitizenPostDescription)

          }else{

              var citizenPostParams = {
                  'user_id': this.state.userId  ,
                  'category_id': 1,
                  'title': this.state.title,
                  'description': this.state.description,
                  'lat': '27.2038',
                  'long': '77.5011',
                //   'image':this.state.arrPhotos,
                  'video':''

              }

                console.log(citizenPostParams);

                this.apiCallToSendCitizenPost(citizenPostParams);

          }

      }


    }

    apiCallToSendCitizenPost=(params)=>{    

        const formData = new FormData()

         this.state.arrPhotos.forEach((element, i) => {
            const newFile = {
                uri:element.path,type:element.mime, name:element.path.split("/").pop()
            }
            formData.append('image[]',newFile)

         });

        console.log("data", formData);
        

        const config = {
            method: 'post',
            url: LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kCITIZENPOST_API,
            data:formData,
            params,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }

        }

        axios(config)

            .then(response => {

                console.log("Citizen Post Response",response.data);

                let msg = response.data.message;

                if (response.data.status == true) {

                    Alert.alert(
                        'Message',
                         msg,
                        [
                          {text: 'OK', onPress:()=>{
        
                            this.goToCitizenProgress()
                              
                        }
                         },
                        ],
                        { cancelable: false }
                      )
                      

                } else {

                    console.log("Citizen post error",msg)
                    alert(msg);
                      }

            })
            .catch(function (error) {

                console.log(error);
                alert(error.response)
                console.log('In case of undefined')
    
            });


        //     axios.post(LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kCITIZENPOST_API, params)
    
        //   .then(response => {
    
            //  console.log("Citizen Post Response",response);
        //     let msg = response.data.message;
        //     if (response.data.status == true) {

        //     Alert.alert(
        //         'Message',
        //          msg,
        //         [
        //           {text: 'OK', onPress:()=>{

        //             this.goToCitizenProgress()
                      
        //         }
        //          },
        //         ],
        //         { cancelable: false }
        //       )
    
        //     } else {
    
        //       console.log("Citizen post error",msg)
        //       alert(msg);
             
        //     }
    
        //   })
        //   .catch(function (error) {
    
    
        //   });
    

    }

    goToCitizenProgress = ()=>{

        this.props.navigation.navigate('CitizenProgressScreen')

    }

    addMoreImages = () =>{
        console.log('Getting called')
          ImagePicker.openCamera({
            width: 300,
            height: 400,
            // cropping: true,
            includeBase64:true,
            mediaType:'photo'
          }).then(image => {

            // var arrImages =[];
            // arrImages.push(image.data)
            this.state.arrPhotos.push(image)

            console.log("Image",this.state.arrPhotos.length);
            if (this.state.arrPhotos.length >= 5){
                this.setState({
                    showAddButton:false
                })
                console.log('Dont show add button')
            }else{
                this.setState({
                    showAddButton:true
                })
                console.log('Show add button')

            }
            // this.setArrayOfImages(this.state.arrPhotos)          
        });
            

    }

    setArrayOfImages = async(arrImages)=>{
        try {
            await AsyncStorage.setItem('citizenImages', JSON.stringify(arrImages));
          } catch (error) {
// Error saving data
            console.log('array of images error',error)
           }
    }
    

    handlTitle = (text) => {
        this.setState({
            title: text
        })
    }

    handleDescription = (text) => {
        this.setState({
            description: text
        })
    }

    renderItem = ({ item }) => {
        //console.log('ITem---->',item)
        return (
            <TouchableOpacity onPress={() => this._choosen(item)}>
            <View style={styles.flatview}>
            <Image source={{uri:item.path}} style={{height:100,width:100}}/>
          </View>
          </TouchableOpacity>
        );
    }

    _choosen(selectedItem) {
       console.log(selectedItem)
    }
    
    

    render() {
        // console.log('array of photos in render',this.state.arrPhotos)
        return (
                <Container>
                    <Header style={{ backgroundColor: 'white', }}>
                        <Left>
                        </Left>
                        <Body>
                        <Title>Plus de détails</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content>
                     <View style={{ flex: 1 }}>
                     <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center',padding:30}}>


                    <View style ={{flexDirection:'column',marginBottom:10}}>
                    {/* <Image source={require('../../../library/images/profile.png')} style={{height:120,width:120}}/>  */}
                     {this.state.showAddButton?<TouchableOpacity
                          transparent
                          onPress={this.addMoreImages} style={{alignSelf:'flex-end'}}>
                     <AntDesign name="pluscircleo" size={30} style={Colors.gray} /> 
                     </TouchableOpacity>:null}
                    <FlatList 
                        horizontal
                        data={this.state.arrPhotos}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        alignItems='center'
                        style={{width:deviceWidth-70,height:110}}

                    />
                    </View>


                    <View style ={{flexDirection:'column',marginBottom:10}}>
                     <Text style ={{color:'lightgray',fontSize:16,fontFamily:'Gotham-book'}}>Title</Text>
                    <TextInput
                                    placeholder="Title"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handlTitle}
                                    value={this.state.title}
                                    style={styles.input}
                                    returnKeyType='next'
                    />
                    </View>

                    <View style ={{flexDirection:'column'}}>
                     <Text style ={{color:'lightgray',fontSize:16,fontFamily:'Gotham-book'}}>Description</Text>
                    <TextInput
                                    placeholder="Description"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleDescription}
                                    value={this.state.description}
                                    style={styles.input}
                                    multiline={true}
                                    numberOfLines={4}
                                    returnKeyType='done'
                                    autoCapitalize = 'none'
                    />

                    </View>

                    <Button
                            title="SEND"
                            buttonStyle={{backgroundColor:'red', marginTop:20}}
                            onPress={this.sendClick}
                            />
                    
                    <Button
                            title="SAVE FOR LATER"
                            buttonStyle={{backgroundColor:'red', marginTop:20}}
                            onPress={this.goToCitizenProgress}
                            />

                   

                            </View>
                        </View>
                    </Content>
                </Container>

        )
    }
}

const styles = StyleSheet.create({

    container: {
        height: '100%',
        width: '100%',
    
        //height:deviceHeight+64
    },

    input: {
        width: deviceWidth - 70,
        height: 50,
        padding: 10,
        borderWidth: 1.8,
        borderColor: '#D3D3D3',
        marginBottom: 20,
        paddingLeft: 15,
       // color: '#D3D3D3',
       color:'#000',
        alignSelf: 'center',
    },

    loading: {
        position: 'absolute',
        alignItems: 'center',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignSelf: 'center',
        flex: 1,
        backgroundColor: 'transparent'
    },

    citizenSaveText: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        marginBottom: 10,
        //marginLeft:35
    },
    nextButton: {
        backgroundColor: '#0089d0',
        height:50,
        alignItems:'center',
        marginTop:20
    },
    buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    icon: {
        position: 'absolute',
        top: 15,
        right: 5
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
    },
    flatview: {
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft:5,
        marginRight:5
      },
  

});
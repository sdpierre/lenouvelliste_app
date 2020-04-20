import React, { Component } from 'react';
import { TouchableWithoutFeedback, ActivityIndicator, NativeModules, Platform, StyleSheet, Text, Modal, View, TouchableOpacity, TextInput, Image, ScrollView, ImageBackground, Dimensions, AsyncStorage, Alert } from 'react-native';
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

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);


var buttonHeight = Platform.OS == 'android' ? 50 : 55
var elementSpacing = Platform.OS == 'android' ? 12 : 19


export default class CitizenSaveScreen extends Component {
    constructor(props) {
        super(props)

        this.state ={ 
            title:'',
            description:'',
            imagePath:'',
            imageUri:'',
            imageData:''
        }
    }

    componentDidMount(){
        const { navigation } = this.props;
        const strImageData = navigation.getParam('imageData'); 
        console.log(strImageData) 
        this.setState({
          imageData:strImageData
        })
    
       // console.log("Image Data",this.state.imageData)
    

    }

    goToCitizenProgress = ()=>{

        this.props.navigation.navigate('CitizenProgressScreen')

    }

    addMoreImages = () =>{
      

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

    render() {
        return (
                <Container>
                    <Header style={{ backgroundColor: 'white', }}>
                        <Left>
                            {/* <Button
                                transparent
                                onPress={() => {
                                    this.props.navigation.goBack();
                                }}>
                                // <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
                            </Button> */}
                        </Left>
                        <Body>
                        <Title>Plus de détails</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <Content>
                        <View style={{ flex: 1, height: 500, padding: 35 }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

                    <View style ={{flexDirection:'row',marginBottom:10}}>
                    {/* <Image source={require('../../../library/images/profile.png')} style={{height:120,width:120}}/>  */}
                    <Image source={{uri: `data:image/png;base64,${this.state.imageData}`}} style={{height:100,width:100}}/>

                     <TouchableOpacity
                          transparent
                          onPress={this.addMoreImages} style={{marginLeft:10}}>
                     <AntDesign name="pluscircleo" size={30} style={Colors.gray} /> 
                     </TouchableOpacity>
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
                            onPress={this.goToCitizenProgress}
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
      }

});
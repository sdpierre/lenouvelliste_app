import React, { Component } from 'react';
import { TouchableWithoutFeedback, ActivityIndicator, NativeModules, Platform, StyleSheet, Text, Modal, View, TouchableOpacity, TextInput, Image, ScrollView, ImageBackground, Dimensions, AsyncStorage, Alert } from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants'

import {
    Container,
    Header,
    Body,
    Button,
    Right, Left,
    Content,
    Title
} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Colors } from '../../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);


var buttonHeight = Platform.OS == 'android' ? 50 : 55
var elementSpacing = Platform.OS == 'android' ? 12 : 19


export default class CitizenProgressScreen extends Component {
    constructor(props) {
        super(props)

        this.state ={ }
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
                        <Title>Progress</Title>
                        </Body>
                        <Right></Right>
                    </Header>
                    <View>
                    <View style={{ flex: 0, height: 500, padding: 35 }}>
                            <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center' }}>

                                <Text style={styles.citizenSaveText}>Progress coming soon</Text>

                                <View style={styles.nextButton}>
                                    <TouchableOpacity
                                        transparent
                                        onPress={() =>{
                                            this.props.navigation.goBack()
                                            this.props.navigation.navigate('Home')

                                        }
                                        }>
                                        <View style={styles.buttonContainer}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>DONE</Text>
                                        </View>
                                    </TouchableOpacity>

                                </View>



                            </View>
                        </View>
                    </View>
                    <Content>
                        
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
        alignItems:'center'
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

});
import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    View,
    TouchableOpacity,
    Image,
    PermissionsAndroid,
    Dimensions,
    AsyncStorage,
    Alert,
    FlatList, TextInput
} from 'react-native';
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
import {
    TextField,
    FilledTextField,
    OutlinedTextField,
} from 'react-native-material-textfield';
import AnimatedLoader from "react-native-animated-loader";

import { withNavigation } from 'react-navigation';
//import RNThumbnail from 'react-native-thumbnail-fixed';


//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);


var buttonHeight = Platform.OS == 'android' ? 50 : 55
var elementSpacing = Platform.OS == 'android' ? 12 : 19
var imageData = {};
var videoData = {};

import Geolocation from 'react-native-geolocation-service';

export default class CitizenSaveScreen extends ValidationComponent {
    constructor(props) {
        super(props);

        global.lat = '';
        global.long = '';

        this.state = {
            title: '',
            description: '',
            arrPhotos: [],
            videoData: '',
            showAddButton: true,
            userId: '',
            visible: false,
        }
    }
    UNSAFE_componentWillMount() {
        const { navigation } = this.props;

        if (this.props.navigation.state.params.imageData != undefined) {
            console.log('In image condition');
            imageData = navigation.getParam('imageData');

            console.log('received image imagedata', imageData);

            this.state.arrPhotos.push(imageData)

        } else {

            console.log('In video condition')

            this.setState({
                showAddButton: false
            })

            videoData = navigation.getParam('videoData');

        }
        AsyncStorage.getItem("loggedInUserDetails").then((value) => {
            if (value != null) {
                var dicLoginData = JSON.parse(value);
                console.log('userInfo====>', dicLoginData)

                this.setState({
                    userId: dicLoginData.id
                });
                console.log("In right condition", this.state.userId)

            } else {

                console.log("In else condition", this.state.userId)

            }
        }).done(
        );
    }
    componentDidMount() {

        console.log('Did mount calling')
        if (Platform.OS == 'ios') {
            console.log(' ios Did mount calling')

            Geolocation.getCurrentPosition(
                position => {

                    global.lat = position.coords.latitude;
                    global.long = position.coords.longitude;
                },
                error => {
                    // See error code charts below.
                    console.log(error.code, error.message);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
            );

            return true;


        } else {

            async function requestLocationPermission() {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                        {
                            title: 'Location Access Required',
                            message: 'This App needs to Access your location',
                        },
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {

                        Geolocation.getCurrentPosition(
                            position => {

                                global.lat = position.coords.latitude;
                                global.long = position.coords.longitude;
                                console.log(global.lat + " " + global.long);
                            },
                            error => {
                                // See error code charts below.
                                console.log(error.code, error.message);
                            },
                            { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
                        );

                        return true;
                    } else {
                        alert('Permission Denied');
                        return false;
                    }
                } catch (err) {
                    console.warn(err);
                    return false;
                }
            }
            requestLocationPermission();
        }

    }

    getArrayOfImages = async () => {
        try {
            const myArray = await AsyncStorage.getItem('citizenImages');
            if (myArray !== null) {
                // We have data!!
                console.log('Saved images array length', JSON.parse(myArray.length));
                this.setState({
                    arrPhotos: myArray
                })
                //   console.log('Saved images array',JSON.parse(myArray));
            }
        } catch (error) {
            // Error retrieving data
            console.log('Array async error', error)
        }
    }
    sendClick = () => {
        this.validate({
            title: { required: true }
        })
        if (this.getErrorMessages()) {
            alert(LeneovellisteConstants.kCitizenPostTitle)
        } else {
            this.validate({
                description: { required: true }
            })
            if (this.getErrorMessages()) {
                alert(LeneovellisteConstants.kCitizenPostDescription)
            } else {
                this.apiCallToSendCitizenPost();
            }
        }
    }

    apiCallToSendCitizenPost = () => {

        this.setState({
            visible: !this.state.visible
        });


        const formData = new FormData()


        if (this.state.arrPhotos.length > 0) {

            var params = {
                'user_id': this.state.userId,
                'category_id': 1,
                'title': this.state.title,
                'description': this.state.description,
                'lat': global.lat,
                'long': global.long,
                'video': ''

            }
            console.log('Parameter is = ', params)
            this.state.arrPhotos.forEach((element, i) => {
                const newFile = {
                    uri: element.path, type: element.mime, name: element.path.split("/").pop()
                }
                formData.append('image[]', newFile)

            });

        } else {

            var params = {
                'user_id': this.state.userId,
                'category_id': 1,
                'title': this.state.title,
                'description': this.state.description,
                'lat': global.lat,
                'long': global.long,
                'image[]': []
            }

            const newFile = {
                uri: videoData.path, type: videoData.mime, name: videoData.path.split("/").pop()
            }
            formData.append('video', newFile)

        }

        console.log(params);

        console.log("data", formData);

        const config = {
            method: 'post',
            url: LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kCITIZENPOST_API,
            data: formData,
            params,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data'
            }
        }

        axios(config)

            .then(response => {

                console.log("Citizen Post Response", response.data);

                let msg = response.data.message;

                if (response.data.status == true) {

                    Alert.alert(
                        'Message',
                        msg,
                        [
                            {
                                text: 'OK', onPress: () => {

                                    this.setState({
                                        visible: false
                                    });

                                    this.goToCitizenProgress()

                                }
                            },
                        ],
                        { cancelable: false }
                    )

                } else {

                    this.setState({
                        visible: false
                    });

                    console.log("Citizen post error", msg)
                    alert(msg);
                }

            })
            .catch(function (error) {
                console.log(error);
                alert(error.response)
                this.setState({
                    visible: false
                });

                console.log('In case of undefined')

            });

    }

    goToCitizenProgress = () => {

        this.props.navigation.navigate('CitizenProgressScreen')

    }

    addMoreImages = () => {
        console.log('Getting called')
        ImagePicker.openCamera({
            width: 300,
            height: 400,
            // cropping: true,
            // includeBase64:true,
            mediaType: 'photo'
        }).then(image => {

            // var arrImages =[];
            // arrImages.push(image.data)
            this.state.arrPhotos.push(image)

            console.log("Image", this.state.arrPhotos.length);
            if (this.state.arrPhotos.length >= 5) {
                this.setState({
                    showAddButton: false
                })
                console.log('Dont show add button')
            } else {
                this.setState({
                    showAddButton: true
                })
                console.log('Show add button')

            }
            // this.setArrayOfImages(this.state.arrPhotos)          
        });


    }

    setArrayOfImages = async (arrImages) => {
        try {
            await AsyncStorage.setItem('citizenImages', JSON.stringify(arrImages));
        } catch (error) {
            // Error saving data
            console.log('array of images error', error)
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
                    <Image source={{ uri: item.path }} style={{ height: 100, width: 100 }} />
                </View>
            </TouchableOpacity>
        );
    }

    _choosen(selectedItem) {
        console.log(selectedItem)
    }



    render() {
        const { visible } = this.state;
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
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }}>
                        <View style={{ flexDirection: 'column', justifyContent: 'center', alignContent: 'center', padding: 30 }}>
                            <View style={{ flexDirection: 'column', marginBottom: 10 }}>
                                {/* <Image source={require('../../../library/images/profile.png')} style={{height:120,width:120}}/>  */}
                                {this.state.showAddButton ? <TouchableOpacity
                                    transparent
                                    onPress={this.addMoreImages} style={{ alignSelf: 'flex-end' }}>
                                    <AntDesign name="pluscircleo" size={30} style={Colors.gray} />
                                </TouchableOpacity> : null}
                                {this.state.arrPhotos.length > 0 ? <FlatList
                                    horizontal
                                    data={this.state.arrPhotos}
                                    renderItem={this.renderItem}
                                    keyExtractor={(item, index) => index.toString()}
                                    alignItems='center'
                                    style={{ width: deviceWidth - 70, height: 110 }}

                                />
                                    : <TouchableOpacity>
                                        <View style={styles.videoView}>
                                            <Image source={require('../../../library/images/blackBg.png')} style={{ height: 100, width: 100 }} />
                                            <Image source={require('../../../library/images/playIcon.png')} style={{ height: 40, width: 40, position: 'absolute' }} />
                                        </View>
                                    </TouchableOpacity>
                                }
                            </View>
                            <TextInput style={{
                                height: 50, borderBottomColor: '#D8D8D8',
                                borderBottomWidth: 1,
                            }}
                                placeholder="Title"
                                tintColor="#0082c5"
                                //renderRightAccessory={iconpass}
                                // ref={input => {
                                //   this.secondTextInput = input;
                                // }}
                                //  secureTextEntry={this.state.isPasswordSecured}
                                // secureTextEntry={true}
                                placeholderTextColor="#9b9b9b"
                                onChangeText={this.handlTitle}
                                value={this.state.title}
                                returnKeyType={'next'}
                            />
                            {/* <TextField
                                label="Title"
                                tintColor="#0082c5"
                                placeholderTextColor="#9b9b9b"
                                keyboardType={'default'}
                                onChangeText={this.handlTitle}
                                value={this.state.title}
                                // style={styles.input}
                                returnKeyType={'next'}

                            />
                            <TextField
                                label="Description"
                                tintColor="#0082c5"
                                placeholderTextColor="#9b9b9b"
                                keyboardType={'default'}
                                onChangeText={this.handleDescription}
                                value={this.state.description}
                                // style={styles.input}
                                returnKeyType={'next'}
                            /> */}
                            <TextInput style={{
                                height: 50, borderBottomColor: '#D8D8D8',
                                borderBottomWidth: 1,
                            }}
                                placeholder="Description"
                                tintColor="#0082c5"
                                //renderRightAccessory={iconpass}
                                // ref={input => {
                                //   this.secondTextInput = input;
                                // }}
                                //  secureTextEntry={this.state.isPasswordSecured}
                                // secureTextEntry={true}
                                placeholderTextColor="#9b9b9b"
                                onChangeText={this.handleDescription}
                                value={this.state.description}
                                returnKeyType={'next'}
                            />
                            <Button
                                title="SEND"
                                buttonStyle={{ marginTop: 20 }}
                                onPress={this.sendClick}
                            />

                            <Button
                                title="SAVE FOR LATER"
                                buttonStyle={{ marginTop: 20 }}
                                onPress={this.goToCitizenProgress}
                            />



                        </View>
                    </View>
                    <AnimatedLoader
                        visible={visible}
                        overlayColor="rgba(255,255,255,0.75)"
                        source={require("../../../utils/loader.json")}
                        animationStyle={styles.lottie}
                        speed={1}
                    />
                </View>

                {/* <Content>
                    

                            </Content> */}
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
        color: '#000',
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
        height: 50,
        alignItems: 'center',
        marginTop: 20
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
        marginLeft: 5,
        marginRight: 5
    },

    videoView: {
        justifyContent: 'center',
        borderRadius: 2,
        marginLeft: 5,
        marginRight: 5,
        height: 100,
        width: 100,
        alignItems: 'center'
    },
    lottie: {
        width: 100,
        height: 100
    }
});
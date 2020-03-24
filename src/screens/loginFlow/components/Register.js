import React from 'react';
import { View, Modal, StyleSheet, TouchableOpacity, Text, Dimensions, TextInput, TouchableWithoutFeedback } from 'react-native';
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

import { Typography, Colors, Spacing } from '../../../styles';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class Register extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            itemSelected: 'Sir',
            checked: false,
            modalVisible: true,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            password: ''
        }
    }
    handleUserName = (text) => {
        this.setState({
            username: text
        })
    }
    handleFirstName = (text) => {
        this.setState({
            firstName: text
        })
    }

    handleLastName = (text) => {
        this.setState({
            lastName: text
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

    render() {
        return (
            <Modal transparent={true} animationType='fade' >
           
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
                            <View style={registerStyles.rootContainer}>
                                <Text style={registerStyles.title}>Create your Le Nouvelliste account</Text>
                                <Text style={registerStyles.allMedia}>You can take advantage of the Nouvelliste's free services on all media</Text>
                                <View style={registerStyles.radioContainer}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Radio onPress={() => this.setState({ itemSelected: 'Sir' })}
                                            selected={this.state.itemSelected == 'Sir'}
                                        />
                                        <Text style={{ marginStart: 10 }}>Sir</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row' }}>

                                        <Radio onPress={() => this.setState({ itemSelected: 'Mrs' })}
                                            selected={this.state.itemSelected == 'Mrs'}
                                        />
                                        <Text style={{ marginStart: 10 }}>Mrs</Text>
                                    </View>
                                </View>
                                <TextInput
                                    placeholder="Username"
                                    placeholderTextColor='#9b9b9b'
                                    keyboardType={'default'}
                                    onChangeText={this.handleUserName}
                                    value={this.state.username}
                                    style={registerStyles.input}
                                    returnKeyType={"next"}
                                    onSubmitEditing={() => { this.firstInput.focus(); }}
                                    blurOnSubmit={false}
                                />
                                <TextInput
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
                                />
                                <TextInput
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
                                />
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
                                />
                              <View style={{ flexDirection: 'row'}}>
                                    <TextInput
                                        ref={(input) => { this.passwordInput = input; }}
                                        secureTextEntry
                                        placeholder="Password"
                                        placeholderTextColor='#9b9b9b'
                                        style={registerStyles.input}
                                    />
                                    <Icon style={registerStyles.icon}
                                        name='visibility-off'
                                        size={25}
                                        color='#D3D3D3'
                                        onPress={this.changePwdType}
                                    />

                                </View>
                                <View style={registerStyles.checkContainer}>

                                    <CheckBox
                                        left
                                        style={{ flex: 1 }}
                                        title='Click Here'
                                        isChecked={this.state.checked}
                                        onClick={() => {
                                            this.setState({
                                                checked: !this.state.checked
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
                                        isChecked={this.state.checked}
                                        onClick={() => {
                                            this.setState({
                                                checked: !this.state.checked
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
                                        isChecked={this.state.checked}
                                        onClick={() => {
                                            this.setState({
                                                checked: !this.state.checked
                                            })
                                        }}
                                        rightText='I agree to receive offers from our partners'

                                    />
                                </View>

                            </View>
                            <View style={{ paddingHorizontal: 30, marginBottom: 20 }}>
                                <View style={{ backgroundColor: 'red' }}>
                                    <Button
                                        transparent
                                        onPress={() => {
                                            this.props.navigation.goBack();
                                            this.props.navigation.navigate('RegisterDone');
                                        }}>
                                        <View style={registerStyles.buttonContainer}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>I'm registering</Text>
                                        </View>
                                    </Button>
                                </View>
                            </View>
                        </KeyboardAwareScrollView>
                    </Content>

                </Container>
            </Modal>)

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
        fontSize: 16,
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
        color: '#D3D3D3',
        alignSelf: 'center',
    },
    icon: {
        position: 'relative',
        top: 15,
        right: 30
    }, checkContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        alignSelf: 'flex-start',
        width: '100%',
    }, buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    }
})
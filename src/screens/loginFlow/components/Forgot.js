import React from 'react';
import { Text, View, StyleSheet, Modal, TextInput, Dimensions, TouchableWithoutFeedback } from 'react-native';
import {
    Container,
    Header,
    Body,
    Button,
    Right, Left
} from "native-base";
import { Colors } from '../../../styles';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

const Forgot = (props) => {
    return (
        <Modal transparent={true} animationType='slide' >
         
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                props.navigation.goBack();
                            }}>
                            <Ionicons name="close" size={30} style={Colors.gray} />
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <View style={forgotStyles.rootContainer}>
                    <Text style={forgotStyles.mainText}>Forgot your Password?</Text>
                    <Text style={forgotStyles.info}>Enter your email to receive a temporary connection link and create a new password.</Text>
                    <TextInput
                        placeholder="Email"
                        placeholderTextColor='#9b9b9b'
                        keyboardType={'email-address'}
                        style={forgotStyles.input}
                        returnKeyType={"next"}
                        onSubmitEditing={() => { this.secondTextInput.focus(); }}
                        blurOnSubmit={false}
                    />
                    <View style={forgotStyles.loginButton}>
                        <Button
                            transparent
                            onPress={() => {
                                
                                props.navigation.navigate('ForgotDone');
                            }}>
                            <View style={forgotStyles.buttonContainer}>
                                <Text style={{ color: 'white', fontSize: 20 }}>Send</Text>
                            </View>
                        </Button>

                    </View>
                </View>
            </Container>
        </Modal>
    )
}
export default Forgot;
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
        alignItems: 'center',

    },
    loginButton: {
        backgroundColor: 'pink',
        marginTop: 20
    }, input: {
        width: '100%',
        height: 50,
        padding: 10,
        borderWidth: 1.8,
        borderColor: '#D3D3D3',
        marginBottom: 20,
        paddingLeft: 15,
        color: '#D3D3D3',
        alignSelf: 'center',
        marginTop: 30



    },
})
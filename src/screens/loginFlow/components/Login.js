import React from 'react';
import {
  TouchableWithoutFeedback,
  ActivityIndicator,
  NativeModules,
  Platform,
  StyleSheet,
  Text,
  Modal,
  View,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
  AsyncStorage,
  Alert
} from 'react-native';
import ValidationComponent from 'react-native-form-validator';
import axios from 'axios';
import * as LeneovellisteConstants from '../../../utils/LenouvellisteConstants';
import { setUserInfo } from '../../../redux/actions';
import { connect } from 'react-redux';
import { Container, Header, Body, Right, Left, Content } from 'native-base';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Button, Input } from 'react-native-elements';

import { Form, Item, Label } from 'native-base';
import LogoTitle from 'library/components/logo';
import { Colors } from '../../../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//Dimensions
var deviceWidth = Dimensions.get('window').width;
var deviceHeight = Dimensions.get('window').height;

var buttonHeight = Platform.OS == 'android' ? 50 : 55;
var elementSpacing = Platform.OS == 'android' ? 12 : 19;

class Login extends ValidationComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      isPasswordSecured: true,
      userId: '',
      ActivityIndicator: false
    };
  }
  componentDidMount() {
    console.log('Login component mount')
    AsyncStorage.getItem("loggedInUserDetails").then((value) => {
      if (value != null) {
        var dicLoginData = JSON.parse(value);
        console.log('userInfo====>', dicLoginData)
        this.setState({
          userId: dicLoginData.id
        });
        if (this.state.userId != '') {
          // this.props.navigation.navigate('Home')
          this.props.navigation.navigate('UserProfile')

        } else {
        }
        console.log("Login right condition", this.state.userId)
      } else {
        console.log("Login else condition", this.state.userId)
      }
    }).done(
    );
  }
  handlEmail = text => {
    this.setState({
      email: text,
    });
  };
  handlePassword = text => {
    this.setState({
      password: text,
    });
  };
  login = () => {
    this.validate({
      email: { required: true },
    });

    if (this.getErrorMessages()) {
      alert(LeneovellisteConstants.kEmailEmpty);
    } else {
      this.validate({
        email: { email: true },
      });

      if (this.getErrorMessages()) {
        alert(LeneovellisteConstants.kEmailInvalid);
      } else {
        this.validate({
          password: { required: true },
        });

        if (this.getErrorMessages()) {
          alert(LeneovellisteConstants.kPasswordEmpty);
        } else {
          this.validate({
            password: { minlength: 5 },
          });

          if (this.getErrorMessages()) {
            alert(LeneovellisteConstants.kPasswordMinLength);
          } else {
            var loginParams = {
              username: this.state.email,
              password: this.state.password,
            };

            console.log(loginParams);

            this.loginAPICall(loginParams);
          }
        }
      }
    }
  };
  loginAPICall(params) {
    var user = {};
    axios
      .post(
        LeneovellisteConstants.BASE_URL + LeneovellisteConstants.kLOGIN_API,
        params,
      )
      .then(response => {
        console.log('Login Response', response.data);
        let msg = response.data.message;
        if (response.data.status == true) {
          user = response.data.user_detail;

          AsyncStorage.setItem('loggedInUserDetails', JSON.stringify(user));
          console.log('Login Success', user);
          this.props.setUserInfo(user);
          this.props.navigation.goBack();
          this.props.navigation.navigate('Menu', {
            userInfo: user,
          });
        } else {
          console.log('Login error', msg);
          alert(msg);
        }
      })
      .catch(function (error) {
        // console.log(error);
        alert(error);
        console.log('In case of undefined');
      });
  }
  render() {
    const iconpass = () => (
      <Icon
        style={styles.icon}
        name={
          this.state.isPasswordSecured
            ? 'visibility-off'
            : 'visibility'
        }
        size={25}
        color="#D3D3D3"
        onPress={() => {
          this.setState({
            isPasswordSecured: !this.state.isPasswordSecured,
          });
        }}
      />
    );
    return (
      <Container>
        <Header>
          <Left>
            <MaterialCommunityIcons name="arrow-left" size={25} style={Colors.gray} onPress={() => this.props.navigation.navigate('Home')} />
          </Left>
        </Header>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          
          {/* <Text style={styles.loginText}>Connectez-vous</Text> */}
          <View style={{ width: 300 }}>
            <View>
              <TextInput style={{
                height: 50, borderBottomColor: '#D8D8D8',
                borderBottomWidth: 1
              }}
                placeholder="E-mail, nom d'utilisateur"
                tintColor='#0082C6'
                placeholderTextColor='#9b9b9b'
                keyboardType={'email-address'}
                onChangeText={this.handlEmail}
                value={this.state.email}
                returnKeyType={'next'}
                onSubmitEditing={() => {
                  this.secondTextInput.focus();
                }}
                blurOnSubmit={false}
                autoCapitalize='none'
              />
              <TextInput style={{
                height: 50, borderBottomColor: '#D8D8D8',
                borderBottomWidth: 1,
              }}
                placeholder="Mot de passe"
                tintColor="#0082C6"
                renderRightAccessory={iconpass}
                ref={input => {
                  this.secondTextInput = input;
                }}
                secureTextEntry={this.state.isPasswordSecured}
                // secureTextEntry={true}
                placeholderTextColor="#9b9b9b"
                onChangeText={this.handlePassword}
                value={this.state.password}
              />

              <View style={{ marginTop: 30 }}>
                <Button style={{ marginTop: 40 }} title="Je me connecte" onPress={this.login} />
              </View>

              <View style={{ marginTop: 20 }}>
                <Button type="outline" title="S'inscrire" onPress={this.login} onPress={() => {
                  this.props.navigation.navigate('Register');
                }} />
              </View>

              <TouchableOpacity
                style={{
                  backgroundColor: 'transparent',
                  width: '100%',
                  marginTop: 30,
                }}
                onPress={() => {
                  console.log('>>>Forgot Pressed<<<');
                  this.props.navigation.navigate('Forgot');
                }}>

                <Text style={styles.forgot}> Mot de passe oublié ? </Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  user: state.user || 'Please Wait...',
});

const mapDispatchToProps = dispatch => {
  return {
    setUserInfo: info => {
      dispatch(setUserInfo(info));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 0,
    backgroundColor: '#fff',
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
    //height:deviceHeight+64
  },
  logo: {
    height: 80,
    width: 280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30
  },
  input: {
    width: deviceWidth - 70,
    height: 45,
    padding: 10,
    borderWidth: 1.8,
    borderColor: '#D3D3D3',
    marginBottom: 20,
    borderRadius: 5,
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
    backgroundColor: 'transparent',
  },

  forgot_password_test_style: {
    color: 'white',
    fontSize: 10.6,
    backgroundColor: 'transparent',
    //  left:(deviceWidth/2) +28,
    width: Platform.OS === 'ios' ? 125 : 165,
    height: 20,
  },
  loginText: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    // fontFamily: 'gotham-book',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgot: {
    color: 'black',
    fontSize: 13,
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontFamily: 'gotham-book',
  },
  noAcc: {
    color: 'grey',
    fontSize: 12,
    backgroundColor: 'transparent',
    padding: 0,
    textAlign: 'center',
    //  left:(deviceWidth/2) +28,
    //  width:Platform.OS === 'ios' ? 125 : 165,
    height: 20,
  },
});

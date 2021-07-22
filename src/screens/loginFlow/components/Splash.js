import React, {Component} from 'react';
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
  Alert,
} from 'react-native';
import {Container, Header, Body, Right, Left, Content} from 'native-base';
import AnimatedLoader from "react-native-animated-loader";

export default class Splash extends Component {
  constructor(props) {
    super(props);

    this.state = {
        visible: false

    };
  }
  
  componentDidMount(){

    this.setState({
        visible: !this.state.visible
      });

   console.log('Splash component mount')
    AsyncStorage.getItem("loggedInUserDetails").then((value) => {
      if (value != null) {
          var dicLoginData = JSON.parse(value);
          console.log('userInfo====>', dicLoginData)

          this.setState({
              userId:dicLoginData.id
          });
          
          this.setState({
            visible:false
          });

          if (this.state.userId != ''){
    
            this.props.navigation.navigate('Home')
          }else{
          this.props.navigation.navigate('Home')

          }
         console.log("Login right condition",this.state.userId)

      }else{

        this.setState({
            visible:false
          });
          this.props.navigation.navigate('Home')

          // this.props.navigation.navigate('Account') 
          //  this.props.navigation.navigate('Home')


          console.log("Login else condition",this.state.userId)

      }
  }).done(
  );


  }


  render() {

    const { visible } = this.state;
    return (
      <Container>
      <View style={{flex:1,marginTop:200, alignItems:'center'}}>
        <Image
          style={styles.logo}
          source={{
            uri: 'https://images.lenouvelliste.com/app/logo.png',
         }}
        />
                <AnimatedLoader
        visible={visible}
        overlayColor="rgba(255,255,255,0.75)"
        source={require("../../../utils/loader.json")}
        animationStyle={styles.lottie}
        speed={1}
      />

      </View>
      </Container>
    );
  }
}


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
    height:80,
    width:280,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:30
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
  lottie: {
    width: 100,
    height: 100
  }
});

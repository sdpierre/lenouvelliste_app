import React from 'react';
import { View, Modal, Text, StyleSheet, TouchableWithoutFeedback, Dimensions } from 'react-native';
import {
    Container,
    Header,
    Body,
    Button,
    Content,
    Right, Left
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Colors } from '../../../styles';


//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);
export default class RegisterDone extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            userName:''
        }
    }

    componentDidMount(){

        const { navigation } = this.props;
        const strUserName = navigation.getParam('username', ''); 
        console.log(strUserName) 
        this.setState({
            userName:strUserName
        })
     }


    render() {
        return (
      
              
                <Container>
                    <Header style={{ backgroundColor: 'white', }}>
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
                        </Right>
                    </Header>
                    <Content>
                        <View style={doneRegStyles.rootContainer}>
                            <Text style={doneRegStyles.welcomeText}>Welcome</Text>
                            <Text style={doneRegStyles.welcomeText}>{this.state.userName}</Text>
                            <Text style={doneRegStyles.email}>A confirmation email has been sent to you.</Text>
                            <View style={{ backgroundColor: 'red', marginTop:30 }}>
                                    <Button
                                        transparent
                                        onPress={() => {
                                            this.props.navigation.goBack();
                                            this.props.navigation.navigate('Menu');
                                        }}>
                                        <View style={doneRegStyles.buttonContainer}>
                                            <Text style={{ color: 'white', fontSize: 20 }}>Explore Lenouvelliste</Text>
                                        </View>
                                    </Button>
                                </View>
                        </View>
                        
                    </Content>
                </Container>
 
        )
    }
}

const doneRegStyles=StyleSheet.create({
    rootContainer:
    {
        flex:1,
        padding:40,
        justifyContent:'center',
        alignContent:'center',
    },
    welcomeText:{
        fontSize:30,
        fontWeight:'bold',
    },
    email :{
        fontSize:20,
        color:'#D3D3D3',
        marginTop:20,
    }, buttonContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
})
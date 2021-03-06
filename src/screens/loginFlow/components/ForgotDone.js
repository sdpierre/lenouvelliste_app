import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import {
    Container,
    Header,
    Body,
    Button,
    Right, Left
} from "native-base";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../styles';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

export default class ForgotDone extends React.Component{
    render(){
        return (
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                this.props.navigation.goBack();
                            }}>
                            <Ionicons name="close" size={30} style={Colors.gray} />
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'crimson' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Forgot Done Screen</Text>
                </View>
            </Container> 

    )

    }
}

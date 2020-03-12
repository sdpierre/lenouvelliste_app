import React, { Component } from 'react';
import { Text, Modal } from 'react-native';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Right, Left,
    Button
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";


export default class SettingsScreen extends Component {
    constructor(props) {
        super(props)



    }

    render() {
        return (
            <Modal animationType='slide'>
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                            <Ionicons name="ios-arrow-back" size={30} style={Colors.white} />
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <Text>Settings Screen</Text>
            </Container>
            </Modal>
        )
    }
}
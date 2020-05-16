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
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";

export default class AccountScreen extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => { this.props.navigation.goBack(null); }}>
                                <MaterialCommunityIcons name="close" size={30} style={Colors.gray} />
                            </Button>
                        </Left>
                        <Body></Body>
                        <Right></Right>
                    </Header>
                    <Text>Account Screen</Text>
                </Container>
        )
    }
}
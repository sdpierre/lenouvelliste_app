import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    FlatList,
    Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";


import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Right, Button
} from "native-base";

let items = [
    {
        name: 'Culture',
        idSection: 5
    },
    {
        name: 'Economie',
        idSection: 3
    }, {
        name: 'National',
        idSection: 4
    }, {
        name: 'société',
        idSection: 6
    }, {
        name: 'sport',
        idSection: 9
    },
]

export default class MenuScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Menu",
            menuData: items
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Body>
                        <Title>{this.state.title}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Account') }}>
                            <Ionicons name="account-outline" size={25} style={Colors.white} />
                        </Button>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Settings') }}>
                            <Ionicons name="settings-outline" size={25} style={Colors.white} />
                        </Button>
                    </Right>
                </Header>
                <View style={menuStyle.container}>
                    <FlatList data={items}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <Text style={menuStyle.itemStyle} onPress={() => {
                                {
                                    this.props.navigation.navigate("Section",
                                        {
                                            idsection: items[index].idSection,
                                            name: items[index].name,
                                        })
                                }
                            }
                            }>
                                {items[index].name}
                            </Text>
                        }} />
                </View>
            </Container>
        )
    }

}

const menuStyle = StyleSheet.create({
    container:
    {
        flex: 1,
        justifyContent: 'center',
        padding: 20,

    },
    itemStyle: {
        textTransform: 'capitalize',
        fontFamily: 'Georgia',
        fontWeight: 'bold',
        fontSize: 22,
        color: 'black',
        marginVertical: 7,
    }
})


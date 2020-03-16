import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    FlatList,
    Text,
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";

import { getSectionAll } from '../../../library/networking/Api'
import LogoTitle from 'library/components/logo';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Right, Button, Left
} from "native-base";
import { ScrollView } from 'react-native-gesture-handler';

export default class MenuScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            title: "Menu",
            data: [],
        }
        this.fetchNews = this.fetchNews.bind(this);
    }

    componentDidMount() {
        this.fetchNews();
      }
    
      fetchNews() {
        getSectionAll()
          .then(data => this.setState({ data, refreshing: false }))
          .catch(() => this.setState({ refreshing: false }));
      }

    render() {
        return (
            <Container>
                <Header>
                    <Left>

                    </Left>
                    <Body>
                    <LogoTitle />
                    </Body>
                    <Right>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Account') }}>
                            <FontAwesome name='user-circle-o' size={25} style={Colors.gray} />
                        </Button>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Settings') }}>
                            <AntDesign name='setting' size={25} style={Colors.gray} />
                        </Button>
                    </Right>
                </Header>
            
             <Container style={styles.menuContainer}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return <Text style={styles.title} onPress={() => {
                                {
                                    this.props.navigation.navigate("Section",
                                        {
                                            idsection: item.idSection,
                                            name: item.name,
                                        })
                                }
                            }
                            }>
                                {item.name}
                            </Text>
                        }} />
                </Container>
                
            </Container>
        )
    }

}

const styles = StyleSheet.create({
    menuContainer: {
      paddingTop: 10,
      marginLeft: 10,
      marginRight: 10,
      marginBottom: 90
    },
    title: {
      marginTop: 10,
      fontSize: 28,
      color: "#5B6475",
      textTransform: "uppercase",
      marginBottom: 20,
      fontFamily: "AkkoPro-BoldCondensed"
    }
});

import React, { Component } from 'react';
import { Text, View } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, List} from 'native-base';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";


export default class HelloWorldApp extends Component {
  render() {
    return (
      <Container>
    <Header>
          <Left>
            <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
              <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
            </Button>
          </Left>
          <Body></Body>
          <Right></Right>
        </Header>
        <Content>
      <View style={Spacing.container}>
        <Text>Hello, world Stanley in Profile Screen!</Text>
      </View>
      </Content>
      </Container>
    );
  }
}

import React, { Component } from 'react';
import { Text, Modal, StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Right, Left,
  Button, List, ListItem
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";


export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Réglages',
  }
  }

  render() {
    return (
  
        <Container>
          <Header>
            <Left>
              <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                  <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
              </Button>
            </Left>
            <Body><Title> {this.state.title}</Title></Body>
            <Right></Right>
          </Header>
          <Content>
            <List>

              <ListItem itemDivider>
                <Text style={styles.SectionTitle}>général</Text>
              </ListItem>
              <ListItem>
                <Text>Alertes info</Text>
              </ListItem>
              <ListItem itemDivider>
                <Text style={styles.SectionTitle}>à propos</Text>
              </ListItem>
              <ListItem>
                <Text>Noter l'application</Text>
              </ListItem>
              <ListItem>
                <Text>Nous contacter</Text>
              </ListItem>
              <ListItem>
                <Text>Mentions légales</Text>
              </ListItem>
              <ListItem>
                <Text>Conditions générales d'utilisation</Text>
              </ListItem>
              <ListItem>
                <Text>Politique de confidentialité</Text>
              </ListItem>
              <ListItem>
                <Text>Version</Text>
              </ListItem>
            </List>
          </Content>
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
  SectionTitle: {
    marginTop: 10,
    color: "#5B6475",
    textTransform: "uppercase",
  }
});
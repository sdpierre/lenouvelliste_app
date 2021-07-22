import React, { Component } from 'react';
import { Text, Modal, StyleSheet, AsyncStorage, ScrollView ,SafeAreaView} from 'react-native';
import {
  Container,
  Header,
  Body,
  Title,
  Content,
  Right, Left,
  Button, List, ListItem,
  Switch,
  View,
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import OneSignal from 'react-native-onesignal';

export default class SettingsScreen extends Component {
  constructor(props) {
    super();
    this.state = {
      title: 'Réglages',
      isEnabled: '',
    }
  }
  valueStatus = (isEnabled) => {
    this.setState({ isEnabled })
    OneSignal.setSubscription(!this.state.isEnabled),
      console.log(!this.state.isEnabled);
    AsyncStorage.setItem('notificationAllow', !this.state.isEnabled + "");
  }
  componentDidMount() {
    AsyncStorage.getItem("notificationAllow").then((value) => {
      if (value === null) {
        this.setState({
          isEnabled: true,
        })
        AsyncStorage.setItem('notificationAllow', 'true');
        OneSignal.setSubscription(true)
      } else if (value === 'true') {
        this.setState({
          isEnabled: true,
        })
        OneSignal.setSubscription(true)
      } else {
        this.setState({
          isEnabled: false,
        })
        OneSignal.setSubscription(false)
      }
    }).done(
    );

  }
  render() {
    return (
      <Container>
        <SafeAreaView>
        <Header>
          <Left>
            <Button transparent onPress={() => { this.props.navigation.goBack() }}>
              <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
            </Button>
          </Left>
          <Body><Title> {this.state.title}</Title></Body>
          <Right></Right>
        </Header>
        <ScrollView>
          <List>
            <ListItem itemDivider>
              <Text style={styles.SectionTitle}>général</Text>
            </ListItem>
            <ListItem >
              <Text>Alertes info</Text>
            </ListItem>
            <ListItem >
              <Text style={{ flex: 1 }}>Autoriser la notification</Text>
              <Switch
                ios_backgroundColor="#3e3e3e"
                onValueChange={this.valueStatus}
                value={this.state.isEnabled}
              />
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
        </ScrollView>
        {/* <Content>
        </Content> */}
        </SafeAreaView>
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
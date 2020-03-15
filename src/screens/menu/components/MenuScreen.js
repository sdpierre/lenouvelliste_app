import React from 'react';
import { Text, View, StyleSheet, ScrollView } from "react-native";
import {setAppInfo} from '../../../redux/actions';
import {connect} from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";

import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';

class MenuScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        title : "Menu",
    }

  } 

  render() {
    const {title} = this.state;
    return (
        <Container>
        <Header>
          <Left></Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right>
           <Button transparent>
                <FontAwesome name='user-circle-o' size={25} style={Colors.gray} />
                </Button>
  
            <Button transparent onPress={()=>{this.props.navigation.navigate('Setting')}}>
              <AntDesign name='setting' size={25} style={Colors.gray} />
            </Button>
          </Right>
        </Header>
        <Content>
        <ScrollView style={styles.menuContainer}>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "5",
                      name: "CULTURE",
                    })}}> culture </Text>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "3",
                      name: "ECONOMIE",
                    })}}> Economie </Text>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "15",
                      name: "EDITORIAL",
                    })}}> éditorial </Text>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "18",
                      name: "IDEES ET OPINIONS",
                    })}}> idées et opinions </Text>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "4",
                      name: "NATIONAL",
                    })}}> national </Text>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "6",
                      name: "SOCIETE",
                    })}}> société </Text>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "9",
                      name: "SPORT",
                    })}}> sport </Text>
          <Text style={styles.title} onPress={()=>{this.props.navigation.navigate("Section", {
                      idsection: "19",
                      name: "TICKET",
                    })}}> ticket </Text>
          {/* <Text style={styles.title}> santé </Text>
          <Text style={styles.title}> vidéos </Text>
          <Text style={styles.title}> photos </Text> */}
        </ScrollView>
        </Content>
      </Container>
    );
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

const mapStateToProps = (state) => ({
    user: state.user || "Please Wait...",
});

const mapDispatchToProps = (dispatch) => {
    return {
        setUserInfo: (info) => {
            dispatch(setUserInfo(info))
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuScreen);
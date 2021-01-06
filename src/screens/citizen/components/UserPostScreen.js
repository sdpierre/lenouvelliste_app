import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import Ionicons from "react-native-vector-icons/Ionicons";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, List} from 'native-base';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import { ScrollView } from 'react-native-gesture-handler';
import {connect} from 'react-redux';
import {setAppInfo} from '../../../redux/actions';

class UserPostScreen extends React.Component {
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Ionicons
                name="ios-arrow-back"
                size={30}
                style={Colors.gray}
              />
            </Button>
          </Left>
          <Body>
            <Title>Newspaw</Title>
          </Body>
          <Right />
        </Header>
        <View style={styles.CitizennewsUserPostMainContainer}>
          {/* User profil info */}
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View />
          </View>
        </View>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  CitizennewsUserPostMainContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#191D25",
    flex: 1,
  },
  CitizennewsStyleContainer: {
    backgroundColor: "#191D25",
    borderRadius: 5,
    borderWidth: 0,
    marginBottom: 10,
    marginTop: 10,
    overflow: "hidden"
  },
  CitizennewsContentStyleContainer: {
    backgroundColor: "#191D25",
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 20,
    paddingBottom: 20
  },
  CitizennewsCategoryStyle: {
    fontSize: 13,
    textTransform: "uppercase",
    fontFamily: "AkkoPro-BoldCondensed",
    color: "#FFCD00",
    marginBottom: 5
  },
  CitizennewsTitleStyle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontFamily: "Georgia",
    marginBottom: 5
  },
  CitizennewsUsernameStyle: {
    fontSize: 12,
    color: "#FFCD00",
    marginBottom: 5,
    fontFamily: "Gotham-book"
  },
  CitizennewsMomentStyle: {
    fontSize: 11,
    color: "#FFFFFF",
    fontFamily: "Gotham-book",
  },
  Citizen: {
    fontSize: 14,
    textTransform: "uppercase",
    color: "#0089D0"
  },
  ClaminuteTitre: {
    fontSize: 16,
    width: 350,
    marginBottom: 10,
    marginTop: 5,
    color: "#282929"
  }
});

const mapStateToProps = (state) => ({
  appInfo: state.appInfo || "Please Wait...",
});

const mapDispatchToProps = (dispatch) => {
  return {
      setAppInfo: (info) => {
          dispatch(setAppInfo(info))
      }
  }
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPostScreen);
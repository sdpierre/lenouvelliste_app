import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import {setAppInfo} from '../../redux/actions';
import {connect} from 'react-redux';
import { Container, Header, Left, Body, Right, Content,Button, Icon, Title } from 'native-base';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

class SelectionScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        title : "Selection"
    }
  }  

  render() {
    const {title} = this.state;
    return (
        <Container>
        <Header>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>
        <Content>
          <View style={styles.MainContainer}>
          <Text>
            <Ionicons name="bookmark" size={40} color="#ccc" />
          </Text>
          <Text style={styles.Title}> No favoris </Text>
          <Text style={styles.Text}>
            You can save your favorite items in this space. Tap the favorite icon
            and they'll be added to your playlist.
          </Text>
        </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 200
  },
  Title: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 18,
    color: "#5B6475",
    textTransform: "uppercase",
    marginBottom: 10,
    fontFamily: "AkkoPro-BoldCondensed"
  },
  Text: {
    fontSize: 14,
    width: 250,
    fontFamily: "Gotham-book",
    textAlign: "center"
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
)(SelectionScreen);

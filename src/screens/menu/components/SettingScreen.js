import React from 'react';
import { Text, View, Modal, TouchableHighlight,TouchableOpacity } from 'react-native';

import {setAppInfo} from '../../../redux/actions';
import {connect} from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, List} from 'native-base';
class SettingScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        title : "Setting"
    }

  } 


  render() {
    const {title} = this.state;
    return (
        <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
              <AntDesign name="arrowleft" size={30} />
            </Button>
          </Left>
          <Body>
            <Title>{title}</Title>
          </Body>
          <Right></Right>
        </Header>
        <Content>
          <List>

            <ListItem itemDivider>
              <Text>GENERAL</Text>
            </ListItem>                    
            <ListItem>
              <Text>Alert info</Text>
            </ListItem>
            <ListItem>
              <Text>Ali Connors</Text>
            </ListItem>
            <ListItem itemDivider>
              <Text>B</Text>
            </ListItem>  
            <ListItem>
              <Text>Bradley Horowitz</Text>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}


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
)(SettingScreen);
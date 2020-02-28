import React from 'react';
import { Text, View, Modal, TouchableHighlight,TouchableOpacity } from 'react-native';

import {setAppInfo} from '../../../redux/actions';
import {connect} from 'react-redux';
import moment from "moment";
import "moment/min/locales";
import HTMLView from 'react-native-htmlview';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FitImage from 'react-native-fit-image';

import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, List} from 'native-base';
class NewsScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      title: this.props.navigation.getParam('title'),
      body: this.props.navigation.getParam('body'),
      date: this.props.navigation.getParam('date'),
      category: this.props.navigation.getParam('category'),
      headline: this.props.navigation.getParam('headline'),
      author: this.props.navigation.getParam('author'),
      photo: this.props.navigation.getParam('photo'),
    }

  } 

  render() {
    const { title } = this.state;
    const { body } = this.state;
    const { date } = this.state;
    const { category } = this.state;
    const { headline } = this.state;
    const { author } = this.state;
    const { photo } = this.state;
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';

    return (
        <Container>
        <Header>
          <Left>
            <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
              <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
            </Button>
          </Left>
        </Header>
        <Content>

        <FitImage
  source={{ uri: photo || nophoto }}
  style={Spacing.fitImage}
/>
          <View style={Spacing.container}> 
          


           <Text style={Typography.headline}>{category}</Text>
           <Text style={Typography.xlargeTitle}>{title}</Text>

           <Text style={styles.headline}>{headline}</Text>

           <Text style={Typography.mediumTitle}>Par {author}</Text>

           <Text style={Typography.subHead}>Publié le
                      {(time = moment(date || moment.now()).fromNow())}</Text>

                      <HTMLView
              value={"<div>"+body+"</div>"}	
              addLineBreaks={false}				
              stylesheet={Typography.body}
          />
        </View>
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
)(NewsScreen);

const styles = StyleSheet.create({
  headline: {
    ...Typography.mediumTitle,
    fontStyle: 'italic',
  },
});
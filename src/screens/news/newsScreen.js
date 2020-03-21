
import React from 'react';
import { StyleSheet, Text, View, Modal, TouchableHighlight, TouchableOpacity } from 'react-native';

import { setAppInfo } from '../../redux/actions';
import { connect } from 'react-redux';
import moment from "moment";
import "moment/min/locales";
import HTMLView from 'react-native-htmlview';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import FitImage from 'react-native-fit-image';
import Share from "library/components/Share";

import { Typography, Colors, Buttons, Spacing } from "../../styles";
import { Container, Header, Left, Body, Right, Button, Icon, Title, Content, ListItem, List } from 'native-base';
import IoniconsMaterial from "react-native-vector-icons/MaterialCommunityIcons";
//realm
let realm;
class NewsScreen extends React.Component {

  constructor(props) {
    super(props);
    realm = new Realm({ path: 'BookmarkDb.realm' });

    this.state = {
      title: this.props.navigation.getParam('title'),
      body: this.props.navigation.getParam('body'),
      date: this.props.navigation.getParam('date'),
      surTitle: this.props.navigation.getParam('surTitle'),
      headline: this.props.navigation.getParam('headline'),
      author: this.props.navigation.getParam('author'),
      photo: this.props.navigation.getParam('photo'),
      url: this.props.navigation.getParam('url'),
      booked: this.props.navigation.getParam('booked'),
      id: this.props.navigation.getParam('id'),
      nophoto:'https://images.lenouvelliste.com/noimageandroid.jpg'
    }

  }

  render() {

    const { title } = this.state;
    const { url } = this.state;
    const { body } = this.state;
    const { date } = this.state;
    const { surTitle } = this.state;
    const { headline } = this.state;
    const { author } = this.state;
    const { photo } = this.state;
    let { booked } = this.state;
    const { id } = this.state;
    console.log('NewsAlreadyBooked>> ', booked);
    var obj = realm
    .objects('book_news')
    .filtered('id =' + id);
    booked=obj.length>0;
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';
    // const { navigation } = this.props;
    // const title = navigation.getParam('title');

    return (
      <Container>
        <Header>
          <Left>
            <Button transparent onPress={() => { this.props.navigation.goBack() }}>
              <Ionicons name="ios-arrow-back" size={30} style={Colors.gray} />
            </Button>
          </Left>
          <Right>
            <View style={{ paddingHorizontal: 20 }}>
              <TouchableOpacity onPress={() => { console.log('>>>ViewClicked<<<'); this.onBookmarkClicked(id) }}>
                <IoniconsMaterial name={booked ? 'bookmark' : "bookmark-outline"} size={30} color={booked ? 'red' : "#454f63"} />
              </TouchableOpacity>
            </View>
            <Share titre={title} url={url} />
          </Right>
        </Header>
        <Content>

          <FitImage
            source={{ uri: photo || nophoto }}
            style={Spacing.fitImage}
          />
          <View style={Spacing.container}>

            <Text style={Typography.headline}>{surTitle}</Text>
            <Text style={Typography.xlargeTitle}>{title}</Text>

            <Text style={styles.headline}>{headline}</Text>

            <Text style={styles.author}>Par {author}</Text>

            <Text style={Typography.subHead}>{( moment(date || moment.now()).fromNow())}</Text>

            <HTMLView
              value={"<div>" + body + "</div>"}
              addLineBreaks={false}
              stylesheet={Typography.body}
            />
          </View>
        </Content>
      </Container>
    );
  }

  onBookmarkClicked = (id) => {
    var obj = realm
    .objects('book_news')
    .filtered('id =' + id);
    realm.write(() => {
      //realm.deleteAll();

     

      if (obj.length > 0) {
        /*if(this.state.isSelection){
          alert('You can remove article from Home Tab by pressing on Bookmark icon.')
        }  else{*/
        realm.delete(
          realm.objects('book_news').filtered('id =' + id)
        );
        if (this.state.isSelection) {

        } else {

          this.setState({
            booked: false
          });
        }
        // }

      } else {
        let art={
          titre:this.state.title,
          headline:this.state.headline,
          date:this.state.date,
          photo:this.state.photo,
          surtitre:this.state.surTitle,
          nophoto:this.state.nophoto,
          rubrique:'',
          article:this.state.body,
          author:this.state.author,
          id:this.state.id,
          url:this.state.url,
        }
        realm.create('book_news', art);
        this.setState({
          booked: true
        });

      }

    });
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
  author: {
    ...Typography.mediumTitle,
    fontWeight: 'bold',
  },
});
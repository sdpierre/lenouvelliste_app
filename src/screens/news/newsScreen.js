
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
import Octicons from "react-native-vector-icons/Octicons";
import FitImage from 'react-native-fit-image';
import Share from "library/components/Share";
import { Button } from 'react-native-elements'



import { Typography, Colors, Buttons, Spacing } from "../../styles";
import { Container, Header, Left, Body, Right, Icon, Title, Content, ListItem, List } from 'native-base';
import IoniconsMaterial from "react-native-vector-icons/MaterialCommunityIcons";

import Realm from 'realm';

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
      // premium: this.props.navigation.getParam('premium'),
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
    const { premium } = this.state;
    //console.log('NewsAlreadyBooked>> ', booked);
    var obj = realm
    .objects('book_news')
    .filtered('id =' + id);
    booked=obj.length>0;
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';
    // const { navigation } = this.props;
    // const title = navigation.getParam('title');
    console.log('Photo',this.state.photo)
    console.log('Photo',this.state.nophoto)

    if (photo == null){
      this.state.photo = ""
    }

    console.log('Photo',this.state.photo)

    return (
      <Container>
        <Header>
          <Left>
            
            <MaterialCommunityIcons name="arrow-left" size={25} style={Colors.gray} onPress={() => { this.props.navigation.goBack() }} />
         
          </Left>

          <Right>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}> 

              {/* <View style={{marginRight: 20}}>
              <Octicons name="text-size" size={25} style={Colors.gray} />
              </View> */}

              <View style={{ marginRight: 20}}>
              <TouchableOpacity onPress={() => { 
                // console.log('>>>ViewClicked<<<'); 
                this.onBookmarkClicked(id) }}>
                <MaterialCommunityIcons name={booked ? 'bookmark' : "bookmark-outline"} size={25} color={booked ? 'red' : "#808080"} />
              </TouchableOpacity>
              </View>

              <View style={{marginRight: 5}}>
              <Share titre={title} url={url} />
              </View>
            
              </View>
          </Right>
        </Header>
        <Content>

          <FitImage
            source={{ uri: photo || nophoto }}
            style={Spacing.fitImage}
          />
          <View style={styles.container}>

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
            {this.renderConditionalAbonne(premium)}
            
          </View>
        </Content>
      </Container>
    );
  }

  renderConditionalAbonne(premium) {
    //console.log(premium);
  if(premium === 'FALSE') {
   return ; 
  }else {
   return (
     <View
       style={{
         borderTopColor: '#0089D0',
         borderTopWidth: 5,
         backgroundColor: '#F3F5F8',
         justifyContent: 'center',
         flex: 1,
         padding: 30,
         marginTop:30
       }}>
       <Text style={styles.titre_premium}> La suite de cet article est reservée aux abonnés</Text>

       <Text style={styles.caption_premium}> Gratuit pour l'instant </Text>
       <Text style={styles.prix_premium}> 0.00 </Text>
       <Text style={styles.caption_premium}> sans engagement </Text>

       <Button
          title="J'en profite"
          buttonStyle={styles.button_premium}
        />

       <Text style={styles.login_premium} onPress={() =>{this.props.navigation.navigate('login')}}> Déjà abonné </Text>
       <View style={{borderTopColor: '#C0C0C0',
         borderTopWidth: 1, marginTop:20}}></View>
       <Text style={styles.inclus_premium}> inclus dans l'abonnement </Text>
       <Text style={styles.desc_premium}> Tous les articles en illimite sur le web </Text>
     </View>
   ); 
  }
  
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
  container: {
    ...Spacing.container,
    backgroundColor: '#FFF',
  },
  author: {
    ...Typography.mediumTitle,
    fontWeight: 'bold',
  },
  titre_premium: { 
    fontSize: 20,
    fontFamily: "AkkoPro-BoldCondensed",
    color:'#000',
    textAlign:'center',
    marginBottom:30
  },
  caption_premium: {
    textTransform: 'uppercase',
    color:'#C0C0C0',
    fontSize: 10,
    textAlign:'center',
    fontFamily: 'Gotham-book',
  },
  prix_premium: {
    fontSize: 90,
    fontFamily: "AkkoPro-Condensed",
    color:'#000',
    height:90,
    textAlign:'center',
  },
  button_premium: {
    marginTop:30
  },
  login_premium: {
    fontSize:14,
    textAlign:'center',
    marginTop:20
    
  },
  inclus_premium: {
    fontSize:16,
    fontFamily: "AkkoPro-Condensed",
    textTransform: 'uppercase',
    borderTopColor: '#0089D0',
    borderTopWidth: 5,
    marginBottom:10,
    marginTop:10


  },
  desc_premium: {
    fontFamily: 'Gotham-book',
    fontSize:12,
    textAlign: 'left'
  }

});
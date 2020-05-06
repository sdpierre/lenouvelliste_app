import React from "react";

import { withNavigation, withNavigationFocus  } from "react-navigation";

import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { Typography, Colors, Buttons, Spacing, Margins } from "../../../styles";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Article from "library/components/Article";
import CitizenFloatingAction from '../../citizen/components/CitizenFloatingAction';

import {
  Container,
  Header,
  Body,
  Title,
  Content
} from "native-base";


//Realm
import Realm from 'realm';
let realm;
//Data To Show
let dataRender=[];
//var bookmarkData=[] ;


class SelectionScreen extends React.Component {
  constructor(props) {
    super(props);
    
    realm = new Realm({ path: 'BookmarkDb.realm' });

    dataRender=realm.objects('book_news');

    //console.log('SelectionSize>>', bookmarkData.length);
    this.state = {
      title : "Favoris",
      bookmarkData:dataRender
  }
  
  }

  changeListener(articles, changes) {
    if(articles.length>0){
      this.setState({
        bookmarkData:articles
    })
    }else{
      this.setState({
        bookmarkData:[]
      })
    }
    
}    

  // Called after a component is mounted
  componentDidMount() {
    dataRender.addListener(this.changeListener.bind(this));    

  }

  render() {
    const { title } = this.state;
    const { navigate } = this.props.navigation;
    const data= this.state.bookmarkData.length>0;
    
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';

    if(data){
      return (
        <Container style={Colors.grayBackground}>
<Header>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>

<View style={styles.MainContainer}>
   <FlatList
    data={this.state.bookmarkData}
    //renderItem={({ item }) =><Text>{item.titre}</Text>}
    keyExtractor={(item, index) => index.toString()}
    renderItem={({ item, index }) => {
      return <React.Fragment> 
<Article article={item} navigate={navigate} isBookmarked={true} isSelection={true}/> 
</React.Fragment>
}
    }
  />
</View>
<CitizenFloatingAction/>
</Container>
        );
    }else{
      return(
<Container>
<Header>
  <Body>
    <Title>{this.state.title}</Title>
  </Body>
</Header>

  <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
  <Text>
    <Ionicons name="bookmark" size={50} color="#ccc" />
  </Text>
  <Text style={styles.Title}> Votre liste est vide </Text>
  <Text style={styles.Text}>
    Retrouvez ici votre liste d'articles favoris à lire ou à relire plus tard.
    Apuuyez sur l'icône de mise en favoris pour ajouter un article.
  </Text>
</View>

<CitizenFloatingAction/>
</Container>
      );
    } 
  }
}
const styles = StyleSheet.create({
  button: {
    ...Buttons.smallRounded
  },
  MainContainer: {
    ...Colors.grayBackground,
    marginBottom:80,
  },
  container: {
    ...Colors.background,
    ...Spacing.container,
    ...Colors.whiteBackground
  },
  sectionTitle : {
    textTransform: 'uppercase',
    fontFamily: "AkkoPro-BoldCondensed",
    paddingLeft: 18,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 16,
    letterSpacing: 0.64,
    color: '#2E2E2D'
  },
  MainContainerNoData: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    marginTop: 200
  },
  Title: {
    marginTop: 10,
    fontWeight: "bold",
    fontSize: 20,
    color: "#000",
    marginBottom: 10,
    fontFamily: 'Georgia',
  },
  Text: {
    fontSize: 14,
    width: 250,
    fontFamily: "Gotham-book",
    textAlign: "center",
    lineHeight:17,
    color:'#808080'
  }
});


export default withNavigationFocus(SelectionScreen);
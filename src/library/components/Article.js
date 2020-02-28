<script src="http://localhost:8097"></script>
import React from 'react';
import { View, Linking, TouchableHighlight, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import moment from "moment";
import 'moment/min/locales';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { Row } from 'native-base';
import {setAppInfo, setUserInfo} from '../../redux/actions';
import {connect} from 'react-redux';
import Bookmark from "library/components/Bookmark";
import Share from "library/components/Share";
import ImageLoad from 'react-native-image-placeholder';
import Nophoto from "library/components/nophoto";

class Article extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
    }
    
  } 
 
  render() {
    
    const {
      titre,
      headline,
      date,
      photo,
      surtitre,
      nophoto,
      rubrique,
      article,
      author,
      id,
      url
    } = this.props.article;

    const time = moment(date || moment.now()).fromNow();
    moment.locale('fr');

    const { navigate } = this.props;

    return (
      <View>

      <TouchableHighlight
                  onPress={() =>
                    navigate("News", {
                      surTitle: surtitre,
                      title: titre,
                      headline : headline,
                      body: article,
                      photo: photo,
                      date: date,
                      author : author,

                    })
                  }
                >
                <View style={styles.container}>
                  <View style={styles.articleContainer}>
                    <View>
                      <Text style={styles.articleSurtitle}>{surtitre}</Text>
                      <Text style={styles.articleTitle}>{titre}</Text>                
        
                      <View style={{flex: 1, flexDirection: 'row'}}>
                        <View style={{width: 150}}> 
                        <Text style={styles.articleTag}>{rubrique}    {time}</Text>
                        </View>

                        <View style={{marginRight: 10}}>
                    
                        <TouchableOpacity>
                        <Text style={{}}>
                          <Ionicons name="bookmark-outline" size={20} color="#454f63" />
                        </Text>
                      </TouchableOpacity>
                      
                      </View>

                      <View>
                      <Share titre={titre} url={url}/>
                      </View>
                     
                      </View>
                      
                    </View>

                    <View style={styles.articleImage}>
                    
                    {/* <Image
                        source={{
                          uri: photo || nophoto
                      }}
                        style={{width: 80, height: 80 }}
                      /> */}

                    <ImageLoad
                        style={{ width: 80, height: 80 }}
                        placeholderSource={require('../../../src/res/images/noimage.jpg')}
                        loadingStyle={{ size: 'large', color: 'blue' }}
                        source={{ uri: photo }}
                    />

                    </View>
                  </View></View>
                </TouchableHighlight>
          </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state
}
export default connect(mapStateToProps)(Article)

const styles = StyleSheet.create({
  // paste the styles from App.js here
  MainContainer: {
    backgroundColor: '#F6F6F6'
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
  sectionTitleWhite : {
    textTransform: 'uppercase',
    fontFamily: "AkkoPro-BoldCondensed",
    paddingLeft: 18,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 16,
    letterSpacing: 0.64,
    color: '#FFFFFF'
  },
  carouselContainer: {
    width: 500,
    height: 550,
    backgroundColor: '#F7F7F7'
  },

  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  articleContainer: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    flexDirection: 'row',
    backgroundColor: '#FFF',
    marginBottom: 5,
  },
  articleTitle: {
    fontSize: 16,
    width: 230,
    fontFamily: 'Georgia',
    marginBottom: 7,
    lineHeight: 21,
  },
  articleTitleMostread: {
    fontSize: 16,
    width: 90,
    fontFamily: 'Georgia',
    marginBottom: 2,
  },
  articleTag: {
    fontSize: 10,
    width: 200,
    fontFamily: 'Gotham-book',
  },
  articleBody: {
    fontSize: 30,
  },
  articleSurtitle: {
    fontSize: 14,
    width: 200,
    textTransform: 'uppercase',
    fontFamily: "AkkoPro-BoldCondensed",
    letterSpacing: 1.02,
    fontWeight: 'bold',
    color: '#0089d0',
    paddingBottom: 5,
  },
  articleImage: {
    paddingLeft: 30,
    paddingTop: 20,
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // height: Dimensions.get('window').height,
    // width: Dimensions.get('window').width
  },
  capture: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: '#FFF',
    marginBottom: 15,
  },
  cancel: {
    position: 'absolute',
    right: 20,
    top: 20,
    backgroundColor: 'transparent',
    color: '#FFF',
    fontWeight: '600',
    fontSize: 17,
  }
});
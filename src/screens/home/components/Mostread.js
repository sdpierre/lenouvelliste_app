import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity, Dimensions, 
} from "react-native";


import { Typography, Colors, Buttons, Spacing, Margins } from "../../../styles";

import { getMostRead } from "library/networking/Api";
import moment from "moment";
import "moment/min/locales";
import { setAppInfo, setUserInfo } from "../../../redux/actions";
import { connect } from "react-redux";
import Article from "library/components/Article";
import LogoTitle from "library/components/logo";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

class Mostread extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      data: [],
      refreshing: true
    };
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
    this.handleRefresh();
    
  }

  fetchNews() {
    getMostRead()
      .then(data => this.setState({ data, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }
  

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchNews()
    );
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
      url,
    
    } = this.props.mostread;
    
    const { navigate } = this.props;

    return (
      <FlatList
      data={this.state.data}
      //renderItem={({ item }) => <Text>{item.titre}</Text>}
    
              renderItem={({ item }) => (

                <TouchableHighlight
                  onPress={() =>
                    navigate("News", {
                      surTitle: item.surtitre,
                      title: item.titre,
                      headline : item.headline,
                      body: item.article,
                      photo: item.photo,
                      date: item.date,
                      author : item.author,
                      url : item.url,
                    })
                  }
                >
               
            <View style={{backgroundColor: '#fff', paddingTop:15,}} >
              <Text style={{fontSize: 16,width: wp(90),fontFamily: 'Georgia',marginBottom: 10,paddingLeft:20}}> <Ionicons name="format-list-bulleted" size={13} color="#000" /> {item.titre} </Text> 
            </View>
              </TouchableHighlight>
              )}
              keyExtractor={(item, index) => index.toString()}
            />

    );
  }
}

export default Mostread;
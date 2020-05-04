import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  TouchableHighlight,
  TouchableOpacity, Dimensions, 
} from "react-native";
//Equal
import equal from 'fast-deep-equal'

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
let that;
class Mostread extends React.Component {
  constructor(props) {
    super(props);
    console.log('MostreadCalled<<<');
    this.state = {
      data: [],
      refreshing: true,
      propsData:props.mostReadData
    };
    this.fetchMostRead = this.fetchMostRead.bind(this);
    that=this;
  }

  /*static getDerivedStateFromProps(props, state) {
    console.log('DerivedCalled')
    that.setState({
      propsData:props.mostread
    })
    }*/

  /*componentWillReceiveProps(nextProps){
    console.log('WillREceivePropsCalled')
      this.setState({
        propsData:nextProps
      })
  }*/

  // Called after a component is mounted
  componentDidMount() {
   // this.fetchMostRead();
    //this.handleRefresh();
    
  }
  componentDidUpdate(prevProps) {
    if(!equal(this.props.mostReadData, prevProps.mostReadData)) // Check if it's a new prop
    {
      console.log('NotEqual');
      this.setState({
        propsData : this.props.mostReadData
      })
      
    }else console.log('equal')
  } 
  fetchMostRead() {
    console.log('Calling MostReadApi');
    getMostRead()
      .then(data => this.setState({ data, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
  }
  

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => this.fetchMostRead()
    );
  }

  render() {
    console.log('MostREad Reresndering');
   
    const { navigate } = this.props;

    return (
      <FlatList
      //data={this.state.data}
      data={this.state.propsData}
      onRefresh={this.handleRefresh.bind(this)}
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
                      id: item.id
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
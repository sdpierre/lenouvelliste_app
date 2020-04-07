import React, { Component } from "react";
import { Platform,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Image,
  FlatList,
  ScrollView,
  TouchableHighlight } from 'react-native';
import {connect} from 'react-redux';
import {setAppInfo} from '../../../redux/actions';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";

import { Container, Header, Left, Body, Right, Button, Icon, Title, Content } from 'native-base';
import moment from "moment";
import "moment/min/locales";

// Import getNews function from news.js
import { getCitizenNews } from "library/networking/Api";
import CitizenFloatingAction from '../../citizen/components/CitizenFloatingAction';

//Realm
import Realm from 'realm';
let realm;
//Data from database
let offlineData=[];
//NetInfo
import NetInfo from '@react-native-community/netinfo';
let fetchOverNet;
class CitizenScreen extends React.Component {

  constructor(props){
    super(props);

    realm = new Realm({
      path: 'AllCitizenDb.realm',
      schema: [
        {
          name: 'all_citi_news',
          primaryKey: 'id',
          properties: {
            
            id : 'int',
            title : "string",
            body : "string",
            category : "string?",
            thumb : "string",
            media : "string",
            user_id : "string",
            username : "string",
            userphoto : "string",
            nouserphoto : "string",
            date : 'string?'
          },
        },
      ],
    });

    this.state = {
        title : "Citizen",
        data: [], 
        refreshing: true
    }
    offlineData = realm.objects('all_citi_news');
    console.log('AllCitiSize>>>', offlineData.length);
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    NetInfo.fetch()
    .then(conn => {
      fetchOverNet = conn.isConnected;
    })
    .then(() => {
      if (fetchOverNet) this.fetchNews();
      else {
        this.setState({
          refreshing: false,
          data: offlineData,
          
        });
      }
    });
  }

  fetchNews() {
    getCitizenNews()
    .then(resp => {
      realm.write(() => {
        realm.deleteAll();

        resp.forEach(element => {
          realm.create('all_citi_news', element);
        });
      });
      this.setState({data: resp, refreshing: false});
    })
    .catch(e => {
      console.log('ExceptionHOME>>>', e);
      this.setState({refreshing: false});
    });
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true
      },
      () => {
        if(fetchOverNet)
        this.fetchNews()
        else{
          alert('Internet connection required!')
          this.setState(
            {
              refreshing: false
            })        

        }

      }
    );
  }
  render() {
    const {title} = this.state;
    const { navigate } = this.props.navigation;
    return (
      <View style={{flex: 1}}>
      <Header>
        <Body>
          <Title> CITIZEN NEWS</Title>
        </Body>
      </Header>
      <View style={styles.CitizennewsMainContainer}>
        <FlatList
          data={this.state.data}
          renderItem={({ item }) => (
            <View style={styles.CitizennewsStyleContainer}>
              <View>
                <Image
                  style={{ width: 350, height: 300 }}
                  source={{ uri: item.thumb }}
                />
              </View>
              <View style={styles.CitizennewsContentStyleContainer}>
                <Text style={styles.CitizennewsCategoryStyle}>
                  port-au-prince
                </Text>
                <TouchableHighlight
                  onPress={() =>
                    navigate("News", {
                      title: item.title,
                      media: item.media,
                      body: item.body,
                      username: item.username,
                      userphoto: item.userphoto,
                      category: item.name,
                      date: item.date
                    })
                  }
                >
                  <Text style={styles.CitizennewsTitleStyle}>
                    {item.title}
                  </Text>
                </TouchableHighlight>
                <View
                  style={{ marginTop: 10, flex: 1, flexDirection: "row" }}
                >
                  <View>
                  <TouchableHighlight
                  onPress={() =>
                    navigate("Profil", {
                      title: item.title,
                      media: item.media,
                      body: item.body,
                      username: item.username,
                      userphoto: item.userphoto,
                      category: item.name,
                      date: item.date
                    })
                  }
                >
                  <Image
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 40 / 2,
                        overflow: "hidden",
                        borderWidth: 1,
                        borderColor: "#979797"
                      }}
                      source={{ uri: item.userphoto }}
                    />
                    </TouchableHighlight>
                  </View>
                  <View style={{ padding: 5 }}>
                    <Text style={styles.CitizennewsUsernameStyle}>
                      {item.username}
                    </Text>
                    <Text style={styles.CitizennewsMomentStyle}>
                      {(time = moment(item.date || moment.now()).fromNow())}
                    </Text>
                  </View>
                </View>
              </View>

              <View />
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refreshing}
          onRefresh={this.handleRefresh.bind(this)}
        />
         <CitizenFloatingAction/>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  CitizennewsMainContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: "#333842",
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
)(CitizenScreen);
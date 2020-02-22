import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  Modal,
  TouchableHighlight,
  TouchableOpacity
} from "react-native";
import { setAppInfo } from "../../../redux/actions";
import { connect } from "react-redux";
import moment from "moment";
import "moment/min/locales";
import { Typography, Colors, Buttons, Spacing, Margins } from "../../../styles";

import { getBreakingNews } from "library/networking/Api";

import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Content
} from "native-base";
//Realm
import Realm from 'realm';
let realm;
var testDataSet=[] ;
//NetInfo
//import NetInfo from "@react-native-community/netinfo";


class BreakingScreen extends React.Component {
    constructor(props) {
      super(props);
      realm = new Realm({
        path: 'NewsDb.realm',
        schema: [
          {
            name: 'breaking_news',
            primaryKey:'id',
            properties: {
              
              //breaking_news_data: 'string',
              id:'int',
              title:'string',
              body:'string',
              date:'string',
              category:'string',
              url:'string'
              
              
            },
          },
        ],
      });
      this.state = {
        data: [],
        refreshing: true,
        title: 'Breaking',
        isNetAvailable:false

      };
      testDataSet = realm.objects('breaking_news');

      this.fetchNews = this.fetchNews.bind(this);
    }
    // Called after a component is mounted
    componentDidMount() {
     /* NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Connection isConnected", state.isConnected);
        
        this.setState({'isNetAvailable': state.isConnected });*/
        //this.setState({'isNetAvailable': false });
        //console.log(this.state.isNetAvailable, '<<<VALUE');
        this.fetchNews();
      //});
    }
  
    fetchNews() {
      if(!(testDataSet.length> 0)){

      getBreakingNews()
        .then(data => {

          realm.write(() => {
            this.setState({ data, refreshing: false });

            realm.deleteAll();

            data.forEach(element => {
              realm.create('breaking_news', element);  
            });
            
          });
        })
        .catch(() => this.setState({ refreshing: false }));
      }else{
        realm = new Realm({ path: 'NewsDb.realm' });
        var newsJson = realm.objects('breaking_news');
        console.log('FetchinFromDB>>>', newsJson.length);
        this.setState ({
          data: newsJson,
          refreshing:false
        });
      }
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
    const { title } = this.state;
    let that = this;
    return (
      <Container>
        <Header>
          <Body>
            <Title>{title}</Title>
          </Body>
        </Header>

        <View style={styles.MainContainer}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => (
              <TouchableHighlight
               underlayColor='#d9d9d9'
                onPress={() =>
                  that.props.navigation.navigate("News", {
                    title: item.title,
                    body: item.body,
                    category: item.category,
                    date: item.date,
                    url: item.url
                  })
                }
              >
                <View style={Spacing.breakingContainer}>
                  <View>
                    <Text style={Typography.subHead}>
                      {(moment(item.date || moment.now()).fromNow())} |
                      <Text style={Typography.headline}> {item.category}</Text>
                    </Text>
                  </View>

                  <View>
                    <Text style={Typography.largeTitle}>{item.title}</Text>
                  </View>
                </View>
              </TouchableHighlight>
            )}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />
        </View>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  appInfo: state.appInfo || "Please Wait..."
});

const mapDispatchToProps = dispatch => {
  return {
    setAppInfo: (info) => {
      dispatch(setAppInfo(info));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BreakingScreen);

const styles = StyleSheet.create({
  MainContainer: {
    ...Colors.whiteBackground,
    marginBottom:80,
  },
});

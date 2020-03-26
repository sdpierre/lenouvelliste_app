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
import NetInfo from "@react-native-community/netinfo";
let fetchOverNet;


class BreakingScreen extends React.Component {
    constructor(props) {
      super(props);
      realm = new Realm({
        path: 'BreakingDb.realm',
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
      console.log('Constructor>>', testDataSet.length);

      this.fetchNews = this.fetchNews.bind(this);
      this.fetchFromDataBase=this.fetchFromDataBase.bind(this);

    }
    // Called after a component is mounted
    componentDidMount() {
      //let fetchOverNet=false;
      
      NetInfo.fetch().then(conn => {
      
      
        fetchOverNet=conn.isConnected;
        /*this.setState({
          isNetAvailable:conn.isConnected
        });*/
      }).then(()=>{
      
        if(fetchOverNet)
        this.fetchNews(); 
        else 
        {
          this
        .setState({
          refreshing:false,
          data:testDataSet
        });
        }
        //  this.fetchFromDataBase()
        
      });
    }

    fetchFromDataBase(){
      try{
        realm = new Realm({ path: 'NewsDb.realm' });
        var newsJson = realm.objects('breaking_news');
        
        
        this.setState ( {
          data: newsJson,
          refreshing:false
        });
      }catch(e){
        console.log('BreakingDBError>>', e);
      }
     
      
     
     
    }
    

    fetchNews() {
      getBreakingNews()
      .then(resp => {
        

        realm.write(() => {
          realm.deleteAll();

          resp.forEach(element => {
        
            
            realm.create('breaking_news', element);  

        

          });
          
        });
        //realm.close();
        this.setState({ data : resp, refreshing: false });
        

      })
      .catch((e) => {
        this.setState({ refreshing: false });
        console.log('ECSPTION CAUGHT', e)
      });

    }
  
    handleRefresh() {
      console.log('Refreshing<<<');
      this.setState(
        {
          refreshing: true
        },
        () => {
          if(fetchOverNet)
          this.fetchNews()
          else
          {
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

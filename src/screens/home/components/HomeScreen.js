import React from 'react';
import {View, StyleSheet, FlatList, Text, StatusBar} from 'react-native';
import {
  Typography,
  Colors,
  Buttons,
  Spacing,
  Margins,
  Base,
} from '../../../styles';
import {
  getHomeNews,
  getCitizenTopNews,
  getMostRead,
} from 'library/networking/Api';
import moment from 'moment';
import 'moment/min/locales';
import {setAppInfo, setUserInfo} from '../../../redux/actions';
import {connect} from 'react-redux';
import Article from 'library/components/Article';
import Mostread from '../components/Mostread';
import CitizenTopNews from '../components/CitizenTopNews';
import LogoTitle from 'library/components/logo';
import CitizenFloatingAction from '../../citizen/components/CitizenFloatingAction';
import Banner from 'library/components/banner';
import MediumRectangle from 'library/components/mediumRectangle';
import {Container, Header, Body, Title, Content} from 'native-base';
import AnimatedLoader from 'react-native-animated-loader';

//Realm
import Realm from 'realm';
let realm, realmTop, RealmMostRead;
var homeDataDb = [];
let corouselDataDb = [];
let mostReadDataDb = [];
//NetInfo
import NetInfo from '@react-native-community/netinfo';
import {SafeAreaView} from 'react-native';
let fetchOverNet;

class HomeScreen extends React.Component {
  constructor(props) {
    super();

    realm = new Realm({
      path: 'NewsDb.realm',
      schema: [
        {
          name: 'home_news',
          primaryKey: 'id',
          properties: {
            id: 'int',
            article: 'string',
            author: 'string',
            date: 'string',
            headline: 'string',
            nophoto: 'string',
            photo: 'string',
            //photofolder:'string, optional: true',
            rubrique: 'string',
            surtitre: 'string',
            titre: 'string',
            url: 'string',
          },
        },
      ],
    });
    realmTop = new Realm({
      path: 'TopCorousel.realm',
      schema: [
        {
          name: 'corousel_news',
          primaryKey: 'id',
          properties: {
            id: 'int',
            title: 'string',
            body: 'string',
            category: 'string?',
            thumb: 'string',
            media: 'string',
            user_id: 'string',
            username: 'string',
            userphoto: 'string',
            nouserphoto: 'string',
            date: 'string?',
          },
        },
      ],
    });

    RealmMostRead = new Realm({
      path: 'MostRead.realm',
      schema: [
        {
          name: 'most_read',
          primaryKey: 'id',
          properties: {
            id: 'string',
            url: "string",
            // author: "string",
            pageViews: 'int',
            // headline: "string",
            pageTitle: "string",
            // photo: "string?",
            // rubrique: "string?",
            // surtitre: "string?",
            // titre: 'string',
            // url: 'string?',
          },
        },
      ],
    });
    this.state = {
      data: [],
      refreshing: true,
      dataCorousel: [],
      mostReadData: [],
      visible: false,
    };
    homeDataDb = realm.objects('home_news');
    corouselDataDb = realmTop.objects('corousel_news');
    mostReadDataDb = RealmMostRead.objects('most_read');
    console.log('most_readSize>>>>>', mostReadDataDb.length);

    

    //  this.fetchNews = this.fetchNews.bind(this);
    //this.fetchFromDataBase=this.fetchFromDataBase.bind(this);
  }

  // Called after a component is mounted
  componentDidMount() {
    // this.showLoginAlert()
    // setInterval(() => {
    this.setState({
      visible: !this.state.visible
    });
    // }, 1000);


    NetInfo.fetch()
      .then(conn => {

        fetchOverNet = conn.isConnected;
      })
      .then(() => {
        console.log('Value ofOver HOME>>', fetchOverNet);
        if (fetchOverNet) this.fetchNews();
        else {
          this.setState({
            refreshing: false,
            data: homeDataDb,
            dataCorousel: corouselDataDb,
            mostReadData: mostReadDataDb,
            visible: false
          });
        }
      });
  }

  fetchNews() {
    getHomeNews()
      .then(resp => {
        console.log('ExceptionHOMEReponse>>>', resp);
        realm.write(() => {
          realm.deleteAll();

          resp.forEach(element => {
            realm.create('home_news', element);
          });
        });
        console.log('firstApi', resp);
        this.setState({ data: resp, refreshing: false, visible: false });
      })
      .catch(e => {
        console.log('ExceptionHOME>>>', e);
        this.setState({refreshing: false});
      });

    getCitizenTopNews()
      .then(respTop => {
        realmTop.write(() => {
          realmTop.deleteAll();

          respTop.forEach(element => {
            realmTop.create('corousel_news', element);
          });
        });
        console.log('secApi', respTop);
        this.setState({ dataCorousel: respTop, refreshing: false });
      })
      .catch(e => {
        console.log('ExceptionHOMETop>>>', e);
        this.setState({refreshing: false});
      });

    getMostRead()
      .then(data => {
        // console.log("get4", data)
        let keys = Object.keys(data)
        // console.log("all keys",keys)
        let datas = []
        RealmMostRead.write(() => {
          RealmMostRead.deleteAll();
          keys.forEach(element => {
            let d = data[element]
            //  d = element
              datas.push(d)
            RealmMostRead.create('most_read', d);
          });
        });
      //  console.log('thirdApi',data);
        // alert("called");
        this.setState({ mostReadData: datas, refreshing: false })

      })
      .catch(e => {
        console.log('MostReadError>>', e);
        this.setState({refreshing: false});
      });
  }

  handleRefresh() {
    this.setState(
      {
        refreshing: true,
      },
      () => {
        // if (fetchOverNet)
        //   this.fetchNews()
        // else {
        //   {
        //     alert('Internet connection required!')
        //     this.setState(
        //       {
        //         refreshing: false
        //       })
        //   }
        // }
      },
    );
  }

  /*componentWillUnmount(){
    realm.close();

    realmTop.close();

  }*/

  render() {
    const {title} = this.state;
    const {navigate} = this.props.navigation;
    let that = this;
    const nophoto = 'https://images.lenouvelliste.com/noimageandroid.jpg';
    const {visible} = this.state;
    console.log("Data3",this.state.mostReadData);
    return (

      <Container>

<StatusBar barStyle = "dark-content" hidden = {false} backgroundColor = "#FFFFFF" translucent = {true}/>

<View
style={Base.ScreenTitleView}>
<LogoTitle />
  </View>
        

     

        <View style={styles.MainContainer}>
          <FlatList
            data={this.state.data}
            //renderItem={({ item }) =><Text>{item.titre}</Text>}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => {
              if (index === 0)
                return (
                  <React.Fragment>
                    <CitizenTopNews
                      topNewsData={this.state.dataCorousel}
                      navigate={navigate}
                    />
                    <Banner />
                    <Article
                      article={item}
                      navigate={navigate}
                      isBookmarked={false}
                    />
                  </React.Fragment>
                );
              else if (index === 3)
                return (
                  <React.Fragment>
                    <Text style={styles.sectionTitle}> les plus lus </Text>
                    <Mostread mostread={item} navigate={navigate} mostReadData={this.state.mostReadData} isBookmarked={false} />
                    <Article
                      article={item}
                      navigate={navigate}
                      isBookmarked={false}
                    />
                  </React.Fragment>
                );
              else if (index === 7)
                return (
                  <React.Fragment>
                    <MediumRectangle />
                    <Article
                      article={item}
                      navigate={navigate}
                      isBookmarked={false}
                    />
                  </React.Fragment>
                );
              else if (index === 14)
                return (
                  <React.Fragment>
                    <Banner />
                    <Article
                      article={item}
                      navigate={navigate}
                      isBookmarked={false}
                    />
                  </React.Fragment>
                );
              else if (index === 20)
                return (
                  <React.Fragment>
                    <Article
                      article={item}
                      navigate={navigate}
                      isBookmarked={false}
                    />
                  </React.Fragment>
                );
              else
                return (
                  <Article
                    article={item}
                    navigate={navigate}
                    isBookmarked={false}
                  />
                );
            }}
            refreshing={this.state.refreshing}
            onRefresh={this.handleRefresh.bind(this)}
          />

        </View>
        <AnimatedLoader
          visible={visible}
          overlayColor="rgba(255,255,255,0.75)"
          source={require('../../../utils/loader.json')}
          animationStyle={styles.lottie}
          speed={1}
        />
      
      <CitizenFloatingAction />

      </Container>
    );
  }
}


export default HomeScreen;

const styles = StyleSheet.create({
  button: {
    ...Buttons.smallRounded,
  },
  MainContainer: {
    ...Colors.grayBackground,
    paddingBottom: 50

  },
  container: {
    ...Colors.background,
    ...Spacing.container,
    ...Colors.whiteBackground,
  },
  sectionTitle: {
    textTransform: 'uppercase',
    fontFamily: 'AkkoPro-BoldCondensed',
    paddingLeft: 18,
    paddingBottom: 10,
    paddingTop: 10,
    fontSize: 16,
    letterSpacing: 0.64,
    color: '#2E2E2D',
  },
  lottie: {
    width: 100,
    height: 100,
  },
});

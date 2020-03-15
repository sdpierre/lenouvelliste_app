import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text
} from "react-native";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import { getSectionNews } from "library/networking/Api";
import { getHomeNews } from "library/networking/Api";
import moment from "moment";
import "moment/min/locales";
import { setAppInfo, setUserInfo } from "../../../redux/actions";
import { connect } from "react-redux";
import Article from "library/components/Article";
import ArticleLarge from "library/components/ArticleLarge";
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  Container,
  Header,
  Body,
  Title,
  Left,
  Right,
  Button
} from "native-base";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      title: this.props.navigation.getParam('name'),
      idsection: this.props.navigation.getParam('idsection'),
      data: [],
      refreshing: true
    };
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted

  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getSectionNews(this.state.idsection)
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
    const { title } = this.state;
    const { navigate } = this.props.navigation;
    let that = this;
    return (
      <Container>
         <Header>
        <Left>
            <Button transparent onPress={()=>{this.props.navigation.goBack()}}>
              <AntDesign name="arrowleft" size={30} />
            </Button>
          </Left>
          <Body>
            <Title>
              {title}
            </Title>
          </Body>
          <Right></Right>
        </Header>

        <View style={styles.MainContainer}>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => <Article name={item.id} article={item} navigate={navigate} />}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if (index === 0)
                return (
                  <React.Fragment>
                    <ArticleLarge
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
      </Container>
    );
  }
}

export default HomeScreen


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
  }
});

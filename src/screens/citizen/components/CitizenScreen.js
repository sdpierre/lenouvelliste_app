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

class CitizenScreen extends React.Component {

  constructor(props){
    super(props);
    this.state = {
        title : "Citizen",
        data: [], refreshing: true
    }
    this.fetchNews = this.fetchNews.bind(this);
  }
  // Called after a component is mounted
  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getCitizenNews()
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
                    navigate("UserPost", {
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
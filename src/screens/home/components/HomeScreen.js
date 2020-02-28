import React from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Text,
} from "react-native";
import { Typography, Colors, Buttons, Spacing, Margins } from "../../../styles";
import { getHomeNews } from "library/networking/Api";
import moment from "moment";
import "moment/min/locales";
import { setAppInfo, setUserInfo } from "../../../redux/actions";
import { connect } from "react-redux";
import Article from "library/components/Article";
import LogoTitle from "library/components/logo";

import {
  Container,
  Header,
  Body,
  Title
} from "native-base";

class HomeScreen extends React.Component {
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
  }

  fetchNews() {
    getHomeNews()
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
          <Body>
            <Title>
              <LogoTitle />
            </Title>
          </Body>
        </Header>

        <View style={styles.MainContainer}>
           <FlatList
            data={this.state.data}
            //renderItem={({ item }) =><Text>{item.titre}</Text>}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => {
              if (index === 0) return <React.Fragment> 
    <Article article={item} navigate={navigate} /> 
    </React.Fragment>
  else if (index === 3) return <React.Fragment>
  <Text style={styles.sectionTitle}> les plus lus </Text>

<Article article={item} navigate={navigate} />
</React.Fragment>
else if (index === 7) return <React.Fragment> 
<Article article={item} navigate={navigate} /> 
</React.Fragment>
else if (index === 14) return <React.Fragment> 
<Article article={item} navigate={navigate} /> 
</React.Fragment> 
else if (index === 20) return <React.Fragment> 
<Article article={item} navigate={navigate} /> 
</React.Fragment> 
else return <Article article={item} navigate={navigate} />

}
            }
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
});
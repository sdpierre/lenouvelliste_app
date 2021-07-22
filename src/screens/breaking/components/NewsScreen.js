import React from 'react';
import { Text, View, ScrollView } from 'react-native';

import { setAppInfo } from '../../../redux/actions';
import { connect } from 'react-redux';
import moment from 'moment';
import 'moment/min/locales';
import HTMLView from 'react-native-htmlview';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Typography, Colors, Spacing } from '../../../styles';
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Content,
} from 'native-base';
import Share from 'library/components/Share';
import { SafeAreaView } from 'react-native';

class NewsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: this.props.navigation.getParam('title'),
      body: this.props.navigation.getParam('body'),
      date: this.props.navigation.getParam('date'),
      category: this.props.navigation.getParam('category'),
      url: this.props.navigation.getParam('url'),
    };
  }
  render() {
    const { title } = this.state;
    const { url } = this.state;
    const { body } = this.state;
    const { date } = this.state;
    const { category } = this.state;

    return (
      <Container>
        <SafeAreaView>
        <Header>
          <Left>
            <Button
              transparent
              onPress={() => {
                this.props.navigation.goBack();
              }}>
              <Ionicons name="close" size={30} style={Colors.gray} />
            </Button>
            <Body />
            <Right />
          </Left>
          <Right>
            <Share titre={title} url={url} />
          </Right>
        </Header>
        </SafeAreaView>
        <ScrollView>
          <View style={Spacing.container}>
            <Text style={Typography.headline}>{category}</Text>
            <Text style={Typography.xlargeTitle}>{title}</Text>
            <Text style={Typography.subHead}>
              {moment(date || moment.now()).fromNow()}
            </Text>
            <HTMLView
              value={'<div>' + body + '</div>'}
              addLineBreaks={false}
              stylesheet={Typography.body}
            />
          </View>
        </ScrollView>
        {/* <Content>

        </Content> */}
      </Container>
    );
  }
}
const mapStateToProps = state => ({
  appInfo: state.appInfo || 'Please Wait...',
});

const mapDispatchToProps = dispatch => {
  return {
    setAppInfo: info => {
      dispatch(setAppInfo(info));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(NewsScreen);

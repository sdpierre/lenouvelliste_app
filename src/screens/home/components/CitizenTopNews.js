import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel from "react-native-snap-carousel";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import { styles, sliderStyle, sliderWidth, itemWidth } from '../../../styles/sliderStyle';
import { TouchableHighlight } from "react-native-gesture-handler";
import moment from "moment";
import 'moment/min/locales';
import ImageOverlay from "react-native-image-overlay";

let nav;

let height = 300;

class CitizenTop extends Component {
  constructor(props) {
    super(props);

    nav = this.props.navigate;
    this.state = {
      isLoading: true,

      entries: this.props.topNewsData,

    };
  }

  /*
  navigateToDetail("NewsCarousel", {
          title: item.title,
          body : item.body,
          category: item.category,
          headline: item.title,
          date: item.date,
          username : item.username,
          media : item.media,
          userphoto : item.userphoto,      
  
        })*/

  _renderItem({ item, index }) {

    const time = moment(item.date || moment.now()).fromNow();
    moment.locale('fr');

    return (
      <View>
        <TouchableHighlight
          underlayColor="#ffffff00"
          onPress={() => {
            nav('NewsCarousel', {
              title: item.title,
              body: item.body,
              category: item.category,
              headline: item.title,
              date: item.date,
              username: item.username,
              media: item.media,
              userphoto: item.userphoto,
              type: item.type,
              long: item.long,
              lat: item.lat,
            });
          }}>
          <View style={CitizenStyle.card}>
            <ImageOverlay
              source={{ uri: item.thumb }}
              height={0.7 * height}
              contentPosition="center">
              {/* <View>
                <Image
                style={{}}
                source={require('../../../res/images/play.png')}
            />
    </View> */}
            </ImageOverlay>




            <View style={{ backgroundColor: '#191D25', padding: 30 }}>
              <Text style={CitizenStyle.tag}>{item.category}</Text>
              <Text style={CitizenStyle.title}>{item.title}</Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                 
                }}>

                {/* <View style={{ backgroundColor: '', width: '20%' }}>
                  <Text style={CitizenStyle.views}><Ionicons name="eye" size={10} /> 450</Text>
                </View> */}

                <View style={{ width: '50%' }}><Text style={CitizenStyle.moment}>{time}</Text>
                </View>

                <View style={{ width: '50%' }}><Text style={CitizenStyle.share}><Ionicons name="share" size={30} color="#fff" /></Text>
                </View>

              </View>

            </View>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
  render() {
    return (
      <View style={{ paddingBottom: 10}}>
        <View  style={{ paddingLeft: 30}}> 
        <Text style={Typography.sectionTitleBlack}>Newspaw</Text>
        </View>
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          itemWidth={itemWidth}
        />
      </View>
    );
  }
}
export default CitizenTop;


const CitizenStyle = StyleSheet.create({

  card: {
    borderRadius: 7,
    overflow: 'hidden',
    marginBottom: 10,
  },
  image: {
  },
  content: {
    margin: 20,
    padding: 5,
  },
  tag: {
    color: '#ffcd00',
    fontFamily: "AkkoPro-BoldCondensed",
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 10,
    fontSize: 18,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "Georgia"
  },
  moment: {
    fontSize: 12,
    color: '#fff',
    fontFamily: 'Gotham-book',
  },
  views: {
    fontSize: 12,
    color: '#ffcd00',
    fontFamily: 'Gotham-book',
  },
  share: {
    fontSize: 12,
    textAlign: 'right',
    fontFamily: 'Gotham-book',
  }
});

export { CitizenStyle };
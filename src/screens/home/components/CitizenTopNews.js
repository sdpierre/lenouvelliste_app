import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, StyleSheet} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import Carousel from "react-native-snap-carousel";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import { styles, sliderStyle, sliderWidth, itemWidth } from '../../../styles/sliderStyle';


class CitizenTop extends Component {
  constructor(props) {
    super(props);
    this.state ={ isLoading: true,

      entries: [
        {
          title: "Beautiful and dramatic Antelope Canyon",
          subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
          illustration: "https://i.imgur.com/UYiroysl.jpg"
        },
        {
          title: "Earlier this morning, NYC",
          subtitle: "Lorem ipsum dolor sit amet",
          illustration: "https://i.imgur.com/UPrs1EWl.jpg"
        }
      ]
    };
  }

  _renderItem({ item, index }) { 
    return (

      <View style={CitizenStyle.card}>
        <Image
          source={{ uri: item.illustration }}
          style={{ width: 297, height: 220 }}
        />
        <View style={{backgroundColor:'#191D25', padding:30}}>
          <Text style={CitizenStyle.tag}>IPSUM</Text>
          <Text style={CitizenStyle.title}>{item.title}</Text>
          <View style={{flex:1, flexDirection:'row'}}>
            <View style={{flex: 1}}>
              <Text style={CitizenStyle.moment}>Duration <Text style={{color:'#FFF', marginLeft:10}}>4 minutes</Text></Text>
            </View>
            <View style={{flex: 1}}>
              <Text style={{textAlign: 'right'}}> <Ionicons name="share" size={20} color="#fff"/></Text>
            </View>
          </View>
        </View>
      </View>
   
    );
  }

  render() {
    return (
      <View style={{paddingBottom: 10,}}>
       <Text style={Typography.sectionTitleBlack}>Citizen news</Text>

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
    padding: 10,
  },
  tag: {
    color: '#ffcd00',
    fontFamily: "AkkoPro-BoldCondensed",
    textTransform: 'uppercase',
  },
  title: {
    marginTop: 10,
    fontSize: 16,
    color: "#fff",
    marginBottom: 20,
    fontFamily: "Georgia"
  },
  moment: {
    fontSize: 12,
    color: '#ffcd00',
  }
});

export { CitizenStyle };
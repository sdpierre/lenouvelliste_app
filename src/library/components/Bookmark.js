import React, { Component } from "react";
import { Text, View, TouchableOpacity} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { connect } from 'react-redux';
import { getHomeNews } from "library/networking/Api";

class MyCarousel extends Component {

  constructor(props) {
    super(props)
    this.state = {
    
      isLoading: true
    }
  } 



  componentDidMount() {
    this.fetchNews();
  }

  fetchNews() {
    getHomeNews()
      .then(data => this.setState({ data, refreshing: false }))
      .catch(() => this.setState({ refreshing: false }));
    
  }

  componentDidUpdate() {

  }


  render() {
    return (
      <View>
       <TouchableOpacity>
                        <Text style={{}}>
                          <Ionicons name="bookmark-outline" size={25} color="#393939" />
                        </Text>
                      </TouchableOpacity>
                      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    
  }
}

export default connect(mapStateToProps)(MyCarousel)

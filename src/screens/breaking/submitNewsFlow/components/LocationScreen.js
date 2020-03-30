import React from 'react';
import {Text, View, StyleSheet } from 'react-native';

//Location
import Geolocation from '@react-native-community/geolocation';

export default class LocationScreen extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            data: [],
            lat: 0,
            long: 0
          }
    }
    componentDidMount() {
        Geolocation.getCurrentPosition(info => {
          console.log('LAT>>',info.coords.latitude,'LONG>>>', info.coords.longitude)
          this.setState({
            lat: info.coords.latitude,
            long: info.coords.longitude,
            error: null,
          });
        });
      }

      render(){
          return(
              <View>

              </View>
          )
      }
}
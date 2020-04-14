import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action";
//Image Picker
import ImagePicker from 'react-native-image-crop-picker';
import { withNavigation } from 'react-navigation';

class CitizenFloatingAction extends Component {
  constructor(props){
    super(props)
  }
  static navigationOptions = {
    title: "Right position"
  };

  render() {
    const actions = [
        {
          text: "Photo",
          icon: require("../../../../src/library/images/gallery.png"),//./src/library/images/gallery.png
          name: "bt_photo",
          position: 1
        },
        {
          text: "Video",
          icon: require("../../../../src/library/images/camera.png"),//./src/library/images/camera.png
          name: "bt_video",
          position: 2
        }
      ];
      const { navigate } = this.props.navigation;

      return (
    //  <SafeAreaView style={styles.container}>
        <View style={styles.container}>
          <FloatingAction
            actions={actions}
            position="right"
            // onPressItem={name => {
            //   Alert.alert("Icon pressed", `the icon ${name} was pressed`);
            // }}
            onPressItem={name => {
                switch (name){
                  case "bt_photo":
                    console.log('bt_photo')
                    ImagePicker.openCamera({
                      width: 300,
                      height: 400,
                      // cropping: true,
                      includeBase64:true,
                      mediaType:'photo'
                    }).then(image => {

                      // console.log("Image",image.data);
                      navigate('CitizenMapScreen',{
                        imageData:image.data
                    });

                    });
                    break;
          
                    case "bt_video":
                      console.log('Video<<<')
                      ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        mediaType: 'video',
                      }).then(image => {

                        // console.log("Video",image);
                        navigate('CitizenMapScreen')

                      });
                      break;
          
                }
              }}          
          />
        </View>
   //  </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});

export default withNavigation(CitizenFloatingAction);
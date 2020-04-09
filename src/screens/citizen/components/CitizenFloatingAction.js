import React, { PureComponent } from "react";
import { View, SafeAreaView, StyleSheet, Alert } from "react-native";
import { FloatingAction } from "react-native-floating-action";
//Image Picker
import ImagePicker from 'react-native-image-crop-picker';

class CitizenFloatingAction extends React.Component {
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
                      cropping: true,
                    }).then(image => {
                      console.log(image);
                    });
                    break;
          
                    case "bt_video":
                      console.log('Video<<<')
                      ImagePicker.openCamera({
                        width: 300,
                        height: 400,
                        mediaType: 'video',
                      }).then(image => {
                        console.log(image);
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

export default CitizenFloatingAction;
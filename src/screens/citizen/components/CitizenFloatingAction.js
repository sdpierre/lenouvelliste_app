import React, { Component } from "react";
import { View, SafeAreaView, StyleSheet, Alert,AsyncStorage } from "react-native";
import { FloatingAction } from "react-native-floating-action";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
//Image Picker
import ImagePicker1 from 'react-native-image-crop-picker';
import { withNavigation } from 'react-navigation';
import ImagePicker from 'react-native-image-picker'
import Video from 'react-native-video'
import { NavigationActions, StackActions } from 'react-navigation';



class CitizenFloatingAction extends Component {
  constructor(props) {
    super()
    this.state = {
      
      isLoggedin: false,
      isUserExist:false,
  }
  }
  static navigationOptions = {
    title: "Right position"
  };

   componentDidMount(){
    const userData = AsyncStorage.getItem("loggedInUserDetails");
    if(userData !=''){
      this.setState({isUserExist : true});
    }else{
      this.setState({isUserExist:false});
    }
   }
  
  // --------------Login Alert------------------
  showLoginAlert() {
    console.log("Login...Alert!")
    Alert.alert(
      'Alert',
      "Please first login.",
      [
        {
          text: 'OK', onPress: () => {
            // this.props.navigation.navigate('Account')
            const resetAction = StackActions.reset({
              index: 0,
              key: null,
              actions: [NavigationActions.navigate({ routeName: 'login' })],
            });
            this.props.navigation.dispatch(resetAction);
          }
        },
      ],
      { cancelable: false }
    )
  }
// -----------------Check user---------------------------
// userProfile(name){
//   AsyncStorage.getItem("loggedInUserDetails").then((value) => {
//     if (value != null) {
//       switch (name) {
//         case "bt_photo":
//           console.log('bt_photo')
//           ImagePicker1.openCamera({
//             width: 300,
//             height: 400,  
//             compressImageQuality:0.5,
//             // cropping: true,
//             // includeBase64:true,
//             mediaType: 'photo'
//           }).then(image => {
//             console.log("Image", image);
//             //CitizenSaveScreen
//             navigate('CitizenMapScreen', {
//               imageData: image
//             });
//           });
//           break;
//         case "bt_video":
//           console.log('Video<<<')
//           const options = {
//             mediaType: 'video',
//             videoQuality: 'medium',
//             durationLimit: 20,
//             thumbnail: true,
//             allowsEditing: true,
//           };
//           ImagePicker.launchCamera(options, (response) => {
//             console.log('camera response is = ', response,response.data)
//             if (response.didCancel) {
//               // console.warn('User cancelled video picker');
//             } else if (response.error) {
//               // console.warn('ImagePicker Error: ', response.error);
//             } else if (response.customButton) {
//               console.warn('User tapped custom button: ', response.customButton);
//             } else {
//               navigate('CitizenMapScreen', { 'videoData': response });
//             }
//           })
//           // ImagePicker1.openCamera({
//           //   mediaType: 'video',
//           //   compressVideoPreset:'LowQuality',
//           // }).then(video => {
//           //    console.log("Video",video);
  
//           //   navigate('CitizenMapScreen',{'videoData':video
//           //   });
  
//           // });
//           break;                        
//       }
//     }

//      else{
//       this.showLoginAlert(); 
//     }
//   })}

// ----------------End------------------


  render() {
    
    

    const actions = [
      
      {
        text: "Photo",
        icon: <FontAwesome color="#FFF" name="camera" size={18} />,
        name: "bt_photo",
        position: 1
      },
      {
        text: "Video",
        icon: <FontAwesome color="#FFF" name="video-camera" size={18} />,
        name: "bt_video",
        position: 2
      }
    ];
  
    const { navigate } = this.props.navigation;

    return (
      //  <SafeAreaView style={styles.container}>

      <FloatingAction
        // actions={actions}
         onPressMain = { ()=>{this.state.isUserExist? this.showLoginAlert():'' }}
        actions={!this.state.isUserExist?actions:''}
        position="right"
        // onPressItem={name => {
        //   Alert.alert("Icon pressed", `the icon ${name} was pressed`);
        // }}
        // onPressItem={name => {this.userProfile()}}
        onPress={name =>{
          AsyncStorage.getItem("loggedInUserDetails").then((value) => {
            // if (value != null) {
              switch (name) {
                case "bt_photo":
                  console.log('bt_photo')
                  ImagePicker1.openCamera({
                    width: 300,
                    height: 400,  
                    compressImageQuality:0.5,
                    // cropping: true,
                    // includeBase64:true,
                    mediaType: 'photo'
                  }).then(image => {
                    console.log("Image", image);
                    //CitizenSaveScreen
                    navigate('CitizenMapScreen', {
                      imageData: image
                    });
                  });
                  break;
                case "bt_video":
                  console.log('Video<<<')
                  const options = {
                    mediaType: 'video',
                    videoQuality: 'medium',
                    durationLimit: 20,
                    thumbnail: true,
                    allowsEditing: true,
                  };
                  ImagePicker.launchCamera(options, (response) => {
                    console.log('camera response is = ', response,response.data)
                    if (response.didCancel) {
                      // console.warn('User cancelled video picker');
                    } else if (response.error) {
                      // console.warn('ImagePicker Error: ', response.error);
                    } else if (response.customButton) {
                      console.warn('User tapped custom button: ', response.customButton);
                    } else {
                      navigate('CitizenMapScreen', { 'videoData': response });
                    }
                  })
                  // ImagePicker1.openCamera({
                  //   mediaType: 'video',
                  //   compressVideoPreset:'LowQuality',
                  // }).then(video => {
                  //    console.log("Video",video);
          
                  //   navigate('CitizenMapScreen',{'videoData':video
                  //   });
          
                  // });
                  break;                        
          
                }})}}
      />
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
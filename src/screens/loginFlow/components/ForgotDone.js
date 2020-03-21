import React from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, Dimensions } from 'react-native';
import {
    Container,
    Header,
    Body,
    Button,
    Right, Left
} from "native-base";
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Colors } from '../../../styles';

//Dimensions
var deviceWidth = (Dimensions.get('window').width);
var deviceHeight = (Dimensions.get('window').height);

const ForgotDone = (props) => {
    return (
        <Modal animationType='fade' transparent={true}>
            <TouchableWithoutFeedback >
          <View           
            style={[
              
              {
                backgroundColor:'transparent',
                width: deviceWidth,
                height: deviceHeight*0.03
              }
            ]}
          />
        </TouchableWithoutFeedback>
            <Container>
                <Header style={{ backgroundColor: 'white' }}>
                    <Left>
                        <Button
                            transparent
                            onPress={() => {
                                props.navigation.goBack();
                            }}>
                            <Ionicons name="close" size={30} style={Colors.gray} />
                        </Button>
                    </Left>
                    <Body></Body>
                    <Right></Right>
                </Header>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', alignContent: 'center', backgroundColor: 'crimson' }}>
                    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 20 }}>Forgot Done Screen</Text>
                </View>
            </Container>
        </Modal>

    )
}
export default ForgotDone;
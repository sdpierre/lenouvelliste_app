import React, { Component } from 'react';
import { withNavigation } from "react-navigation";

import {
    View,
    StyleSheet,
    FlatList,
    Text,
    AsyncStorage
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import Realm from 'realm';
import { getSectionAll } from '../../../library/networking/Api'
import LogoTitle from 'library/components/logo';
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Right, Button, Left
} from "native-base";
//realm
let realm;
//NetInfo
import NetInfo from '@react-native-community/netinfo';
let fetchOverNet;
let sectionListDb = [];
class MenuScreen extends Component {

    constructor(props) {
        super(props);
        realm = new Realm({
            path: 'SectionList.realm',
            schema: [
                {
                    name: 'section_list',
                    primaryKey: 'idSection',
                    properties: {
                        idSection: 'int',
                        name: 'string',
                    },
                },
            ],
        });
        this.state = {
            title: "Menu",
            data: [],
            isLoggedInUser:false
        }

        console.log("IsLoggedInUser",this.state.isLoggedInUser)
        sectionListDb = realm.objects('section_list');

        this.fetchNews = this.fetchNews.bind(this);
    }

    componentDidMount() {
        
        AsyncStorage.getItem("loggedInUserDetails").then((value) => {
            if (value != null) {
                var dicLoginData = JSON.parse(value);
                console.log('userInfo====>', dicLoginData)

                this.setState({
                    isLoggedInUser: true
                });
   
            }else{
                this.setState({
                    isLoggedInUser:false
                });
            }
        }).done(
        );

        // const { navigation } = this.props;
        // this.focusListener = navigation.addListener("didFocus", () => {
            //  console.debug('didFocus', payload);

          // The screen is focused
          // Call any action
        // });
    
        // const didFocusSubscription = this.props.navigation.addListener(
        //     'didFocus',
        //     payload => {
            //   console.debug('didFocus', payload);
            //   AsyncStorage.getItem("loggedInUserDetails").then((value) => {
            //     if (value != null) {
            //         var dicLoginData = JSON.parse(value);
            //         console.log('userInfo====>', dicLoginData)
    
            //         this.setState({
            //             isLoggedInUser: true
            //         });
       
            //     }else{
            //         this.setState({
            //             isLoggedInUser:false
            //         });
            //     }
            // }).done(
            // );

        //     }
        //   );

        // this.didFocusListener = this.props.navigation.addListener(
        //     'didFocus',
        //     () => { console.log('did focus') 
        //     AsyncStorage.getItem("loggedInUserDetails").then((value) => {
        //         if (value != null) {
        //             var dicLoginData = JSON.parse(value);
        //             console.log('userInfo====>', dicLoginData)
    
        //             this.setState({
        //                 isLoggedInUser: true
        //             });
       
        //         }else{
        //             this.setState({
        //                 isLoggedInUser:false
        //             });
        //         }
        //     }).done(
        //     );
    
        
        // },
        //   );
      
        NetInfo.fetch()
            .then(conn => {

                fetchOverNet = conn.isConnected;
            })
            .then(() => {

                if (fetchOverNet) this.fetchNews();
                else {
                    this.setState({
                        refreshing: false,
                        data: sectionListDb,
                    });
                }
            });   
              

    }


    componentWillUnmount() {
        // this.didFocusListener.remove();
        // this.focusListener.remove();

    }    

    fetchNews() {
        getSectionAll()
            .then(data => {
                realm.write(() => {
                    realm.deleteAll();

                    data.forEach(element => {
                        realm.create('section_list', element);
                    });
                });
                this.setState({ data, refreshing: false })
            })
            .catch((e) => { console.log('SectionListExc>>', e); this.setState({ refreshing: false }) });

    }

    render() {
        return (
            <Container>
                <Header>

                    <Body>
                        <LogoTitle />
                    </Body>
                    <Right>
                        <Button transparent onPress={this.state.isLoggedInUser?() => { this.props.navigation.navigate('UserProfile')}:()=>this.props.navigation.navigate('Account')}>
                            <FontAwesome name='user-circle-o' size={25} style={Colors.gray} />
                        </Button>
                        <Button transparent onPress={() => { this.props.navigation.navigate('Settings') }}>
                            <AntDesign name='setting' size={25} style={Colors.gray} />
                        </Button>
                    </Right>
                </Header>

                <Container style={styles.menuContainer}>
                    <FlatList
                        data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => {
                            return <Text style={styles.title} onPress={() => {
                                {
                                    this.props.navigation.navigate("Section",
                                        {
                                            idsection: item.idSection,
                                            name: item.name,
                                        })
                                }
                            }
                            }>
                                {item.name}
                            </Text>
                        }} />
                </Container>

            </Container>
        )
    }

}

const styles = StyleSheet.create({
    menuContainer: {
        paddingTop: 10,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 90
    },
    title: {
        marginTop: 10,
        fontSize: 28,
        color: "#5B6475",
        textTransform: "uppercase",
        marginBottom: 20,
        fontFamily: "AkkoPro-BoldCondensed"
    }
});

export default withNavigation(MenuScreen);

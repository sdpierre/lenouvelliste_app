import React, { Component } from 'react';
import { withNavigation } from "react-navigation";
import { setAppInfo } from '../../../redux/actions';
import { connect } from 'react-redux';

import {
    View,
    StyleSheet,
    FlatList,
    Text,
    AsyncStorage, Alert,
    Image
} from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
import Realm from 'realm';
import { getSectionAll } from '../../../library/networking/Api'
import LogoTitle from 'library/components/logo';
import CitizenFloatingAction from '../../citizen/components/CitizenFloatingAction';
import { NavigationActions, StackActions } from 'react-navigation';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
            isLoggedin: false,
        }

        //  console.log("IsLoggedInUser",this.state.isLoggedInUser)
        sectionListDb = realm.objects('section_list');

        this.fetchNews = this.fetchNews.bind(this);

        // this._onFocusListener = this._onFocusListener.bind(this);
    }

    componentDidMount = () => {
        console.log("menu", this.state.data);
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
    // ----------------End------------------------

    componentWillReceiveProps(nextProps) {
        let authUser = nextProps.user.userInfo;
        // let refreshToken = nextProps.navigation.getParam("refreshToken");
        console.log('authUser------', authUser);
        let isLoggedin = false;
        if (authUser) {
            isLoggedin = true;
        }
        this.setState({ isLoggedin });
    }
    // ----------------On User Profile button-----------
    userProfile() {
        if (this.isLoggedin) {
            this.props.navigation.navigate('UserProfile');
        } else {
            this.props.navigation.navigate('login');
            // this.props.navigation.dispatch(resetAction);
        }
    }
    // ----------------End------------------

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
        let isLoggedin = this.props.user.userInfo ? true : false;
        console.log('userInfo', this.props.user.userInfo);
        return (
            <Container>
                <Header>
                    <Left></Left>
                    <Body>
                        <LogoTitle />
                    </Body>
                    <Right>

                        {/* <Button transparent onPress={()=>{this.props.navigation.navigate('')}}> */}
                        {/* <Button transparent onPress={()=>{this.userProfile()}}>
                <FontAwesome color="#d00" name='user-circle-o' size={25} />
                </Button> */}

                        {/* {
                isLoggedin?
                <Button transparent onPress={()=>{this.props.navigation.navigate('UserProfile')}}>
                <FontAwesome color="#d00" name='user-circle-o' size={25} />
                </Button>
                :<Button transparent onPress={()=>{this.props.navigation.navigate('Account')}}>
                <FontAwesome name='user-circle-o' size={25} style={Colors.gray} />
                </Button>
            } */}
                        {
                            isLoggedin ?
                                <Button transparent onPress={() => { this.userProfile() }}>
                                    {/* <FontAwesome color="#d00" name='user-alt' size={25} /> */}
                                    <Image
                                     style={{width:25}}
                                     source={require('../../../res/images/outline_account_circle.png')}
                                    />
                                </Button>
                                : <Button transparent onPress={() => { this.userProfile() }}>
                                    {/* <FontAwesome name='user-circle' size={25} style={Colors.gray} /> */}
                                    <Image
                                     style={{width:25}}
                                     source={require('../../../res/images/outline_account_circle.png')}
                                    />
                                </Button>
                        }
                        {/* <Button transparent onPress={this.state.isLoggedInUser?() => { this.props.navigation.navigate('UserProfile')}:()=>this.props.navigation.navigate('Account')}>
                            <FontAwesome name='user-circle-o' size={25} style={Colors.gray} />
                        </Button> */}
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
                <CitizenFloatingAction />
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

const mapStateToProps = (state) => ({
    user: state.user || "Please Wait...",
});

const mapDispatchToProps = (dispatch) => {
    return {
        setUserInfo: (info) => {
            dispatch(setUserInfo(info))
        }
    }
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuScreen);
// export default withNavigation(MenuScreen);

import React, { Component } from 'react';
import {
    View,
    StyleSheet,
    FlatList,
    Text,
    Modal
} from "react-native";
import {
    Container,
    Header,
    Body,
    Title,
    Content,
    Right, Left,
    Button
} from "native-base";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Typography, Colors, Buttons, Spacing } from "../../../styles";
//Article 
import Article from './ArticleMenu';

//API
import { getSectionNews } from '../../../library/networking/Api'
//NetInfo
import NetInfo from '@react-native-community/netinfo';
let fetchOverNet;
//Data in DB
let sectionDataDb;
//Realm
import Realm from 'realm';
import ArticleMenu from './ArticleMenu';
let realm;

export default class SectionScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.navigation.getParam('idsection'),
            title: this.props.navigation.getParam('name'),
            loading: false,
            data: [],
            refreshing: false
        }
        //Databse Schema and Name
        realm = new Realm({
            path: 'SectionDb' + this.state.title + '.realm',
            schema: [
                {
                    name: 'section_news' + this.state.title,
                    primaryKey: 'id',
                    properties: {
                        id: 'int',
                        article: 'string',
                        author: 'string',
                        date: 'string',
                        headline: 'string',
                        nophoto: 'string',
                        photo: 'string',
                        //photofolder:'string, optional: true',
                        rubrique: 'string',
                        surtitre: 'string',
                        titre: 'string',
                        url: 'string',
                    },
                },
            ],
        });
        sectionDataDb = realm.objects('section_news' + this.state.title)
        console.log('Economy Size>>', sectionDataDb.length)
        this.fetchNews = this.fetchNews.bind(this);

    }

    componentDidMount() {
        NetInfo.fetch()
            .then(conn => {

                fetchOverNet = conn.isConnected;
            })
            .then(() => {

                if (fetchOverNet) this.fetchNews();
                else {
                    this.setState({
                        refreshing: false,
                        data: sectionDataDb,

                    });
                }
            });
    }
    //Fetch News from API
    fetchNews() {
        getSectionNews(this.state.id)
            .then(resp => {
                realm.write(() => {
                    realm.deleteAll();

                    resp.forEach(element => {
                        realm.create('section_news' + this.state.title, element);
                    });
                });
                this.setState({ data: resp, refreshing: false });
            })
            .catch(e => {
                console.log('ExceptionSection>>>', e);
                this.setState({ refreshing: false });
            });
    }
    //HandleRefresh
    handleRefresh() {
        this.setState(
            {
                refreshing: true,
            },
            () => {
                if (fetchOverNet)
                    this.fetchNews()
                else {
                    {
                        alert('Internet connection required!')
                        this.setState(
                            {
                                refreshing: false
                            })
                    }
                }
            },
        );
    }
    render() {
        const { navigate } = this.props.navigation
        return (
            <Modal animationType='slide'>
                <Container>
                    <Header>
                        <Left>
                            <Button transparent onPress={() => { this.props.navigation.goBack() }}>
                                <Ionicons name="ios-arrow-back" size={30} style={Colors.white} />
                            </Button>
                        </Left>
                        <Body><Title style={{ textTransform: 'capitalize' }}>{this.state.title}</Title></Body>
                        <Right></Right>
                    </Header>

                    <FlatList data={this.state.data}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item, index }) => {
                            return <ArticleMenu
                                article={item}
                                navigate={navigate}
                                isBookmarked={false}
                            />
                        }

                        }
                        refreshing={this.state.refreshing}
                        onRefresh={this.handleRefresh.bind(this)} />

                </Container>
            </Modal>
        )
    }
}
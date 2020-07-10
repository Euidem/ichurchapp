import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  I18nManager,
} from "react-native";
import {
  Container,
  Header,
  Body,
  Right,
  Left,
  Content,
  Card,
} from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalVariables } from "../../../globals";
import { AppLoading } from "expo";
import moment from "moment";
export default class Category extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data_devotionals: [],
      fontLoaded: false,
      data: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    this.loadPage();
    this.getDevotionals();
  }

  getDevotionals() {
    this.setState((prevState) => ({
      refreshing: !prevState.refreshing,
    }));
    fetch(GlobalVariables.apiDevotional)
      .then((res) => res.json())
      .then(({ allDevotionals }) => {
        this.setState({
          data: allDevotionals,
          refreshing: false,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState((prevState) => ({
          refreshing: !prevState.refreshing,
        }));
      });
  }

  async loadPage() {
    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Bold": require("../../Fonts/SFUIDisplay-Bold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  _renderRow({ item }) {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.screenProps.navigate("DevotionalDetails", {
              title: item.title,
              photo: item.photo,
              content: item.content,
              date: item.created_at,
              pageTitle: "Devotionals",
            })
          }
        >
          <Card style={styles.rowMain}>
            <Image source={{ uri: item.photo }} style={styles.images} />
            <View style={styles.newsContent}>
              <Text numberOfLines={1} style={styles.name}>
                {item.title}
              </Text>
              <Text numberOfLines={3} style={styles.comment}>
                {item.content.replace(/<\/?[^>]+(>|$)/g, '').replace(/&nbsp;/g, " ")}
              </Text>
              <View style={styles.followContent}>
                <View style={styles.likeContent}>
                  <Text style={styles.textStyle}>
                    {moment(item.updatedAt).format("ll")}
                  </Text>
                </View>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
  _keyExtractor = (item) => item._id;

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    const { navigation } = this.props;
    const showheader = navigation.getParam("showHeader", "NO-ID");
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <Container style={styles.main}>
        {showheader == "show" ? (
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => this.props.navigation.navigate("DrawerSocial")}
              >
                {I18nManager.isRTL ? (
                  <MaterialIcons name="chevron-right" size={45} color="white" />
                ) : (
                    <MaterialIcons name="chevron-left" size={45} color="white" />
                  )}
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle}>Devotionals</Text>
            </Body>
            <Right style={styles.right}></Right>
          </Header>
        ) : (
            <View></View>
          )}
        <View style={{ flex: 1 }}>
          <Image
            style={styles.headerImage}
            source={require("../../../assets/devotionals.jpeg")}
          />
          {!this.state.refreshing && this.state.data.length === 0 ? (
            <View style={{display:'flex', justifyContent:'center', alignContent:'center', flex:1, alignItems:'center'}}> 
              <Text style={{fontSize:20, fontWeight:'600'}} >No devotionals available</Text>
            </View>
          ) : 
          <FlatList
            data={this.state.data}
            onRefresh={() => this.getDevotionals()}
            refreshing={this.state.refreshing}
            extraData={this.state.data}
            renderItem={this._renderRow.bind(this)}
            enableEmptySections
            keyExtractor={this._keyExtractor.bind(this)}
          />
  }
        </View>
      </Container>
    );
  }
}

import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  FlatList,
  BackHandler,
  ScrollView,
  TouchableHighlight,
} from "react-native";

import { Container } from "native-base";
// Screen Styles
import styles from "./styles";
import styles2 from "./styles2";
import { View } from "react-native-animatable";
import { GlobalVariables } from "../../../globals";
import ScrollableTabView, {
  ScrollableTabBar,
} from "../react-native-scrollable-tab-view";
import { Linking } from "expo";
import Ionicons from "react-native-vector-icons/Ionicons";
//#endregion

export default class Social05 extends Component {
  loadBackHandler() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function () {
      that.props.navigation.navigate("DrawerSocial");
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data_about: {},
      dataSource: [],
    };
  }

  componentDidMount() {
    this.loadBackHandler();
    this.getAbout();
    this.getPastors();
  }

  getAbout() {
    fetch(GlobalVariables.apiURLAbout)
      .then((res) => res.json())
      .then(({ about }) => {
        this.setState({
          data_about: about[0],
        });
      })
      .catch((error) => {
        this.setState((prevState) => ({
          refreshing: !prevState.refreshing,
        }));
        console.warn(error);
      });
  }

  getPastors() {
    this.setState((prevState) => ({
      refreshing: !prevState.refreshing,
    }));
    fetch(GlobalVariables.apiURLPastors)
      .then((res) => res.json())
      .then(({ pastors }) => {
        this.setState({
          dataSource: pastors,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState((prevState) => ({
          refreshing: !prevState.refreshing,
        }));
      });
  }

  _renderRow({ item }) {
    return (
      <View>
        <View style={styles.rowMain}>
          <Image source={{ uri: item.photo }} style={styles.images} />
          <View style={styles.newsContent}>
            <Text numberOfLines={1} style={styles.name}>
              {item.fullname}
            </Text>
            <Text numberOfLines={3} style={styles.comment}>
              {item.bio}
            </Text>
            <View style={{ marginTop: 20 }}>
              <Text style={styles.comment}>Phone: {item.phoneNumber}</Text>
              <Text style={styles.comment}>Email: {item.email}</Text>
            </View>
          </View>
        </View>
        <View style={styles.separatorStyle} />
      </View>
    );
  }
  _keyExtractor = (item) => item._id;

  _handlePress = (link) => {
    Linking.openURL(link);
  };

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    const { data_about: item } = this.state;
    return (
      <Container style={styles.main}>
        <ScrollableTabView
          initialPage={0}
          tabBarUnderlineStyle={styles.tabUnderLine}
          tabBarBackgroundColor={"#2d324f"}
          tabBarActiveTextColor={"white"}
          tabBarInactiveTextColor={"rgba(255,255,255,0.4)"}
          tabBarTextStyle={styles.tabText}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <View tabLabel="About Us">
            <ScrollView>
              <View style={styles2.rowBg}>
                {item.postImage == "" ? null : (
                  <Image
                    style={styles2.postDescImage}
                    source={{ uri: item.photo }}
                  ></Image>
                )}
                <Text style={styles2.rowPostDescription}>{item.motto}</Text>
                <View style={[styles2.rowDescView, { flex: 1 }]}>
                  <Text style={styles2.rowDescTxt}>{item.description}</Text>
                  <Text style={{ marginTop: 15 }}></Text>
                </View>
                <View style={{ flexDirection: "row", padding: 10 }}>
                  <TouchableHighlight
                    onPress={() => this._handlePress(item.facebook)}
                  >
                    <Ionicons
                      name={"logo-facebook"}
                      size={25}
                      color={"#2d324f"}
                      style={{ margin: 5 }}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this._handlePress(item.twitter)}
                  >
                    <Ionicons
                      name={"logo-twitter"}
                      size={25}
                      color={"#1DA1F2"}
                      style={{ margin: 5 }}
                    />
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={() => this._handlePress(item.instagram)}
                  >
                    <Ionicons
                      name={"logo-instagram"}
                      size={25}
                      color={"#E1306C"}
                      style={{ margin: 5 }}
                    />
                  </TouchableHighlight>
                </View>
              </View>
            </ScrollView>
          </View>

          <View tabLabel="Our Pastors">
            <FlatList
              contentContainerStyle={styles.listContent}
              extraData={this.state.dataSource}
              renderItem={this._renderRow.bind(this)}
              renderSeparator={this._renderSeparator}
              enableEmptySections
              data={this.state.dataSource}
              keyExtractor={this._keyExtractor.bind(this)}
              refreshing={this.state.refreshing}
            />
          </View>
        </ScrollableTabView>
      </Container>
    );
  }
}

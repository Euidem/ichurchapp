import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  View,
  Button,
  Vibration,
  FlatList,
} from "react-native";
import { Content, Card, Container } from "native-base";
// Screen Styles
import styles from "./styles";
import { GlobalVariables } from "../../../globals";
import { AppLoading, Notifications } from "expo";
import moment from "moment";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fontLoaded: false,
      notification: {},
      expoPushToken: "",
      data: [],
      refreshing: false,
    };
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

  registerForPushNotificationsAsync = async () => {
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        alert("Failed to get push token for push notification!");
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      const data = {
        token,
      };
      fetch(GlobalVariables.tokenAPI, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((result) => {
          //console.log(result);
        })
        .catch((error) => {
          console.log(error);
        });
      this.setState({ expoPushToken: token });
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    this.registerForPushNotificationsAsync();
    this.loadPage();
    this.getSermons();
    this._notificationSubscription = Notifications.addListener(
      this._handleNotification
    );
  }

  _handleNotification = (notification) => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };

  getSermons = () => {
    this.setState((prevState) => ({
      refreshing: !prevState.refreshing,
    }));
    fetch(GlobalVariables.allSermons)
      .then((res) => res.json())
      .then(({ sermons }) => {
        this.setState({
          data: sermons,
          refreshing: false,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState((prevState) => ({
          refreshing: !prevState.refreshing,
        }));
      });
  };

  renderItem({ item }) {
    return (
      <View style={{ marginRight: 10, marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() =>
            this.props.screenProps.navigate("SermonTabSingle", {
              title: item.title,
              photo: item.photo,
              description: item.description,
              audioUrl: item.audioUrl,
              youtubeUrl: item.youtubeUrl,
              preacher: item.preacher,
              date: item.created_at,
            })
          }
        >
          <View>
            <Card style={styles.rowMain}>
              <Image source={{ uri: item.photo }} style={styles.images} />
              <View style={styles.newsContent}>
                <Text numberOfLines={1} style={styles.name}>
                  {item.title}
                </Text>
                <Text numberOfLines={3} style={styles.comment}>
                  {item.description}
                </Text>
                <View style={styles.likeContent}>
                  <Text style={styles.textStyle}>
                    By: {item.preacher} on {moment(item.updatedAt).format("ll")}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
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
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <Container>
        <View style={{ flex: 1 }}>
          <Image
            style={styles.headerImage}
            source={require("../../../assets/sermons1.jpg")}
          />
          <FlatList
            refreshing={this.state.refreshing}
            onRefresh={() => this.getSermons()}
            data={this.state.data}
            extraData={this.state.data}
            renderItem={this.renderItem.bind(this)}
            keyExtractor={this._keyExtractor.bind(this)}
            enableEmptySections
          />
        </View>
      </Container>
    );
  }
}

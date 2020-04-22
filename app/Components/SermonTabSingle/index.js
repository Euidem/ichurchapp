import React, { Component } from "react";
import {
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
  Share,
  TouchableHighlight,
} from "react-native";

// Screen Styles
import styles from "./styles";
import { WebView } from "react-native-webview";
import { View } from "react-native-animatable";
import { Right, Left, Card, Body, Header, Icon, Content } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Metrics } from "../../Themes/";
import { Audio } from "expo-av";
export default class SermonTabSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    };
    this.soundObject = new Audio.Sound();
  }
  renderFooter() {
    return (
      <View style={{ justifyContent: "center", flex: 1, margin: 10 }}>
        <ActivityIndicator
          animating={this.state.isLoading}
          size="large"
          color="#e22626"
        />
      </View>
    );
  }

  pauseAudio = async () => {
    this.soundObject.pauseAsync();
    this.setState({ playing: false });
  };

  startAudio = async () => {
    const audioUrl = this.props.navigation.getParam("audioUrl", "");
    try {
      await this.soundObject.loadAsync({
        uri: audioUrl,
      });
    } catch (error) {
      console.log(error);
      // An error occurred!
    }
  };

  playAudio = async () => {
    await this.soundObject.playAsync();
    this.setState({ playing: true, isLoading: false });
    // Your sound is playing!
  };

  componentDidMount() {
    this.startAudio();
  }

  onShare = (preacher, title) => {
    try {
      const result = Share.share({
        message: `Enjoy this preaching from ${preacher} titled  ${title}. Get the the iChurch App on playstore now ! https://playstore.com/url`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  render() {
    const { goBack } = this.props.navigation;
    //get the parameters

    const { navigation } = this.props;
    const title = navigation.getParam("title", "NO-ID");
    const description = navigation.getParam("description", "");
    const youtubeUrl = navigation.getParam("youtubeUrl", "");
    const preacher = navigation.getParam("preacher", "");
    const date = navigation.getParam("date", "");
    const { playing } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity style={styles.backArrow} onPress={() => goBack()}>
              {I18nManager.isRTL ? (
                <MaterialIcons name="chevron-right" size={45} color="white" />
              ) : (
                <MaterialIcons name="chevron-left" size={45} color="white" />
              )}
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}> {title}</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity onPress={() => this.onShare(preacher, title)}>
              <Ionicons name="ios-share" size={25} color="white" />
            </TouchableOpacity>
          </Right>
        </Header>

        <Content>
          <View
            style={{
              height: Dimensions.get("window").height / 2,
              width: Dimensions.get("window").width,
            }}
          >
            <WebView
              source={{
                uri: youtubeUrl,
              }}
            />
          </View>

          <Card
            style={{
              paddingTop: 30,
              paddingBottom: 30,
              paddingLeft: 8,
              paddingRight: 8,
              margin: 10,
            }}
          >
            <View
              style={{
                marginBottom: 30,
                alignContent: "center",
              }}
            >
              <Text style={[styles.textTitle, { color: "black" }]}>
                Live Audio
              </Text>
              {playing ? (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={this.pauseAudio}
                  style={styles.audioIcon}
                >
                  <Icon
                    name="pause-circle"
                    type="MaterialCommunityIcons"
                    style={{ fontSize: 60 }}
                  />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  underlayColor="transparent"
                  onPress={this.playAudio}
                  style={styles.audioIcon}
                >
                  <Icon
                    name="ios-play-circle"
                    type="Ionicons"
                    style={{ fontSize: 60 }}
                  />
                </TouchableHighlight>
              )}
            </View>
            <Text style={styles.rowPostDescription}>{title}</Text>
            <View style={styles.postDateView}>
              <Text style={[styles.postAuthorDate, { color: "#adadad" }]}>
                by: {preacher}
              </Text>
              <Text
                style={[
                  styles.postAuthorDate,
                  {
                    color: "#adadad",
                    marginLeft: Metrics.WIDTH * 0.025,
                  },
                ]}
              >
                {date}
              </Text>
            </View>
            <View style={styles.rowDescView}>
              <Text style={styles.rowDescTxt}>{description}</Text>
              <Text style={{ marginTop: 15 }}></Text>
            </View>
          </Card>
        </Content>
      </View>
    );
  }
}

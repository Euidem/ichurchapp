import React, { Component } from "react";
import {
  Text,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  I18nManager,
  Image,
  TouchableHighlight
} from "react-native";

// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import { Right, Left, Body, Header, Icon, Spinner } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalVariables } from "../../../globals";
import { LinearGradient } from "expo-linear-gradient";
import { Audio } from "expo-av";

export default class SermonTabSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      playing: false
    };
    this.soundObject = new Audio.Sound();
  }

  componentDidMount() {
    this.getAudioLink();
  }

  getAudioLink = () => {
    fetch(GlobalVariables.apiLiveStream)
      .then(res => res.json())
      .then(({ streamUrl }) => {
        this.setState({
          data_live_audio: streamUrl[0].audioUrl
        });
        this.startAudio(streamUrl[0].audioUrl);
      });
  };

  pauseAudio = async () => {
    this.soundObject.pauseAsync();
    this.setState({ playing: false });
  };

  startAudio = async url => {
    try {
      await this.soundObject.loadAsync({
        uri: url
      });
      this.playAudio();
    } catch (error) {
      console.log(error);
      // An error occurred!
    }
  };

  playAudio = async () => {
    await this.soundObject.playAsync();
    this.setState({ playing: true, isLoading: false });
  };

  render() {
    const { goBack } = this.props.navigation;
    const { data_live_audio, playing, isLoading } = this.state;
    //get the parameters

    return (
      <View style={{ backgroundColor: "#000" }}>
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
            <Text style={styles.textTitle}> Live Audio</Text>
          </Body>
          <Right style={styles.right}>
            <TouchableOpacity onPress={() => alert("Share")}>
              {/*     <Ionicons name="ios-share" size={25} color='white'/>   */}
            </TouchableOpacity>
          </Right>
        </Header>

        <LinearGradient
          colors={["#4c669f", "#3b5998", "#192f6a"]}
          style={{
            alignItems: "center",
            borderRadius: 5,
            height: Dimensions.get("window").height
          }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "space-around"
            }}
          >
            <View>
              <Image
                style={styles.images}
                source={require("../../../assets/audio.jpeg")}
              />
            </View>
            {isLoading ? (
              <Spinner />
            ) : (
              <View style={{ alignItems: "center", marginBottom: 30 }}>
                {playing ? (
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={this.pauseAudio}
                  >
                    <Icon
                      name="pause-circle"
                      type="MaterialCommunityIcons"
                      style={{ fontSize: 60, color: "white" }}
                    />
                  </TouchableHighlight>
                ) : (
                  <TouchableHighlight
                    underlayColor="transparent"
                    onPress={this.playAudio}
                  >
                    <Icon
                      name="ios-play-circle"
                      type="Ionicons"
                      style={{ fontSize: 60, color: "white" }}
                    />
                  </TouchableHighlight>
                )}
              </View>
            )}
          </View>
        </LinearGradient>
      </View>
    );
  }
}

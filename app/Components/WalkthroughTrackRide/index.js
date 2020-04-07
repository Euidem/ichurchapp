import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Image,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  BackHandler,
  AsyncStorage,
} from "react-native";
import { Container } from "native-base";
import Swiper from "react-native-swiper";
import { AppLoading } from "expo";
// Screen Styles
import styles from "./styles";

export default class WalkthroughTrackRide extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentWillMount() {
    const token = await AsyncStorage.getItem("user_id");
    if (token && token !== undefined) {
      this.props.navigation.navigate("DrawerSocial");
    }
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function () {
      that.props.navigation.navigate("WalkthroughScreen");
      return true;
    });

    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Semibold": require("../../Fonts/SFUIDisplay-Semibold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;

    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    let swiperImage = {
      uri:
        "https://antiqueruby.aliansoftware.net//Images/walkthrough/ic_map_wteight.png",
    };

    var data = [
      {
        id: 1,
        image: require("../../../assets/livestream.jpg"),
        title: "Live Stream",
        description:
          "Never miss a moment, live stream church activities from wherever you are as they happen.",
      },
      {
        id: 2,
        image: require("../../../assets/events.jpg"),
        title: "Events",
        description: "Find and be a part of events in-person or online.",
      },
      {
        id: 3,
        image: require("../../../assets/sermon.jpg"),
        title: "Devotionals",
        description:
          "Get a daily devotional from your favorite pastors, watch and listen to them at your leisure.",
      },
      {
        id: 4,
        image: require("../../../assets/pastor2.jpg"),
        title: "Sermons",
        description:
          "Never miss a service again, watch sermons as delivered by your favorite pastor.",
      },
    ];

    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }

    return (
      <Container style={styles.container}>
        <Swiper
          showsButtons={false}
          autoplay={true}
          autoplayTimeout={2.5}
          activeDot={<View style={styles.activeDot} />}
          dot={<View style={styles.dot} />}
        >
          {data.map((item, index) => {
            return (
              <View style={styles.slide} key={index}>
                <ImageBackground style={styles.sliderImage}>
                  <Image source={item.image} style={styles.imageStyle} />
                </ImageBackground>
                <View style={styles.contentStyle}>
                  <Text style={styles.headertext}>{item.title}</Text>
                  <Text numberOfLines={3} style={styles.desctext}>
                    {item.description}
                  </Text>

                  <TouchableOpacity
                    ref={(component) => (this.touchable = component)}
                    style={styles.signInbtn}
                    onPress={() => {
                      this.props.navigation.navigate("LoginScreen");
                    }}
                  >
                    <Text style={styles.buttongetstarted}> GET STARTED</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}
        </Swiper>
      </Container>
    );
  }
}

import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  ImageBackground,
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Icon,
} from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";

export default class Event extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  loadPage() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function () {
      that.props.navigation.navigate("Social");
      return true;
    });
  }
  componentDidMount() {
    this.loadPage();
  }

  render() {
    const { goBack } = this.props.navigation;
    const { navigation } = this.props;
    const title = navigation.getParam("title", "NO-ID");
    const photo = navigation.getParam("photo", "");
    const content = navigation.getParam("content", "");
    const item = navigation.getParam("item", "");
    const pageTitle = navigation.getParam("pageTitle", "");
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
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
            <Text style={styles.textTitle}>{pageTitle}</Text>
          </Body>
          <Right style={styles.right}></Right>
        </Header>
        <Content>
          <View
            style={styles.rowMainView}
            animation="bounceInRight"
            duration={100}
            delay={400}
          >
            <View style={styles.lastRowBg}>
              <View style={styles.postDescImage}>
                <ImageBackground
                  blurRadius={1}
                  source={{ uri: photo }}
                  style={styles.img}
                >
                  <Text style={styles.rowPostDescription}>
                    {title.replace(/<\/?[^>]+(>|$)/g, "")}
                  </Text>
                </ImageBackground>
              </View>
              <View style={styles.lastRowBg}>
                <View style={styles.sectionContainer}>
                  <View style={styles.iconsContainer}>
                    <Icon name="calendar" style={styles.icons} />
                    <Text style={styles.textStyle}>
                      {moment(item.start.date).format("ll")} -{" "}
                      {moment(item.end.date).format("ll")}
                    </Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    <Icon name="clock" style={styles.icons} />
                    <Text style={styles.textStyle}>
                      {item.start.time} - {item.end.time}
                    </Text>
                  </View>
                  <View style={styles.iconsContainer}>
                    <Icon
                      name="location-pin"
                      type="SimpleLineIcons"
                      style={styles.icons}
                    />
                    <Text style={styles.textStyle}>{item.location}</Text>
                  </View>
                </View>
                <View style={styles.dividerHorizontal} />
                <View style={styles.sectionContainer}>
                  <View>
                    <Text style={styles.sectionTitle}>Description</Text>
                    <Text style={styles.rowDescTxt}>
                      {content.replace(/<\/?[^>]+(>|$)/g, "")}
                    </Text>
                  </View>
                  <View>
                    <Text style={styles.sectionTitle}>Cost</Text>
                    <Text style={styles.rowDescTxt}>{item.cost}</Text>
                  </View>
                  <View>
                    <Text style={styles.sectionTitle}>Recurring</Text>
                    <Text style={styles.rowDescTxt}>
                      {item.recurring ? "Yes" : "No"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

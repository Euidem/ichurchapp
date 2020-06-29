import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  StyleSheet,
} from "react-native";
import { Container, Right, Left, Content, Body, Header } from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import HTMLView from 'react-native-htmlview';

export default class NewsDetails extends Component {
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
    const htmlContent = `<html>${ content }</html>`;

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
              <Image source={{ uri: photo }} style={styles.postDescImage} />
              <Text style={styles.rowPostDescription}>
                {title}
              </Text>
              <View style={styles.rowDescView}>
                <HTMLView
                  value={htmlContent}
                  stylesheet={htmlStyles}
                />
              </View>
              <View style={styles.dividerHorizontal} />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const htmlStyles = StyleSheet.create({
  p: {
    fontSize: 16,
    textAlign: 'justify'
  },
});
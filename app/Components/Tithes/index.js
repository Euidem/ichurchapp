import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  FlatList,
  I18nManager,
} from "react-native";
import { Container, Right, Left, Content, Body, Header } from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalVariables } from "../../../globals";

/**
 *  Social Screen
 */
export default class Social03 extends Component {
  loadBackHandler() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function () {
      that.props.navigation.navigate("Social");
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      contribution_types: [],
    };
  }

  componentDidMount() {
    this.loadBackHandler();
    fetch(GlobalVariables.apiPayments)
      .then((res) => res.json())
      .then(({ types }) => {
        this.setState({
          contribution_types: types,
        });
      })
      .catch((error) => console.warn(error));
  }

  clickEventListener = (item) => {
    this.props.navigation.navigate("Payment", {
      item: item,
    });
  };

  render() {
    const { goBack } = this.props.navigation;
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
            <Text style={styles.textTitle}>Payments</Text>
          </Body>
          <Right style={styles.right}></Right>
        </Header>
        <Content>
          <View style={styles.container}>
            <FlatList
              style={styles.contentList}
              columnWrapperStyle={styles.listContainer}
              data={this.state.contribution_types}
              keyExtractor={(item) => {
                return item._id;
              }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    style={styles.card}
                    onPress={() => {
                      this.clickEventListener(item);
                    }}
                  >
                    <Image
                      style={styles.image}
                      source={require("../../../assets/events1.jpg")}
                    />
                    <View style={styles.cardContent}>
                      <Text style={styles.name}>{item.type}</Text>
                      <TouchableOpacity
                        style={styles.followButton}
                        onPress={() => this.clickEventListener(item)}
                      >
                        <Text style={styles.followButtonText}>Pay </Text>
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

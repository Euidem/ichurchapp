import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler,
  FlatList,
  I18nManager,
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Card,
} from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { GlobalVariables } from "../../../globals";

export default class Social03 extends Component {
  componentDidMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function () {
      that.props.navigation.navigate("Social");
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      events: [],
      show_progressbar: true,
    };

    fetch(GlobalVariables.apiEvents)
      .then((res) => res.json())
      .then(({ events }) => {
        this.setState({ show_progressbar: false });
        this.setState({
          events,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState({ show_progressbar: false });
      });
  }
  renderItem({ item, id }) {
    return (
      <TouchableOpacity
        style={{ marginRight: 5, marginLeft: 5 }}
        onPress={() =>
          this.props.navigation.navigate("Event", {
            title: item.eventName,
            photo: item.featuredImage,
            content: item.notes,
            item,
            pageTitle: "Event Details",
          })
        }
      >
        <Card
          style={
            id === this.state.events.length - 1
              ? styles.lastRowBg
              : styles.rowBg
          }
        >
          <View style={styles.rowHeaderView}>
            <View style={styles.rowHeaderNameView}>
              <Text style={styles.rowNameTxt}>{item.eventName}</Text>
              <View style={styles.dividerHorizontal} />
              <Text style={styles.rowTimeTxt}>
                {item.start.date} at {item.start.time}
              </Text>
            </View>
          </View>
          <Image
            style={styles.postDescImage}
            source={{ uri: item.featuredImage }}
          />
          <View style={styles.descriptionView}>
            <Text numberOfLines={3} style={styles.rowDescTxt}>
              {item.notes.replace(/<\/?[^>]+(>|$)/g, "")}
            </Text>
          </View>
        </Card>
      </TouchableOpacity>
    );
  }
  keyExtractor = (item) => item._id;
  render() {
    const { goBack } = this.props.navigation;
    const { navigation } = this.props;
    const showheader = navigation.getParam("showHeader", "NO-ID");
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }

    return (
      <Container style={styles.main}>
        {showheader == "show" && (
          <Header style={styles.header}>
            <Left style={styles.left}>
              <TouchableOpacity
                style={styles.backArrow}
                onPress={() => goBack()}
              >
                {I18nManager.isRTL ? (
                  <MaterialIcons name="chevron-right" size={45} color="white" />
                ) : (
                  <MaterialIcons name="chevron-left" size={45} color="white" />
                )}
              </TouchableOpacity>
            </Left>
            <Body style={styles.body}>
              <Text style={styles.textTitle}>Upcoming Events</Text>
            </Body>
            <Right style={styles.right}>
              <TouchableOpacity onPress={() => alert("Search")}>
                <Ionicons name="ios-search" size={25} color="white" />
              </TouchableOpacity>
            </Right>
          </Header>
        )}

        <Content>
          <Image
            style={styles.headerImage}
            source={require("../../../assets/events1.jpg")}
          />
          {this.state.show_progressbar && (
            <ActivityIndicator size="large" color="#666" />
          )}
          <View
            style={styles.rowMainView}
            animation="bounceInDown"
            duration={100}
            delay={400}
          >
            <FlatList
              renderItem={this.renderItem.bind(this)}
              data={this.state.events}
              extraData={this.state.data_about}
              keyExtractor={this.keyExtractor.bind(this)}
            />
          </View>
        </Content>
      </Container>
    );
  }
}

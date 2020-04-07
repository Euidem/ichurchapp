import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  Dimensions,
  AsyncStorage,
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Input,
  Item,
} from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";

export default class NewsDetails extends Component {
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
      comments: [],
      comment: "",
      allowComments: false,
      current: 0,
    };
  }

  componentDidMount() {
    this.loadBackHandler();
    //check if user is logged in
    this.confirmStatus();
    //get comments
    this.getComments();
  }

  async confirmStatus() {
    let userId = await AsyncStorage.getItem("user_id");
    if (userId) {
      this.setState({ allowComments: true, current: userId });
    }
  }
  getComments() {
    //Retrieve comments from API
  }

  submit = () => {
    let { comment, comments, current } = this.state;
    let data = {
      profilePicture: "https://loremflickr.com/320/240/dog",
      name: "Chris Evans",
      comment,
      user_id: current % 2 === 0 ? 1 : 2,
      created_at: moment().format("LLL"),
    };
    //Save comment to api

    //Update UI with comment
    comments.push(data);
    current++;
    this.setState({ comments, comment: "", current });
  };

  renderItem = ({ item }) => (
    <View
      style={{
        padding: 12,
        backgroundColor: item.user_id === 1 ? "#316d9f" : "#0d1c3d",
        flex: 1,
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ marginLeft: 10, flex: 1 }}>
          <Text style={styles.messageSender}>
            {item.firstName} {item.lastName}
          </Text>
        </View>
      </View>
    </View>
  );

  keyExtractor = (item) => item.firstName + item.lastName;

  render() {
    const { goBack } = this.props.navigation;
    const { navigation } = this.props;
    const pageTitle = navigation.getParam("pageTitle", "");
    const title = navigation.getParam("title", "NO-ID");
    const photo = navigation.getParam("photo", "");
    const content = navigation.getParam("description", "");
    const item = navigation.getParam("item", "");
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
        <Content style={{ flex: 1 }}>
          <View
            style={styles.rowMainView}
            animation="bounceInRight"
            duration={100}
            delay={400}
          >
            <View style={styles.lastRowBg}>
              <Image source={{ uri: photo }} style={styles.postDescImage} />
              <Text style={styles.rowPostDescription}>
                {title.replace(/<\/?[^>]+(>|$)/g, "")}
              </Text>
              <View style={styles.rowDescView}>
                <Text style={styles.rowDescTxt}>
                  {content.replace(/<\/?[^>]+(>|$)/g, "")}
                </Text>
              </View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.likeCommentShareView}></View>
            </View>
          </View>
          <View
            style={[styles.rowMainView, { marginTop: 20 }]}
            animation="bounceInRight"
            duration={100}
            delay={400}
          >
            <View style={styles.lastRowBg}>
              <View style={styles.rowDescView}>
                <Text
                  style={[
                    styles.rowDescTxt,
                    {
                      textAlign: "center",
                      fontWeight: "700",
                      fontSize: 18,
                    },
                  ]}
                >
                  Details
                </Text>
              </View>
              <View style={styles.dividerHorizontal} />
              <View style={styles.sectionContainer}>
                <View>
                  <Text style={styles.sectionTitle}>Group Leader</Text>
                  <Text>
                    {item.groupLeader[0].firstName}{" "}
                    {item.groupLeader[0].lastName}
                  </Text>
                </View>
                <View>
                  <Text style={styles.sectionTitle}>Total Members</Text>
                  <Text>{item.totalMembers}</Text>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.lastRowBg}>
            <View style={styles.rowDescView}>
              <Text
                style={[
                  styles.rowDescTxt,
                  {
                    textAlign: "center",
                    fontWeight: "700",
                    fontSize: 18,
                  },
                ]}
              >
                Members
              </Text>
            </View>
            <View style={styles.dividerHorizontal} />
            <View style={styles.sectionContainer}>
              <FlatList
                data={item.members}
                extraData={item.members}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={this.keyExtractor.bind(this)}
                ItemSeparatorComponent={() => (
                  <View
                    style={{
                      height: 1,
                      backgroundColor: "white",
                    }}
                  />
                )}
              />
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

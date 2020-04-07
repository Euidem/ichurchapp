import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  BackHandler,
  I18nManager,
  AsyncStorage
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Input,
  Form,
  Button,
  Item
} from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import moment from "moment";
import { FlatList } from "react-native-gesture-handler";
import { GlobalVariables } from "../../../globals";
export default class NewsDetails extends Component {
  componentWillMount() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function() {
      that.props.navigation.navigate("Social");
      return true;
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      comment: "",
      newsId: "",
      allowComments: false
    };
  }

  componentDidMount() {
    this.confirmStatus();
    this.getComments();
  }

  async confirmStatus() {
    let userId = await AsyncStorage.getItem("user_id");
    if (userId) {
      this.setState({ allowComments: true });
    }
  }
  getComments() {
    //Retrieve comments from API
    const { navigation } = this.props;
    const comments = navigation.getParam("comments", "");
    const newsId = navigation.getParam("id", "");
    comments.length > 0 && comments.reverse();
    this.setState({ comments, newsId });
  }

  submit = () => {
    let { comment, comments } = this.state;
    const data = {
      comment
    };
    fetch(`${GlobalVariables.apiNewsComment}/${this.state.newsId}`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.warn(error);
      });
    //Update UI with comment
    comments.unshift(comment);
    this.setState({ comments, comment: "" });
  };

  renderItem = ({ item }) => (
    <View style={{ padding: 15 }}>
      <View style={{ flexDirection: "row" }}>
        <View>
          <Image
            source={require("../../../assets/avatar.png")}
            style={{ width: 40, height: 40, borderRadius: 20 }}
          />
        </View>
        <View>
          <Text style={{ margin: 5, fontSize: 14 }}>{item}</Text>
        </View>
      </View>
    </View>
  );

  keyExtractor = item => item;

  render() {
    const { goBack } = this.props.navigation;
    const { navigation } = this.props;
    const title = navigation.getParam("title", "NO-ID");
    const photo = navigation.getParam("photo", "");
    const content = navigation.getParam("content", "");
    const pageTitle = navigation.getParam("pageTitle", "");

    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }

    let { comments, comment, allowComments } = this.state;

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
            <View style={styles.lastRowBg}>
              {comments.length > 0 && (
                <Text
                  style={{
                    textAlign: "center",
                    fontSize: 20,
                    padding: 15
                  }}
                >
                  Comments
                </Text>
              )}
              <FlatList
                data={comments}
                extraData={comments}
                renderItem={this.renderItem.bind(this)}
                keyExtractor={this.keyExtractor.bind(this)}
                ItemSeparatorComponent={() => (
                  <View style={styles.dividerHorizontal} />
                )}
              />
            </View>
          </View>
          {allowComments ? (
            <Form
              style={{
                bottom: 0,
                position: "fixed",
                width: "100%"
              }}
            >
              <Item regular>
                <Input
                  placeholder="Write comment"
                  onChangeText={text => this.setState({ comment: text })}
                  returnKeyType="send"
                  onSubmitEditing={this.submit.bind(this)}
                  value={comment}
                />
              </Item>
            </Form>
          ) : (
            <TouchableOpacity
              info
              style={styles.signInbtn}
              onPress={() => this.props.navigation.navigate("LoginScreen")}
            >
              <Text autoCapitalize="words" style={styles.buttongetstarted}>
                Sign In to make comments
              </Text>
            </TouchableOpacity>
          )}
        </Content>
      </Container>
    );
  }
}

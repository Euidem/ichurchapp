import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  FlatList,
  AsyncStorage,
  I18nManager
} from "react-native";
import { Container, Header, Body, Right, Left, Card } from "native-base";
// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalVariables } from "../../../globals";
import { AppLoading } from "expo";

export default class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data_devotionals: [],
      fontLoaded: false,
      data: [],
      refreshing: false,
      loggedIn: false
    };
  }

  componentDidMount() {
    this.getDevotionals();
    this.confirmStatus();
  }

  async confirmStatus() {
    let userId = await AsyncStorage.getItem("user_id");
    if (userId) {
      this.setState({ loggedIn: true });
    }
  }

  getDevotionals() {
    this.setState(prevState => ({ refreshing: !prevState.refreshing }));
    fetch(GlobalVariables.apiGroups)
      .then(res => res.json())
      .then(({ groups }) => {
        this.setState({
          data: groups,
          refreshing: false
        });
      })
      .catch(error => {
        console.warn(error);
        this.setState(prevState => ({ refreshing: !prevState.refreshing }));
      });
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Bold": require("../../Fonts/SFUIDisplay-Bold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  _renderRow({ item }) {
    return (
      <View>
        <TouchableOpacity
          onPress={() =>
            this.props.navigation.navigate("SingleGroup", {
              title: item.groupName,
              photo: item.photo,
              description: item.groupDescription,
              date: item.created_at,
              item,
              pageTitle: item.groupName
            })
          }
        >
          <Card style={styles.rowMain}>
            <Image source={{ uri: item.photo }} style={styles.images} />
            <View style={styles.newsContent}>
              <Text numberOfLines={1} style={styles.name}>
                {item.groupName}
              </Text>
              <Text numberOfLines={3} style={styles.comment}>
                {item.groupDescription}
              </Text>
              <View style={styles.followContent}>
                <Text style={styles.textStyle}>
                  {item.groupLeader[0] && "Group Leader: "}
                  {item.groupLeader[0]?.firstName}{" "}
                  {item.groupLeader[0]?.lastName}
                </Text>
              </View>
            </View>
          </Card>
        </TouchableOpacity>
      </View>
    );
  }
  _keyExtractor = item => item._id;

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    const { navigation } = this.props;
    const showheader = navigation.getParam("showHeader", "NO-ID");
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    const { loggedIn } = this.state;
    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("DrawerSocial")}
            >
              {I18nManager.isRTL ? (
                <MaterialIcons name="chevron-right" size={45} color="white" />
              ) : (
                <MaterialIcons name="chevron-left" size={45} color="white" />
              )}
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Groups</Text>
          </Body>
          <Right style={styles.right}></Right>
        </Header>

        {loggedIn ? (
          <View style={{ flex: 1 }}>
            <Image
              style={styles.headerImage}
              source={require("../../../assets/groups.jpg")}
            />
            <FlatList
              contentContainerStyle={styles.listContent}
              data={this.state.data}
              onRefresh={() => this.getDevotionals()}
              refreshing={this.state.refreshing}
              extraData={this.state.data}
              renderItem={this._renderRow.bind(this)}
              renderSeparator={this._renderSeparator}
              enableEmptySections
              keyExtractor={this._keyExtractor.bind(this)}
            />
          </View>
        ) : (
          <TouchableOpacity
            info
            style={styles.signInbtn}
            onPress={() => this.props.navigation.navigate("LoginScreen")}
          >
            <Text autoCapitalize="words" style={styles.buttongetstarted}>
              Sign In to see groups
            </Text>
          </TouchableOpacity>
        )}
      </Container>
    );
  }
}

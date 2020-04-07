import React, { Component } from "react";
import {
  Text,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Content, Card, Container } from "native-base";
// Screen Styles
import styles from "./styles";
import { GlobalVariables } from "../../../globals";
import { AppLoading } from "expo";
import moment from "moment";
export default class MenuScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      fontLoaded: false,
      data: [],
      refreshing: false,
    };
  }

  async loadPage() {
    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Bold": require("../../Fonts/SFUIDisplay-Bold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  componentDidMount() {
    this.loadPage();
    this.getSermons();
  }

  getSermons = () => {
    this.setState((prevState) => ({
      refreshing: !prevState.refreshing,
    }));
    fetch(GlobalVariables.allSermons)
      .then((res) => res.json())
      .then(({ sermons }) => {
        this.setState({
          data: sermons,
          refreshing: false,
        });
      })
      .catch((error) => {
        console.warn(error);
        this.setState((prevState) => ({
          refreshing: !prevState.refreshing,
        }));
      });
  };

  renderItem({ item }) {
    return (
      <View style={{ marginRight: 10, marginLeft: 10 }}>
        <TouchableOpacity
          onPress={() =>
            this.props.screenProps.navigate("SermonTabSingle", {
              title: item.title,
              photo: item.photo,
              description: item.description,
              audioUrl: item.audioUrl,
              youtubeUrl: item.youtubeUrl,
              preacher: item.preacher,
              date: item.created_at,
            })
          }
        >
          <View>
            <Card style={styles.rowMain}>
              <Image source={{ uri: item.photo }} style={styles.images} />
              <View style={styles.newsContent}>
                <Text numberOfLines={1} style={styles.name}>
                  {item.title}
                </Text>
                <Text numberOfLines={3} style={styles.comment}>
                  {item.description}
                </Text>
                <View style={styles.likeContent}>
                  <Text style={styles.textStyle}>
                    By: {item.preacher} on {moment(item.updatedAt).format("ll")}
                  </Text>
                </View>
              </View>
            </Card>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  _keyExtractor = (item) => item._id;

  render() {
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("#2d324f", true);
      StatusBar.setTranslucent(true);
    }
    if (!this.state.fontLoaded) {
      return <AppLoading />;
    }
    return (
      <Container>
        <Image
          style={styles.headerImage}
          source={require("../../../assets/sermons1.jpg")}
        />
        <View style={styles.main}>
          <View style={{ flex: 1 }}>
            <FlatList
              refreshing={this.state.refreshing}
              onRefresh={() => this.getSermons()}
              data={this.state.data}
              extraData={this.state.data}
              renderItem={this.renderItem.bind(this)}
              keyExtractor={this._keyExtractor.bind(this)}
              enableEmptySections
            />
          </View>
        </View>
      </Container>
    );
  }
}

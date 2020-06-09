import React, { Component } from "react";
import {
  Text,
  Dimensions,
  TouchableOpacity,
  I18nManager,
  AsyncStorage,
  Alert
} from "react-native";

// Screen Styles
import styles from "./styles";
import { View } from "react-native-animatable";
import { Right, Left, Body, Header, Spinner, Button } from "native-base";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalVariables } from "../../../globals";
import { WebView } from "react-native-webview";

export default class SermonTabSingle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      data_live_tv: "",
      loading: true
    };
  }

  componentDidMount() {
    fetch(GlobalVariables.apiLiveStream)
      .then(res => res.json())
      .then(({ streamUrl }) => {
        this.setState({
          data_live_tv: streamUrl[0].videoUrl,
          loading: false
        });
      })
      .catch(error => {
        console.warn(error);
        alert("error loadinig live video");
      });
  }
  memberCheckIn = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    const url = `${ GlobalVariables.checkInAPI }${ userId }`;
    console.log(url)
    fetch(url, {
      method: 'POST'
    }).then(res => res.json()).then(result => {
      Alert.alert("Success", result.message)
    }).catch(error => {
      console.log(error)
    })
  }
  render() {
    const { goBack } = this.props.navigation;
    const { data_live_tv, loading } = this.state;
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

          <Right style={styles.right}>
            <Button onPress={this.memberCheckIn}>
              <Text style={[styles.textTitle, { fontWeight: '600' }]}>Check In</Text>
            </Button>
          </Right>
        </Header>

        <View style={styles.main}>
          {loading ? (
            <Spinner />
          ) : (
              <View
                style={{
                  height: Dimensions.get("window").height,
                  width: Dimensions.get("window").width
                }}
              >
                <WebView source={{ uri: data_live_tv }} />
              </View>
            )}
        </View>
      </View>
    );
  }
}

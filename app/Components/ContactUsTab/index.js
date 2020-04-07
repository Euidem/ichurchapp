import React, { Component } from "react";
import {
  Text,
  StatusBar,
  Platform,
  View,
  Image,
  AsyncStorage,
  Alert
} from "react-native";
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Picker,
  Button,
  Icon,
  Card
} from "native-base";
// Screen Styles
import styles from "./styles";
import { GlobalVariables } from "../../../globals";
import { AppLoading } from "expo";

export default class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      selected2: undefined,
      loading: false,
      content: ""
    };
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Semibold": require("../../Fonts/SFUIDisplay-Semibold.ttf")
    });
    this.setState({ fontLoaded: true });
  }

  onValueChange2(value) {
    this.setState({
      selected2: value
    });
  }

  submitContact = async () => {
    this.setState({ loading: true });
    const { selected2, content } = this.state;
    const data = {
      content,
      type: selected2
    };
    const token = await AsyncStorage.getItem("user_id");
    if (token && token !== undefined) {
      fetch(GlobalVariables.contactAPI, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(data)
      })
        .then(response =>
          response.json().then(result => {
            this.setState({ loading: false });
            if (result.statusCode === 200) {
              Alert.alert("Contact form submitted successfully...");
            }
          })
        )
        .catch(error => {
          console.log(error);
        });
    }
  };

  render() {
    const { fontLoaded, loading } = this.state;
    StatusBar.setBarStyle("light-content", true);
    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }
    if (!fontLoaded) {
      return <AppLoading />;
    }

    return (
      <Container style={styles.main}>
        <Content style={{ flex: 1, backgroundColor: "#e6e6e6" }}>
          <Image
            style={styles.headerImage}
            source={require("../../../assets/reachout.jpg")}
          />
          <View style={{ alignItems: "center", padding: 10 }}>
            <Text style={{ fontSize: 20, margin: 10, fontWeight: "500" }}>
              React Out
            </Text>
            <Text>
              Have any concerns? Reach out to us and we will get back to you as
              soon as possible.
            </Text>
          </View>

          <Card
            style={{ backgroundColor: "white", marginTop: 30, padding: 10 }}
          >
            <Form>
              <Item picker>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  style={{ width: undefined }}
                  placeholder="Select Type"
                  placeholderStyle={{ color: "#bfc6ea" }}
                  placeholderIconColor="#007aff"
                  selectedValue={this.state.selected2}
                  onValueChange={this.onValueChange2.bind(this)}
                >
                  <Picker.Item label="Prayer Request" value="prayer_request" />
                  <Picker.Item label="Counselling" value="counselling" />
                  <Picker.Item label="Enquiries" value="enquiries" />
                  <Picker.Item label="Testimony" value="testimony" />
                  <Picker.Item label="Others" value="others" />
                </Picker>
              </Item>
              <Item style={{ marginTop: 30 }} stackedLabel regular last>
                <Label>Message</Label>

                <Input onChangeText={content => this.setState({ content })} />
              </Item>
              {loading ? (
                <Button style={styles.payBtn}>
                  <Text>Sending message</Text>
                </Button>
              ) : (
                <Button style={styles.payBtn} onPress={this.submitContact}>
                  <Text>Send</Text>
                </Button>
              )}
            </Form>
          </Card>
        </Content>
      </Container>
    );
  }
}

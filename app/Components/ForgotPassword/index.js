import React, { Component } from "react";
import {
  Text,
  View,
  StatusBar,
  Platform,
  ImageBackground,
  TouchableOpacity,
  AsyncStorage,
  I18nManager,
} from "react-native";
import {
  Container,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Spinner,
  Form,
} from "native-base";
// Screen Styles
import styles from "../Signin_04/styles";
import { AppLoading } from "expo";
import { GlobalVariables } from "../../../globals";

export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      email: "",
      password: "",
      loading: false,
      successful: false,
    };
  }

  async componentDidMount() {
    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Semibold": require("../../Fonts/SFUIDisplay-Semibold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  login = () => {
    const { email } = this.state;
    this.setState({ loading: true });
    let data = {
      email,
    };
    //Call login API and redirect on success
    fetch(GlobalVariables.resetAPI, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().then((result) => {
          this.setState({ loading: false, successful: true });
        })
      )
      .catch((error) => {
        console.log(error);
        alert("error logging in");
      });
  };
  render() {
    const { fontLoaded, loading, successful } = this.state;
    StatusBar.setBarStyle("light-content", true);

    if (Platform.OS === "android") {
      StatusBar.setBackgroundColor("transparent", true);
      StatusBar.setTranslucent(true);
    }

    if (!fontLoaded) {
      return <AppLoading />;
    }

    return (
      <Container>
        <ImageBackground style={styles.backgroundImage}>
          <Header style={styles.header}>
            <Left style={styles.left}></Left>
            <Body style={styles.body} />
            <Right style={styles.right} />
          </Header>
          <View style={styles.logosec}>
            <Text style={{ color: "#fff" }}>Reset Password</Text>
          </View>
          <Form style={styles.form}>
            <Item rounded style={styles.inputStyle}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
                style={styles.inputmain}
              />
            </Item>
            {loading ? (
              <TouchableOpacity info style={styles.signInbtn}>
                <Text autoCapitalize="words" style={styles.buttongetstarted}>
                  Loading...
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                info
                style={styles.signInbtn}
                onPress={() => this.login()}
              >
                <Text autoCapitalize="words" style={styles.buttongetstarted}>
                  Reset Password
                </Text>
              </TouchableOpacity>
            )}
            {successful && (
              <Text autoCapitalize="words" style={styles.successText}>
                Check your email for instructions to reset your password
              </Text>
            )}
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("LoginScreen")}
            >
              <Text autoCapitalize="words" style={styles.buttongettext}>
                Sign in
              </Text>
            </TouchableOpacity>
          </Form>
        </ImageBackground>
      </Container>
    );
  }
}

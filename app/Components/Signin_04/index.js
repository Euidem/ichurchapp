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
import styles from "./styles";
import { AppLoading } from "expo";
import { GlobalVariables } from "../../../globals";

export default class Signin_04 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      email: "",
      password: "",
      loading: false,
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

  guestLogin = () => {
    this.props.navigation.navigate("DrawerSocial");
  };

  login = () => {
    const { email, password } = this.state;
    this.setState({ loading: true });
    let data = {
      email,
      password,
    };
    //Call login API and redirect on success
    fetch(GlobalVariables.loginAPI, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) =>
        res.json().then((result) => {
          if (result.statusCode === 200) {
            AsyncStorage.setItem("token", result.token);
            AsyncStorage.setItem("user_id", result.id);
            this.setState({ loading: false });
            this.props.navigation.navigate("DrawerSocial");
          } else {
            this.setState({ loading: false, incorrect: true });
          }
        })
      )
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false });
        alert("error logging in");
      });
  };
  render() {
    const { fontLoaded, loading, incorrect } = this.state;

    let BG_Image = require("../../../assets/churchbg.jpg");
    let ic_logo = {
      uri:
        "https://antiqueruby.aliansoftware.net/Images/signin/ic_logo_mountify_signin_four.png",
    };
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
            <Text style={{ color: "#fff" }}>SIGN IN</Text>
          </View>
          <Form style={styles.form}>
            <Item rounded style={styles.inputStyle}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                autoCapitalize="none"
                onChangeText={(email) => this.setState({ email })}
                style={styles.inputmain}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                placeholder="Password"
                secureTextEntry={true}
                textAlign={I18nManager.isRTL ? "right" : "left"}
                onChangeText={(password) => this.setState({ password })}
                style={styles.inputmain}
              />
            </Item>
            {loading ? (
              <TouchableOpacity info style={styles.signInbtn}>
                <Text autoCapitalize="words" style={styles.buttongetstarted}>
                  Signing in...
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                info
                style={styles.signInbtn}
                onPress={() => this.login()}
              >
                <Text autoCapitalize="words" style={styles.buttongetstarted}>
                  Sign In
                </Text>
              </TouchableOpacity>
            )}
            {incorrect && (
              <Text autoCapitalize="words" style={styles.errorText}>
                Wrong email/password combination
              </Text>
            )}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
              }}
            >
              <TouchableOpacity onPress={() => this.guestLogin()}>
                <Text autoCapitalize="words" style={styles.buttongettext}>
                  Continue as guest
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("Signup")}
              >
                <Text autoCapitalize="words" style={styles.buttongettext}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("ForgotPassword")}
            >
              <Text autoCapitalize="words" style={styles.buttongettext}>
                Forgot your password?
              </Text>
            </TouchableOpacity>
          </Form>
        </ImageBackground>
      </Container>
    );
  }
}

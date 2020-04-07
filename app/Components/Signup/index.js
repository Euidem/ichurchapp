import React, { Component } from "react";
import {
  Text,
  View,
  Image,
  StatusBar,
  Platform,
  TouchableOpacity,
  I18nManager,
  AsyncStorage,
  Alert,
} from "react-native";
import {
  Container,
  Icon,
  Right,
  Item,
  Input,
  Header,
  Left,
  Body,
  Content,
  Picker,
  Form,
  DatePicker,
} from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
// Screen Styles
import styles from "./styles";
import { AppLoading } from "expo";
import { GlobalVariables } from "../../../globals";
import moment from "moment";

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      gender: undefined,
      maritalStatus: undefined,
      loading: false,
    };
  }

  setDate = (newDate) => {
    this.setState({
      dateOfBirth: newDate,
    });
  };
  onValueChange2(key, value) {
    this.setState({
      [key]: value,
    });
  }
  async componentWillMount() {
    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Semibold": require("../../Fonts/SFUIDisplay-Semibold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }

  register = async () => {
    this.setState({ loading: true });
    const {
      firstName,
      lastName,
      occupation,
      homePhone,
      address,
      gender,
      maritalStatus,
      email,
      dateOfBirth,
    } = this.state;

    const data = {
      firstName,
      lastName,
      occupation,
      homePhone,
      address,
      gender,
      maritalStatus,
      email,
      dateOfBirth: moment(dateOfBirth).format("YYYY-MM-DD"),
    };

    fetch(GlobalVariables.registerAPI, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((result) => {
          if (result.statusCode === 200) {
            Alert.alert(
              "Registration successful, you will receive an email with your log in details once your account has been approved"
            );
            this.setState({ loading: false });
            this.props.navigation.navigate("LoginScreen");
          } else {
            Alert.alert(result.message);
          }
        })
      )
      .catch((error) => {
        console.log("Error registering, please try again");
      });
  };
  render() {
    const { fontLoaded, loading } = this.state;

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
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("LoginScreen")}
            >
              <FontAwesome
                name={I18nManager.isRTL ? "angle-right" : "angle-left"}
                size={30}
                color="white"
              />
            </TouchableOpacity>
          </Left>
          <Body style={styles.body} />
          <Right style={styles.right} />
        </Header>
        <Content>
          <View style={styles.logosec}>
            <Image source={ic_logo} style={styles.logostyle} />
            <Text style={{ color: "#fff", margin: 20 }}>REGISTER</Text>
          </View>
          <Form style={styles.form}>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="First Name"
                autoCompleteType="name"
                onChangeText={(firstName) => this.setState({ firstName })}
                style={styles.inputmain}
              />
            </Item>

            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                autoCompleteType="name"
                onChangeText={(lastName) => this.setState({ lastName })}
                placeholder="Last Name"
                style={styles.inputmain}
              />
            </Item>

            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Email"
                keyboardType="email-address"
                onChangeText={(email) => this.setState({ email })}
                style={styles.inputmain}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Phone Number"
                keyboardType="number-pad"
                autoCompleteType="tel"
                onChangeText={(homePhone) => this.setState({ homePhone })}
                style={styles.inputmain}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Address"
                onChangeText={(address) => this.setState({ address })}
                style={styles.inputmain}
              />
            </Item>
            <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Input
                placeholderTextColor="#ffffff"
                textAlign={I18nManager.isRTL ? "right" : "left"}
                placeholder="Occupation"
                onChangeText={(occupation) => this.setState({ occupation })}
                style={styles.inputmain}
              />
            </Item>
            <Item picker rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Gender"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                textStyle={styles.pickerTextStyle}
                selectedValue={this.state.gender}
                onValueChange={this.onValueChange2.bind(this, "gender")}
              >
                <Picker.Item label="Male" value="male" />
                <Picker.Item label="Female" value="female" />
                <Picker.Item label="Others" value="others" />
              </Picker>
            </Item>

            <Item picker rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Marital Status"
                placeholderStyle={{ color: "#bfc6ea" }}
                textStyle={styles.pickerTextStyle}
                placeholderIconColor="#007aff"
                selectedValue={this.state.maritalStatus}
                onValueChange={this.onValueChange2.bind(this, "maritalStatus")}
              >
                <Picker.Item label="Married" value="married" />
                <Picker.Item label="Single" value="single" />
                <Picker.Item label="Divorced" value="divorced" />
              </Picker>
            </Item>

            <Item picker rounded style={[styles.inputStyle, { marginTop: 10 }]}>
              <DatePicker
                defaultDate={new Date()}
                maximumDate={new Date()}
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Date of Birth"
                textStyle={{ color: "#fff" }}
                placeHolderTextStyle={{ color: "#fff" }}
                onDateChange={this.setDate}
                disabled={false}
              />
            </Item>
            {loading ? (
              <TouchableOpacity info style={styles.signInbtn}>
                <Text autoCapitalize="words" style={styles.buttongetstarted}>
                  Please wait...
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                info
                style={styles.signInbtn}
                onPress={this.register}
              >
                <Text autoCapitalize="words" style={styles.buttongetstarted}>
                  Register
                </Text>
              </TouchableOpacity>
            )}
          </Form>
        </Content>
      </Container>
    );
  }
}

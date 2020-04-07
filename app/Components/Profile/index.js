import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  I18nManager,
  ImageBackground,
  AsyncStorage,
  Alert,
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Form,
  Item,
  Input,
  DatePicker,
  Picker,
  Icon,
} from "native-base";
import { View } from "react-native-animatable";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalVariables } from "../../../globals";
import styles from "../Event/styles";
import moment from "moment";

export default class Profile extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      gender: undefined,
      maritalStatus: undefined,
      loading: false,
      dateOfBirth: "0000-00-00",
    };
  }

  componentDidMount() {
    this.getUserProfile();
  }

  getUserProfile = async () => {
    const userId = await AsyncStorage.getItem("user_id");
    fetch(`${GlobalVariables.userProfile}${userId}`).then((response) =>
      response
        .json()
        .then((result) => {
          if (result.statusCode === 200) {
            let dateOfBirth = result.member.dateOfBirth;
            this.setState({
              ...result.member,
              dateOfBirth: dateOfBirth
                ? moment(dateOfBirth).format("YYYY-MM-DD")
                : moment().format("YYYY-MM-DD"),
            });
          }
        })
        .catch((error) => {
          console.log(error);
        })
    );
  };

  setDate = (newDate) => {
    this.setState({
      dateOfBirth: moment(newDate).format("YYYY-MM-DD"),
    });
  };
  onValueChange2(key, value) {
    this.setState({
      [key]: value,
    });
  }

  update = async () => {
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

    const userId = await AsyncStorage.getItem("user_id");

    fetch(`${GlobalVariables.updateProfile}${userId}`, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) =>
        response.json().then((result) => {
          if (result.statusCode === 200) {
            Alert.alert("Profile successfully updated");
            this.setState({ loading: false });
          } else {
            Alert.alert(result.message);
          }
        })
      )
      .catch((error) => {
        console.log("Error registering, please try again");
        console.log(error);
      });
  };
  render() {
    const { goBack } = this.props.navigation;
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
      loading,
    } = this.state;
    const dateArray = dateOfBirth.toString().split("-");
    const year = dateArray[0];
    const month = dateArray[1];
    const day = dateArray[2];
    console.log(year, month, day);
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
            <Text style={styles.textTitle}>Profile</Text>
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
              <View style={[styles.postDescImage, { height: 150 }]}>
                <ImageBackground
                  blurRadius={2}
                  source={require("../../../assets/events.jpg")}
                  style={[styles.img, { height: 150 }]}
                ></ImageBackground>
              </View>
              <View style={styles.lastRowBg}>
                <View style={styles.sectionContainer}>
                  <Form style={styles.form}>
                    <Item
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Input
                        placeholderTextColor="#2d324f"
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        placeholder="First Name"
                        autoCompleteType="name"
                        value={firstName}
                        onChangeText={(firstName) =>
                          this.setState({ firstName })
                        }
                        style={styles.inputmain}
                      />
                    </Item>

                    <Item
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Input
                        placeholderTextColor="#2d324f"
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        autoCompleteType="name"
                        value={lastName}
                        onChangeText={(lastName) => this.setState({ lastName })}
                        placeholder="Last Name"
                        style={styles.inputmain}
                      />
                    </Item>

                    <Item
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Input
                        placeholderTextColor="#2d324f"
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        placeholder="Email"
                        value={email}
                        keyboardType="email-address"
                        onChangeText={(email) => this.setState({ email })}
                        style={styles.inputmain}
                      />
                    </Item>
                    <Item
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Input
                        placeholderTextColor="#2d324f"
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        placeholder="Phone Number"
                        keyboardType="number-pad"
                        autoCompleteType="tel"
                        value={homePhone}
                        onChangeText={(homePhone) =>
                          this.setState({ homePhone })
                        }
                        style={styles.inputmain}
                      />
                    </Item>
                    <Item
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Input
                        placeholderTextColor="#2d324f"
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        placeholder="Address"
                        value={address}
                        onChangeText={(address) => this.setState({ address })}
                        style={styles.inputmain}
                      />
                    </Item>
                    <Item
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Input
                        placeholderTextColor="#2d324f"
                        textAlign={I18nManager.isRTL ? "right" : "left"}
                        placeholder="Occupation"
                        value={occupation}
                        onChangeText={(occupation) =>
                          this.setState({ occupation })
                        }
                        style={styles.inputmain}
                      />
                    </Item>
                    <Item
                      picker
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Gender"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        placeholderIconColor="#007aff"
                        textStyle={styles.pickerTextStyle}
                        selectedValue={gender}
                        onValueChange={this.onValueChange2.bind(this, "gender")}
                      >
                        <Picker.Item label="Male" value="male" />
                        <Picker.Item label="Female" value="female" />
                        <Picker.Item label="Others" value="others" />
                      </Picker>
                    </Item>

                    <Item
                      picker
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <Picker
                        mode="dropdown"
                        iosIcon={<Icon name="arrow-down" />}
                        style={{ width: undefined }}
                        placeholder="Marital Status"
                        placeholderStyle={{ color: "#bfc6ea" }}
                        textStyle={styles.pickerTextStyle}
                        placeholderIconColor="#007aff"
                        selectedValue={maritalStatus}
                        onValueChange={this.onValueChange2.bind(
                          this,
                          "maritalStatus"
                        )}
                      >
                        <Picker.Item label="Married" value="married" />
                        <Picker.Item label="Single" value="single" />
                        <Picker.Item label="Divorced" value="divorced" />
                      </Picker>
                    </Item>

                    <Item
                      picker
                      rounded
                      style={[styles.inputStyle, { marginTop: 10 }]}
                    >
                      <DatePicker
                        defaultDate={
                          new Date(Number(year), Number(month), Number(day))
                        }
                        maximumDate={new Date()}
                        locale={"en"}
                        timeZoneOffsetInMinutes={undefined}
                        modalTransparent={false}
                        animationType={"fade"}
                        androidMode={"default"}
                        placeHolderText={dateOfBirth || "Date of Birth"}
                        textStyle={{ color: "#bfc6ea" }}
                        placeHolderTextStyle={{ color: "#bfc6ea" }}
                        onDateChange={this.setDate}
                        disabled={false}
                      />
                    </Item>
                    {loading ? (
                      <TouchableOpacity info style={styles.signInbtn}>
                        <Text
                          autoCapitalize="words"
                          style={styles.buttongetstarted}
                        >
                          Please wait...
                        </Text>
                      </TouchableOpacity>
                    ) : (
                      <TouchableOpacity
                        info
                        style={styles.signInbtn}
                        onPress={this.update}
                      >
                        <Text
                          autoCapitalize="words"
                          style={styles.buttongetstarted}
                        >
                          Update
                        </Text>
                      </TouchableOpacity>
                    )}
                  </Form>
                </View>
              </View>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

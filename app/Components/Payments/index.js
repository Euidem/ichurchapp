import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  View,
  I18nManager,
  AsyncStorage,
  Modal,
  Dimensions,
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Button,
  Item,
  Form,
  Input,
} from "native-base";
// Screen Styles
import styles from "./styles";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { GlobalVariables } from "../../../globals";
import { WebView } from "react-native-webview";
import { Linking } from "expo";

export default class Paystack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canpost: true,
      cookie: "",
      SpinnerVisible: true,
      ProductData: [],
      isVisible: false,
      loading: false,
      sourceUrl: "",
    };
  }

  hideSpinner() {
    this.setState({ SpinnerVisible: false });
  }

  payTithe = async () => {
    this.setState({ loading: true });
    const { notes, amount } = this.state;
    const item = this.props.navigation.getParam("item", {});
    const contributionType = item._id;
    const data = {
      amount,
      contributionType,
      notes,
    };

    const token = await AsyncStorage.getItem("token");

    fetch(GlobalVariables.makePaymentsAPI, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            loading: false,
            isVisible: true,
            sourceUrl: response.url,
          });
          //Linking.openURL(response.url);
        } else {
          Alert.alert("Error initiating payment, please try again");
        }
      })
      .catch((error) => {
        Alert.alert("Error initiating payment, please try again");
      });
  };

  paymentModal = () => {
    return (
      <View style={{ flex: 1 }}>
        <Modal visible={this.state.isVisible}>
          <View style={{ flex: 1 }}>
            <Text
              onPress={() => this.setState({ isVisible: false })}
              style={{
                marginTop: 30,
                padding: 10,
                fontWeight: "600",
                fontSize: 16,
              }}
            >
              Close
            </Text>
            <WebView
              javaScriptEnabled={true}
              source={{ uri: this.state.sourceUrl }}
            />
          </View>
        </Modal>
      </View>
    );
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam("item", {});
    const { loading } = this.state;
    return (
      <Container style={styles.main}>
        <Header style={styles.header}>
          <Left style={styles.left}>
            <TouchableOpacity
              style={styles.backArrow}
              onPress={() => this.props.navigation.navigate("DrawerSocial")}
            >
              {I18nManager.isRTL ? (
                <MaterialIcons name="chevron-right" size={35} color="white" />
              ) : (
                <MaterialIcons name="chevron-left" size={35} color="white" />
              )}
            </TouchableOpacity>
          </Left>
          <Body style={styles.body}>
            <Text style={styles.textTitle}>Paying for {item.type}</Text>
          </Body>
          <Right style={styles.right}></Right>
        </Header>
        <Content>
          <View>
            <Form style={styles.form}>
              <Item rounded style={styles.inputStyle}>
                <Input
                  placeholder="Amount"
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  keyboardType="number-pad"
                  onChangeText={(amount) => this.setState({ amount })}
                />
              </Item>
              <Item rounded style={[styles.inputStyle, { marginTop: 10 }]}>
                <Input
                  placeholder="Notes"
                  textAlign={I18nManager.isRTL ? "right" : "left"}
                  onChangeText={(notes) => this.setState({ notes })}
                />
              </Item>
              {loading ? (
                <Button style={styles.payBtn}>
                  <Text>Initiating payment...</Text>
                </Button>
              ) : (
                <Button style={styles.payBtn} onPress={this.payTithe}>
                  <Text>Pay</Text>
                </Button>
              )}
            </Form>
          </View>
          {this.paymentModal()}
        </Content>
      </Container>
    );
  }
}

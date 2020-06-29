import React, { Component } from "react";
import {
  Text,
  StatusBar,
  Platform,
  Dimensions,
  TouchableOpacity,
  I18nManager,
} from "react-native";
import {
  Container,
  Right,
  Left,
  Content,
  Body,
  Header,
  Icon,
} from "native-base";
// Screen Styles
import styles from "./styles";
import { GlobalVariables } from "../../../globals";
import { AppLoading } from "expo";
import MapView, { Marker } from "react-native-maps";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class Branches extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
      loading: false,
      region: {
        latitude: 6.5244,
        longitude: 3.3792,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      },
      branches: [],
    };
  }
  async loadPage() {
    await Expo.Font.loadAsync({
      "SFUIDisplay-Medium": require("../../Fonts/SF-UI-Display-Medium.ttf"),
      "SFUIDisplay-Light": require("../../Fonts/SFUIDisplay-Light.ttf"),
      "SFUIDisplay-Regular": require("../../Fonts/SF-UI-Text-Regular.ttf"),
      "SFUIDisplay-Semibold": require("../../Fonts/SFUIDisplay-Semibold.ttf"),
    });
    this.setState({ fontLoaded: true });
  }
  componentDidMount() {
    this.loadPage();
    this.getBranches();
  }

  getBranches = async () => {
    this.setState({ loading: true });
    fetch(GlobalVariables.branchesApi)
      .then((response) =>
        response.json().then((result) => {
          this.setState({ loading: false, branches: result.branches });
        })
      )
      .catch((error) => {
        console.log(error);
      });
  };

  onRegionChange = (region) => {
    this.setState({ region });
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
    const { goBack } = this.props.navigation;
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
            <Text style={styles.textTitle}>Branch Locator</Text>
          </Body>
          <Right style={styles.right}></Right>
        </Header>
        <MapView
          region={this.state.region}
          showsUserLocation
          loadingEnabled
          //onRegionChange={this.onRegionChange}
          style={{ height: Dimensions.get("window").height }}
        >
          {this.state.branches.map((branch) => (
            <Marker
              key={branch._id}
              coordinate={branch.coordinates}
              title={branch.name}
              description={branch.address}
            />
          ))}
        </MapView>
      </Container>
    );
  }
}

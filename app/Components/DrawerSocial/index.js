import React, { Component } from "react";
import { View, Text, TouchableOpacity, BackHandler, Image, Dimensions } from "react-native";
import { Right, Header, Left, Body } from "native-base";
const drawerStyles = {
  drawer: {
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 0,
  },
};
import Drawer from "react-native-drawer";
import MyControlPanel from "./ControlPanel";
import tweens from "./tweens";
import styles from "./styles";

import TabScreen from "../TabScreen";
import { Metrics } from "../../Themes/";

export default class DrawerSocial extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      drawerType: "static",
      openDrawerOffset: Dimensions.get('window').width > 400 ? 180 : 100,
      closedDrawerOffset: 0,
      panOpenMask: 0.1,
      relativeDrag: false,
      panThreshold: 0.55,
      tweenHandlerOn: false,
      tweenDuration: 350,
      tweenEasing: "linear",
      disabled: false,
      tweenHandlerPreset: null,
      acceptDoubleTap: false,
      acceptTap: false,
      acceptPan: true,
      tapToClose: true,
      negotiatePan: false,
      side: "left",
    };
  }
  loadPage() {
    var that = this;
    BackHandler.addEventListener("hardwareBackPress", function () {
      // that.props.navigation.navigate("Drawer");
      return true;
    });
  }
  componentDidMount() {
    this.loadPage();
  }

  setDrawerType(type) {
    this.setState({
      drawerType: type,
    });
  }

  tweenHandler(ratio) {
    if (!this.state.tweenHandlerPreset) {
      return {};
    }
    return tweens[this.state.tweenHandlerPreset](ratio);
  }

  noopChange() {
    this.setState({
      changeVal: Math.random(),
    });
  }

  openDrawer() {
    this.drawer.open();
  }

  setStateFrag(frag) {
    this.setState(frag);
  }

  render() {
    const { navigation } = this.props;

    var controlPanel = (
      <MyControlPanel
        closeDrawer={() => {
          this.drawer.close();
        }}
        navigation={navigation}
      />
    );
    return (
      <View style={styles.container}>
        <Drawer
          ref={(c) => (this.drawer = c)}
          type={this.state.drawerType}
          animation={this.state.animation}
          openDrawerOffset={this.state.openDrawerOffset}
          closedDrawerOffset={this.state.closedDrawerOffset}
          panOpenMask={this.state.panOpenMask}
          panCloseMask={this.state.panCloseMask}
          relativeDrag={this.state.relativeDrag}
          panThreshold={this.state.panThreshold}
          content={controlPanel}
          styles={drawerStyles}
          disabled={this.state.disabled}
          tweenHandler={this.tweenHandler.bind(this)}
          tweenDuration={this.state.tweenDuration}
          tweenEasing={this.state.tweenEasing}
          acceptDoubleTap={this.state.acceptDoubleTap}
          acceptTap={this.state.acceptTap}
          acceptPan={this.state.acceptPan}
          tapToClose={this.state.tapToClose}
          negotiatePan={this.state.negotiatePan}
          changeVal={this.state.changeVal}
          side={this.state.side}
        >
          <View style={styles.drawercontainer}>
            <Header style={styles.headerSec}>
              <Left style={styles.left}>
                <TouchableOpacity
                  onPress={() => this.openDrawer()}
                  style={styles.backArrow}
                >
                  {/*
                  <MaterialCommunityIcons name="menu" size={30} color="#fff" /> 
*/}

                  <Image
                    source={require("../../../assets/MenuIcon.png")}
                    style={{
                      height: Metrics.HEIGHT * 0.07,
                      width: Metrics.WIDTH * 0.07,
                      resizeMode: "contain",
                    }}
                  />
                </TouchableOpacity>
              </Left>
              <Body style={styles.body}>
                <Text style={styles.textTitle}>iChurch</Text>
              </Body>
              <Right style={styles.right}></Right>
            </Header>

            <TabScreen screenProps={this.props.navigation} />
          </View>
        </Drawer>
      </View>
    );
  }
}

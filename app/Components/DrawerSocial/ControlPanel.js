import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  Alert,
  Share,
} from "react-native";
import { Container, Content } from "native-base";
import styles from "./styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default class ControlPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loggedIn: false,
      active: "",
    };
  }
  componentDidMount() {
    this.confirmStatus();
  }

  async confirmStatus() {
    let userId = await AsyncStorage.getItem("user_id");
    if (userId) {
      this.setState({ loggedIn: true });
    }
  }

  onShare = () => {
    try {
      const result = Share.share({
        message:
          "Hi Friend. Get the the iChurch App on playstore now ! https://playstore.com/url",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      //  alert(error.message);
    }
  };

  logout = async () => {
    AsyncStorage.removeItem("user_id");
    this.setState({ loggedIn: false });
    this.props.navigation.navigate("WalkthroughScreen");
  };

  getActiveStyles = (page) => {
    const { active } = this.state;
    const activeStyles = {
      fontWeight: "600",
    };
    return page === active ? activeStyles : {};
  };
  render() {
    const { loggedIn } = this.state;
    return (
      <Container style={styles.menuContainer}>
        <Content style={styles.menucontrolPanel}>
          <View style={styles.userProfiles}>
            <View style={styles.userDetailsStyle}>
              <Text style={styles.userDetailsText}>iChurch</Text>
            </View>
          </View>
          <View style={styles.menumainview}>
            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "home" });
                this.props.navigation.navigate("DrawerSocial");
                this.props.closeDrawer();
              }}
            >
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <Ionicons name="md-home" color="#ffffff" size={20} />
                </View>
                <Text style={[styles.rowtxt, this.getActiveStyles("home")]}>
                  {" "}
                  Home
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "livetv" });
                this.props.navigation.navigate("LiveTv");
              }}
            >
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="album" size={20} color="white" />
                </View>
                <Text style={[styles.rowtxt, this.getActiveStyles("livetv")]}>
                  Live TV
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "audio" });
                this.props.navigation.navigate("LiveAudio");
              }}
            >
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="equalizer" size={20} color="white" />
                </View>
                <Text style={[styles.rowtxt, this.getActiveStyles("audio")]}>
                  Live Audio
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "branches" });
                this.props.navigation.navigate("Branches");
              }}
            >
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="equalizer" size={20} color="white" />
                </View>
                <Text style={[styles.rowtxt, this.getActiveStyles("branches")]}>
                  Branch Locator
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "events" });
                this.props.navigation.navigate("Events", {
                  showHeader: "show",
                });
              }}
            >
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name="book" size={20} color="white" />
                </View>
                <Text style={[styles.rowtxt, this.getActiveStyles("events")]}>
                  Events
                </Text>
                {/* <View style={styles.notiCountSec}>
                 <Text style={styles.notiCount}>10</Text>
                </View>*/}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "news" });
                this.props.navigation.navigate("News");
              }}
            >
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="hashtag" color="#ffffff" size={20} />
                </View>
                <Text style={[styles.rowtxt, this.getActiveStyles("news")]}>
                  News
                </Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                this.setState({ active: "groups" });
                this.props.navigation.navigate("Groups");
              }}
            >
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="users" color="#ffffff" size={20} />
                </View>
                <Text style={[styles.rowtxt, this.getActiveStyles("groups")]}>
                  Groups
                </Text>
              </View>
            </TouchableOpacity>
            {loggedIn && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ active: "payments" });
                  this.props.navigation.navigate("Tithes");
                }}
              >
                <View style={styles.listrow}>
                  <View style={styles.iconContainer}>
                    <FontAwesome name="money" color="#ffffff" size={20} />
                  </View>
                  <Text
                    style={[styles.rowtxt, this.getActiveStyles("payments")]}
                  >
                    {" "}
                    Payments
                  </Text>
                </View>
              </TouchableOpacity>
            )}
            {loggedIn && (
              <TouchableOpacity
                onPress={() => {
                  this.setState({ active: "profile" });
                  this.props.navigation.navigate("Profile");
                }}
              >
                <View style={styles.listrow}>
                  <View style={styles.iconContainer}>
                    <FontAwesome name="user-circle" color="#ffffff" size={20} />
                  </View>
                  <Text
                    style={[styles.rowtxt, this.getActiveStyles("profile")]}
                  >
                    Profile
                  </Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => this.onShare()}>
              <View style={styles.listrow}>
                <View style={styles.iconContainer}>
                  <FontAwesome name="share" color="#ffffff" size={20} />
                </View>
                <Text style={styles.rowtxt}> Share App</Text>
              </View>
            </TouchableOpacity>
            {loggedIn && (
              <TouchableOpacity onPress={() => this.logout()}>
                <View style={styles.listrow}>
                  <View style={styles.iconContainer}>
                    <SimpleLineIcons name="logout" color="#ffffff" size={20} />
                  </View>
                  <Text style={styles.rowtxt}> Log out</Text>
                </View>
              </TouchableOpacity>
            )}
          </View>
        </Content>
      </Container>
    );
  }
}

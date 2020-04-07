import React from "react";
import { createStackNavigator, createAppContainer } from "react-navigation";

import WalkthroughScreen from "./app/Components/WalkthroughTrackRide";
import LoginScreen from "./app/Components/Signin_04";
import RegScreen from "./app/Components/Signup";
import DrawerSocial from "./app/Components/DrawerSocial";
import SermonTabSingle from "./app/Components/SermonTabSingle";
import Events from "./app/Components/Events";
import LiveTv from "./app/Components/LiveTv";
import LiveAudio from "./app/Components/LiveAudio";
import Tithes from "./app/Components/Tithes";
import Payment from "./app/Components/Payments";
import Devotionals from "./app/Components/Devotionals";
import DevotionalDetails from "./app/Components/DevotionalsDetails";
import News from "./app/Components/News";
import SingleNews from "./app/Components/SingleNews";
import Groups from "./app/Components/Groups";
import SingleGroup from "./app/Components/SingleGroup";
import ForgotPassword from "./app/Components/ForgotPassword";
import Event from "./app/Components/Event";
import Profile from "./app/Components/Profile";

const AppNavigator = createStackNavigator({
  WalkthroughScreen: {
    screen: WalkthroughScreen,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  DrawerSocial: {
    screen: DrawerSocial,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Payment: {
    screen: Payment,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Profile: {
    screen: Profile,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  LoginScreen: {
    screen: LoginScreen,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Signup: {
    screen: RegScreen,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Tithes: {
    screen: Tithes,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Events: {
    screen: Events,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Event: {
    screen: Event,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  News: {
    screen: News,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  SingleNews: {
    screen: SingleNews,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Groups: {
    screen: Groups,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  SingleGroup: {
    screen: SingleGroup,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  Devotionals: {
    screen: Devotionals,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  DevotionalDetails: {
    screen: DevotionalDetails,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  LiveTv: {
    screen: LiveTv,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  LiveAudio: {
    screen: LiveAudio,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  SermonTabSingle: {
    screen: SermonTabSingle,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },

  RegScreen: {
    screen: RegScreen,
    navigationOptions: {
      title: "",
      header: null,
      navigationBar: null,
    },
  },
});

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

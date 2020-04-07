import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#F2F2F2",
    flexDirection: "column"
  },

  textTitle: {
    color: Colors.snow
  },
  backArrow: {
    width: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },

  webView: {
    width: Dimensions.get("window").width,
    height: 270,
    flex: 1
  },

  header: {
    backgroundColor: "#2d324f",
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },

  left: {
    flex: 0.5,
    paddingTop: Platform.OS === "ios" ? 0 : 0
  },

  body: {
    flex: 3,
    alignItems: "center"
  },

  right: {
    flex: 0.5,
    paddingTop: Platform.OS === "ios" ? 0 : 0
  }
});

export default styles;

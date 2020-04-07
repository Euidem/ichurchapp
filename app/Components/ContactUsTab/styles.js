import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    flexDirection: "column"
  },

  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },

  headerImage: {
    height: 200,
    width: Dimensions.get("window").width
  },
  payBtn: {
    backgroundColor: "#66b4ce",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 40,
    width: Metrics.WIDTH * 0.8,
    marginTop: 35
  }
});

export default styles;

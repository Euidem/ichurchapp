import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    flexDirection: "column",
  },
  header: {
    backgroundColor: "#2d324f",
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05,
  },
  mapStyles: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
  },
  backArrow: {
    width: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent,
  },

  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: Colors.transparent,
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.001,
    alignSelf: "center",
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },
});

export default styles;

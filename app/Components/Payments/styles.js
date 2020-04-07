import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#2d324f",
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: Metrics.HEIGHT * 0.03,
    elevation: 0,
    paddingLeft: Metrics.WIDTH * 0.05,
    paddingRight: Metrics.WIDTH * 0.05
  },
  backArrow: {
    width: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent
  },

  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: Metrics.HEIGHT * 0.001,
    alignSelf: "center"
    ////fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  right: {
    flex: 0.5
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#F2F2F2",
    flexDirection: "column"
  },

  lastRowBg: {
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    justifyContent: "center"
  },
  form: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.45,
    backgroundColor: "rgba(255,255,255,0)",
    borderColor: "transparent",
    justifyContent: "center",
    alignSelf: "center"
  },
  inputStyle: {
    borderColor: "#66b4ce",
    justifyContent: "center",
    alignSelf: "center",
    width: Metrics.WIDTH * 0.9
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

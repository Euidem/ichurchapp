import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  textTitle: {
    color: "#fff"
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#F2F2F2",
    flexDirection: "column"
  },
  backArrow: {
    width: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start"
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
  },

  headerTitle: {
    color: Colors.snow,
    fontFamily: Fonts.type.sfuiDisplayBold,
    paddingTop: Platform.OS === "ios" ? 0 : 0,
    fontSize: Fonts.moderateScale(17),
    letterSpacing: 0.7
  },

  rowMain: {
    margin: Metrics.WIDTH * 0.035,
    flexDirection: "row"
  },

  images: {
    height: Metrics.HEIGHT * 0.15,
    width: Metrics.WIDTH * 0.3,
    resizeMode: "cover",
    borderRadius: 10,
    margin: Metrics.HEIGHT * 0.007
  },

  newsContent: {
    width: Metrics.WIDTH * 0.6,
    marginLeft: Metrics.WIDTH * 0.05,
    justifyContent: "center"
  },

  name: {
    //fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(17),
    color: "#363636",
    textAlign: "left"
  },

  comment: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(13),
    color: "#6f6f6f",
    marginTop: Metrics.HEIGHT * 0.005,
    textAlign: "left"
  },

  followContent: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: Metrics.HEIGHT * 0.015
  },

  textStyle: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(12),
    color: "#6f6f6f",
    textAlign: "center"
  },

  signInbtn: {
    backgroundColor: "#66b4ce",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 40,
    width: Metrics.WIDTH * 0.8,
    marginTop: 35
  },
  buttongetstarted: {
    alignSelf: "center",
    justifyContent: "center",
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: Colors.snow
  },
  headerImage: {
    height: 200,
    width: Dimensions.get("window").width
  }
});

export default styles;

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
    paddingRight: Metrics.WIDTH * 0.05,
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

  right: {
    flex: 0.5,
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "white",
    flexDirection: "column",
  },

  lastRowBg: {
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    justifyContent: "center",
  },

  rowBg: {
    width: Metrics.WIDTH,
    backgroundColor: Colors.snow,
    justifyContent: "center",
    marginBottom: Metrics.HEIGHT * 0.018,
  },

  rowPostDescription: {
    //fontFamily: Fonts.type.sfuiDisplaySemibold,
    fontSize: Fonts.moderateScale(24),
    marginTop: Metrics.HEIGHT * 0.015,
    width: Metrics.WIDTH * 0.95,
    color: Colors.snow,
    alignSelf: "center",
    textAlign: "left",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: "left",
  },

  dividerHorizontal: {
    width: Metrics.WIDTH * 0.95,
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: "center",
    marginTop: Metrics.HEIGHT * 0.022,
  },

  rowMainView: {
    width: Metrics.WIDTH,
  },

  postDescImage: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.35,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    overflow: "hidden",
  },
  img: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT * 0.35,
    resizeMode: "cover",
    justifyContent: "flex-end",
    alignContent: "flex-end",
  },

  rowDescView: {
    width: Metrics.WIDTH * 0.95,
    alignSelf: "center",
    marginTop: Metrics.HEIGHT * 0.015,
  },

  likeCommentShareView: {
    flexDirection: "row",
    width: Metrics.WIDTH * 0.95,
    alignSelf: "center",
    marginTop: Metrics.HEIGHT * 0.015,
    marginBottom: Metrics.HEIGHT * 0.015,
  },

  likeView: {
    flexDirection: "row",
    width: Metrics.WIDTH * 0.26,
    alignItems: "center",
  },

  commentView: {
    flexDirection: "row",
    width: Metrics.WIDTH * 0.37,
    alignItems: "center",
    marginLeft: Metrics.WIDTH * 0.045,
  },

  sectionTitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
  },
  iconsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  sectionContainer: {
    justifyContent: "space-between",
    padding: 10,
  },
  textStyle: {
    fontSize: 14,
    fontWeight: "600",
    marginLeft: 10,
    color: "#6f6f6f",
  },
  signInbtn: {
    backgroundColor: "#66b4ce",
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 40,
    width: Metrics.WIDTH * 0.8,
    marginTop: 35,
  },
  buttongetstarted: {
    alignSelf: "center",
    justifyContent: "center",
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: Colors.snow,
  },
  icons: { fontSize: 22, color: "#6f6f6f" },
});

export default styles;

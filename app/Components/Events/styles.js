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

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent
  },
  backArrow: {
    width: 30,
    justifyContent: "flex-start",
    alignItems: "flex-start"
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
    alignSelf: "center",
    fontFamily: Fonts.type.sfuiDisplayRegular
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
    backgroundColor: Colors.snow,
    justifyContent: "center",
    margin: 10
  },

  rowBg: {
    justifyContent: "center",
    marginBottom: Metrics.HEIGHT * 0.018,
    borderRadius: 10
  },

  profileImg: {
    width: Metrics.WIDTH * 0.12,
    height: Metrics.WIDTH * 0.12,
    borderRadius: Metrics.WIDTH * 0.06,
    alignSelf: "flex-start"
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium
  },

  rowTimeTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(12),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: "left"
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginTop: Metrics.HEIGHT * 0.015,
    padding: 5,
    textAlign: "left"
  },

  dividerHorizontal: {
    width: Metrics.WIDTH * 0.9,
    height: Metrics.HEIGHT * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: "center",
    marginTop: Metrics.HEIGHT * 0.018
  },

  rowHeaderView: {
    flexDirection: "row",
    marginTop: Metrics.HEIGHT * 0.022,
    width: Metrics.WIDTH * 0.9,
    alignSelf: "center"
  },

  rowHeaderNameView: {
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: Metrics.WIDTH * 0.03
  },

  postDescImage: {
    height: Metrics.HEIGHT * 0.2,
    marginTop: Metrics.HEIGHT * 0.015,
    resizeMode: "cover"
  },

  descriptionView: {
    width: Metrics.WIDTH * 0.9,
    alignSelf: "center"
  },

  rowMainView: {
    width: Metrics.WIDTH
  },
  headerImage: {
    height: 200,
    width: Dimensions.get("window").width
  }
});

export default styles;

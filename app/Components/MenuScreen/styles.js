import { Platform, StyleSheet, Dimensions } from "react-native";

// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  itemContainer: {
    margin: 10
  },
  container: {
    flex: 1
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#e9e9e9",
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
  rowMain: {
    margin: Metrics.WIDTH * 0.035,
    flexDirection: "row",
    padding: 15,
    borderRadius: 10
  },

  images: {
    height: 70,
    width: 70,
    borderRadius: 35,
    resizeMode: "cover",
    marginTop: Metrics.HEIGHT * 0.007
  },

  headerImage: {
    height: 200,
    width: Dimensions.get("window").width
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

  likeContent: {
    flexDirection: "row",
    marginTop: 20,
    alignContent: "space-between"
  },

  textStyle: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(12),
    color: "#6f6f6f"
  }
});

export default styles;

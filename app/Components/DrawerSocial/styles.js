import { StyleSheet, PixelRatio, Platform, Dimensions } from "react-native";
const deviceScreen = Dimensions.get("window");
import { Fonts, Metrics, Colors } from "../../Themes/";

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2d324f",
  },
  drawercontainer: {
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    backgroundColor: "#2d324f",
    padding: 0,
  },
  headerSec: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
    paddingTop: 0,
    backgroundColor: "#2d324f",
    ...Platform.select({
      ios: {},
      android: {
        marginTop: Fonts.moderateScale(25),
      },
    }),
    elevation: 0,
  },
  left: {
    flex: 0.5,
    backgroundColor: "transparent",
  },
  backArrow: {
    width: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  body: {
    flex: 3,
    alignItems: "center",
    backgroundColor: "transparent",
  },
  textTitle: {
    color: "#fff",
    fontSize: Fonts.moderateScale(16),
    marginTop: 5,
    alignSelf: "center",
    //////fontFamily: Fonts.type.sfuiDisplaySemibold,
  },
  right: {
    flex: 0.5,
  },
  mainText: {
    color: "#0691ce",
    fontSize: Fonts.moderateScale(17),
    height: Metrics.HEIGHT * 0.05,
    width: Metrics.WIDTH,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    textAlign: "center",
    backgroundColor: "transparent",
    top: Metrics.HEIGHT * 0.44,
    //////fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  /*Menu Section START*/
  menuContainer: {
    backgroundColor: "#2d324f",
    width: Metrics.WIDTH,
    height: Metrics.HEIGHT,
    paddingTop: Fonts.moderateScale(25),
  },
  menucontrolPanel: {
    // flex: 1,
    paddingTop: Fonts.moderateScale(25),
    paddingLeft: Fonts.moderateScale(20),
  },
  userProfiles: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userImageStyle: {
    width: Metrics.WIDTH * 0.2,
    height: Metrics.WIDTH * 0.2,
    borderRadius: Metrics.WIDTH * 0.1,
    borderWidth: 2,
    borderColor: Colors.snow,
    // marginLeft: 40
  },
  userDetailsStyle: {
    backgroundColor: "transparent",
    alignItems: "flex-start",
    height: 50,
    justifyContent: "center",
    marginLeft: 10,
  },
  userDetailsText: {
    fontSize: Fonts.moderateScale(15),
    color: Colors.snow,
  },
  menumainview: {
    marginTop: Fonts.moderateScale(25),
  },
  listrow: {
    backgroundColor: "transparent",
    flexDirection: "row",
    marginBottom: 15,
  },
  rowtxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(18),
    backgroundColor: "transparent",
    marginLeft: Fonts.moderateScale(15),
    textAlign: "left",
    //////fontFamily: Fonts.type.sfuiDisplayLight,
  },
  notiCountSec: {
    backgroundColor: "#d9b63e",
    marginLeft: 10,
    marginTop: 3,
    borderRadius: 10,
    height: 17,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  notiCount: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(13),
  },
  iconContainer: {
    width: 30,
    alignItems: "center",
  },
  /*Menu Section END*/
});

import { Platform, StyleSheet, Dimensions } from "react-native";
// Screen Styles
import { Fonts, Metrics, Colors } from "../../Themes/";

const styles = StyleSheet.create({
  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#2d324f",
    flexDirection: "column",
  },

  header: {
    backgroundColor: Colors.transparent,
    height: Metrics.WIDTH * 0.15,
    borderBottomWidth: 0,
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
  logosec: {
    width: Metrics.WIDTH,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  logostyle: {
    alignSelf: "center",
    width: Metrics.WIDTH * 0.25,
    height: Metrics.WIDTH * 0.2,
  },
  form: {
    width: Metrics.WIDTH,
    borderColor: "transparent",
    justifyContent: "center",
    alignSelf: "center",
  },
  inputStyle: {
    borderColor: "transparent",
    justifyContent: "center",
    alignSelf: "center",
    width: Metrics.WIDTH * 0.8,
  },
  inputmain: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    color: Colors.snow,
    justifyContent: "center",
    alignSelf: "center",
    paddingTop: 12,
    paddingBottom: 10,
    paddingLeft: 20,
    borderRadius: 40,
    width: Metrics.WIDTH * 0.8,
    backgroundColor: "rgba(255,255,255,0.4)",
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
  buttongettext: {
    alignSelf: "center",
    justifyContent: "center",
    // fontFamily: Fonts.type.sfuiDisplaySemibold,
    color: Colors.white,
    marginTop: 25,
  },
  pickerTextStyle: {
    color: "#fff",
  },
});
export default styles;

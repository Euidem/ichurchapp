
import { Platform, StyleSheet, Dimensions } from 'react-native';

// Screen Styles
import { Fonts, Metrics, Colors } from '../../Themes/';

const styles = StyleSheet.create({

  header: {
    backgroundColor: '#2d324f',
    height: Metrics.HEIGHT * 0.1,
    borderBottomWidth: 0,
    paddingTop: (Metrics.HEIGHT * 0.03),
    elevation: 0,
    paddingLeft: (Metrics.WIDTH * 0.05),
    paddingRight: (Metrics.WIDTH * 0.05),
  },

  left: {
    flex: 0.5,
    backgroundColor: Colors.transparent,
  },
  backArrow: {
    width: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start'
  },
  body: {
    flex: 3,
    alignItems: 'center',
    backgroundColor: Colors.transparent
  },

  textTitle: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(16),
    marginTop: (Metrics.HEIGHT * 0.001),
    alignSelf: 'center',
    fontFamily: Fonts.type.sfuiDisplayRegular,
  },

  right: {
    flex: 0.5
  },

  main: {
    height: Metrics.HEIGHT,
    width: Metrics.WIDTH,
    backgroundColor: "#F2F2F2",
    flexDirection: 'column'
  },

  lastRowBg: {
    width: (Metrics.WIDTH),
    backgroundColor: Colors.snow,
    justifyContent: 'center'
  },

  rowBg: {
    width: (Metrics.WIDTH),
    backgroundColor: Colors.snow,
    justifyContent: 'center',
    marginBottom: (Metrics.HEIGHT) * 0.018,
  },

  profileImg: {
    width: (Metrics.WIDTH) * 0.12,
    height: (Metrics.WIDTH) * 0.12,
    borderRadius: (Metrics.WIDTH) * 0.06,
    alignSelf: 'flex-start',
  },

  rowNameTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(17),
    fontFamily: Fonts.type.sfuiDisplayMedium,
  },

  rowTimeTxt: {
    color: "#b7b7b7",
    fontSize: Fonts.moderateScale(14),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    textAlign: 'left'
  },

  rowDescTxt: {
    color: "#6f6f6f",
    fontSize: Fonts.moderateScale(15),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginTop: (Metrics.HEIGHT) * 0.015,
    textAlign: 'left'
  },

  dividerHorizontal: {
    width: (Metrics.WIDTH) * 0.90,
    height: (Metrics.HEIGHT) * 0.001,
    backgroundColor: "#F2F2F2",
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.018
  },

  likeCommentShareText: {
    fontFamily: Fonts.type.sfuiDisplayRegular,
    fontSize: Fonts.moderateScale(17),
    marginLeft: (Metrics.WIDTH) * 0.03,
    color: "#6f6f6f"
  },

  likeCommentShareImage: {
    width: (Metrics.WIDTH) * 0.06,
    height: (Metrics.HEIGHT) * 0.03,
    resizeMode: 'contain'
  },

  dividerVertical: {
    width: (Metrics.WIDTH) * 0.003,
    height: (Metrics.HEIGHT) * 0.04,
    backgroundColor: "#F2F2F2",
    alignSelf: 'flex-end'
  },

  statusTxt: {
    color: Colors.snow,
    fontSize: Fonts.moderateScale(10),
    fontFamily: Fonts.type.sfuiDisplayRegular,
    marginLeft: (Metrics.WIDTH) * 0.05,
    marginRight: (Metrics.WIDTH) * 0.05,
    marginTop: (Metrics.HEIGHT) * 0.004,
    marginBottom: (Metrics.HEIGHT) * 0.004,
  },

  rowHeaderView: {
    flexDirection: 'row',
    marginTop: (Metrics.HEIGHT) * 0.022,
    width: (Metrics.WIDTH) * 0.90,
    alignSelf: 'center'
  },

  rowHeaderNameView: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: (Metrics.WIDTH) * 0.03
  },

  statusView:{
    borderRadius: (Metrics.HEIGHT) * 0.030,
    marginTop: -(Metrics.HEIGHT) * 0.030,
    marginRight: -(Metrics.HEIGHT) * 0.010
  },

  postDescImage:{
    width: (Metrics.WIDTH),
    height: (Metrics.HEIGHT) * 0.40,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
    resizeMode:'stretch'
  },

  descriptionView:{
    width: (Metrics.WIDTH) * 0.90,
    alignSelf: 'center'
  },

  likeCommentShareView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.90,
    alignSelf: 'center',
    marginTop: (Metrics.HEIGHT) * 0.015,
    marginBottom: (Metrics.HEIGHT) * 0.015,
  },

  likeView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.25,
    alignItems: 'center'
  },

  commentView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.35,
    alignItems: 'center',
    marginLeft: (Metrics.WIDTH) * 0.045
  },

  shareView:{
    flexDirection: 'row',
    width: (Metrics.WIDTH) * 0.30,
    alignItems: 'center',
    marginLeft: (Metrics.WIDTH) * 0.045
  },

  contentList:{
    flex:1,
  },
  cardContent: {
    marginLeft:20,
    marginTop:10
  },
  image:{
    width:90,
    height:90,
    borderRadius:45,
    borderWidth:2,
    borderColor:"#ebf0f7"
  },

  card:{
    shadowColor: '#00000021',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,

    marginLeft: 10,
    marginRight: 10,
    marginTop:10, 
    backgroundColor:"white",
    paddingRight:50,
    padding: 10,
    flexDirection:'row',
    borderRadius:10,
  },

  name:{
    fontSize:18,
    flex:1,
  //  alignSelf:'left',
    color:"#363636",
    fontWeight:'bold'
  },
  count:{
    paddingRight: 15,
    fontSize:14,
//    flex:1,
    //alignSelf:'center',
    color:"#6f6f6f"
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
  followButton: {
    marginTop:10,
    height:35,
    width:100,
    padding:10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius:30,
     borderWidth:1,
    borderColor:"#fff",

    backgroundColor: "#66b4ce",
    
  },
  followButtonText:{
    color: "#fff",
    fontSize:12,
  },

  rowMainView:{
    width: (Metrics.WIDTH)
  },

});

export default styles;

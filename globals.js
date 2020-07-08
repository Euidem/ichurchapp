const rootURL = 'https://portal.rccgtlp.org.ng/api'
export class GlobalVariables {
  static allSermons =
    `${ rootURL }/sermon/view-sermons/`;
  singleSermon = `${ rootURL }/sermon/view-sermon/`;
  static apiURLAbout = `${ rootURL }/about/view-about`;
  static apiURLPastors = `${ rootURL }/pastor/view-pastors`
  static apiLiveStream = `${ rootURL }/stream-urls/view-url`;
  static apiGroups = `${ rootURL }/group/view-groups`;
  static apiEvents = `${ rootURL }/event/all-events`;
  static apiNews = `${ rootURL }/news/view-all-news`;
  static apiNewsComment = `${ rootURL }/news/add-comment`;
  static apiDevotional = `${ rootURL }/devotional/view-all-devotionals`;
  static apiPayments = `${ rootURL }/contribution/type/all-types`;
  static loginAPI = `${ rootURL }/auth/login`;
  static resetAPI = `${ rootURL }/auth/forgotpassword`;
  static makePaymentsAPI = `${ rootURL }/contribution/make-payment`;
  static contactAPI = `${ rootURL }/contact-form/add-form`;
  static userProfile = `${ rootURL }/member/member-details/`;
  static registerAPI = `${ rootURL }/member/register-member/`;
  static updateProfile = `${ rootURL }/member/edit-member/`;
  static branchesApi = `${ rootURL }/branch/view-branches`;
  static tokenAPI = `${ rootURL }/expo-token/add-token`;
  static checkInAPI = `${ rootURL }/attendance/check-in/`;
}

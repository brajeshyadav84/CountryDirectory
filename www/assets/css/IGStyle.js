'use strict'

var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get('window');

var {
  StyleSheet,
} = React;

var styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    subContainer: {
        flex: 1,
        flexDirection: 'column',
    },
    container: {
        flex: 1,
        marginTop: 0,
    },
    flagLayout:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding:10,
        height:150
    },
    flagTextLayout:{
        flex:1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop:80,
        paddingLeft:40,
        paddingRight:40
    },
    otherLayout:{
        flex:1,
        flexDirection: 'row',
        padding:10
    },
    otherSubLayout:{
        flex:1,
        flexDirection: 'row',
    },
    mapLayout:{
        flex:1,
        flexDirection: 'row',
        paddingTop:10,
        height:200
    },
    generalLayout:{
        padding:10
    },
    subHeaderLayout:{
        flex:1,
        flexDirection: 'row',
        height: 30,
        paddingTop:5,
        backgroundColor: 'grey',
        paddingLeft: 10
    },
    cardLayout: {
        // flex: 1, 
        // alignItems: 'center', 
        // justifyContent: 'center',
        // backgroundColor: 'red',
        // marginTop:10,
        // marginLeft:15,
        // marginRight:15,
    },
    cardTitleLayout: {
        marginTop:5,
        backgroundColor: 'white',
        height: 40,
        alignItems: 'center', 
        justifyContent: 'center',
        width: windowSize.width,
        flexDirection:'row', 
    },
    cardTitleMenuLayout: {
        marginTop:5,
        backgroundColor: 'white',
        height: 800,
        width: windowSize.width,
        
        
    },
    imageBG: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height
    },
    titleText: {
        width:110
    },
    titleHeaderText: {
        // color:'grey',
        // fontSize: 12,
    },
    subtitleLinkText: {
        // color:'#007AFF',
        // fontSize: 12,
        // marginTop:10,
    },
    imageLogo : {
         width: 45,
        // fontWeight:'bold',
         marginLeft:15
    },
    bg: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height,
        backgroundColor: '#e4e4e4'
    },
    bgGrey: {
        position: 'absolute',
        left: 0,
        top: 0,
        width: windowSize.width,
        height: windowSize.height,
        backgroundColor: '#e4e4e4'
    },
    stage: {
        backgroundColor: '#e4e4e4',
        paddingBottom: 5,
        flex: 1
    },
    scrollView: {
      height: 1200,
    },
    topicTitle: {
        flex:1 ,
        marginLeft:5,
    },
    arrowImage: {
        // width: 30,
        // fontWeight:'bold',
    },
    countryImage: {
        width: 150,
        height: 100
    },
    mapImage: {
        width: windowSize.width,
        height: 300
    },
    logo: {
        width: 35,
        height: 35,
        borderRadius: 5
    },

    arrow: {
        width: 20,
        height: 20,
    },
    tabView: {
        width: windowSize.width,
        backgroundColor: 'rgba(0,0,0,0.01)',
    },
    card: {
        // backgroundColor: '#fff',
        // color:'#4e545f',
        // fontWeight:'bold',
        // shadowColor: '#ccc',
        // shadowOffset: {width: 2, height: 2},
        // shadowOpacity: 0.5,
        // shadowRadius: 3,
    },
    youtubeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    header: {
        backgroundColor:'#0072C6',
        paddingTop:25,
        paddingBottom:15,
        flexDirection:'row',
    },
    footer: {
        backgroundColor:'#FDFDFD',
        paddingTop:15,
        paddingBottom:15,
        flexDirection:'row',
    },
    subHeader: {
        justifyContent: 'center',
        alignItems: 'center',
        flex:1                //Step 3
    },
    headerTabtitleText: {
        color:'white',
        fontWeight:'bold',
        justifyContent: 'center',
    },
    leftSubHeader: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        //flex:1                //Step 3
    },
    rightSubHeader: {
        width: 60,
        justifyContent: 'center',
        alignItems: 'center',
        //flex:1                //Step 3
    },
    questiontitleText: {
        color:'#007AFF',
        fontSize: 16,
        marginLeft:10,
    },
    questionContainer: {
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: 'white',
    },
    jobContainer: {
        paddingTop:10,
        paddingBottom:10,
        backgroundColor: 'white',
        marginTop: 10,
    },
    jobTitleText: {
        color:'#007AFF',
        fontSize: 13,
    },
    answertitleText: {
        color:'grey',
        fontSize: 13,
        marginLeft:10,
    },
    answerContainer: {
        paddingTop:4,
        paddingBottom:10,
        borderWidth: .5,
        borderColor: 'lightgrey',
        backgroundColor: 'white',
    },
    accordianContainer: {
        paddingTop:10,
    },
    phone: {
        flex: 33,
        justifyContent: 'center',
    },
    email: {
        flex: 33,
        justifyContent: 'center',
    },
    sms: {
        flex: 33,
        justifyContent: 'center',
    },
    text: {
        fontSize: 32,
    },
    inputBox: {
        height: 40,
        fontSize: 14,
        backgroundColor:'white',
        color:'grey',
        textAlign:'left',
        marginTop:10,
        paddingLeft:15,
    },
    inputArea: {
        height: 100,
        fontSize: 14,
        backgroundColor:'white',
        color:'grey',
        textAlign:'left',
        marginTop:10,
        paddingLeft:15,
    },
    inputButton: {
        marginTop:15,
        height: 40,
        textAlign:'center',
        fontWeight:'bold',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor:'#0072C6',
    },
    inputButtonText: {
        color:'white',
        fontSize: 18,
    },
    labelText: {
        textAlign:'left',
        marginTop:20,
        height: 40,
        fontSize: 18,
    },
    closeContainer: {
        height: 30,
        backgroundColor: 'white',
        fontWeight:'bold',
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
    },

    crossButton: {
        
    },


    wrapper: {
        paddingTop: 50,
        flex: 1
    },

    modal: {
        //justifyContent: 'center',
        //alignItems: 'center'
    },

    btn: {
        margin: 10,
        backgroundColor: "#3B5998",
        color: "white",
        padding: 10
    },

    btnModal: {
        position: "absolute",
        top: 0,
        right: 0,
        width: 50,
        height: 50,
        backgroundColor: "transparent"
    },
    textDetails: {
        color: "lightgrey",
        fontSize: 13
    },
});

module.exports = styles;
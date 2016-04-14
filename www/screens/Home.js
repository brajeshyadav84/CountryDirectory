'use strict'

var React = require('react-native'),
    CountryDetail = require('./CountryDetail'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get('window'),
    IGStyle = require('../assets/css/IGStyle'),
    HeaderTabComponent = require('../component/HeaderTabComponent');


var {
  AppRegistry,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  navigator,
  TabBarIOS,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TabBarIOS
} = React;

var objData = [ 
                {"TID":"01",
                "TText":"AngularJS",
                "TImage":"http://interviewgully.com/html5/images/html5.jpg",
                "TShortDesc":"Open Source JS Framework",
                "ContentDetails":[{
                "CID":"01",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"702",
                "CText":"More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                },
                {
                "CID":"601",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"502",
                "CText":"More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                },
                {
                "CID":"401",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"302",
                "CText":"More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                },
                {
                "CID":"201",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"102",
                "CText":"More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                },
                {
                "CID":"801",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"902",
                "CText":"More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                },
                {
                "CID":"7801",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"3402",
                "CText":"More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                },
                {
                "CID":"1101",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"1202",
                "CText":"More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                },
                {
                "CID":"2101",
                "CText":"Introduction to AngularJS ",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"2102",
                "CText":"brajesh More to AngularJS",
                "CVideoId":"fT4o5Tn84Qo"
                }]
                },
                {"TID":"02",
                "TText":"ReactJS",
                "TImage":"http://interviewgully.com/html5/images/html5.jpg",
                "TShortDesc":"Open Source JS Framework",
                "ContentDetails":[{
                "CID":"01",
                "CText":"Introduction to ReactJS",
                "CVideoId":"dRrxHgNwR8A"
                },
                {
                "CID":"02",
                "CText":"More to ReactJS",
                "CVideoId":"fT4o5Tn84Qo"
                }]
                }  
              ];

var Home = React.createClass ({
  getInitialState: function () {
    return {
      selectedTab: 'Home',
    }
  },

  setTab: function(tabValue){
      this.setState({selectedTab: tabValue});
  },

  preScreen: function(){
      this.props.navigator.pop();
  },

  nextScreen: function(screenName,details){
    this.props.navigator.push({
      id: screenName,
      name: screenName,
      passProps: details
    });
  },

  render: function() {
      var that = this;
      var titles = objData.map(function(obj) {
        return (
              <TouchableOpacity key={obj.TID} onPress={() => that.nextScreen('CountryDetail',obj)}>
                    <View style={IGStyle.cardTitleLayout}>
                        <View style={IGStyle.imageLogo}>
                          <Image style={IGStyle.logo} source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}} />
                        </View>
                        <View style={IGStyle.topicTitle}>
                          <Text style={IGStyle.titleText}>{obj.TText}</Text>
                        </View>
                        <View style={IGStyle.arrowImage}>
                          <Image style={IGStyle.arrow} source={{uri: 'http://www.clker.com/cliparts/V/1/Z/A/h/U/left-arrow-right-md.png'}} />
                        </View>
                    </View>
              </TouchableOpacity>
        );
      });

      return (
            <View style={IGStyle.mainContainer, IGStyle.bgGrey}>
                  <HeaderTabComponent headerContent='interviewgully' preScreen={() => that.preScreen()} />
                  <View style={IGStyle.subContainer}>
                      {titles}
                  </View>
            </View>
      );
    }
});

AppRegistry.registerComponent('Home', () => Home);

module.exports = Home;
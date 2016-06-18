'use strict'

var React = require('react-native'),
    CountryDetail = require('./CountryDetail'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get('window'),
    IGStyle = require('../assets/css/IGStyle'),
    _lodash = require('lodash'),
    HeaderTabComponent = require('../component/HeaderTabComponent');


var {
  AppRegistry,
  TextInput,
  TouchableHighlight,
  Text,
  View,
  ScrollView,
  navigator,
  TabBarIOS,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TabBarIOS,
  Linking
} = React;


var BestPlace = React.createClass ({
  getInitialState: function () {
    return {
      selectedTab: 'BestPlace',
      bestPlace: []
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

  componentDidMount: function(){
      var that = this;

      fetch('http://www.interviewgully.com/API/CD_V1/BestPlaces.json').then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
          var objData = JSON.parse(responseText);
          
          that.setState({
            bestPlace: objData
          });
        })
      .catch((error) => {
        //console.warn(error);
     });
  },

  openbrowser: function() {
    var that = this;
    var url = "http://travel.usnews.com/London_England/Pictures/";
    Linking.canOpenURL(url).then(supported => {
      if (!supported) {
        console.log('Can\'t handle url: ' + url);
      } else {
        return Linking.openURL(url);
      }
    }).catch(err => console.error('An error occurred', err));
  },

  render: function() {
      var that = this;
      var colData = that.state.bestPlace;
      var titles = colData.map(function(obj) {
        var ImageUrl = obj.ImageUrl;
        return (
              
                    <View style={IGStyle.cardTitleBestLayout}>
                        <View style={IGStyle.topicTitle}>
                          <Text>{obj.title}</Text>
                          <Text>{obj.description}</Text>
                          <Image style={IGStyle.imageThumbnail} source={{uri: ImageUrl}} />
                          <TouchableOpacity key="1" onPress={() => that.openbrowser()}>
                            <Text style={IGStyle.linkText}>Click Here</Text>
                          </TouchableOpacity>
                        </View>
                    </View>
              
        );
      });

      return (
            <View style={IGStyle.mainContainer, IGStyle.bgGrey}>
                  <View style={IGStyle.header}>
                      <View style={IGStyle.leftSubHeader}>
                        
                      </View>
                      <View style={IGStyle.subHeader}>
                        <Text style={IGStyle.headerTabtitleText}>World's Best Places to Visit</Text>
                      </View>
                      <View style={IGStyle.rightSubHeader}>
                        
                      </View>
                  </View>

                  <View style={IGStyle.subContainer}>
                    <ScrollView contentContainerStyle={IGStyle.stage, IGStyle.homeScrollView} >
                        {titles}
                    </ScrollView>
                  </View>
            </View>
      );
    }
});

AppRegistry.registerComponent('BestPlace', () => BestPlace);

module.exports = BestPlace;
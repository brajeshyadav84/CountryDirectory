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
  navigator,
  TabBarIOS,
  NavigatorIOS,
  TouchableOpacity,
  TouchableHighlight,
  Image,
  TabBarIOS
} = React;


var Home = React.createClass ({
  getInitialState: function () {
    return {
      selectedTab: 'Home',
      colCountry: []
    }
  },

  origionalCollection: [],

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
      fetch('http://www.interviewgully.com/API/CD_V1/CountryList.json').then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
          var objData = JSON.parse(responseText);
          
          that.setState({
            colCountry: objData.CountryList
          });
          that.origionalCollection = objData.CountryList;
        })
      .catch((error) => {
        //console.warn(error);
     });
  },

  searchByCountry: function(text){
    var that = this;
    var filterData = [];
    if(text == ""){
      filterData = that.origionalCollection;
    } else {
      _lodash.find(that.origionalCollection, function(item){
        var itemValue = item.CountryName.toLowerCase();
        if(itemValue.indexOf(text.toLowerCase()) >= 0){
          filterData.push(item);
        }
      });
    }
    that.setState({
        colCountry: filterData
    });
  },



  render: function() {
      var that = this;
      var colData = that.state.colCountry;
      var titles = colData.map(function(obj) {
        return (
              <TouchableOpacity key={obj.id} onPress={() => that.nextScreen('CountryDetail',obj)}>
                    <View style={IGStyle.cardTitleLayout}>
                        <View style={IGStyle.imageLogo}>
                          <Image style={IGStyle.logo} source={{uri: obj.Flag}} />
                        </View>
                        <View style={IGStyle.topicTitle}>
                          <Text>{obj.CountryName}</Text>
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
                  <HeaderTabComponent headerContent='Country of the world' preScreen={() => that.preScreen()} isShow='false'/>
                  
                  <View>
                      <TextInput style={IGStyle.searchBar} placeholder="Search Country" onChangeText={(text) => that.searchByCountry(text)}/>
                  </View>
                  <View style={IGStyle.subContainer}>
                      {titles}
                  </View>
            </View>
      );
    }
});

AppRegistry.registerComponent('Home', () => Home);

module.exports = Home;
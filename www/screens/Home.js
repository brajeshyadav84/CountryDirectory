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

      fetch('https://restcountries.eu/rest/v1/all').then((response) => response.text())
        .then((responseText) => {
          console.log(responseText);
          var objData = JSON.parse(responseText);
          
          that.setState({
            colCountry: objData
          });
          that.origionalCollection = objData;
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
        var itemValue = item.name.toLowerCase();
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
        var Flag = 'http://www.interviewgully.com/API/CD_V1/CountryFlags/'+obj.alpha2Code.toLowerCase()+'.png';
        return (
              <TouchableOpacity key={obj.name} onPress={() => that.nextScreen('CountryDetail',obj)}>
                    <View style={IGStyle.cardTitleLayout}>
                        <View style={IGStyle.imageLogo}>
                          <Image style={IGStyle.logo} source={{uri: Flag}} />
                        </View>
                        <View style={IGStyle.topicTitle}>
                          <Text>{obj.name}</Text>
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
                  <View style={IGStyle.header}>
                      <View style={IGStyle.leftSubHeader}>
                        
                      </View>
                      <View style={IGStyle.subHeader}>
                        <Text style={IGStyle.headerTabtitleText}>Country of the world</Text>
                      </View>
                      <View style={IGStyle.rightSubHeader}>
                        
                      </View>
                  </View>

                  <View>
                      <TextInput style={IGStyle.searchBar} placeholder="Search Country" onChangeText={(text) => that.searchByCountry(text)}/>
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

AppRegistry.registerComponent('Home', () => Home);

module.exports = Home;
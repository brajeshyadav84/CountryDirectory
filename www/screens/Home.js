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

var objData = [ 
                {
                  "id": "C1",
                  "Flag" : "http://i.infopls.com/images/afghan.gif",
                  "Seal": {
                    "Title" : "Coat of arms",
                    "Image" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/National_Emblem_of_Afghanistan_03.png"
                  },
                  "CallingCode" : "+93",
                  "CountryCode" : "AF",
                  "CountryName" : "Afghanistan",
                  "Anthem" : "https://archive.org/details/jana-gana-mana",
                  "Motto" : "لا إله إلا الله، محمد رسول الله Lā ʾilāha ʾillāl–lāh, Muhammadun rasūl allāh There is no god but God; Muhammad is the messenger of God. (Shahada)",
                  "GeneralInfo" : {
                    "Capital" : "Kabul",
                    "Area" : "250,000 sq mi (647,500 sq km)",
                    "Population" : "31,822,848 (growth rate: 2.3%)",
                    "Language": "Pashto Dari",
                    "Currency" : "Afghani",
                    "InternetTLD" : ".af افغانستان.",
                    "TimeZone" : "D† (UTC+4:30 Solar Calendar)"
                  },
                  "Government": [{
                    "Title": "President",
                    "Name": "Ashraf Ghani"
                  },
                  {
                    "Title": "Chief Executive Officer",
                    "Name": "Abdullah Abdullah"
                  }
                  ],
                  "DateFormat" : "",
                  "CurrentTime": "",
                  "Temperature" : "",
                  "BestPlaceToVisit": "",
                  "Map" : "http://i.infopls.com/images/mafghan.gif",
                  "Geography" : " AnthemAnthemAnthemAnthem Anthem AnthemAnthemAnthemAnthem Anthem AnthemAnthemAnthemAnthem Anthem"
                },
                {
                  "id": "C2",
                  "Flag" : "http://i.infopls.com/images/afghan.gif",
                  "Seal": {
                    "Title" : "Coat of arms",
                    "Image" : "https://upload.wikimedia.org/wikipedia/commons/c/c7/National_Emblem_of_Afghanistan_03.png"
                  },
                  "CallingCode" : "+93",
                  "CountryCode" : "IN",
                  "CountryName" : "India",
                  "Anthem" : "http://127.0.0.1:53946/afganistan.mp3",
                  "Motto" : "لا إله إلا الله، محمد رسول الله Lā ʾilāha ʾillāl–lāh, Muhammadun rasūl allāh There is no god but God; Muhammad is the messenger of God. (Shahada)",
                  "GeneralInfo" : {
                    "Capital" : "Kabul",
                    "Area" : "250,000 sq mi (647,500 sq km)",
                    "Population" : "31,822,848 (growth rate: 2.3%)",
                    "Language": "Pashto Dari",
                    "Currency" : "Afghani",
                    "InternetTLD" : ".af افغانستان.",
                    "TimeZone" : "D† (UTC+4:30 Solar Calendar)"
                  },
                  "Government": [{
                    "Title": "President",
                    "Name": "Ashraf Ghani"
                  },
                  {
                    "Title": "Chief Executive Officer",
                    "Name": "Abdullah Abdullah"
                  }
                  ],
                  "DateFormat" : "",
                  "CurrentTime": "",
                  "Temperature" : "",
                  "BestPlaceToVisit": "",
                  "Map" : "http://i.infopls.com/images/mafghan.gif",
                  "Geography" : ""
                }
              ];

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
      that.setState({
        colCountry: objData
      });
      that.origionalCollection = objData;
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

'use strict'

var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get('window'),
    IGStyle = require('../assets/css/IGStyle');

var {
  AppRegistry,
	TextInput,
	TouchableHighlight,
	Text,
	View,
  Image,
} = React;

var HeaderTabComponent = React.createClass ({
  getInitialState: function () {
    return {
        
    }
  },

  preScreen: function(){
    this.props.preScreen();
  },

  componentDidMount: function(){
    var that = this;
  },

  render: function() {
      var that = this;
      if(that.props.isShow == "true"){
        
      }

      return (
        <View style={IGStyle.header}>
            <View style={IGStyle.leftSubHeader}>
              <TouchableHighlight underlayColor="#0072C6" onPress={that.preScreen}>
                  <Image style={IGStyle.headerTabtitleText, IGStyle.arrow} source={{ uri: "Back", isStatic: true }} />
              </TouchableHighlight>
            </View>
            <View style={IGStyle.subHeader}>
              <Text style={IGStyle.headerTabtitleText}>{that.props.headerContent}</Text>
            </View>
            <View style={IGStyle.rightSubHeader}>
              
            </View>
        </View>
      );
    }
});

AppRegistry.registerComponent('HeaderTabComponent', () => HeaderTabComponent);

module.exports = HeaderTabComponent;

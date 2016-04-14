/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

var React = require('react-native'),
    Home  = require('./www/screens/Home'),
    CountryDetail = require('./www/screens/CountryDetail');

var {
  AppRegistry,
  TextInput,
  Text,
  View,
  TabBarIOS,
  Navigator,
  TouchableOpacity
} = React;

var CountryDirectory = React.createClass({
  getInitialState: function() {
        return {
            
        };
  },

  renderScene: function(route, navigator) {
    var routeId = route.id;
    if (routeId === 'Home') {
      return (
        <Home navigator={navigator} />
      );
    } else if (routeId === 'CountryDetail') {
      return (
        <CountryDetail navigator={navigator} menuContentList={route.passProps}/>
      );
    }
  },

  render: function() {
     return (
        <Navigator
            initialRoute={{id: 'Home', name: 'Index',passProps:'',navFromScreen:'' }}
            renderScene={this.renderScene.bind(this)}
            configureScene={(route) => {
            if (route.sceneConfig) {
              return route.sceneConfig;
            }
            if(route.navFromScreen == 'fromLeft'){
                return Navigator.SceneConfigs.FloatFromLeft;
            } else if (route.navFromScreen == 'fromTop'){
                return Navigator.SceneConfigs.FloatFromRight;
            } else if (route.navFromScreen == 'fromBottom'){
                return Navigator.SceneConfigs.FloatFromRight;
            } else {
                return Navigator.SceneConfigs.FloatFromRight;
            }
        }} />
      );
  }
});

AppRegistry.registerComponent('CountryDirectory', () => CountryDirectory);

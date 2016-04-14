
'use strict';

var React = require('react-native'),
    Dimensions = require('Dimensions'),
    windowSize = Dimensions.get('window'),
    HeaderTabComponent = require('../component/HeaderTabComponent'),
    IGStyle = require('../assets/css/IGStyle');

var {
	View,
	AppRegistry,
	Text,
	ScrollView,
	navigator,
	Image,
	TouchableOpacity,
	TabBarIOS,
	TouchableHighlight
} = React;

var CountryDetail = React.createClass({
	getInitialState: function () {
	    return {
	      selectedTab: 'Menu',
	    }
	},

	setTab: function(tabValue){
	    this.setState({selectedTab: tabValue});
	},

	nextScreen: function(screenName, details){
		//this.props.navigator.pop();
		this.props.navigator.push({
	      id: screenName,
	      name: screenName,
	      passProps: details
	    });
	},

	preScreen: function(){
	    this.props.navigator.pop();
	},

	getChatRoom: function(){
		this.props.navigator.push({
	      id: 'ChatScreen',
	      name: 'ChatScreen',
	      passProps: ''
	    });
	},

	componentDidMount: function(){
		var that = this;
		that.setState({
			contentList : that.props.menuContentList.ContentDetails
		});
	},

	render: function(){
	 	var that = this;
	 	var contentList = that.props.menuContentList.ContentDetails;
	    var titles = contentList.map(function(obj) {
        return (
              <TouchableOpacity key={obj.CID}
                    onPress={() => that.nextScreen('PlayContent',obj)}>
                    <View style={IGStyle.cardTitleMenuLayout}>
                        <View style={IGStyle.topicTitle}>
                          <Text style={IGStyle.titleText}>{obj.CText}</Text>
                        </View>
                        <View style={IGStyle.arrowImage}>
                          <Image style={IGStyle.arrow} source={{uri: 'http://www.clker.com/cliparts/V/1/Z/A/h/U/left-arrow-right-md.png'}} />
                        </View>
                    </View>
              </TouchableOpacity>
        );
      });

		return (
			<View style={IGStyle.bgGrey}>
				<HeaderTabComponent headerContent='interviewgully' preScreen={() => that.preScreen()} />
						<ScrollView contentContainerStyle={IGStyle.stage, IGStyle.scrollView} >
				          	{titles}
				        </ScrollView>
		        	</View>
		);
	}
});

AppRegistry.registerComponent('CountryDetail', () => CountryDetail);

module.exports = CountryDetail;
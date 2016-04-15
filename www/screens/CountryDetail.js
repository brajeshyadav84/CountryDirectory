
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

		return (
			<View style={IGStyle.bgGrey}>
				<HeaderTabComponent headerContent='interviewgully' preScreen={() => that.preScreen()} />
						<ScrollView contentContainerStyle={IGStyle.stage, IGStyle.scrollView} >
				          	<View style={IGStyle.cardTitleMenuLayout}>
		                        <View style={IGStyle.flagLayout}>
		                          <Text style={IGStyle.titleText}>testing</Text>
		                          <Text style={IGStyle.titleText}>testing</Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Country Name: </Text>
			                          <Text style={IGStyle.titleText}>India</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Country Code: </Text>
			                          <Text style={IGStyle.titleText}>IN</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Calling Code: </Text>
			                          <Text style={IGStyle.titleText}>India</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Motto: </Text>
			                          <Text style={IGStyle.titleText}>India</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Anthem: </Text>
			                          <Text style={IGStyle.titleText}>India</Text>
			                        </View>
		                        </View>
		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleText}>Government </Text>
		                        </View>
		                        <View style={IGStyle.otherLayout}> 
		                          <Text style={IGStyle.titleText}>Anthem: </Text>
		                          <Text style={IGStyle.titleText}>India</Text>
		                        </View>
		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleText}>General Information </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Capital: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Area: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Population: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Language: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Currency: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>InternetTLD: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>TimeZone: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
		                        </View>
		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleText}>Other Information </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>DateFormat: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>CurrentTime: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Temperature: </Text>
				                          <Text style={IGStyle.titleText}>India</Text>
			                          </View>
		                        </View>
		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleText}>Best Place To Visit </Text>
		                        </View>
		                        <View style={IGStyle.otherLayout}> 
		                          <Text style={IGStyle.titleText}>Anthem: </Text>
		                          <Text style={IGStyle.titleText}>India</Text>
		                        </View>
		                    </View>
		                    
				        </ScrollView>
		        	</View>
		);
	}
});

AppRegistry.registerComponent('CountryDetail', () => CountryDetail);

module.exports = CountryDetail;
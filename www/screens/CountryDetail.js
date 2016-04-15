
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
		console.log("that.props.menuContentList");console.log(that.props.menuContentList);
	},

	render: function(){
	 	var that = this;
	 	var contentList = that.props.menuContentList.ContentDetails;
	 	var header = that.props.menuContentList.TText;
		return (
			<View style={IGStyle.bgGrey}>
				<HeaderTabComponent headerContent={header} preScreen={() => that.preScreen()} />
						<ScrollView contentContainerStyle={IGStyle.stage, IGStyle.scrollView} >
				          	<View style={IGStyle.cardTitleMenuLayout}>
		                        <View style={IGStyle.flagLayout}>
		                          <Image style={IGStyle.countryImage} source={{uri: 'http://i.infopls.com/images/afghan.gif'}} />
		                          <Image style={IGStyle.countryImage} source={{uri: 'http://i.infopls.com/images/afghan.gif'}} />
		                        </View>
		                        <View style={IGStyle.flagTextLayout}>
		                          <Text style={IGStyle.titleText}>Country Flag </Text>
			                      <Text style={IGStyle.titleText}>Country Sign</Text>
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
		                          <Text>Government </Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>General Information </Text>
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
		                          <Text style={IGStyle.titleHeaderText}>Other Information </Text>
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
		                          <Text style={IGStyle.titleHeaderText}>Geography </Text>
		                        </View>
		                        <View style={IGStyle.otherLayout}> 
		                          <Text>Anthem </Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Best Place To Visit </Text>
		                        </View>
		                        <View style={IGStyle.otherLayout}> 
		                          <Text>Anthem </Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Map </Text>
		                        </View>
		                        <View style={IGStyle.mapLayout}> 
		                          <Image style={IGStyle.mapImage} source={{uri: 'http://i.infopls.com/images/mafghan.gif'}} />
		                        </View>

		                    </View>
		                    
				        </ScrollView>
		        	</View>
		);
	}
});

AppRegistry.registerComponent('CountryDetail', () => CountryDetail);

module.exports = CountryDetail;
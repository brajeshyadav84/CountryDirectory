
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
	TouchableHighlight,
	Linking
} = React;

var CountryDetail = React.createClass({
	getInitialState: function () {
	    return {
	      selectedTab: 'Menu',
	      dateTimeValue: '',
	      weatherData: [],
	      url: '',
	      contentList: []
	    }
	},

	setTab: function(tabValue){
	    this.setState({selectedTab: tabValue});
	},

	nextScreen: function(screenName, details){
		this.props.navigator.push({
	      id: screenName,
	      name: screenName,
	      passProps: details
	    });
	},

	preScreen: function(){
	    this.props.navigator.pop();
	},

	componentDidMount: function(){
		var that = this;

		fetch('http://www.interviewgully.com/API/CD_V1/CountryDetails.json').then((response) => response.text())
	        .then((responseText) => {
	          console.log(responseText);
	          var objData = JSON.parse(responseText);

	          var view = that.props.menuContentList.alpha2Code;
			  var countryDetails = objData.filter(function (el) {
				   return el.alpha2Code === view;
			  })[0];
	          
	          that.setState({
				contentList : countryDetails,
				url: 'http://www.interviewgully.com/API/CD_V1/CountryAnthem/'+that.props.menuContentList.alpha2Code.toLowerCase()+'.mp3'
			  });
			  that.getCurrentTime();
			  that.getWeather();
	    })
	    .catch((error) => {
	        //console.warn(error);
	    });

		
	},

	DateConverter: function (UNIX_timestamp) {console.log("UNIX_timestamp ::");console.log(UNIX_timestamp);
        var colMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(UNIX_timestamp * 1000).toUTCString();
        var result = d;
        return result;
    },


    timeConverter: function (UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000).toUTCString();
        var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = hour + ':' + min;
        return this.tConvert(time);
    },

    getCurrentTime: function(){
		var that = this;
		var dateValue = '';
		//http://timezonedb.com/time-zones
		//http://api.timezonedb.com/?zone=Asia/Singapore&key=CO6L1T6M8DY5
		//http://api.timezonedb.com/?zone=America/Toronto&format=json&key=YOUR_API_KEY
		var lat = that.state.contentList.latlng[0];
		var lng = that.state.contentList.latlng[1];
		fetch('http://api.timezonedb.com/?lat='+ lat +'&lng='+ lng +'&format=json&key=CO6L1T6M8DY5').then((response) => response.text())
			.then((responseText) => {
			  var jsonData = JSON.parse(responseText);
			  dateValue = that.DateConverter(jsonData.timestamp);
			  that.setState({
			  	dateTimeValue: dateValue
			  });
			})
			.catch((error) => {
			  //console.warn(error);
		});
	},

	getWeather: function(){
		var that = this;
		console.log("request Data");
		var data = [];
		var city = that.state.contentList.capital;
		//api.openweathermap.org/data/2.5/weather?q=singapore
		fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric&APPID=0edb015b02da2845bf09a5873ef016d3').then((response) => response.text())
			.then((responseText) => {
			  var jsonData = JSON.parse(responseText);
			  var sunrise = that.DateConverter(jsonData.sys.sunrise);
			  var sunset = that.DateConverter(jsonData.sys.sunset);
			  var humidity = jsonData.main.humidity;
			  var tempreture = jsonData.main.temp +" ℃";
			  var visibility = jsonData.weather[0].description;
			  data.push(sunrise);
			  data.push(sunset);
			  data.push(humidity);
			  data.push(tempreture);
			  data.push(visibility);
			  that.setState({
			  	weatherData: data
			  });
			})
			.catch((error) => {
			  //console.warn(error);
		});
	},

	openbrowser: function() {
		var that = this;
		var url = that.state.url;
		Linking.canOpenURL(url).then(supported => {
		  if (!supported) {
		    console.log('Can\'t handle url: ' + url);
		  } else {
		    return Linking.openURL(url);
		  }
		}).catch(err => console.error('An error occurred', err));
	},

	render: function(){
	 	var that = this;
	 	if(that.state.contentList.length == 0){return false;}
	 	var contentList = that.state.contentList;
	 	var header = contentList.name;
	 	var timezone = "";
	 	var language = "";
	 	var borders = "";
	 	
	 	if(contentList.languages != null){
	        language = (contentList.languages).map(function(obj) {
	        	var objlanguage = obj + ", ";
		        return (
		              <Text key={obj}>{objlanguage}</Text>
		        );
	        });
    	}

    	if(contentList.borders != null){
	        borders = (contentList.borders).map(function(obj) {
	        	var objborders = obj + ", ";
		        return (
		              <Text key={obj}>{objborders}</Text>
		        );
	        });
    	}

        if(contentList.timezones != null){
	        timezone = (contentList.timezones).map(function(obj) {
	        	var objtimezone = obj + ", ";
		        return (
		              <Text key={obj}>{objtimezone}</Text>
		        );
	        });
    	}

    	var Flag = 'http://www.interviewgully.com/API/CD_V1/CountryFlags/'+contentList.alpha2Code.toLowerCase()+'.png';
        var Seal = 'http://www.interviewgully.com/API/CD_V1/CountrySeals/'+contentList.alpha2Code+'.png';
        var MapData = 'http://www.interviewgully.com/API/CD_V1/CountryMaps/'+contentList.alpha2Code+'.png';

		return (
			<View style={IGStyle.bgGrey}>
				<HeaderTabComponent headerContent={header} preScreen={() => that.preScreen()} isShow='true'/>
						<ScrollView contentContainerStyle={IGStyle.stage, IGStyle.scrollView} >
				          	<View style={IGStyle.cardTitleMenuLayout}>
		                        <View style={IGStyle.flagLayout}>
		                          <Image style={IGStyle.countryImage} source={{uri: Flag}} />
		                          <Image style={IGStyle.countryImage} source={{uri: Seal}} />
		                        </View>
		                        <View style={IGStyle.flagTextLayout}>
		                          <Text style={IGStyle.titleText}>Country Flag </Text>
			                      <Text style={IGStyle.titleText}>Emblem</Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Country Name: </Text>
			                          <Text>{contentList.name}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Native Name: </Text>
			                          <Text>{contentList.nativeName}</Text>
			                        </View>
                                    <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Currency: </Text>
			                          <Text>{contentList.currencies[0]}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Independence: </Text>
			                          <Text>{contentList.Independence}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Country Code: </Text>
			                          <Text>{contentList.alpha2Code}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Calling Code: </Text>
			                          <Text>{contentList.callingCodes[0]}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Motto: </Text>
			                          <Text style={IGStyle.titleSubText}>{contentList.Motto}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Anthem: </Text>
			                          <TouchableOpacity key="1" onPress={() => that.openbrowser()}>
			                          	<Text style={IGStyle.linkText}>Click Here</Text>
			                          </TouchableOpacity>
			                        </View>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>General Information </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                        	  <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Region: </Text>
				                          <Text>{contentList.region}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Sub Region: </Text>
				                          <Text>{contentList.subregion}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Capital: </Text>
				                          <Text>{contentList.capital}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Area: </Text>
				                          <Text>{contentList.area}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Population: </Text>
				                          <Text>{contentList.population}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Language: </Text>
				                          <Text>{language}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>InternetTLD: </Text>
				                          <Text>{contentList.topLevelDomain[0]}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>TimeZone: </Text>
				                          <Text>{timezone}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>DateFormat: </Text>
				                          <Text>dd/mm/yyyy</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>CurrentTime: </Text>
				                          <Text>{that.state.dateTimeValue}</Text>
			                          </View>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Weather Information </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>sunrise: </Text>
				                          <Text>{that.state.weatherData[0]}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>sunset: </Text>
				                          <Text>{that.state.weatherData[1]}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>humidity: </Text>
				                          <Text>{that.state.weatherData[2]}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>Temperature: </Text>
				                          <Text>{that.state.weatherData[3]}</Text>
			                          </View>
			                          <View style={IGStyle.otherSubLayout}> 
				                          <Text style={IGStyle.titleText}>visibility: </Text>
				                          <Text>{that.state.weatherData[4]}</Text>
			                          </View>
		                        </View>
                                          
                                <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Government </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text>{contentList.Government[0].Type}</Text>
		                        </View>
                                
                                <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Agriculture products </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text>{contentList.Agriculture}</Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Industries </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text>{contentList.Industries}</Text>
		                        </View>
                                
                                <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Exports partners </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text>{contentList.ExportsPartners}</Text>
		                        </View>
                                
                                <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Imports partners </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text>{contentList.ImportsPartners}</Text>
		                        </View>
                                  
                                <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Geography </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text style={IGStyle.fullText}>{contentList.Geography}</Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Best Place To Visit </Text>
		                        </View>
		                        <View style={IGStyle.otherLayout}> 
		                          <Text style={IGStyle.fullText}> </Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Border Details </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text style={IGStyle.fullText}>{borders}</Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Map </Text>
		                        </View>
		                        <View style={IGStyle.mapLayout}> 
		                          <Image style={IGStyle.mapImage} source={{uri: MapData}} />
		                        </View>
		                    </View>
				        </ScrollView>
		        	</View>
		);
	}
});

AppRegistry.registerComponent('CountryDetail', () => CountryDetail);

module.exports = CountryDetail;

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
	      url: ''
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
		that.setState({
			contentList : that.props.menuContentList,
			url: ""
		});
		that.getCurrentTime();
		that.getWeather();
	},

	DateConverter: function (UNIX_timestamp) {console.log("UNIX_timestamp ::");console.log(UNIX_timestamp);
        var colMonth = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var d = new Date(UNIX_timestamp * 1000);
        var monthName = colMonth[d.getMonth()];
        var getDay = d.getDate();
        var getYear  = d.getFullYear();
        var timeValue = this.timeConverter(UNIX_timestamp);
        var result = getDay+"/"+monthName+"/"+getYear+" "+ timeValue;
        return result;
    },


    timeConverter: function (UNIX_timestamp) {
        var a = new Date(UNIX_timestamp * 1000);
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

    tConvert: function (time) {

        var hours = time.split(":")[0];
        var minutes = time.split(":")[1];
        var ampm = hours >= 12 ? ' PM' : ' AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        minutes = (minutes === "0") ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },


	getCurrentTime: function(){
		var that = this;
		var dateValue = '';
		//http://timezonedb.com/time-zones
		//http://api.timezonedb.com/?zone=Asia/Singapore&key=CO6L1T6M8DY5
		//http://api.timezonedb.com/?zone=America/Toronto&format=json&key=YOUR_API_KEY
		var lat = that.props.menuContentList.latlng[0];
		var lng = that.props.menuContentList.latlng[1];
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
		var city = that.props.menuContentList.capital;
		//api.openweathermap.org/data/2.5/weather?q=singapore
		fetch('http://api.openweathermap.org/data/2.5/weather?q='+city+'&units=metric').then((response) => response.text())
			.then((responseText) => {
			  var jsonData = JSON.parse(responseText);
			  console.log("response Data");
			  var sunrise = that.timeConverter(jsonData.sys.sunrise);
			  var sunset = that.timeConverter(jsonData.sys.sunset);
			  var humidity = jsonData.main.humidity;
			  var tempreture = jsonData.main.temp +" ℃";
			  var visibility = jsonData.weather[0].description;
			  data.push(sunrise);
			  data.push(sunset);
			  data.push(humidity);
			  data.push(tempreture);
			  data.push(visibility);
			  console.log(data);
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
	 	var contentList = that.props.menuContentList;
	 	var header = contentList.name;
	 	var timezone = "";
	 	var language = "";
	 	
	 	if(contentList.languages != null){
	        language = (contentList.languages).map(function(obj) {
	        	var objlanguage = obj + ", ";
		        return (
		              <Text key={obj}>{objlanguage}</Text>
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

      

		return (
			<View style={IGStyle.bgGrey}>
				<HeaderTabComponent headerContent={header} preScreen={() => that.preScreen()} isShow='true'/>
						<ScrollView contentContainerStyle={IGStyle.stage, IGStyle.scrollView} >
				          	<View style={IGStyle.cardTitleMenuLayout}>
		                        <View style={IGStyle.flagLayout}>
		                          
		                        </View>
		                        <View style={IGStyle.flagTextLayout}>
		                          <Text style={IGStyle.titleText}>Country Flag </Text>
			                      <Text style={IGStyle.titleText}>Seal</Text>
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
			                          <Text style={IGStyle.titleText}>Country Code: </Text>
			                          <Text>{contentList.alpha2Code}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Calling Code: </Text>
			                          <Text>{contentList.callingCodes[0]}</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Motto: </Text>
			                          <Text style={IGStyle.titleSubText}>motto</Text>
			                        </View>
			                        <View style={IGStyle.otherSubLayout}> 
			                          <Text style={IGStyle.titleText}>Anthem: </Text>
			                          <TouchableOpacity key="1" onPress={() => that.openbrowser()}>
			                          	<Text style={IGStyle.linkText}>Click Here</Text>
			                          </TouchableOpacity>
			                        </View>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Government </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text>Government</Text>
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
				                          <Text style={IGStyle.titleText}>Currency: </Text>
				                          <Text>{contentList.currencies[0]}</Text>
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
		                          <Text style={IGStyle.titleHeaderText}>Geography </Text>
		                        </View>
		                        <View style={IGStyle.generalLayout}> 
		                          <Text style={IGStyle.fullText}></Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Best Place To Visit </Text>
		                        </View>
		                        <View style={IGStyle.otherLayout}> 
		                          <Text style={IGStyle.fullText}> </Text>
		                        </View>

		                        <View style={IGStyle.subHeaderLayout}> 
		                          <Text style={IGStyle.titleHeaderText}>Map </Text>
		                        </View>
		                        <View style={IGStyle.mapLayout}> 
		                          
		                        </View>


		                    </View>
		                    
				        </ScrollView>
		        	</View>
		);
	}
});

AppRegistry.registerComponent('CountryDetail', () => CountryDetail);

module.exports = CountryDetail;
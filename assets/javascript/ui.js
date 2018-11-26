<<<<<<< HEAD
// //required parameter for hiking trail api 
// var latLng = []


// //address for grabing the latitude and longitude for the hiking trail
// var address = "chicago+IL+60622";

// var googleKey = "AIzaSyCaShTZRBQ_m2HC7wFZJ4M1OVe5a-YShPs";
// //funciton for passing in address returns array latitude, longitude.
// function toLatLng(string) {
//   var googleLocationURL =
//     "https://cors-anywhere.herokuapp.com/" +
//     `https://maps.googleapis.com/maps/api/geocode/json?address=${string}&key=${googleKey}`;
//   $.ajax({
//     url: googleLocationURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     console.log(response.results[0].geometry.location.lat);
//     latLng[0] = response.results[0].geometry.location.lat;
//     latLng[1] = response.results[0].geometry.location.lng;
//     console.log(latLng)
//     return (latLng)
//   })
// }
// toLatLng(address)
// console.log(latLng)
// console.log(toLatLng(address))
// //required key parameter
// var hikingKey = "200389890-8a7115b52b480cbc8bf26a0516b28e9d";
// // max distance in miles default 30, max 200
// var maxDistance = "30";
// //default 10 trails up to 500 trails
// var maxTrailResults = "10";
// //default quality can use distance
// var sort = "";
// //minium length default 0 mile
// var minLength = "distance";
// // the required parameters for the hiking api is latitude, longitude, and key
// var hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&minLength=${minLength}&sort=${sort}&lon=${longitude}&  maxDistance=${maxDistance}&maxTrailResults=${maxTrailResults}&key=${hikingKey}`;
// $.ajax({
//   url: hikingURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });

// var googleLatitude = "41.895481";
// var googleLongitude = "-87.675133";
// // radius in meters  max meters: 50000
// var radius = "10";
// // where we can put in the type of place we want to search for
// var typeOfPlace = "bikeshop";
// // keyword can be any word that google assoicates with the places it will return
// var keyword = "";

// var googlePlacesURL =
//   `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${googleLatitude},
//     ${googleLongitude}&radius=${radius}&type=${typeOfPlace}&keyword=${keyword}&key=${googleKey}`;
// $.ajax({
//   url: googlePlacesURL,
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
// });


// //for passing in and array with latitude, longitude. to be changed into an address
// function toAddress(array) {
//   var googleAddressURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${array[0]},${array[1]}&key=${googleKey}`
//   $.ajax({
//     url: googleAddressURL,
//     method: "GET"
//   }).then(function(response) {
//     console.log(response);
//     return (response.results.formatted_address)
//   });


// }
=======
>>>>>>> f6e5a192d56f7007794ec6613b49f857c0e6e96b
/************************** User Input Validation Below ************************/
const formAddress = $();
const formMaxTrailResults = $();
const formMinTrailLength = $();
const formMaxDistance = $();
const formKeyword = $();

const defaultTransit = "car";
const defaultMaxTrailResults = 10;
const defaultMinTrailLength = 0;
const defaultKeyword = "";
const defaultMaxDistance = 30;

/** maximum allowed value for number of results to return from hiking API */
const maxValueMaxTrailResults = 10;

/** If false, the search is basic and only the user location/zip code is used */
var flagAdvancedSearch = false;
/** If a flag is true, the user input is invalid; do NOT proceed with API call */
var flagAddress = true;
var flagMaxTrailResults = true;
var flagMinTrailLength = true;
var flagMaxDistance = true;

/********************************************************************************
 * User Input for destination name (string)
 ********************************************************************************/
function invalidInput(field, message) {
  field.css("background-color", "rgb(255,0,0,0.3");
  console.log(message);
}

/********************************************************************************
 * User Input for zip code
 ********************************************************************************/
function getAddress() {
  var userIn = formAddress.val();
  //invalid input condition
  if (userIn == undefined || userIn === "") {
    invalidInput(formAddress, "Invalid Input: Address");
    flagAddress = true;
    return "";
  } else {
    flagAddress = false;
    return userIn;
  }
}

/********************************************************************************
 * User Input for method of Transportation (for getting airport or train station)
 * Gets input from example select form element
 ********************************************************************************/
function getTransit() {
  userTransit = $("transit-input option:selected").val();
}

/********************************************************************************
 * User Input for Minimum Length of hiking trail
 ********************************************************************************/
function getMinTrailLength() {
  var userIn = formMinTrailLength.val();
  if (userIn === "" || userIn == undefined) {
    flagMinTrailLength = false;
    console.log("No Input: Min Trail Length - set to default");
    return defaultMinTrailLength;
  }
  //invalid input condition
  userIn = parseInt(userIn);
  if (userIn < 0) {
<<<<<<< HEAD
    invalidInput(formMinTrailResults, "Invalid Input: Min Trail Length cannot be less than 0");
    flagMinTrailLength = true;
=======
    invalidInput(
      formmaxTrailResults,
      "Invalid Input: Min Trail Length cannot be less than 0"
    );
    flagMinTrailLength = false;
>>>>>>> f6e5a192d56f7007794ec6613b49f857c0e6e96b
    return defaultMinTrailLength;
  } else {
    flagMinTrailLength = false;
    return userIn;
  }
}

/********************************************************************************
 * User Input for Max number of Results returned for hiking trails
 ********************************************************************************/
function getMaxTrailResults() {
  var userIn = formMaxTrailResults.val();
  if (userIn === "" || userIn == undefined) {
    flagMaxTrailResults = false;
    console.log("No Input: Max Trail Results - set to default");
    return defaultMaxTrailResults;
  }
  userIn = parseInt(userIn);
  if (userIn < 0) {
<<<<<<< HEAD
    invalidInput(formMaxTrailResults, "Invalid Input: Min Trail Length cannot be less than 0");
=======
    invalidInput(
      formMaxTrailResults,
      "Invalid Input: Min Trail Length cannot be less than 0"
    );
    flagMaxTrailResults = false;
    return defaultmaxTrailResults;
  } else if (userIn > maxValuemaxTrailResults) {
    console.log(
      "Warning: Max Trail Results exceeded limit, set to max of " +
        maxValuemaxTrailResults
    );
>>>>>>> f6e5a192d56f7007794ec6613b49f857c0e6e96b
    flagMaxTrailResults = true;
    return defaultMaxTrailResults;
  } else if (userIn > maxValueMaxTrailResults) {
    console.log("Warning: Max Trail Results exceeded limit, set to max of " + maxValueMaxTrailResults);
    flagMaxTrailResults = false;
    return maxValueMaxTrailResults;
  } else {
    flagMaxTrailResults = false;
    return userIn;
  }
}

/********************************************************************************
 * User Input for Max distance of results from input location
 ********************************************************************************/
function getMaxDistance() {
  var userIn = formMaxDistance.val();
  if (userIn === "" || userIn == undefined) {
    flagMaxDistance = false;
    console.log("No Input: Max Distance - set to default");
    return defaultDistance;
  }
  userIn = parseInt(userIn);
  if (userIn < 0) {
    invalidInput(formMaxDistance, "Invalid Input: Max Distance cannot be less than 0");
    flagMaxDistance = true;
    return defaultMaxDistance;
  } else if (userIn === 0) {
    console.log("Warning: Max Distance set to default because input was 0");
    flagMaxDistance = false;
    return defaultMaxDistance;
  } else {
    flagMaxDistance = false;
    return userIn;
  }
}

/********************************************************************************
 * User Input for Max distance of results from input location
 ********************************************************************************/
function getKeyword() {
  var userIn = formKeyword.val();
  if (userIn == undefined || userIn === "") {
    return "";
  } else {
    return userIn;
  }
}

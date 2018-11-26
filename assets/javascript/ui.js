//required parameter for hiking trail api 
var latLng = []


//address for grabing the latitude and longitude for the hiking trail
var address = "chicago+IL+60622";

var googleKey = "AIzaSyCaShTZRBQ_m2HC7wFZJ4M1OVe5a-YShPs";
//funciton for passing in address returns array latitude, longitude.
function toLatLng(string) {
  var googleLocationURL =
    "https://cors-anywhere.herokuapp.com/" +
    `https://maps.googleapis.com/maps/api/geocode/json?address=${string}&key=${googleKey}`;
  $.ajax({
    url: googleLocationURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.results[0].geometry.location.lat);
    latLng[0] = response.results[0].geometry.location.lat;
    latLng[1] = response.results[0].geometry.location.lng;
    console.log(latLng)
    return (latLng)
  })
}
toLatLng(address)
console.log(latLng)
console.log(toLatLng(address))
//required key parameter
var hikingKey = "200389890-8a7115b52b480cbc8bf26a0516b28e9d";
// max distance in miles default 30, max 200
var maxDistance = "30";
//default 10 trails up to 500 trails
var maxTrailResults = "10";
//default quality can use distance
var sort = "";
//minium length default 0 mile
var minLength = "distance";
// the required parameters for the hiking api is latitude, longitude, and key
var hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&minLength=${minLength}&sort=${sort}&lon=${longitude}&  maxDistance=${maxDistance}&maxTrailResults=${maxTrailResults}&key=${hikingKey}`;
$.ajax({
  url: hikingURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

var googleLatitude = "41.895481";
var googleLongitude = "-87.675133";
// radius in meters  max meters: 50000
var radius = "10";
// where we can put in the type of place we want to search for
var typeOfPlace = "bikeshop";
// keyword can be any word that google assoicates with the places it will return
var keyword = "";

var googlePlacesURL =
  `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${googleLatitude},
    ${googleLongitude}&radius=${radius}&type=${typeOfPlace}&keyword=${keyword}&key=${googleKey}`;
$.ajax({
  url: googlePlacesURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});


//for passing in and array with latitude, longitude. to be changed into an address
function toAddress(array) {
  var googleAddressURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${array[0]},${array[1]}&key=${googleKey}`
  $.ajax({
    url: googleAddressURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    return (response.results.formatted_address)
  });


}
/************************** User Input Validation Below ************************/
const formZipCode = $();
const formmaxTrailResults = $();
const formMinTrailLength = $();
const formTypeOfPlace = $();

const defaultTransit = "car";
const defaultmaxTrailResults = 10;
const defaultMinTrailLength = 0;
const defaultTypeOfPlace = "bikeshop";

/** maximum allowed value for number of results to return from hiking API */
const maxValuemaxTrailResults = 10;

/** If false, the search is basic and only the user location/zip code is used */
var flagAdvancedSearch = false;
/** If a flag is false, the user input is invalid; do not proceed with API req */
var flagZipCode = false;
var flagMaxTrailResults = false;
var flagMinTrailLength = false;

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
function getZipCode() {
  var userIn = formZipCode.val();
  //invalid input condition
  if (userIn == undefined || userIn === "") {
    invalidInput(formZipCode, "Invalid Input: Zip Code");
    flagZipCode = false;
    return "";
  } else {
    flagZipCode = true;
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
  //invalid input condition
  userIn = parseInt(userIn);
  if (userIn < 0) {
    invalidInput(formmaxTrailResults, "Invalid Input: Min Trail Length cannot be less than 0");
    flagMinTrailLength = false;
    return defaultMinTrailLength;
  } else {
    flagMinTrailLength = true;
    return userIn;
  }
}

/********************************************************************************
 * User Input for Max number of Results returned for hiking trails
 ********************************************************************************/
function getMaxTrailResults() {
  userIn = userMaxTrailResults.val();
  if (userIn < 0) {
    invalidInput(formMaxTrailResults, "Invalid Input: Min Trail Length cannot be less than 0");
    flagMaxTrailResults = false;
    return defaultmaxTrailResults;
  } else if (userIn > maxValuemaxTrailResults) {
    console.log("Warning: Max Trail Results exceeded limit, set to max of " + maxValuemaxTrailResults);
    flagMaxTrailResults = true;
    return maxValuemaxTrailResults;
  } else {
    flagMaxTrailResults = true;
    return userIn;
  }
}
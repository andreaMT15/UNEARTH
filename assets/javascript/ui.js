//required parameter for hiking trail api 
var latitude;
//
var longitude;
var address = "chicago+IL+60622";
var googleKey = "AIzaSyCaShTZRBQ_m2HC7wFZJ4M1OVe5a-YShPs";
var googleLocationURL =
  "https://cors-anywhere.herokuapp.com/" +
  `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`;
$.ajax({
  url: googleLocationURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(response.results[0].geometry.location.lat);
  latitude = response.results[0].geometry.location.lat;
  longitude = response.results[0].geometry.location.lng;
  console.log(latitude);
  console.log(longitude);
//required key parameter
  var hikingKey = "200389890-8a7115b52b480cbc8bf26a0516b28e9d";
  // max distance in miles default 30, max 200
  var maxDistance = "200";
  //default 10 trails up to 500 trails
  var maxResults = "10";
  //default quality can use distance
  var sort = "";
  //minium length default 0 mile
  var minLength = "distance";
  var hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&minLength=${minLength}&sort=${sort}&lon=${longitude}&  maxDistance=${maxDistance}&maxResults=${maxResults}&key=${hikingKey}`;
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
});
//address for grabbing latitude and longitude

/************************** User Input Validation Below ************************/
const formZipCode = $();
const formLongitude = $();
const formLatitude = $();
const formTransit = $();
const formMaxResults = $();
const formMinTrailLength = $();

const defaultTransit = "car";
const defaultMaxResults = 10;
const formMinTrailLength = 0;
const defaultTypeOfPlace = "bikeshop";

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
    return undefined;
  } else {
    return userIn;
  }
}

/********************************************************************************
* User Input for longitude
********************************************************************************/
function getLong() {
  var userLong = formLong.val();
  //invalid input condition
  if (userLong == undefined || userLong === "") {
    invalidInput(formDestiation, "Invalid Input: Longitude");
    return undefined;
  } else {
    return userLat;
  }
}

/********************************************************************************
* User Input for latitude
********************************************************************************/
function getLat() {
  var userLat = formLong.val();
  //invalid input condition
  if (userLat == undefined || userLat === "") {
    invalidInput(formDestiation, "Invalid Input: Latitude");
    return undefined;
  } else {
    return userLat;
  }
}
/********************************************************************************
* User Input for method of Transportation (for getting airport or train station) 
********************************************************************************/
function getTransit() {
  var userTransit = formTransit.val();
  //invalid input condition
  if (userTransit == undefined || userTransit === "") {
    invalidInput(formTransit, "Invalid Input: Transit");
    return undefined;
  } else {
    return userLat;
  }
}
/********************************************************************************
* User Input for Max number of Results returned for hiking trails
********************************************************************************/

/********************************************************************************
* User Input for Minimum Length of hiking trail
********************************************************************************/
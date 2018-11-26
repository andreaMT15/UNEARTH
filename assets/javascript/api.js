//required parameter for hiking trail api
// var latLng = [];

//address for grabing the latitude and longitude for the hiking trail
var userAddress = "chicago+IL+60622";

var googleKey = "AIzaSyCaShTZRBQ_m2HC7wFZJ4M1OVe5a-YShPs";
//funciton for passing in address returns array latitude, longitude.
function toLatLng(address) {
  var googleLocationURL =
    "https://cors-anywhere.herokuapp.com/" +
    `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleKey}`;
  $.ajax({
    url: googleLocationURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    console.log(response.results[0].geometry.location.lat);
    fetchTrails(
      response.results[0].geometry.location.lat,
      response.results[0].geometry.location.lng
    );
  });
}

toLatLng(userAddress);

function fetchTrails(lat, long) {
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
  var hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&minLength=${minLength}&sort=${sort}&lon=${long}&  maxDistance=${maxDistance}&maxTrailResults=${maxTrailResults}&key=${hikingKey}`;
  $.ajax({
    url: hikingURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
}
function googlePlace() {
  var googleLatitude = "41.895481";
  var googleLongitude = "-87.675133";
  // radius in meters  max meters: 50000
  var radius = "10";
  // where we can put in the type of place we want to search for
  // var typeOfPlace = "bikeshop";
  // keyword can be any word that google assoicates with the places it will return
  var keyword = "";

  var googlePlacesURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${googleLatitude},
    ${googleLongitude}&radius=${radius}&type=${typeOfPlace}&keyword=${keyword}&key=${googleKey}`;
  $.ajax({
    url: googlePlacesURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
  });
}

//for passing in and array with latitude, longitude. to be changed into an address
function toAddress(arg1, arg2) {
  var googleAddressURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${arg1}
  },${arg2}&key=${googleKey}`;
  $.ajax({
    url: googleAddressURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    return response.results.formatted_address;
  });
}

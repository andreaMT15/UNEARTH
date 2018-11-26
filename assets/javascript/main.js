var hikingKey = "200389890-8a7115b52b480cbc8bf26a0516b28e9d";
var latitude = "41.895481";
var longitude = "-87.675133";
// max distance in miles default 30, max 200
var maxDistance = "200";
//default 10 trails up to 500 trails
var maxResults = "10";
//default quality can use distance
var sort = "";
//minium length default 0 mile
var minLength = "distance";
var hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${latitude}&minLength=${minLength}&sort=${sort}&lon=${longitude}&maxDistance=${maxDistance}&maxResults=${maxResults}&key=${hikingKey}`;
$.ajax({
  url: hikingURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

var googleKey = "AIzaSyCaShTZRBQ_m2HC7wFZJ4M1OVe5a-YShPs";

var googleLatitude = "41.895481";
var googleLongitude = "-87.675133";
// radius in meters  max meters: 50000
var radius = "10";
// where we can put in the type of place we want to search for
var typeOfPlace = "bikeshop";
// keyword can be any word that google assoicates with the places it will return
var keyword = "";
var googlePlacesURL = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${googleLatitude},${googleLongitude}&radius=${radius}&type=${typeOfPlace}&keyword=${keyword}&key=${googleKey}`;
$.ajax({
  url: googlePlacesURL,
  method: "GET"
}).then(function(response) {
  console.log(response);
});

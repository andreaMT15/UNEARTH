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

var hikingParameters = {
  //required key parameter
  hikingKey: "200389890-8a7115b52b480cbc8bf26a0516b28e9d",
  // max distance in miles default 30, max 200
  maxDistance: "30",
  //default 10 trails up to 500 trails
  maxTrailResults: "10",
  //default quality can use distance
  sort: "",
  //minium length default 0 mile
  minLength: "1"
};

function fetchTrails(lat, long) {
  // the required parameters for the hiking api is latitude, longitude, and key
  var hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&minLength=${
    hikingParameters.minLength
  }&sort=${hikingParameters.sort}&lon=${long}&  maxDistance=${
    hikingParameters.maxDistance
  }&maxTrailResults=${hikingParameters.maxTrailResults}&key=${
    hikingParameters.hikingKey
  }`;
  $.ajax({
    url: hikingURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    for (var i = 0; i < response.trails.length; i++) {
      var newCard = $("<div class='card col-md-6'>");
      var cardImg = $(
        `<img class="card-img-top" src=${
          response.trails[i].imgMedium
        } alt=hiking-trail${i}>`
      );
      var cardBody = $("<div class=card-body>");
      var cardTitle = $("<h5 class=card-title>");
      cardTitle.text(response.trails[i].name);
      var cardText = $("<p class='card-text'>");
      cardText.text(
        `${response.trails[i].summary} Difficulty: ${
          response.trails[i].difficulty
        }`
      );
      var cardDropdown = $("<div class='dropdown'>");

      var dropdownButton = $(
        '<button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
      );
      dropdownButton.text("Search nearby!");

      var dropdownMenu = $(
        '<div class="dropdown-menu" aria-labelledby="dropdownMenu2">'
      );
      var busButton = $(
        `<button class="dropdown-item" type="button" id="bus" data-lat=${
          response.trails[i].latitude
        } data-lng=${response.trails[i].longitude}>`
      );

      busButton.text("Bus");
      var trainButton = $(
        `<button class="dropdown-item" type="button" id="train" data-lat=${
          response.trails[i].latitude
        } data-lng=${response.trails[i].longitude}>`
      );
      trainButton.text("Train");
      var airportButton = $(
        `<button class="dropdown-item" type="button" id="airport" data-lat=${
          response.trails[i].latitude
        } data-lng=${response.trails[i].longitude}>`
      );
      airportButton.text("Airport");
      var restaurantButton = $(
        `<button class="dropdown-item" type="button" id="restaurant" data-lat=${
          response.trails[i].latitude
        } data-lng=${response.trails[i].longitude}>`
      );
      restaurantButton.text("Restaurant");
      dropdownMenu.append(busButton);
      dropdownMenu.append(trainButton);
      dropdownMenu.append(airportButton);
      dropdownMenu.append(restaurantButton);

      cardDropdown.append(dropdownButton);
      cardDropdown.append(dropdownMenu);
      newCard.append(cardImg);
      newCard.append(cardBody);
      newCard.append(cardTitle);
      newCard.append(cardText);
      newCard.append(cardDropdown);
      $("#trails").append(newCard);
    }
  });
}

function googlePlace() {
  //required parameter
  var googleLatitude = "41.895481";
  //required parameter
  var googleLongitude = "-87.675133";
  // radius in meters  max meters: 50000
  var radius = "10";
  // where we can put in the type of place we want to search for
  var typeOfPlace = "";
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

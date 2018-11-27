//required parameter for hiking trail api
// var latLng = [];

//address for grabing the latitude and longitude for the hiking trail

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
    // console.log(response);
    // console.log(response.results[0].geometry.location.lat);
    fetchTrails(
      response.results[0].geometry.location.lat,
      response.results[0].geometry.location.lng
    );
  });
}

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
      var trailLat = response.trails[i].latitude;
      var trailLng = response.trails[i].longitude;
      changeToAddress(trailLat, trailLng);

      var newCard = $("<div class='card col-md-6'>");
      if (
        response.trails[i].imgMedium === "" ||
        response.trails[i].imgMedium == undefined
      ) {
        var cardImg = $(
          `<img class="card-img-top" src=
            "assets/images/groot.jpg"
          } alt=hiking-trail${i}a>`
        );
      } else {
        var cardImg = $(
          `<img class="card-img-top" src=${
            response.trails[i].imgMedium
          } alt=hiking-trail${i}a>`
        );
      }
      var cardBody = $("<div class=card-body>");
      var cardTitle = $("<h5 class=card-title>");
      cardTitle.text(response.trails[i].name);
      var cardText = $("<p class='card-text'>");
      cardText.text(
        `${response.trails[i].summary} Difficulty: ${
          response.trails[i].difficulty
        } Length: ${response.trails[i].length} Miles
        Stars: ${response.trails[i].length}`
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
        `<button class="dropdown-item" type="button" id="train-stop" data-lat=${
          response.trails[i].latitude
        } data-lng=${response.trails[i].longitude}>`
      );
      trainButton.text("Train");
      var hostelButton = $(
        `<button class="dropdown-item" type="button" id="hostel" data-lat=${
          response.trails[i].latitude
        } data-lng=${response.trails[i].longitude}>`
      );
      hostelButton.text("Hostel");
      var restaurantButton = $(
        `<button class="dropdown-item" type="button" id="restaurant" data-lat=${
          response.trails[i].latitude
        } data-lng=${response.trails[i].longitude}>`
      );
      restaurantButton.text("Restaurant");
      dropdownMenu.append(busButton);
      dropdownMenu.append(trainButton);
      dropdownMenu.append(hostelButton);
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

$(document).on("click", ".dropdown-item", function(event) {
  var lat = $(this).attr("data-lat");
  var lng = $(this).attr("data-lng");
  var type = $(this).attr("id");
  googlePlace(lat, lng, type);
});
placesInfo = {
  // radius in meters  max meters: 50000
  radius: 2000
};
function googlePlace(lat, lng, type) {
  var googlePlacesURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},
    ${lng}&radius=${placesInfo.radius}&keyword=${type}&key=${googleKey}`;
  $.ajax({
    url: googlePlacesURL,
    method: "GET"
  }).then(function(response) {
    console.log(response.results.length);
    if (response.results.length === 0 && placesInfo.radius <= 48000) {
      placesInfo.radius += 2000;
      // console.log(placesInfo.radius);
      googlePlace(lat, lng, type);
    }

    // console.log(response);
  });
}

//for passing in and array with latitude, longitude. to be changed into an address

function changeToAddress(arg1, arg2) {
  var googleAddressURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${arg1},${arg2}&key=${googleKey}`;
  $.ajax({
    url: googleAddressURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    console.log(response.results[0].formatted_address);
  });
}

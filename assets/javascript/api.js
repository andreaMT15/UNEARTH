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
var trailsArray = [];
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
    // console.log(response);

    for (var i = 0; i < response.trails.length; i++) {
      var trailLat = response.trails[i].latitude;
      var trailLng = response.trails[i].longitude;
      changeToAddress(trailLat, trailLng);
      var trailObject = {};
      trailObject = response.trails[i];
      trailsArray.push(trailObject);
      var spacing = $("<div class='col-md-2'></div>");

      var newCard = $("<div class='card col-md-5'>");
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
      var cardText = $(`<p class='card-text' id=text-${i}>`);
      cardText.html(
        `${response.trails[i].summary} <br> <b>Difficulty:</b> ${
          response.trails[i].difficulty
        }.  <b>Length:</b>  ${response.trails[i].length}  Miles. 
        <b>Stars:</b> ${response.trails[i].stars}.  `
      );
      var cardDropdown = $("<div class='dropdown'>");

      var dropdownButton = $(
        '<button class="btn btn-light dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
      );
      dropdownButton.text("Search nearby!");

      var dropdownMenu = $(
        '<div class="dropdown-menu" aria-labelledby="dropdownMenu2">'
      );
      var busButton = $(
        `<button class="dropdown-item" type="button" id="bus" data-lat='${
          response.trails[i].latitude
        }' data-trail='${i}' data-lng='${response.trails[i].longitude}'>`
      );

      busButton.text("Bus");
      var trainButton = $(
        `<button class="dropdown-item nearby" type="button" id="train-stop" data-lat='${
          response.trails[i].latitude
        }' data-trail='${i}' data-lng='${response.trails[i].longitude}'>`
      );
      trainButton.text("Train");
      var hostelButton = $(
        `<button class="dropdown-item nearby" type="button" id="hostel" data-lat='${
          response.trails[i].latitude
        }' data-trail='${i}' data-lng='${response.trails[i].longitude}'>`
      );
      hostelButton.text("Hostel");
      var restaurantButton = $(
        `<button class="dropdown-item nearby" type="button" id="restaurant" data-lat='${
          response.trails[i].latitude
        }' data-trail='${i}' data-lng='${response.trails[i].longitude}'>`
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
      if (i % 2 === 0) {
        $("#trails").append(newCard);
      } else {
        $("#trails").append(spacing);
        $("#trails").append(newCard);
      }
    }
  });
}

$(document).on("click", ".nearby", function(event) {
  var lat = $(this).attr("data-lat");
  var lng = $(this).attr("data-lng");
  var type = $(this).attr("id");
  var trailNum = $(this).attr("data-trail");
  googlePlace(lat, lng, type, trailNum);
});
placesInfo = {
  // radius in meters  max meters: 50000
  radius: 2000
};
function googlePlace(lat, lng, type, trailNum) {
  var googlePlacesURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},
    ${lng}&radius=${placesInfo.radius}&keyword=${type}&key=${googleKey}`;
  $.ajax({
    url: googlePlacesURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response.results);
    if (response.results.length === 0 && placesInfo.radius <= 48000) {
      placesInfo.radius += 2000;
      // console.log(placesInfo.radius);
      googlePlace(lat, lng, type, trailNum);
    }
    console.log(trailsArray);
    console.log(trailNum);
    $("#trails").empty();
    var spacing = $("<div class='col-md-3'>");
    var newCard = $("<div class='card col-md-6'>");
    if (
      trailsArray[trailNum].imgMedium === "" ||
      trailsArray[trailNum].imgMedium == undefined
    ) {
      var cardImg = $(
        `<img class="card-img-top" src=
          "assets/images/groot.jpg"
        } alt=hiking-trail${i}a>`
      );
    } else {
      var cardImg = $(
        `<img class="card-img-top" src=${
          trailsArray[trailNum].imgMedium
        } alt=hiking-trail${i}a>`
      );
    }
    var cardBody = $("<div class=card-body>");
    var cardTitle = $("<h5 class=card-title>");
    cardTitle.text(trailsArray[trailNum].name);
    var cardText = $(`<p class='card-text' id=text-${i}>`);
    cardText.html(
      `${trailsArray[trailNum].summary} <br> <b>Difficulty:</b> ${
        trailsArray[trailNum].difficulty
      }.  <b>Length:</b>  ${trailsArray[trailNum].length}  Miles. 
      <b>Stars:</b> ${trailsArray[trailNum].stars}.  `
    );

    newCard.append(cardImg);
    newCard.append(cardBody);
    newCard.append(cardTitle);
    newCard.append(cardText);
    $("#trails").append(spacing);
    $("#trails").append(newCard);

    for (var i = 0; i < response.results.length; i++) {
      var newCard = $("<div class='card col-md-5'>");
      var spacing = $("<div class='col-md-2'></div>");
      // var cardImg = $(
      //   `<img class="card-img-top" src=
      //       "assets/images/groot.jpg"
      //     } alt=hiking-trail${i}a>`
      // );

      var cardBody = $("<div class=card-body>");
      var cardTitle = $("<h5 class=card-title>");
      cardTitle.text(response.results[i].name);
      var cardText = $(`<p class='card-text'>`);
      cardText.html(
        `<b>type of place:</b> ${response.results[i].types[0]}, ${
          response.results[i].types[1]
        }, <b>rating:</b> ${response.results[i].rating} <b>Address:</b> ${
          response.results[i].vicinity
        }`
      );

      // newCard.append(cardImg);
      newCard.append(cardBody);
      newCard.append(cardTitle);
      newCard.append(cardText);

      if (i % 2 === 0) {
        $("#trails").append(newCard);
      } else {
        $("#trails").append(spacing);
        $("#trails").append(newCard);
      }
    }

    // console.log(response);
  });
}

//for passing in and array with latitude, longitude. to be changed into an address

var counter = 0;

function changeToAddress(arg1, arg2) {
  var googleAddressURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${arg1},${arg2}&key=${googleKey}`;
  $.ajax({
    url: googleAddressURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    // console.log(response.results[0].formatted_address);
    $(`#text-${counter}`).append(
      `<b>Address:</b> ${response.results[0].formatted_address}`
    );
    counter++;
  });
}

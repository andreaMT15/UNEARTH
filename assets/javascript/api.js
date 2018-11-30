/********************************************************************************
 * @author Nathan Walker
 * @version 11/29/18
 * Gets data from API sources, then displays the data to an HTML page
 *******************************************************************************/

//address for grabing the latitude and longitude for the hiking trail
var counter = 0;
var origins = "";
var trailsArray = [];
var nearbyArray = [];
var hikingParameters = {
  //required key parameter
  hikingKey: "200389890-8a7115b52b480cbc8bf26a0516b28e9d",
  // search radius in miles default 30, max 200
  searchRadius: "30",
  //default 10 trails up to 500 trails
  maxTrailResults: "10",
  //default quality can use distance
  sort: "",
  //minium length default 0 mile
  minTrailLength: "1"
};

placesInfo = {
  // radius in meters  max meters: 50000
  radius: 2000
};

var googleKey = "AIzaSyCaShTZRBQ_m2HC7wFZJ4M1OVe5a-YShPs";
$(document).on("click", ".nearby", function(event) {
  //grabbing the latitude from the trail
  var lat = $(this).attr("data-lat");
  //grabbing the longitude from the trail
  var lng = $(this).attr("data-lng");
  //passing the latitude, and longitude to google geolocation api to attach it to new trail card
  changeToAddress(lat, lng, "origin");
  //grabbing the type of place to search for to pass on to the google places api
  var type = $(this).attr("id");
  //grabbing which trail is being searched nearby
  var trailNum = $(this).attr("data-trail");
  // calling the google place api
  sessionStorage.setItem("trailNum", $(this).attr("data-trail"));
  googlePlace(lat, lng, type, trailNum);
});
//funciton for passing in address returns array latitude, longitude.
function changeToAddress(lat, lng, target) {
  var googleAddressURL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${googleKey}`;
  $.ajax({
    url: googleAddressURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    // console.log(response.results[0].formatted_address);
    if (target != "origin") {
      $(`#${target}-${counter}`).append(
        `<br><b>Address:</b> ${response.results[0].formatted_address}`
      );
      counter++;
    } else {
      origins = response.results[0].formatted_address;
      sessionStorage.setItem("origin", response.results[0].formatted_address);
      // console.log(sessionStorage.getItem("origin"));
    }
  });
}
// function for calling google distance api to find the distance from trail to nearby places
function addDistance(origin, destination, x) {
  console.log(origin);
  console.log(x);
  console.log(destination);
  var googleDistanceURL = `https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin}&destinations=${destination}&key=${googleKey}`;
  $.ajax({
    url: googleDistanceURL,
    method: "GET"
  }).then(function(response) {
    console.log(response);
    $(`#places-${x}`).append(
      `<br><b>Distance:</b> ${
        response.rows[0].elements[0].distance.text
      } <b>Duration:</b> ${response.rows[0].elements[0].duration.text}`
    );
  });
}
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
function makeNearbyCards(trailNum) {
  trailsArray = JSON.parse(sessionStorage.getItem("trailsArray"));
  nearbyArray = JSON.parse(sessionStorage.getItem("nearbyArray"));
  sessionStorage.setItem("currentProcess", "nearby");

  $("#trails").empty();
  var spacing = $("<div class='col-md-3'>");
  var newCard = $("<div class='card col-md-6'>");
  var trailLat = trailsArray[trailNum].latitude;
  var trailLng = trailsArray[trailNum].longitude;
  counter = trailNum;

  changeToAddress(trailLat, trailLng, "trail");

  if (
    trailsArray[trailNum].imgMedium === "" ||
    trailsArray[trailNum].imgMedium == undefined
  ) {
    var cardImg = $(
      `<img class="card-img-top" src=
        "assets/images/hiking1.jpg"
      } alt=hiking-trail${trailNum}a>`
    );
  } else {
    var cardImg = $(
      `<img class="card-img-top" src=${
        trailsArray[trailNum].imgMedium
      } alt=hiking-trail${trailNum}a>`
    );
  }
  var cardBody = $("<div class=card-body>");
  var cardTitle = $("<h5 class=card-title>");
  cardTitle.text(trailsArray[trailNum].name);
  var cardText = $(`<p class='card-text' id='trail-${trailNum}'>`);
  cardText.html(
    `${trailsArray[trailNum].summary} <br> <b>Difficulty:</b> ${
      trailsArray[trailNum].difficulty
    }.  <b>Length:</b>  ${trailsArray[trailNum].length}  Miles. 
    <b>Stars:</b> ${trailsArray[trailNum].stars}.`
  );

  newCard.append(cardImg);
  newCard.append(cardBody);
  newCard.append(cardTitle);
  newCard.append(cardText);
  $("#trails").append(spacing);
  $("#trails").append(newCard);
  for (var i = 0; i < nearbyArray.length; i++) {
    // console.log(nearbyArray);
    var lat = nearbyArray[i].geometry.location.lat;
    var lng = nearbyArray[i].geometry.location.lng;
    var destination = `${nearbyArray[i].vicinity}`;

    var newCard = $("<div class='card col-md-5'>");
    var spacing = $("<div class='col-md-2'></div>");

    var cardBody = $("<div class=card-body>");
    var cardTitle = $("<h5 class=card-title>");
    cardTitle.text(nearbyArray[i].name);
    var cardText = $(`<p class='card-text' id ='places-${i}' >`);
    cardText.html(
      `<b>Rating:</b> ${nearbyArray[i].rating} <br> <b>Address</b> ${
        nearbyArray[i].vicinity
      } <br> <b>Type of place:</b>  `
    );
    for (var k = 0; k < nearbyArray[i].types.length; k++) {
      if (nearbyArray[i].types[k] === "point_of_interest") {
        break;
      } else {
        cardText.append(`${nearbyArray[i].types[k]} `);
      }

      newCard.append(cardBody);
      newCard.append(cardTitle);
      newCard.append(cardText);

      if (i % 2 === 0) {
        $("#trails").append(newCard);
      } else {
        $("#trails").append(spacing);
        $("#trails").append(newCard);
      }
      // console.log(response);
    }
    origins = sessionStorage.getItem("origin");
    addDistance(origins, destination, i);
  }
}
function makeTrailCards() {
  sessionStorage.setItem("currentProcess", "trails");
  trailsArray = JSON.parse(sessionStorage.getItem("trailsArray"));
  for (var i = 0; i < trailsArray.length; i++) {
    // console.log(trailsArray);
    var trailLat = trailsArray[i].latitude;
    var trailLng = trailsArray[i].longitude;
    var spacing = $("<div class='col-md-2'></div>");

    var newCard = $("<div class='card col-md-5'>");
    //passing that info to get the address attached to the trail cards
    changeToAddress(trailLat, trailLng, "trail");

    if (
      trailsArray[i].imgMedium === "" ||
      trailsArray[i].imgMedium == undefined
    ) {
      var cardImg = $(
        `<img class="card-img-top" src=
        "assets/images/hiking3.jpg"
      } alt=hiking-trail${i}a>`
      );
    }
    //if there is a picture there get it ready to be appended on to the dom
    else {
      var cardImg = $(
        `<img class="card-img-top" src=${
          trailsArray[i].imgMedium
        } alt=hiking-trail${i}a>`
      );
    }

    // making a card body for the trails
    var cardBody = $("<div class=card-body>");
    //setting up the card title
    var cardTitle = $("<h5 class=card-title>");
    //getting the title from the api
    cardTitle.text(trailsArray[i].name);
    // setting up the paragraph element to hold the trail info
    var cardText = $(`<p class='card-text' id=trail-${i}>`);
    // putting the difficulty, length, and rating
    cardText.html(
      `${trailsArray[i].summary} <br> <b>Difficulty:</b> ${
        trailsArray[i].difficulty
      }.  <b>Length:</b>  ${trailsArray[i].length}  Miles. 
    <b>Stars:</b> ${trailsArray[i].stars}.  `
    );
    //setting up the container for a dropdown menu button for nearby searches
    var cardDropdown = $("<div class='dropdown'>");
    // setting up the button to be dropped down
    var dropdownButton = $(
      '<button class="btn btn-success dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">'
    );

    dropdownButton.text("Search nearby!");
    //the div that holds the drop down buttons
    var dropdownMenu = $(
      '<div class="dropdown-menu" aria-labelledby="dropdownMenu2">'
    );
    //the buttons to be dropped down for searching nearby the trail using the keywords with google places api
    var busButton = $(
      `<button class="dropdown-item nearby" type="button" id="bus" data-lat='${
        trailsArray[i].latitude
      }' data-trail='${i}' data-lng='${trailsArray[i].longitude}'>`
    );

    busButton.text("Bus");
    var trainButton = $(
      `<button class="dropdown-item nearby" type="button" id="train-stop" data-lat='${
        trailsArray[i].latitude
      }' data-trail='${i}' data-lng='${trailsArray[i].longitude}'>`
    );
    trainButton.text("Train");
    var hostelButton = $(
      `<button class="dropdown-item nearby" type="button" id="hostel" data-lat='${
        trailsArray[i].latitude
      }' data-trail='${i}' data-lng='${trailsArray[i].longitude}'>`
    );
    hostelButton.text("Hostel");
    var restaurantButton = $(
      `<button class="dropdown-item nearby" type="button" id="restaurant" data-lat='${
        trailsArray[i].latitude
      }' data-trail='${i}' data-lng='${trailsArray[i].longitude}'>`
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
    //setting up an if else statement to put spacing between the cards
    if (i % 2 === 0) {
      $("#trails").append(newCard);
    } else {
      $("#trails").append(spacing);
      $("#trails").append(newCard);
    }
  }
}

//an array for storing the objects from the hiking project api

function fetchTrails(lat, long) {
  hikingParameters.minTrailLength = sessionStorage.getItem("minTrailLength");
  hikingParameters.maxTrailResults = sessionStorage.getItem("maxTrailResults");
  hikingParameters.searchRadius = sessionStorage.getItem("searchRadius");
  // console.log(hikingParameters.maxTrailResults);
  // console.log(hikingParameters.searchRadius);
  // the required parameters for the hiking api is latitude, longitude, and key
  var hikingURL = `https://www.hikingproject.com/data/get-trails?lat=${lat}&minLength=${
    hikingParameters.minTrailLength
  }&sort=${hikingParameters.sort}&lon=${long}&  maxDistance=${
    hikingParameters.searchRadius
  }&maxResults=${hikingParameters.maxTrailResults}&key=${
    hikingParameters.hikingKey
  }`;
  $.ajax({
    url: hikingURL,
    method: "GET"
  }).then(function(response) {
    // console.log(response);
    // counter for knowing what card to attach the address to
    counter = 0;

    for (var i = 0; i < response.trails.length; i++) {
      //setting the trail latitude and longitude to variables to be passed to google geolocation api to grab an address

      // setting up an object to save the data from api to
      var trailObject = {};
      trailObject = response.trails[i];
      //pushing the trail objects to a global array
      trailsArray.push(trailObject);
      sessionStorage.setItem("trailsArray", JSON.stringify(trailsArray));
      // making a div that will be used for spacing the trail cards
    }
    makeTrailCards();
  });
}

// function for calling google places to for searching near the trails
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

      googlePlace(lat, lng, type, trailNum);
    }
    var nearbyObject = {};

    for (var j = 0; j < response.results.length; j++) {
      nearbyObject = response.results[j];
      nearbyArray.push(nearbyObject);
      sessionStorage.setItem("nearbyArray", JSON.stringify(nearbyArray));
    }
    makeNearbyCards(trailNum);

    // console.log(response);
  });
}

//for passing in and array with latitude, longitude. to be changed into an address

/************************** User Input Validation Below ************************/
const formAddress = $("#search-input");
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
  field.addClass("invalid");
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
    invalidInput(
      formmaxTrailResults,
      "Invalid Input: Min Trail Length cannot be less than 0"
    );
    flagMinTrailLength = false;
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
    invalidInput(formMaxTrailResults, "Invalid Input: Min Trail Length cannot be less than 0");
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
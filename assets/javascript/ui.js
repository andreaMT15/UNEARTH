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
    invalidInput(
      formmaxTrailResults,
      "Invalid Input: Min Trail Length cannot be less than 0"
    );
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
    flagMaxTrailResults = true;
    return maxValuemaxTrailResults;
  } else {
    flagMaxTrailResults = true;
    return userIn;
  }
}

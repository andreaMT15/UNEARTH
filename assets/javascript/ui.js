/********************************************************************************
 * @author Steve Lucas
 * @version 11/27/18
 * Validates user input and saves data to session storage
 *******************************************************************************/

const formAddress = $("#search-input");
const formMaxTrailResults = $("#max-results-input");
const formMinTrailLength = $("#min-trail-length-input");
const formSearchRadius = $("#search-radius-input");
const formKeyword = $("#keyword-input");

const defaultTransit = "car";
const defaultMaxTrailResults = 10;
const defaultMinTrailLength = 0;
const defaultKeyword = "";
const defaultSearchRadius = 30;

/** maximum allowed value for number of results to return from hiking API */
const maxValueMaxTrailResults = 10;

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
  if (userIn === undefined || userIn === "") {
    invalidInput(formAddress, "Invalid Input: Address");
    sessionStorage.setItem("address", "");
  } else {
    sessionStorage.setItem("address", userIn);
  }
}

/********************************************************************************
 * User Input for Minimum Length of hiking trail
 ********************************************************************************/
function getMinTrailLength() {
  var userIn = formMinTrailLength.val();
  if (userIn === "" || userIn === undefined) {
    sessionStorage.setItem("minTrailLength", defaultMinTrailLength);
  }
  //invalid input condition
  userIn = parseInt(userIn);
  if (userIn < 0) {
    invalidInput(formmaxTrailResults, "Invalid Input: Min Trail Length cannot be less than 0");
  } else {
    sessionStorage.setItem("minTrailLength", userIn);
  }
}

/********************************************************************************
 * User Input for Max number of Results returned for hiking trails
 ********************************************************************************/
function getMaxTrailResults() {
  var userIn = formMaxTrailResults.val();
  if (userIn === "" || userIn === undefined) {
    sessionStorage("maxTrailResults", defaultMaxTrailResults);
  }
  userIn = parseInt(userIn);
  if (userIn < 0) {
    invalidInput(formMaxTrailResults, "Invalid Input: Min Trail Length cannot be less than 0");
  } else if (userIn > maxValueMaxTrailResults) {
    console.log("Warning: Max Trail Results exceeded limit, set to max of " + maxValueMaxTrailResults);
    sessionStorage.setItem("maxTrailResults", maxValueMaxTrailResults);
  } else {
    sessionStorage.setItem("maxTrailResults", userIn);
  }
}

/********************************************************************************
 * User Input for Max distance of results from input location
 ********************************************************************************/
function getMaxDistance() {
  var userIn = formSearchRadius.val();
  if (userIn === "" || userIn === undefined) {
    sessionStorage.setItem("searchRadius", defaultSearchRadius);
  }
  userIn = parseInt(userIn);
  if (userIn < 0) {
    invalidInput(formSearchRadius, "Invalid Input: Max Distance cannot be less than 0");
  } else if (userIn === 0) {
    console.log("Warning: Max Distance set to default because input was 0");
    sessionStorage.setItem("searchRadius",defaultSearchRadius);
  } else {
    sessionStorage.setItem("searchRadius", userIn);
  }
}

/********************************************************************************
 * User Input for Max distance of results from input location
 ********************************************************************************/
function getKeyword() {
  var userIn = formKeyword.val();
  if (userIn === undefined) {
    sessionStorage.setItem("keyword", "");
  } else {
    sessionStorage.setItem("keyword", userIn);
  }
}


/********************************************************************************
 * Functionality for 'advanced search' form
 ********************************************************************************/
$(document).ready(function() {

});
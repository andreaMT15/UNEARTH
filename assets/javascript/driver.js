$(document).ready(function() {
  $("#submit").on("click", function() {
    event.preventDefault();

    // removes 'invalid' class from any form elements
    // ('invalid' will be added again if it input is invalid)
    $(".invalid").each(function() {
      $(this).removeClass("invalid")
    });

    //address saved to session storage
    getAddress();

    // if advanced search
    if (flagAdvancedSearch) {
      hikingParameters.minTrailLength = sessionStorage.getItem("minTrailLength");
      hikingParameters.maxTrailResults = sessionStorage.getItem("maxTrailResults");
      hikingParameters.searchRadius = sessionStorage.getItem("searchRadius");
    }
    console.log(sessionStorage.getItem("address"));
    if (sessionStorage.getItem("address") === undefined ||
      sessionStorage.getItem("address") === "") {
      console.log("Invalid Address")
    } else {
      window.open("results.html", "_self");
    }
  });
});
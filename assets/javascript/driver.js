$(document).ready(function() {
  //advanced search form hidden by default
  $("#adv-search-form").hide();

  /** If false, the search is basic and only the user location/zip code is used */
  var flagAdvancedSearch = false;


  $("#search-btn").on("click", function() {
    event.preventDefault();

    // removes 'invalid' class from any form elements
    // ('invalid' will be added again if it input is invalid)
    $(".invalid").each(function() {
      $(this).removeClass("invalid")
    });

    //address saved to session storage
    getAddress();


    console.log(sessionStorage.getItem("address"));
    if (sessionStorage.getItem("address") === undefined ||
      sessionStorage.getItem("address") === "") {
      console.log("Invalid Address");
      return;
    }
    
    // if advanced search
    if (flagAdvancedSearch) {
      hikingParameters.minTrailLength = sessionStorage.getItem("minTrailLength");
      hikingParameters.maxTrailResults = sessionStorage.getItem("maxTrailResults");
      hikingParameters.searchRadius = sessionStorage.getItem("searchRadius");
    }
    //otherwise, all parameters will remain at default values
    
    window.open("results.html", "_self");
  
  });

  $("#adv-search-drop").on("click", function() {
    event.preventDefault();
    flagAdvancedSearch = true;
    $("#adv-search-form").show();
  });
  console.log("Add button functionality to revert to basic search");
});
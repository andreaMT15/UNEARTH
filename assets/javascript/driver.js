/********************************************************************************
 * @author Steve Lucas
 * @version 11/27/18
 * Handles event listeners on HTML pages and drives all functionality
 *******************************************************************************/

//advanced search form hidden by default
$("#adv-search-form").hide();

/** If false, the search is basic and only the user location/zip code is used */
var flagAdvancedSearch = false;

function search() {
  event.preventDefault();

  // removes 'invalid' class from any form elements
  // ('invalid' will be added again if it input is invalid)
  $(".invalid").each(function() {
    $(this).removeClass("invalid");
  });

  //address saved to session storage
  getAddress();

  console.log(sessionStorage.getItem("address"));
  if (
    sessionStorage.getItem("address") === undefined ||
    sessionStorage.getItem("address") === ""
  ) {
    console.log("Invalid Address");
  } else {
    // if advanced search
    if (flagAdvancedSearch) {
      getMinTrailLength();
      getMaxTrailResults();
      getSearchRadius();
    }
    //otherwise, all parameters will remain at default values
    if (sessionStorage.getItem("currentProcess") === "same") {
      sessionStorage.setItem("currentProcess", "trails");
    } else {
      sessionStorage.setItem("currentProcess", "search");
    }
    window.open("results.html", "_self");
  }
}

$(document).ready(function() {
  //user's last saved input is populated to search box for user convenience
  $("#search-input").text(sessionStorage.getItem("address"));

  $("#search-btn").on("click", function() {
    event.preventDefault();
    search();
  });

  /**
   * on click, displays the advanced search form if it is hidden,
   * and hides it if it is showing.
   */
  $("#adv-search-drop").on("click", function() {
    event.preventDefault();
    if (!flagAdvancedSearch) {
      flagAdvancedSearch = true;
      console.log(flagAdvancedSearch);
      $("#adv-search-form").show();
      $("#adv-search-btn").text("Basic Search");
    } else {
      flagAdvancedSearch = false;
      $("#adv-search-form").hide();
      $("#adv-search-btn").text("Advanced Search");
    }
  });
});

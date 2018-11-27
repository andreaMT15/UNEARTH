// on submit
$("#submit").on("click", function() {
  event.preventDefault();

  // removes 'invalid' class from any form elements
  // ('invalid' will be added again if it input is invalid)
  $(".invalid").each(function() {
    $(this).removeClass("invalid")
  });
  console.log(getAddress);
  // if basic search
  if (!flagAdvancedSearch) {
    // get address from User
    address = getAddress();
    console.log(address);
    if (flagAddress) {
      //change this to a modal or form validation in the future
      return;
    } else { //valid search condition

      /********* Call API functions here ********/
      toLatLng(address);
    }
  }

  // if advanced search
  else if (flagAdvancedSearch) {
    // if any flags are true, cancel do not call API. Prompt user on form
    address = getAddress();
    if (flagAddress) {
      return;
    }

    hikingParameters.minTrailLength = getMinTrailLength();
    if (flagMinTrailLength) {
      return;
    }

    hikingParameters.maxTrailResults = getMaxTrailResults();
    if (flagMaxTrailResults) {
      return;
    }

    hikingParameters.maxDistance = getMaxDistance();
    if (flagMaxDistance) {
      return;
    }

    console.log(address);
    console.log(hikingParameters);
    /***************** Call API here **********************/
    toLatLng(address);
  }
});
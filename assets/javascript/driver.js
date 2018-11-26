// on submit
$("#submit-btn").on("click", function() {
  event.preventDefault();

  // removes 'invalid' class from any form elements
  // ('invalid' will be added again if it input is invalid)
  $(".invalid").each(function() {
    $(this).removeClass("invalid")
  });
  

  // if basic search
  if (!flagAdvancedSearch) {
    // get address from User
    address = getAddress();
    if (flagAddress) {
      //change this to a modal or form validation in the future
      return;
    } else { //valid search condition

      /********* Call API functions here ********/

    }
  }

  // if advanced search
  else if (flagAdvancedSearch) {
    // if any flags are true, cancel do not call API. Prompt user on form
    address = getAddress();
    if (flagAddress) {
      return;
    }

    minTrailLength = getMinTrailLength();
    if (flagMinTrailLength) {
      return;
    }

    maxTrailResults = getMaxTrailResults();
    if (flagMaxTrailResults) {
      return;
    }

    maxDistance = getMaxDistance();
    if (flagMaxDistance) {
      return;
    }

    transit = getTransit();

    /***************** Call API here **********************/

  }
});
$(document).ready(function() {
  console.log(sessionStorage.getItem("currentProcess"));
  if (sessionStorage.getItem("currentProcess") === "search") {
    console.log("works");
    toLatLng(sessionStorage.getItem("address"));
  } else if (sessionStorage.getItem("currentProcess") === "trails") {
    if (
      sessionStorage.getItem("trailArray") === undefined ||
      sessionStorage.getItem("trailArray") === ""
    ) {
      console.log("works");
      toLatLng(sessionStorage.getItem("address"));
    } else {
      console.log("works");
      makeTrailCards();
    }
  } else if (sessionStorage.getItem("currentProcess") === "nearby") {
    console.log("works");
    makeNearbyCards(sessionStorage.getItem("trailNum"));
  }
});

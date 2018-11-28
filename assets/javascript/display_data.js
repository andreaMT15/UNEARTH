$(document).ready(function() {
  console.log("FIX: default address value set in display_data for testing");
  // sessionStorage.setItem("address", "60611");
  toLatLng(sessionStorage.getItem("address"));
});
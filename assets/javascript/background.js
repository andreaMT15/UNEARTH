$(document).ready(function() {
  $(".jumbotron").hide();
});

$("#submit").click(function() {
  $("body").css(
    "background-image",
    "url(assets/images/adventure-alps-cloudy-143577.jpg)"
  );
  $("#search").hide();
  $(".jumbotron").show();
});

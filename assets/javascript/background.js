$("#submit").on("click", function(event) {
  event.preventDefault();
  $("body").css(
    "background-image",
    "url(assets/images/adventure-alps-cloudy-143577.jpg)"
  );
  $("#search").hide();
});

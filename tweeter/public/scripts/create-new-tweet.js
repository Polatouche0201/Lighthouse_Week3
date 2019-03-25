/******** Document is ready and handle all custom activeties from the page ********/
$(document).ready(function(){
  // Handle create a new tweet button click event
  // Show or Hide the whole "New Tweet Session"
  let slideUpDown = false;
  $(".new-tweet").slideUp(0);
  $('.error').slideUp(0)
  function createNewTweet(event) {
    if (slideUpDown) {
      $(".new-tweet").slideUp();
      slideUpDown = false;
    } else {
      $(".new-tweet").slideDown();
      $("#compose_text").focus();
      slideUpDown = true;
    }
  }
  // Monitor the click event for compose button
  $("#navbar_compose_btn").on('click', createNewTweet);
});
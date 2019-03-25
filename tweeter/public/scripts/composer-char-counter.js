/******** Document is ready and handle all custom activeties from the page ********/
$(document).ready(function(){
  // Handle a new compose input event
  // Change the counter's color at the right-bottom corner when the character number over 140
  function counterAdjust(event) {
    var singleValues = $(this).val();
    var counterEle = $(this).parent().children("#compose_counter");
    var charSize = singleValues.length;
    if(charSize > 140) {
      counterEle.addClass("counter-red");
    } else {
      counterEle.removeClass("counter-red");
    }
    counterEle.text(charSize);
  }
  // Monitor the Input event from both keyboard and mouse
  $("#compose_text").on('input', counterAdjust);
});
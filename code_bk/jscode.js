// Fetch elements without ID
for(let i = 0; i < elementsNum; i ++) {
  let curTweetSection = $(".tweet_section").eq(i);
  let heart = curTweetSection.children("div.footer").children("img.heart");
  heart.hide();
  curTweetSection.on('mouseenter', function() {
    heart.show();
    curTweetSection.addClass("tweet_section_hover");
    console.log("tweet section " + i + " hover");
  });
  curTweetSection.on('mouseleave', function() {
    heart.hide();
    curTweetSection.removeClass("tweet_section_hover");
    console.log("tweet section " + i + " leave");
  });
}
// JS style to get element from a page and set its active
const counter = document.getElementById('compose_counter');
counter.addEventListener('click', function (e) {
  console.log("Clicked!");
  counter.classList.toggle('counter-red');
});
// Using css class to control slide up and down
if ($("#compose").hasClass("slideup")) {
  $("#compose").removeClass("slideup").addClass("slidedown");
} else {
  $("#compose").removeClass("slidedown").addClass("slideup");
}
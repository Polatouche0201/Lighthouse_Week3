/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Date Style Transfer
function dateFormat (datePost) {
  let dateCur = Date.now();
  let msPast = dateCur - datePost;
  let composeDate = msPast;
  if(msPast <= 2000) { // less than 2 seconds
    composeDate = "1 second ago";
  } else {
    if(msPast < 60000) { // less than 1 min
      composeDate = Math.floor(msPast/1000) + " seconds ago";
    } else {  // less than 1 hour
      if(msPast < 120000) { // less than 2 mins
        composeDate = "1 min ago";
      } else {
        if(msPast < 3600000) { // less than 1 hour
          composeDate = Math.floor(msPast/1000/60) + " mins ago";
        } else {
          if(msPast < 7200000) { // less than 2 hours
            composeDate = "1 hour ago";
          } else {
            if(msPast < 86400000) { // less than 1 day
              composeDate = Math.floor(msPast/1000/60/60) + " hours ago";
            } else {
              if(msPast < 172800000) { // less than 2 days
                composeDate = "1 day ago";
              } else {
                if(msPast < 604800000) { // less than 1week
                  composeDate = Math.floor(msPast/1000/60/60/24) + " days ago";
                } else {
                  if(msPast < 1209600000) {
                    composeDate = "1 week ago";
                  } else {
                    if(msPast < 2419200000) {
                      composeDate = Math.floor(msPast/1000/60/60/24/7) + " weeks ago";
                    } else {
                      if(msPast < 4838400000) {
                        composeDate = "1 month ago";
                      } else {
                        if(msPast < 29030400000) {
                          composeDate = Math.floor(msPast/1000/60/60/24/7/4) + " months ago";
                        } else {
                          if(msPast < 58060800000) {
                            composeDate = "1 years ago";
                          } else {
                            composeDate = Math.floor(msPast/1000/60/60/24/7/4/12) + " years ago";
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return composeDate;
}

// Avoid XSS
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Create Each Tweet's Session
function createTweetElement (data) {
  // 1. Create Section
  let $tweetSction = $("<section>").addClass("tweet_section");
    // 1.1 Create Section Header
    let $tweetHeader = $("<header>").addClass("tweet_header");
      // 1.1.1 Create Elements for header
      let $tweetImg1 = $("<img>").addClass("tweet_avatar");
      let $tweetSpan1 = $("<span>").addClass("tweet_handle");
      $tweetImg1.attr("src", data.user.avatars.small);
      $tweetSpan1.html(data.user.handle);
      // 1.1.2 Header Structure Create
      $tweetHeader.append($tweetImg1);
      $tweetHeader.append($tweetSpan1);
    // 1.2 Create Section Contents (Body)
    let $tweetDiv = $("<div>").addClass("tweet_content");
      // 1.2.1 Create Elements for contents
      let $tweetP = `<p class="tweet_content">${escape(data.content.text)}</p>`;
      // 1.2.2 Contents Structure Create
      $tweetDiv.append($tweetP);
    // 1.3 Create Section Footer
    let $tweetFooter = $("<footer>").addClass("tweet_footer");
      // 1.3.1 Create Elements for footer
      let $tweetSpan2 = $("<span>").addClass("tweet_footer_date");
      $tweetSpan2.html(dateFormat(data.created_at));
      let $imgDiv = $("<div>").addClass("tweet_footer_icons");
      let $tweetImg2 = $("<img>").addClass("footer_icon").addClass("flag");
      $tweetImg2.attr("src", "/images/flag.png");
      let $tweetImg3 = $("<img>").addClass("footer_icon").addClass("retweet");
      $tweetImg3.attr("src", "/images/retweet.png");
      let $tweetImg4 = $("<img>").addClass("footer_icon").addClass("like");
      $tweetImg4.attr("src", "/images/like.png");
      $imgDiv.append($tweetImg2);
      $imgDiv.append($tweetImg3);
      $imgDiv.append($tweetImg4);
      // 1.3.2 Footer Structure Create
      $tweetFooter.append($tweetSpan2);
      $tweetFooter.append($imgDiv);
  // 2. Section Stucture Create
  $tweetSction.append($tweetHeader);
  $tweetSction.append($tweetDiv);
  $tweetSction.append($tweetFooter);

  return $tweetSction;
}

// Append All Tweets Data to Main Area
function renderTweets(tweets) {
  let tweetsNum = tweets.length;
  if(tweetsNum <= 0) {
    // Create a message session to remind there is no tweet in the db.
    let $emptyMsg = $("<p>").addClass("empty_message");
    $emptyMsg.html("<h1>No Tweet Yet.</h1><br>Click Compose Button To Create A New One !");
    $("#tweets-container").append($emptyMsg);
  } else {
    // If the tweets list has been created, remove the message session and refresh the tweets session
    $(".empty_message").remove();
    for(let i = tweetsNum - 1; i >= 0; i --) {
      let $tweet = createTweetElement(tweets[i]);
      $("#tweets-container").append($tweet);
    }
  }
}

// Ajax Post
function ajazPostDataOnBtnClick () {
  // Get the submit tweet button and prevent its default form post function
  var $tweenBtn = $('#submit_btn');
  $tweenBtn.on('click', function(e) {
    event.preventDefault();
  });
  // Monitor mouse click event
  $tweenBtn.on('click', function () {
    let composeText = $('#compose_text').val();
    // If the text is empty
    if(composeText) {
      // If characters in text area over limit
      if(composeText.length > 140) {
        $('.error').text("The tweet is over 140 characters!")
        $('.error').slideDown().delay(1000).slideUp();
      } else {
        // If only spaces in the text area
        if(composeText.trim().length === 0) {
          $('.error').text("You cannot tweet just spaces!");
          $('.error').slideDown().delay(1000).slideUp();
        } else {
          // AJAX post if text is valid
          $.ajax ({
            method: "POST",
            url: "/tweets",
            data: {
              text: $('#compose_text').val()
            },
            error: function( req, status, err ) {
              alert('something during ajax post went wrong', status, err );
            }
          }).success(function(resp) {
            // Clean the text area and refresh tweet list
            $('#compose_text').val("");
            $(".tweet_section").remove();
            ajaxGetDataFromServer();
            $("#compose_text").focus();
          });
        }
      }
    } else {
      $('.error').text("Cannot submit an empty tweet!");
      $('.error').slideDown().delay(1000).slideUp();
    }
  });
}

// Ajax Get
function ajaxGetDataFromServer () {
  $.ajax('/tweets', { method: 'GET' })
  .success(function (resp) {
    renderTweets(resp);
  });
}

// Documents ready and create dynamic tweets
$(document).ready(function(){
  ajaxGetDataFromServer();
  ajazPostDataOnBtnClick();
});

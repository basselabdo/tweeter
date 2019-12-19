
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    $('#tweet_list').prepend(createTweetElement(tweet))
  }
}

const createTweetElement = function (tweet) {
  const $tweet = $('<article>')
  const $head = $('<header>');
  $('<img>').attr('src', tweet.user.avatars).appendTo($head);
  $('<span>').addClass('name').text(tweet.user.name).appendTo($head)
  $('<span>').addClass('handel').text(tweet.user.handle).appendTo($head);
  $head.appendTo($tweet);
  $('<p>').text(tweet.content.text).appendTo($tweet);
  const $footer = $('<footer>')
  $('<p>').text(tweet.created_at).appendTo($footer);
  $footer.appendTo($tweet);
  $('<br>').appendTo($tweet)
  return $tweet;
}

const postTweet = (method, url, data) => {
  $.ajax({
    method,
    url,
    data
  })
    .done(function (result) {
      renderTweets([result]);
    })
    .fail(function (error) {
      console.log(`Error with the request: ${error.message}`);
    })
}
$(document).ready(function () {
  $("#button").click(function () {
    $(".new-tweet").slideToggle();
  });
  const loadTweets = function (method, url) {
    $.ajax({
      method,
      url
    })
      .done(function (result) {
        renderTweets(result);
      })
      .fail(function (error) {
        console.log(`Error with the request: ${error.message}`);
      })
  }
  loadTweets('GET', '/tweets');
  $('#tweetForm').on('submit', function (event) {
    event.preventDefault();
    let str = $(this).serialize();
    if (str === "text=") {
      $("#errormessage").slideDown().text("You can not send an empty tweet");
    } else { $("#errormessage").hide() }
    if (str.length > 140) {
      $("#errormessage").slideDown().text("Too long ,please respect our arbitrary limit of 140 chars");
    } else { $("#errormessage").hide(); }
    postTweet('POST', '/tweets', str);
  })
})


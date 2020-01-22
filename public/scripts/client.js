
// render tweet's list at the UI 
const renderTweets = function (tweets) {
  for (const tweet of tweets) {
    $('#tweet_list').prepend(createTweetElement(tweet))
  }
}
// create a new tweet 
const createTweetElement = function (tweet) {
  const $tweet = $('<article>')
  const $head = $('<header>');
  $('<img>').attr('src', tweet.user.avatars).appendTo($head);
  $('<span>').addClass('name').text(tweet.user.name).appendTo($head)
  $('<span>').addClass('handle').text(tweet.user.handle).appendTo($head);
  $head.appendTo($tweet);
  $('<p id="textStyle">').text(tweet.content.text).appendTo($tweet);
  const $footer = $('<footer>')
  $('<p>').text(new Date(tweet.created_at).toLocaleString()).appendTo($footer);
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
// hide/show new tweet area (toggle button)
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
  // validating the lenght of the tweet whether if it's over the limits or empty 
  $('#tweetForm').on('submit', function (event) {
    event.preventDefault();
    const str = $(this).serialize();
    console.log("hello", str)
    if (str.length > 140) {
      $("#errormessage").slideDown().text("Too long, please respect our arbitrary limit of 140 chars.").prepend('<img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519791-101_Warning-512.png" />');
    } else if (str === "text=") {
      $("#errormessage").slideDown().text("You can not send an empty tweet").prepend('<img src="https://cdn2.iconfinder.com/data/icons/freecns-cumulus/32/519791-101_Warning-512.png" />').
        $("#errormessage").show()

    } else {
      $("#errormessage").hide()
      postTweet('POST', '/tweets', str);
    }

  })
})


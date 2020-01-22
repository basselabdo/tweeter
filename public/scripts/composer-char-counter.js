// setting the max limit of chars per tweet
$(document).ready(function () {
  $('textarea').on('keyup', function (event) {
    const characterCount = 140 - this.value.length
    if (this.value.length > 140) {
      $(this).siblings('.counter').text(characterCount).css('color', 'red');
    } else {
      $(this).siblings('.counter').text(characterCount).css('color', 'black');

    }
  })

});


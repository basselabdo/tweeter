// setting the max limit of chars per tweet
$(document).ready(function () {
  $('textarea').on('keyup', function (event) {
    if (this.value.length > 140) {
      let negativeNumber = 140 - this.value.length
      $(this).siblings('.counter').text(negativeNumber).css('color', 'red');
    } else {
      $(this).siblings('.counter').text(140 - this.value.length);
    }
  })

});


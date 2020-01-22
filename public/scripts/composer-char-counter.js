// setting the max limit of chars per tweet
$(document).ready(function () {
  //Using keydown is updating faster but always one behind
  $('textarea').on('keyup', function (event) {
    const characterCount = 140 - this.value.length
    if (this.value.length > 140) {
      $(this).siblings('.counter').text(characterCount).addClass('problem')
    } else {
      $(this).siblings('.counter').text(characterCount).removeClass('problem');

    }
  })

});


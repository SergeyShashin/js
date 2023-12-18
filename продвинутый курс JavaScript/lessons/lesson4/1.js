
(function ($) {
  // $(document).ready(function () { }); //подписка на загрузку страницы

  /**подписка на загрузку страницы аналог */
  $(function () {
    // console.log($('#lesson4'));
    $('#lesson4').text(':)');


    var counterEl = $('#counter');
    var counter = Number(counterEl.text());

    // $('#plus').click(function () {
    //   counterEl.text(++counter);
    // });

    // $('#minus').click(function () {
    //   counterEl.text(--counter);
    // });

    $('#control').on('click', '#plus, #minus', function (event) {
      $(this).attr('id') === 'plus' ? ++counter : --counter;

      if (counter > 10) {
        counterEl.addClass('green');
      } else if (counter < 0) {
        counterEl.addClass('red');
      } else {
        counterEl.removeClass('green').removeClass('red');
      }
      counterEl.text(counter);

      $('#lesson4').animate({
        width: counter * 50,
        height: counter * 50,
      }, 1000);
    });

    $('#slide').click(function () {
      $('#monitor').slideToggle();
    })



  }
  );
}
)(jQuery);
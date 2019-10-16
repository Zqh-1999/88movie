$('.cource_tab li').click(function () {
  $(this).addClass('active').siblings('li').removeClass('active');
  $('.products .main').eq($(this).index()).addClass('selected').siblings('div').removeClass('selected')
})












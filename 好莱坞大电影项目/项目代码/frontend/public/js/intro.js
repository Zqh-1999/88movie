$('.cource_tab li').click(function () {
  $(this).addClass('active').siblings('li').removeClass('active');
  $('.products .main').eq($(this).index()).addClass('selected').siblings('div').removeClass('selected')
})


var nav = document.querySelector(".intro_explain");
var con = document.querySelector(".conceal");
con.onclick = function () {
  if (con.value = "展开") {
    con.innerHTML = "隐藏";

  }
}


$('.btn-dow').on('click', function () {
  let id = $(this).data('id');
  $.ajax({
    type: 'get',
    url: '/admin/login',
    data: { id: id },
    success: function (data) {
      if (data.code == '1201') {
        alert(data.message);
      } else if (data.code == '1202') {
        location.href = '/admin/index';
      }
    }
  })
})
// #endregion







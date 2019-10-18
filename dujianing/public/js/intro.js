$('.cource_tab li').click(function () {
  $(this).addClass('active').siblings('li').removeClass('active');
  $('.products .main').eq($(this).index()).addClass('selected').siblings('div').removeClass('selected')
})

var nav = document.querySelector(".intro_explain");
var con = document.querySelector(".conceal");
con.onclick = function () {
  if (con.innerHTML = "展开") {
    con.innerHTML = "隐藏";
  }
}




// #endregion







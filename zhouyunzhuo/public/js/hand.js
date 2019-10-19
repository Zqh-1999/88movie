(function () {
    var mon_li = document.querySelectorAll('.voucher-mon li');
    // console.log(mon_li)
    var scan_li = document.querySelectorAll('.voucher-scan li');
    for (var i = 0; i < mon_li.length; i++) {
        mon_li[i].setAttribute('index', i);
        mon_li[i].onclick = function () {
            for (var j = 0; j < mon_li.length; j++) {
                mon_li[j].removeAttribute('class');
                scan_li[j].style.display = 'none'
            }
            this.className = 'avt-voucher';
            scan_li[this.getAttribute('index')].style.display = 'block'
        }
    }
})();
(function () {
    var vouch = document.querySelector('.vouch');
    var vipbox = document.querySelector('.vip-box');
    vouch.onclick = function () {
        vipbox.style.display = 'block';
    }
    var close = document.querySelector('.close');
    close.onclick = function () {
        vipbox.style.display = 'none'
    }
})();

// 登录显示
var register = document.querySelector('.register');
var register_login = document.querySelector('.register_login')
var hide_center1 = document.querySelector('.register_login .hide_center1');
register.onclick = function () {
    register_login.style.display = 'block';
}
//登录消失
var close1=document.querySelector('#close1');
close1.onclick=function(){
    register_login.style.display='none'
}
// 注册显示
var login_button1=document.querySelector('.login_button1');
var hide_center2= document.querySelector('.register_login .hide_center2');
login_button1.onclick=function(){
    hide_center2.style.display='block'
}

//注册消失
var close2=document.querySelector('#close2');
close2.onclick=function(){
    register_login.style.display='none'
}
// 注册返回登录
var last_step=document.querySelector('.last_step');
last_step.onclick=function(){
    hide_center2.style.display='none'
}


(function () {
    var mon_li = document.querySelectorAll('.voucher-mon li');
    // console.log(mon_li)
    var scan_li = document.querySelectorAll('.voucher-scan li');
    for (var i = 0; i < mon_li.length; i++) {
        mon_li[i].setAttribute('index', i);
        mon_li[i].onclick = function () {
            for (var j = 0; j < mon_li.length; j++) {
                scan_li[j].style.display = 'none'
            }
            scan_li[this.getAttribute('index')].style.display = 'block'
        }
    }
})();
(function () {
    var vouch = document.querySelector('.vouch');
    var vipbox = document.querySelector('.vip-box');
    vouch.onclick = function () {
        vipbox.style.display = 'block'
    }
    var close=document.querySelector('.close');
    close.onclick=function(){
        vipbox.style.display='none'
    }
})()
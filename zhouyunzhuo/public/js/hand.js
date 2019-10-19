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
        setTimeout(function () {
            vipbox.style.display = 'none';
        }, 1000);
        skena = window.sessionStorage.getItem("sken");
        console.log(skena)
        $.ajax({
            url: "http://127.0.0.1/api/v1/history/order",
            type: 'get',
        })
    }
})();



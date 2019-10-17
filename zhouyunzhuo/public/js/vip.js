(function () {
  // vip热门table 轮播功能
  // 获取左右按钮
  var col_right_left = document.querySelector('.col-right-left');
  var col_right_right = document.querySelector('.col-right-right');
  //获取ul
  var slideshow = document.querySelector('.slideshow')
  var index = 0;
  // 左右点击
  col_right_left.onclick = function () {
    if (index < slideshow.children.length - 1) {
      index++;
      animate(slideshow, -index * 680);
    }
  }
  col_right_right.onclick = function () {
    if (index > 0) {
      index--;
      animate(slideshow, -index * 680)
    }
  }
  // vip热门table 轮播功能
  var col_right_left1 = document.querySelector('.col-right-left1');
  var col_right_right1 = document.querySelector('.col-right-right1');
  var slideshow1 = document.querySelector('.slideshow1')
  var index1 = 0;
  col_right_left1.onclick = function () {
    if (index1 < slideshow1.children.length - 1) {
      index1++;
      animate(slideshow1, -index1 * 680);
    }
  }
  col_right_right1.onclick = function () {
    if (index1 > 0) {
      index1--;
      animate(slideshow1, -index1 * 680)
    }
  }
  // vip热门table 轮播功能
  var col_right_left2 = document.querySelector('.col-right-left2');
  var col_right_right2 = document.querySelector('.col-right-right2');
  var slideshow2 = document.querySelector('.slideshow2')
  var index2 = 0;
  col_right_left2.onclick = function () {
    if (index2 < slideshow2.children.length - 1) {
      index2++;
      animate(slideshow2, -index2 * 680);
    }
  }
  col_right_right2.onclick = function () {
    if (index2 > 0) {
      index2--;
      animate(slideshow2, -index2 * 680)
    }
  }
  // vip热门table 轮播功能
  var col_right_left3 = document.querySelector('.col-right-left3');
  var col_right_right3 = document.querySelector('.col-right-right3');
  var slideshow3 = document.querySelector('.slideshow3')
  var index3 = 0;
  col_right_left3.onclick = function () {
    if (index3 < slideshow3.children.length - 1) {
      index3++;
      animate(slideshow3, -index3 * 680);
    }
  }
  col_right_right3.onclick = function () {
    if (index3 > 0) {
      index3--;
      animate(slideshow3, -index3 * 680)
    }
  }
  // vip热门table 轮播功能
  var col_right_left4 = document.querySelector('.col-right-left4');
  var col_right_right4 = document.querySelector('.col-right-right4');
  var slideshow4 = document.querySelector('.slideshow4')
  var index4 = 0;
  col_right_left4.onclick = function () {
    if (index4 < slideshow4.children.length - 1) {
      index4++;
      animate(slideshow4, -index4 * 680);
    }
  }
  col_right_right4.onclick = function () {
    if (index4 > 0) {
      index4--;
      animate(slideshow4, -index4 * 680)
    }
  }
})();


// 动画
function animate(ele, target) {
  var current = ele.offsetLeft;
  clearInterval(timer);
  var timer = setInterval(function () {
    var step = 10;
    step = current < target ? step : -step;
    current += step;

    if (Math.abs(target - current) > Math.abs(step)) {
      ele.style.left = current + 'px';
    } else {
      clearInterval(timer);
      ele.style.left = target + 'px';
    }
  }, 20)
};









(function(){
// vip热门table  table切换功能
//获取点击按钮
var alink = document.querySelectorAll('.vip-tab-nav li div');
// console.log(alink)
//获取所有要切换的内容
var left_video_wrap = document.querySelectorAll('.left-video-wrap');
// console.log(left_video_wrap)
// 遍历所有a
for (var i = 0; i < alink.length; i++) {
  alink[i].setAttribute('index', i);
  alink[i].onclick = function () {
    for (var j = 0; j < alink.length; j++) {
      alink[j].removeAttribute('class');
      left_video_wrap[j].style.display = 'none'
    }
    this.className = 'vip-act';
    left_video_wrap[this.getAttribute('index')].style.display = 'block';
  }
}
})();



(function () {
  // 尊享轮播
  var honour_left = document.querySelector('.honour-left');
  var honour_right = document.querySelector('.honour-right');
  var honourable_ul = document.querySelector('.honourable-lb ul')
  var index = 0;
  honour_left.onclick = function () {
    console.log(1)
    if (index < honourable_ul.children.length - 4) {
      index++;
      animate(honourable_ul, -index * 306);
    }
  }
  honour_right.onclick = function () {
    console.log(1)
    if (index > 0) {
      index--;
      animate(honourable_ul, -index * 306)
    }
  }
})();


(function () {
  // 尊享轮播
  var honourable_tp_left = document.querySelector('.honourable-tp-left');
  var honourable_tp_right = document.querySelector('.honourable-tp-right');
  var lb_tp_ul = document.querySelector('.lb-tp ul')
  var index = 0;
  honourable_tp_left.onclick = function () {
    console.log(1)
    if (index < lb_tp_ul.children.length - 5) {
      index++;
      animate(lb_tp_ul, -index * 248);
    }
  }
  honourable_tp_right.onclick = function () {
    console.log(1)
    if (index > 0) {
      index--;
      animate(lb_tp_ul, -index * 248)
    }
  }
  // 
  // 尊享轮播
  var honourable_tp_left1 = document.querySelector('.honourable-tp-left1');
  var honourable_tp_right1 = document.querySelector('.honourable-tp-right1');
  var lb_tp_ul1 = document.querySelector('.lb-tp1 ul')
  console.log(lb_tp_ul1)
  var index1 = 0;
  honourable_tp_left1.onclick = function () {
    // console.log(1)
    if (index1 < lb_tp_ul1.children.length - 5) {
      index1++;
      animate(lb_tp_ul1, -index1 * 248);
    }
  }
  honourable_tp_right1.onclick = function () {
    console.log(1)
    if (index1 > 0) {
      index1--;
      animate(lb_tp_ul1, -index1 * 248)
    }
  }
  // 
  // 尊享轮播
  var honourable_tp_left2 = document.querySelector('.honourable-tp-left2');
  var honourable_tp_right2 = document.querySelector('.honourable-tp-right2');
  var lb_tp_ul2 = document.querySelector('.lb-tp2 ul')
  var index2 = 0;
  honourable_tp_left2.onclick = function () {
    console.log(1)
    if (index2 < lb_tp_ul2.children.length - 5) {
      index2++;
      animate(lb_tp_ul2, -index2 * 248);
    }
  }
  honourable_tp_right2.onclick = function () {
    console.log(1)
    if (index2 > 0) {
      index2--;
      animate(lb_tp_ul2, -index2 * 248)
    }
  }

  // 尊享轮播
  var honourable_tp_left3 = document.querySelector('.honourable-tp-left3');
  var honourable_tp_right3 = document.querySelector('.honourable-tp-right3');
  var lb_tp_ul3 = document.querySelector('.lb-tp3 ul')
  var index3 = 0;
  honourable_tp_left3.onclick = function () {
    console.log(1)
    if (index3 < lb_tp_ul3.children.length - 5) {
      index3++;
      animate(lb_tp_ul3, -index3 * 248);
    }
  }
  honourable_tp_right3.onclick = function () {
    console.log(1)
    if (index3 > 0) {
      index3--;
      animate(lb_tp_ul3, -index3 * 248)
    }
  }
  // 尊享轮播
  var honourable_tp_left4 = document.querySelector('.honourable-tp-left4');
  var honourable_tp_right4 = document.querySelector('.honourable-tp-right4');
  var lb_tp_ul4 = document.querySelector('.lb-tp4 ul')
  var index4 = 0;
  honourable_tp_left4.onclick = function () {
    console.log(1)
    if (index4 < lb_tp_ul4.children.length - 5) {
      index4++;
      animate(lb_tp_ul4, -index4 * 248);
    }
  }
  honourable_tp_right4.onclick = function () {
    console.log(1)
    if (index4 > 0) {
      index4--;
      animate(lb_tp_ul4, -index4 * 248)
    }
  }
})();



// 尊享vip的table功能
(function () {
  // 获取li标签
  var honourLi = document.querySelectorAll('.honourable-lb li');
  var honourable_tp = document.querySelectorAll('.honourable-tp');
  for (var i = 0; i < honourLi.length; i++) {
    honourLi[i].setAttribute('index', i);
    honourLi[i].onmouseover = function () {
      for (var j = 0; j < honourLi.length; j++) {
        honourable_tp[j].style.display = 'none';
      }
      honourable_tp[this.getAttribute('index')].style.display = 'block'
    }
  }
})();

// 即将上线的轮播图
(function(){
  var mod_list_left = document.querySelector('.mod-list-left');
  // console.log(mod_list_left)
  var mod_list_right = document.querySelector('.mod-list-right');
  var time_ul = document.querySelector('.upcoming-time-ul')
  var index = 0;
  mod_list_left.onclick = function () {
    // console.log(1)
    if (index <time_ul.children.length - 5) {
      index++;
      animate(time_ul, -index * 248);
    }
  }
  mod_list_right.onclick = function () {
    // console.log(1)
    if (index > 0) {
      index--;
      animate(time_ul, -index * 248)
    }
  }
})();


// 动作电影
(function(){
  var action_left = document.querySelector('.action-left');
  // console.log(mod_list_left)
  var action_right = document.querySelector('.action-right');
  var int_ul = document.querySelector('.film-int ul')
  var index = 0;
  action_left.onclick = function () {
    console.log(1)
    if (index <int_ul.children.length - 5) {
      index++;
      animate(int_ul, -index * 248);
    }
  }
  action_right.onclick = function () {
    console.log(1)
    if (index > 0) {
      index--;
      animate(int_ul, -index * 248)
    }
  }
})();
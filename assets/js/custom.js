//获取用户api
var apiMember = 'http://api.kidshome.cc/cart/qty';

//已注册用户跳转的路径
var memberUrl = "http://scrm-mb.shanghaik11.com/web/rlLLYghP/center?code=041OtM9j2t7KhI0QR29j2eDv9j2OtM91&state=STATE&appid=wxb446ba6bc8775270";

//图片路径，加载完图片再开始
var images = [
  'https://yangyifeng.github.io/sh-demo/assets/images/welcome-3.png',
  'https://yangyifeng.github.io/sh-demo//assets/images/welcome-4-member.png',
  'https://yangyifeng.github.io/sh-demo/assets/images/welcome-4-not-member.png',
];

var flow = {
  //全部图片
  pics: [],
  //渲染页面
  insertDom: function() {
    this.initSwiper();
  },
  //触发swiper
  initSwiper: function() {
    var mySwiper = new Swiper ('.swiper-container', {
      pagination: '.swiper-pagination',
      direction: 'horizontal',
      //effect: 'fade',
      //fade:{crossFade:true,},
      //autoplay:3000,
      onInit: function(swiper){
        swiperAnimateCache(swiper); //隐藏动画元素 
        swiperAnimate(swiper); //初始化完成开始动画
      }, 
      onSlideChangeEnd: function(swiper){ 
        swiperAnimate(swiper); //每个slide切换结束时也运行当前slide动画

        //欢迎页第2屏
        if(swiper.activeIndex == 1) {
          console.log('1')
        }

      } 
    });

    //第一屏的开始按钮点击后切换到第二屏
    $('.welcome-go.first').click(function(){
      mySwiper.slideTo(1, 500, false);
    })

  },
  //图片轮询获取
  getPic: function() {
    var that = this;
    if(this.pics.length > 0){
      var pic = new Image();
      pic.onload = function(){ that.onePicOnload(); };  
      pic.onerror = function(){ that.onePicOnload(); };  
      pic.src = that.pics[that.pics.length - 1]; 
    }
    else{
      console.log('done');
      that.insertDom();
    }
  },
  //单张图片获取完成
  onePicOnload: function() {
    this.pics.pop();
    this.getPic();
  },
  
}


$(document).ready(function(){


   //是注册用户
    $('.p-4').addClass('welcome-p-4-member');
    $('.welcome-go.last').attr('href', memberUrl);

    //开始
    flow.pics = images;
    flow.getPic();

/*

  //先获取登录信息: 登录与未登录显示的最后一屏内容不一样
  get(apiMember, {}, function(cb){
    console.log(cb);
    
    //是注册用户
    $('.p-4').addClass('welcome-p-4-member');
    $('.welcome-go.last').attr('href', memberUrl);
    //非注册用户
    //$('.p-4').addClass('welcome-p-4-not-member');
    //$('.welcome-go').attr('href', memberUrl);

    //开始
    flow.pics = images;
    flow.getPic();

  }, function(er){
    console.log(er)
  });
*/

});
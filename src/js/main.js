/**
 * Author：dupeiduo
 * Note：the main javascript file, include JQuery
 * Date：2016/5/26
 */
$(document).ready(function(){ 
	//order control
  if((location.hash.slice(1) || '/').indexOf('about')>=0){
    $('.go-about').addClass('active').siblings().removeClass('active');
  }else if((location.hash.slice(1) || '/').indexOf('join')>=0){
    $('.go-join').addClass('active').siblings().removeClass('active');
  } 

	$('.siblings li').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
    document.body.scrollTop=0;
	})

  Router.route('/', function () { 
    readHTML('pages/home.html'); 
  }); 
  Router.route('/about.html', function () { 
    readHTML('pages/about.html'); 
  }); 
  Router.route('/join.html', function () { 
    readHTML('pages/join.html'); 
  }); 


  
});

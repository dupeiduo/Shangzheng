/**
 * Author：dupeiduo
 * Note：the main javascript file, include JQuery
 * Date：2016/5/26
 */
$(document).ready(function(){ 
	//init the route
  routeInit();
  //scroll control
	$('.siblings li').on('click', function(){
		$(this).addClass('active').siblings().removeClass('active');
     $(document).scrollTop(0);
	})

  
});


function routeInit(){
  // add route here
  Router.route('/', function () { 
    readPage('pages/home.html'); 
  }); 
  Router.route('/about.html', function () { 
    readPage('pages/about.html'); 
  }); 
  Router.route('/join.html', function () { 
    readPage('pages/join.html'); 
  }); 
  //add order class here
  function orderChange() {
    if((location.hash.slice(1) || '/').indexOf('about')>=0){
      $('.go-about').addClass('active').siblings().removeClass('active');
    }else if((location.hash.slice(1) || '/').indexOf('join')>=0){
      $('.go-join').addClass('active').siblings().removeClass('active');
    } else{
      $('.go-homepage').addClass('active').siblings().removeClass('active');
    }
  }

  function readPage(pageUrl){ 
    $.ajax({ 
      async:false, 
      url : pageUrl, 
      success : function(result){ 
        document.getElementById('bodyer').innerHTML = result; 
        orderChange();
      } 
    }); 
  }
}
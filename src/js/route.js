/**
 * Author：dupeiduo
 * Note：define own router
 * Date：2016/5/26
 */

(function () { 
  function Router () {} 

  Router.prototype.route = function ( path, callback ) { 
    var url = location.hash.slice(1) || '/'; 
    window.addEventListener('load', function () {
      if ( url == path ) { 
        callback && callback(); 
      } 
    }, false); 
    window.addEventListener('hashchange', function () { 
      url = location.hash.slice(1) || '/'; 
      if ( url == path ) { 
        callback && callback(); 
      } 
    }, false); 
  }
  window.Router = new Router(); 
})();

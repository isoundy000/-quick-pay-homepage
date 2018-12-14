// (function(){
//     var Alipay = window.Alipay || function(){};

//     Alipay.prototype.BASE_URL = 'alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&';
    
//     Alipay.prototype.isMobile = function(){
//         return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/); 
//     };
    
//     Alipay.prototype.open = function (url){
//         url = url || '';
//         if (this.isMobile()) {
//             window.location.href = this.BASE_URL + 'qrcode=' + url + '&_t=' + Date.now();
//         }
//     };

//     window.Alipay = new Alipay();

// })();



(function(){
    var Alipay = window.Alipay || function(){};

    Alipay.prototype.BASE_URL = 'alipays://platformapi/startapp?saId=10000007&clientVersion=3.7.0.0718&';
    
    Alipay.prototype.isMobile = function(){
        return !!navigator.userAgent.match(/AppleWebKit.*Mobile.*/); 
    };
	
	Alipay.prototype.isWeixinQQ = function (){
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)=="micromessenger") {
			return true;
		} else if (ua.match(/QQ/i) == "qq") {
		    return true;
	    }
		return false;
	}  
    
    Alipay.prototype.open = function (url){
        url = url || '';
		if(!url.toLowerCase().match(/alipay/)){
			return;
		}
		if(this.isWeixinQQ()){
			return;
        }
        if (this.isMobile()) {
            window.location.href = this.BASE_URL + 'qrcode=' + url + '&_t=' + Date.now();
        }
    };

    window.Alipay = new Alipay();

})();


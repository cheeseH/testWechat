var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/authorize',function(req,res,next){
	if(res.query.code){
		var code = res.query.code;
		var request = require('request');
		var url = 'https://api.weixin.qq.com/sns/oauth2/access_token?appid=wx8fb97e6277001984&secret=b08e0393a891b19fe8cabfd1a1ba3139'+
		'&code='+code+'&grant_type=authorization_code';
		var options = 
		{
			method : 'GET',
			url : url
		};
		var callback = function(err,response,body){
			if(err){
				next(err);
			}
			if(response.statusCode != 200){
				console.log(statusCode);
				render('index',statusCode);
			}
			var result = JSON.parse(body);
			var token = result.access_token;
			var openId = result.openid;
			var path = '/sns/userinfo?access_token='+token+'&openid='+openId+'&lang=zh_CN';
			var httpsOptions = {
				 hostname: 'https://api.weixin.qq.com/sns/',
  				 port: 443,
  				 path: path,
  				 method: 'GET',
  				
			}
			var req = https.request(httpsOptions,function(d){
				res.on('data',function(d){
					console.log(d);
				}).on('error',function(err){
					console.error(err);
				})
			})



		}
	}
})

module.exports = router;

var express = require('express');
var router = express.Router();

var request = require('request');
var sha1 = require('sha1');

//可替换的元素为appId 和 自己本身的secret
var conf = {
  grant_type:"client_credential",
  appId:"wx24a80c6b5fc34895",
  noncestr:"adminabcsadasdas",
  secret:"9b4bf858d7152074a980e389ab380018",
  ticketUrl:'https://api.weixin.qq.com/cgi-bin/ticket/getticket',
  accessTokenUrl:"https://api.weixin.qq.com/cgi-bin/token",
  url:''
};

/* GET users listing. */
router.get('/', function(req, res, next) {
  //因为现在微信增强了域名验证，所以访问的连接会有额外的数据
  conf.url = req.query.path;
  var tokenUrl = conf.accessTokenUrl+"?grant_type=client_credential"
  +"&appId="+conf.appId
  +"&secret="+conf.secret;

  var timestamp = parseInt(new Date().getTime()/1000);
  conf.timestamp = timestamp;
  request(tokenUrl, function (error, response, body) {
  if (!error && response.statusCode == 200) {
      body =JSON.parse(body);
      conf.acctokenVal = body.access_token
      var tickUrl= conf.ticketUrl
      +'?access_token='+body.access_token
      +'&type=jsapi';
      request(tickUrl,function(err,res2,bodyb){
        bodyb = JSON.parse(bodyb);
      
         conf.ticketVal = bodyb.ticket;
      var signature = sha1('jsapi_ticket=' + bodyb.ticket + '&noncestr=' + conf.noncestr + '&timestamp=' + timestamp + '&url=' + conf.url)
      conf.signature =signature;
      res.json(conf);
      });
    }
  })
});

module.exports = router;

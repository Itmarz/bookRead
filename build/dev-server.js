require('./check-versions')()
var config = require('../config')
if (!process.env.NODE_ENV) process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
var path = require('path')
var url = require('url')
var fs = require( 'fs' )
var express = require('express')
var webpack = require('webpack')
var opn = require('opn')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app     = express()
var footer = require("../data.json")
var json    = require( "../static/data/library.json" )
var hot     = require( "../static/data/recommended.json" )
var fact    = require( "../static/data/fact.json")
var feed   = require( "../static/data/feedback.json" )

var appRouter =  express.Router()
appRouter.get( "/footer",function (req,res) {
    res.json({
      error: 0,
      data: footer.footer
    })
} )
appRouter.get( "/getlibrary",function(req,res){
  res.json({
    error: 0,
    data: json
  });
})
appRouter.get( '/setlibrary',function(req,res){
  var data = url.parse(req.url,true).query,img = '';
  if( data.contain ){
      if( data.contain != 'remove' ) {
          for (var i = 0; i < hot.length; i++) {
            if (hot[i].name == data.book)
              img = hot[i].images;
          }
          var obj = {
            "images": img,
            "name": data.book,
            "read": data.read
          };
          json.push(obj);
      }else{
          for( var i=0;i<json.length;i++ ) {
            if (json[i].name == data.book) {
              json.splice(i, 1)
            }
          }
      }
    fs.writeFile(path.join(__dirname, '../static/data/library.json'), JSON.stringify(json), function (err) {
      if (err) throw err;
    });
  }else{
      for( var i=0;i<json.length;i++ ){
            if( json[i].name == data.book ){
                 json[i].read = data.read;
            }
      }
      fs.writeFile(path.join(__dirname, '../static/data/library.json'), JSON.stringify(json), function (err) {
        if (err) throw err;
      });
  }
  res.json({
    error: 0,
    data: ''
  })
} )
appRouter.get( "/hot",function(req,res){
  res.json({
    error: 0,
    data: hot
  })
})
appRouter.get( "/datails",function(req,res){
  var data = url.parse(req.url,true).query;
  var datails = require( "../static/book/"+data.bookName+'/data.json' )
  res.json({
    error: 0,
    data: datails
  })
})
appRouter.get( "/fact",function(req,res){
    res.json({
      error: 0,
      data: fact
    })
})
appRouter.get( "/feedback",function(req,res){
  res.json({
    error: 0,
    data: feed
  })
})
appRouter.get( "/read",function(req,res){
  var data = url.parse(req.url,true).query,
        arr    = [];

        fs.readFile( path.join(__dirname,'../static/book/'+data.book+'/'+data.read+'.txt'),'utf-8',function (err,data) {
          read = data.split(" ");
          for( var i=0; i<read.length;i++){
            if( read[i] ) arr.push(read[i])
          }
          res.json({
            error: 0,
            data: arr
          })
        } )

})
appRouter.get( "/catalog",function(req,res){
  var data = url.parse(req.url,true).query,
        arr   = [],
        arr1= [ "零",
                    "一",
                    "二",
                    "三",
                    "四",
                    "五",
                    "六",
                    "七",
                    "八",
                    "九"],
        catalog = require('../static/book/'+data.book+'/directory.json').directory;
        for( var i=1;i<=catalog.length;i++){
              var chat = arr1[i],num = i+'';
              if( num.length == 2 ){
                  chat = arr1[num[0]]+'十'+arr1[num[1]]
              }
              if( num.length == 3 ){
                chat = arr1[num[0]]+'百'+arr1[num[1]]+arr1[num[2]]
              }
              arr.push( '第'+chat+'章 '+catalog[i])
        }
  res.json({
    error: 0,
    data: arr
  })
})

app.use( "/api",appRouter )
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

var uri = 'http://localhost:' + port

devMiddleware.waitUntilValid(function () {
  console.log('> Listening at ' + uri + '\n')
})

module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err)
    return
  }

  // when env is testing, don't need open it
  if (process.env.NODE_ENV !== 'testing') {
    // opn(uri)
  }
})

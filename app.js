// const express = require('express')
// const app = express()

// app.get('/',function(req, res) {
//     console.log('connect /')
//     res.send('Hello World!')
// })
// app.listen(3000, function(){
//     console.log('3000 port listen')
// })

/*
var http = require('http');
var server = http.createServer(function(req,res){
    // handle request
    // res.write('hello world with http');
    // res.end();

    // var body = 'hello world http!!!';
    // res.setHeader('Content-Length', body.length);
    // res.setHeader('Content-Type','text/plain');
    // res.end(body);

    // var url = 'http://google.com';
    // var body = '<p>Redirecting to <a href="' + url + '">'
    //             + url + '</a></p>';

    //res.setHeader('Location',url);
    res.setHeader('Content-Length', body.length);
    res.setHeader('Content-Type', 'text/html');
    res.statusCode = 302;
    res.end(body);

});
server.listen(3000);
*/

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({extends:true}));

app.get('/',(req,res) => {
    res.json({message:"Hello World!"});
});

app.listen(port,()=>{
    console.log('서버 포트 : ${port} 동작중');
});

const Hospital = require('../models/hospital.model.js');

var request = require('request')
var convert = require('xml-js');
// var http = require('http');

var xml2js = require('xml2js');
var parser = new xml2js.Parser();

exports.getData = (req, res)=>{
    console.log(req.query.test);
    Hospital.getData((err,data)=>{
        if(err) {
            if(err.kind == 'not_found') {
                res.status(404).send(
                    {
                    message:'Hospital 테이블에 데이터가 없습니다.'
                    }
                );
            } else {
                res.status(500).send(
                    {
                        message: " 검색 중 오류가 발생했습니다."
                    }    
                )
            } 
        } else {
            const json = JSON.stringify(data);
            const xml = convert.json2xml(json,{compact : true, spaces : 4});
            res.send(xml);
            //res.send(data);
        }

    });
};

exports.pullData = (req, res)=>{

    // request Test!!!
    //const key = '[발급받은 APIKEY]'
    const key = 'MguTf2IPjU6%2BsY8n3b4W0pjme%2FIY3rKqNI75fufBha9VT8kttNN4XuWeOQOl68AipIffq0OMFua0A0cTxEpv%2FA%3D%3D'
    var pageNo = req.query.pageno
    //var countRow = 74502 <- 개선필요
    var countRow = (req.query.cntrow)?req.query.cntrow:10000;
    //var reqUrl = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncListInfoInqire?serviceKey='+key+'&pageNo='+pageNo+'&numOfRows='+countRow
    var reqUrl = 'http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlBassInfoInqire?serviceKey='+key+'&pageNo='+pageNo+'&numOfRows='+countRow
    
    console.log(reqUrl)
        
    // http 사용 XML 파싱
    // http.get(reqUrl, function (httpres) {
    //     var rss_res = "";
    //     httpres.on("data", function (chunk) {
    //         rss_res += chunk;
    //     });
    //     httpres.on("end", function () {
    //         res.send(rss_res);

    //         console.log("data pull completed");
    //         //console.log('Data: \n', rss_res);

    //         parser.parseString(rss_res, function(err, result) {
    //             console.log(result);
    //             const json = JSON.stringify(result);
    //             console.log(json.response)
    //             //console.log("totalCount : " +json.response.body.totalCount);
    //           });

    //         res.end();
    //     });
    // });



    // XML로 받아온 데이터를 JSON으로 파싱 - OK
    // 전체 데이터 개수 확인
    request(reqUrl, function(error, response, body){
        
        if(error){
          console.log(error)
        }
        
        var json = convert.xml2json(body, {compact: true, spaces: 4});
        var data = JSON.parse(json).response.body.items;
        var dataBody = JSON.parse(json).response.body;
        var totalCount = parseInt(dataBody['totalCount']._text);

        console.log('totalCount: %d', totalCount);
        //console.log('Data: \n', data.item[0]);
        //console.log('rowCount: %d', data.item.length);

        var rstData ='';

        result(data.item);
        
        // // 데이터 입력 or 갱싱
        // data.item.forEach(function(item,index,arr2){
        //     //console.log(item,index,arr2[index+1]);
            
        //         // Hospital 객체 생성
        //     var hospital = new Hospital({
        //         hpid: item['hpid']._text,
        //         dutyName: item['dutyName']._text,
        //         dutyTel1: (item['dutyTel1'])?item['dutyTel1']._text:'',
        //         dutyTel3: (item['dutyTel3'])?item['dutyTel3']._text:'',
        //         dutyTime1c: (item['dutyTime1c'])?item['dutyTime1c']._text:'',
        //         dutyTime2c: (item['dutyTime2c'])?item['dutyTime2c']._text:'',
        //         dutyTime3c: (item['dutyTime3c'])?item['dutyTime3c']._text:'',
        //         dutyTime4c: (item['dutyTime4c'])?item['dutyTime4c']._text:'',
        //         dutyTime5c: (item['dutyTime5c'])?item['dutyTime5c']._text:'',
        //         dutyTime6c: (item['dutyTime6c'])?item['dutyTime6c']._text:'',
        //         dutyTime7c: (item['dutyTime7c'])?item['dutyTime7c']._text:'',
        //         dutyTime8c: (item['dutyTime8c'])?item['dutyTime8c']._text:'',
        //         dutyTime1s: (item['dutyTime1s'])?item['dutyTime1s']._text:'',
        //         dutyTime2s: (item['dutyTime2s'])?item['dutyTime2s']._text:'',
        //         dutyTime3s: (item['dutyTime3s'])?item['dutyTime3s']._text:'',
        //         dutyTime4s: (item['dutyTime4s'])?item['dutyTime4s']._text:'',
        //         dutyTime5s: (item['dutyTime5s'])?item['dutyTime5s']._text:'',
        //         dutyTime6s: (item['dutyTime6s'])?item['dutyTime6s']._text:'',
        //         dutyTime7s: (item['dutyTime7s'])?item['dutyTime7s']._text:'',
        //         dutyTime8s: (item['dutyTime8s'])?item['dutyTime8s']._text:'',
        //         dutyAddr: (item['dutyAddr'])?item['dutyAddr']._text:'',
        //         postCdn1: (item['postCdn1'])?item['postCdn1']._text:'',
        //         postCdn2: (item['postCdn1'])?item['postCdn1']._text:'',
        //         dgidIdName: (item['dgidIdName'])?item['dgidIdName']._text:'',
        //         wgs84Lon: (item['wgs84Lon'])?parseFloat(item['wgs84Lon']._text):0.0,
        //         wgs84Lat: (item['wgs84Lat'])?parseFloat(item['wgs84Lat']._text):0.0,
        //         // wgs84Lon:0.0,
        //         // wgs84Lat:0.0,
        //         dutyEryn: (item['dutyEryn'])?item['dutyEryn']._text:'',
        //         o038: (item['o038'])?item['o038']._text:''
        //     });
        
        //     //console.log(item,index,hospital);

        //     // 데이터베이스에 저장
        //     Hospital.create(hospital, (err, data) =>{
        //         if(err){
        //             res.status(500).send({
        //                 message:
        //                 err.message || "hospital 테이블에 데이터를 추가하는 동안 에러가 발생했습니다."
        //             });
        //         }
        //         else {
        //             console.log(data);
        //             res.send(data);
        //         }
        //     })

        // })

        // var obj = JSON.parse(body)
        // console.log(obj) // 콘솔창에 찍어보기

        // 데이터 초기와 완료 response 처리
        console.log('complete!!!')
        res.send(rstData);
        res.end();
      });


    // console.log(req.query.test);
    // Hospital.getData((err,data)=>{
    //     if(err) {
    //         if(err.kind == 'not_found') {
    //             res.status(404).send(
    //                 {
    //                 message:'Hospital 테이블에 데이터가 없습니다.'
    //                 }
    //             );
    //         } else {
    //             res.status(500).send(
    //                 {
    //                     message: " 검색 중 오류가 발생했습니다."
    //                 }    
    //             )
    //         } 
    //     } else {
    //         const json = JSON.stringify(data);
    //         const xml = convert.json2xml(json,{compact : true, spaces : 4});
    //         res.send(xml);
    //         //res.send(data);
    //     }

    // });
};

const result = async(data) => {
    //console.log(data)
    var i = 0
    for(const item of data) {
        //console.log(i)
        //console.log(item)
        var hospital = new Hospital({
            hpid: item['hpid']._text,
            dutyName: item['dutyName']._text,
            dutyTel1: (item['dutyTel1'])?item['dutyTel1']._text:'',
            dutyTel3: (item['dutyTel3'])?item['dutyTel3']._text:'',
            dutyTime1c: (item['dutyTime1c'])?item['dutyTime1c']._text:'',
            dutyTime2c: (item['dutyTime2c'])?item['dutyTime2c']._text:'',
            dutyTime3c: (item['dutyTime3c'])?item['dutyTime3c']._text:'',
            dutyTime4c: (item['dutyTime4c'])?item['dutyTime4c']._text:'',
            dutyTime5c: (item['dutyTime5c'])?item['dutyTime5c']._text:'',
            dutyTime6c: (item['dutyTime6c'])?item['dutyTime6c']._text:'',
            dutyTime7c: (item['dutyTime7c'])?item['dutyTime7c']._text:'',
            dutyTime8c: (item['dutyTime8c'])?item['dutyTime8c']._text:'',
            dutyTime1s: (item['dutyTime1s'])?item['dutyTime1s']._text:'',
            dutyTime2s: (item['dutyTime2s'])?item['dutyTime2s']._text:'',
            dutyTime3s: (item['dutyTime3s'])?item['dutyTime3s']._text:'',
            dutyTime4s: (item['dutyTime4s'])?item['dutyTime4s']._text:'',
            dutyTime5s: (item['dutyTime5s'])?item['dutyTime5s']._text:'',
            dutyTime6s: (item['dutyTime6s'])?item['dutyTime6s']._text:'',
            dutyTime7s: (item['dutyTime7s'])?item['dutyTime7s']._text:'',
            dutyTime8s: (item['dutyTime8s'])?item['dutyTime8s']._text:'',
            dutyAddr: (item['dutyAddr'])?item['dutyAddr']._text.replace("'","''"):'',
            postCdn1: (item['postCdn1'])?item['postCdn1']._text:'',
            postCdn2: (item['postCdn1'])?item['postCdn1']._text:'',
            dgidIdName: (item['dgidIdName'])?item['dgidIdName']._text:'',
            wgs84Lon: (item['wgs84Lon'])?parseFloat(item['wgs84Lon']._text):0.0,
            wgs84Lat: (item['wgs84Lat'])?parseFloat(item['wgs84Lat']._text):0.0,
            // wgs84Lon:0.0,
            // wgs84Lat:0.0,
            dutyEryn: (item['dutyEryn'])?item['dutyEryn']._text:'',
            o038: (item['o038'])?item['o038']._text:''
        });
    
        //console.log(item,index,hospital);

        // 데이터베이스에 저장
        await Hospital.create(hospital, (err, rstData) =>{
            if(err){
                console.log(err);
                // res.status(500).send({
                //     message:
                //     err.message || "hospital 테이블에 데이터를 추가하는 동안 에러가 발생했습니다."
                // });
            }
            else {
                //console.log(rstData);
                rstData += '\n'+rstData;
            }
        })

        i += 1;

    }
}

exports.getDataLike = (req, res)=>{
    console.log(req.params.searchParam);
    Hospital.getDataLike(req.params.searchParam,(err,data)=>{
        if(err) {
            if(err.kind == 'not_found') {
                res.status(404).send(
                    {
                    message:`Hospital 테이블에 ${req.params.searchParam} 데이터가 없습니다.`
                    }
                );
            } else {
                res.status(500).send(
                    {
                        message: req.params.searchParam + " 검색 중 오류가 발생했습니다."
                    }    
                )
            } 
        } else {
            res.send(data);
        }

    });
}
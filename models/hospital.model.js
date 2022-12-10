const sql = require('./db');

const Hospital = function(hospital) {
    this.hpid = hospital.hpid;
    this.dutyName = hospital.dutyName;
    this.dutyTel1 = hospital.dutyTel1;
    this.dutyTel3 = hospital.dutyTel3;
    this.dutyTime1c = hospital.dutyTime1c;
    this.dutyTime2c = hospital.dutyTime2c;
    this.dutyTime3c = hospital.dutyTime3c;
    this.dutyTime4c = hospital.dutyTime4c;
    this.dutyTime5c = hospital.dutyTime5c;
    this.dutyTime6c = hospital.dutyTime6c;
    this.dutyTime7c = hospital.dutyTime7c;
    this.dutyTime8c = hospital.dutyTime8c;
    this.dutyTime1s = hospital.dutyTime1s;
    this.dutyTime2s = hospital.dutyTime2s;
    this.dutyTime3s = hospital.dutyTime3s;
    this.dutyTime4s = hospital.dutyTime4s;
    this.dutyTime5s = hospital.dutyTime5s;
    this.dutyTime6s = hospital.dutyTime6s;
    this.dutyTime7s = hospital.dutyTime7s;
    this.dutyTime8s = hospital.dutyTime8s;
    this.dutyAddr = hospital.dutyAddr;
    this.postCdn1 = hospital.postCdn1;
    this.postCdn2 = hospital.postCdn2;
    this.dgidIdName = hospital.dgidIdName;
    this.wgs84Lon = hospital.wgs84Lon;
    this.wgs84Lat = hospital.wgs84Lat;
    this.dutyEryn = hospital.dutyEryn;
    this.o038 = hospital.o038;
    this.regDate = hospital.regDate;
    this.modDate = hospital.modDate;
}

Hospital.getData = (result) => {
    //let select_sql = 'SELECT * FROM hospital WHERE dutyAddr like "%?%"';
    let select_sql = 'SELECT * FROM hospital';
    sql.query(select_sql, (err, res)=>{
        
        if(err) {
            console.log('에러 : ' + err);
            result(err, null);
            return;
        } 
        
        if(res.length) {
            console.log('검색된 병원 : ' + res);
            result(null, res);
            return;

        }

        console.log("검색된 hospital : ", res);
        result(null, res);
    })
}

Hospital.getDataLike = (searchParam, result) => {
    //let select_sql = 'SELECT * FROM hospital WHERE dutyName like "%?%"';
    let select_sql = 'SELECT * FROM hospital WHERE hpid = ?';
    sql.query(select_sql, searchParam, (err, res)=>{
        
        console.log(searchParam + ' ' + select_sql);

        if(err) {
            console.log('에러 : ' + err);
            result(err, null);
            return;
        } 
        
        if(res.length) {
            console.log('검색된 병원 Like : ' + res);
            result(null, res);
            return;

        }

        console.log("검색된 hospital : ", res);
        result(null, res);
    })
}

Hospital.create = (newHospital, result) => {
    
    let insert_sql = `\
    INSERT INTO hospital\
        (\
        hpid,\
        dutyName,\
        dutyTel1,\
        dutyTel3,\
        dutyTime1c,\
        dutyTime2c,\
        dutyTime3c,\
        dutyTime4c,\
        dutyTime5c,\
        dutyTime6c,\
        dutyTime7c,\
        dutyTime8c,\
        dutyTime1s,\
        dutyTime2s,\
        dutyTime3s,\
        dutyTime4s,\
        dutyTime5s,\
        dutyTime6s,\
        dutyTime7s,\
        dutyTime8s,\
        dutyAddr,\
        postCdn1,\
        postCdn2,\
        dgidIdName,\
        wgs84Lon,\
        wgs84Lat,\
        dutyEryn,\
        o038
        )\
        VALUES\
        (\
        '${newHospital.hpid}',\
        '${newHospital.dutyName}',\
        '${newHospital.dutyTel1}',\
        '${newHospital.dutyTel3}',\
        '${newHospital.dutyTime1c}',\
        '${newHospital.dutyTime2c}',\
        '${newHospital.dutyTime3c}',\
        '${newHospital.dutyTime4c}',\
        '${newHospital.dutyTime5c}',\
        '${newHospital.dutyTime6c}',\
        '${newHospital.dutyTime7c}',\
        '${newHospital.dutyTime8c}',\
        '${newHospital.dutyTime1s}',\
        '${newHospital.dutyTime2s}',\
        '${newHospital.dutyTime3s}',\
        '${newHospital.dutyTime4s}',\
        '${newHospital.dutyTime5s}',\
        '${newHospital.dutyTime6s}',\
        '${newHospital.dutyTime7s}',\
        '${newHospital.dutyTime8s}',\
        '${newHospital.dutyAddr}',\
        '${newHospital.postCdn1}',\
        '${newHospital.postCdn2}',\
        '${newHospital.dgidIdName}',\
        ${newHospital.wgs84Lon},\
        ${newHospital.wgs84Lat},\
        ${newHospital.dutyEryn},\
        '${newHospital.o038}')\
        ON DUPLICATE KEY UPDATE \
        dutyName = '${newHospital.dutyName}',\
        dutyTel1 = '${newHospital.dutyTel1}',\
        dutyTel3 = '${newHospital.dutyTel3}',\
        dutyTime1c = '${newHospital.dutyTime1c}',\
        dutyTime2c = '${newHospital.dutyTime2c}',\
        dutyTime3c = '${newHospital.dutyTime3c}',\
        dutyTime4c = '${newHospital.dutyTime4c}',\
        dutyTime5c = '${newHospital.dutyTime5c}',\
        dutyTime6c = '${newHospital.dutyTime6c}',\
        dutyTime7c = '${newHospital.dutyTime7c}',\
        dutyTime8c = '${newHospital.dutyTime8c}',\
        dutyTime1s = '${newHospital.dutyTime1s}',\
        dutyTime2s = '${newHospital.dutyTime2s}',\
        dutyTime3s = '${newHospital.dutyTime3s}',\
        dutyTime4s = '${newHospital.dutyTime4s}',\
        dutyTime5s = '${newHospital.dutyTime5s}',\
        dutyTime6s = '${newHospital.dutyTime6s}',\
        dutyTime7s = '${newHospital.dutyTime7s}',\
        dutyTime8s = '${newHospital.dutyTime8s}',\
        dutyAddr = '${newHospital.dutyAddr}',\
        postCdn1 = '${newHospital.postCdn1}',\
        postCdn2 = '${newHospital.postCdn2}',\
        dgidIdName = '${newHospital.dgidIdName}',\
        wgs84Lon = ${newHospital.wgs84Lon},\
        wgs84Lat = ${newHospital.wgs84Lat},\
        dutyEryn = ${newHospital.dutyEryn},\
        o038 = '${newHospital.o038}',\
        modDate = now()`;

    //console.log(insert_sql);
    sql.query(insert_sql, (err, res) =>{
        
        if(err) {
            console.log("에러 : ", err);
            result(err, null);
            return;
        }

        //console.log(insert_sql);
        //console.log("새로운 hospital 생성됨 : ", {hpid:res.insertId, ...newHospital});
        result(null, {hpid:res.insertId, ...newHospital}); //// ...newHospital은 hospital 객체를 의미
    });
}

module.exports = Hospital;
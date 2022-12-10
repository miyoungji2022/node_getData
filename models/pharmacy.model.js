const sql = require('./db');

const Pharmacy = function(pharmacy) {
    this.hpid = pharmacy.hpid;
    this.dutyName = pharmacy.dutyName;
    this.dutyTel1 = pharmacy.dutyTel1;
    this.dutyTime1c = pharmacy.dutyTime1c;
    this.dutyTime2c = pharmacy.dutyTime2c;
    this.dutyTime3c = pharmacy.dutyTime3c;
    this.dutyTime4c = pharmacy.dutyTime4c;
    this.dutyTime5c = pharmacy.dutyTime5c;
    this.dutyTime6c = pharmacy.dutyTime6c;
    this.dutyTime7c = pharmacy.dutyTime7c;
    this.dutyTime8c = pharmacy.dutyTime8c;
    this.dutyTime1s = pharmacy.dutyTime1s;
    this.dutyTime2s = pharmacy.dutyTime2s;
    this.dutyTime3s = pharmacy.dutyTime3s;
    this.dutyTime4s = pharmacy.dutyTime4s;
    this.dutyTime5s = pharmacy.dutyTime5s;
    this.dutyTime6s = pharmacy.dutyTime6s;
    this.dutyTime7s = pharmacy.dutyTime7s;
    this.dutyTime8s = pharmacy.dutyTime8s;
    this.dutyAddr = pharmacy.dutyAddr;
    this.postCdn1 = pharmacy.postCdn1;
    this.postCdn2 = pharmacy.postCdn2;
    this.wgs84Lon = pharmacy.wgs84Lon;
    this.wgs84Lat = pharmacy.wgs84Lat;
    this.regDate = pharmacy.regDate;
    this.modDate = pharmacy.modDate;
}

Pharmacy.getData = (result) => {
    let select_sql = 'SELECT * FROM pharmacy';
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


Pharmacy.create = (newPharmacy, result) => {
    
    let insert_sql = `\
    INSERT INTO pharmacy\
        (\
        hpid,\
        dutyName,\
        dutyTel1,\
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
        wgs84Lon,\
        wgs84Lat\
        )\
        VALUES\
        (\
        '${newPharmacy.hpid}',\
        '${newPharmacy.dutyName}',\
        '${newPharmacy.dutyTel1}',\
        '${newPharmacy.dutyTime1c}',\
        '${newPharmacy.dutyTime2c}',\
        '${newPharmacy.dutyTime3c}',\
        '${newPharmacy.dutyTime4c}',\
        '${newPharmacy.dutyTime5c}',\
        '${newPharmacy.dutyTime6c}',\
        '${newPharmacy.dutyTime7c}',\
        '${newPharmacy.dutyTime8c}',\
        '${newPharmacy.dutyTime1s}',\
        '${newPharmacy.dutyTime2s}',\
        '${newPharmacy.dutyTime3s}',\
        '${newPharmacy.dutyTime4s}',\
        '${newPharmacy.dutyTime5s}',\
        '${newPharmacy.dutyTime6s}',\
        '${newPharmacy.dutyTime7s}',\
        '${newPharmacy.dutyTime8s}',\
        '${newPharmacy.dutyAddr}',\
        '${newPharmacy.postCdn1}',\
        '${newPharmacy.postCdn2}',\
        ${newPharmacy.wgs84Lon},\
        ${newPharmacy.wgs84Lat})\
        ON DUPLICATE KEY UPDATE \
        dutyName = '${newPharmacy.dutyName}',\
        dutyTel1 = '${newPharmacy.dutyTel1}',\
        dutyTime1c = '${newPharmacy.dutyTime1c}',\
        dutyTime2c = '${newPharmacy.dutyTime2c}',\
        dutyTime3c = '${newPharmacy.dutyTime3c}',\
        dutyTime4c = '${newPharmacy.dutyTime4c}',\
        dutyTime5c = '${newPharmacy.dutyTime5c}',\
        dutyTime6c = '${newPharmacy.dutyTime6c}',\
        dutyTime7c = '${newPharmacy.dutyTime7c}',\
        dutyTime8c = '${newPharmacy.dutyTime8c}',\
        dutyTime1s = '${newPharmacy.dutyTime1s}',\
        dutyTime2s = '${newPharmacy.dutyTime2s}',\
        dutyTime3s = '${newPharmacy.dutyTime3s}',\
        dutyTime4s = '${newPharmacy.dutyTime4s}',\
        dutyTime5s = '${newPharmacy.dutyTime5s}',\
        dutyTime6s = '${newPharmacy.dutyTime6s}',\
        dutyTime7s = '${newPharmacy.dutyTime7s}',\
        dutyTime8s = '${newPharmacy.dutyTime8s}',\
        dutyAddr = '${newPharmacy.dutyAddr}',\
        postCdn1 = '${newPharmacy.postCdn1}',\
        postCdn2 = '${newPharmacy.postCdn2}',\
        wgs84Lon = ${newPharmacy.wgs84Lon},\
        wgs84Lat = ${newPharmacy.wgs84Lat},\
        modDate = now()`;

    //console.log(insert_sql);
    sql.query(insert_sql, (err, res) =>{
        
        if(err) {
            console.log("에러 : ", err);
            result(err, null);
            return;
        }

        //console.log(insert_sql);
        //console.log("새로운 hospital 생성됨 : ", {hpid:res.insertId, ...newPharmacy});
        result(null, {hpid:res.insertId, ...newPharmacy}); 
    });
}

module.exports = Pharmacy;
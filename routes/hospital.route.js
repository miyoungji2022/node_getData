const express = require('express');
const router = express.Router();

module.exports = (app) => {
    const hospital = require('../controllers/hospital.controller.js');

    app.get('/hospital', hospital.getData);
    //app.get('/hospital/:searchParam', hospital.getDataLike);
    //app.get('/hospital', hospital.getData);

    app.get('/hospital/inidata', hospital.pullData);

}
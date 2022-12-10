const express = require('express');
const router = express.Router();

module.exports = (app) => {
    const pharmacy = require('../controllers/pharmacy.controller.js');

    app.get('/pharmacy', pharmacy.getData);

    app.get('/pharmacy/inidata', pharmacy.pullData);

}
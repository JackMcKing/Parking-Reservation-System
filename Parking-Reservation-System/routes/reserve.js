var express = require('express');
var router = express.Router();

var Record = require('../models/record.js');

router.post('/', function (req, res) {

    Record.save(function (err, result) {

        if (err) {
            res.local.error = err;
        }

    })

};

module.exports = router;
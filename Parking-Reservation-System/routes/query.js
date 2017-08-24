var express = require('express');
var router = express.Router();
var PKinfo = require('../models/parking');

var TITLE_QUERY = '查詢';


router.get('/', function (req, res) {
    var pkinfo = new PKinfo();

    pkinfo.query(function (err, result) {
        if (err) {
            res.status(404).end(err);
        } else {
            res.render('query', {
                title: TITLE_QUERY,
                items: result
            });
        }
    });
});



module.exports = router;

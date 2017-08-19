var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var User = require('../models/users.js');
var TITLE_REG = '注册';

router.get('/', function (req,res) {
    res.render('reg', {
        title: TITLE_REG
    });
});

router.post('/', function (req, res) {

    var userName = req.body.txtUserName;
    var userPwd = req.body.txtUserPwd;
    var newUser = new User({
        username: userName,
        userpass: userPwd
    });

    console.log('req.body userName: ' + userName);
    console.log('req.body userPwd: ' + userPwd);

    //check if userName already exist
    User.getUserByUserName(newUser.username, function (err, result) {

        if (result !== null && result[0] > 0) {
            err = '用户名已存在';
        }

        if (err) {
            res.locals.error = err;
            res.render('reg', {
                title: TITLE_REG
            });
            return;
        }

        newUser.save(function (err, result) {

            if (err) {
                res.locals.error = err;
                res.render('reg', {
                    title:TITLE_REG
                });
                return;
            }

            if (result.insertId > 0){

                res.locals.success = "注册成功, 请登陆";

            }else{

                rel.locals.error = err;

            }

            res.render('reg', {
                title: TITLE_REG

            });

        });

    });

});

module.exports = router;
var express = require('express');
var router = express.Router();
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var User = require('../models/users.js');
var TITLE_LOGIN = '登录';

router.get('/', function(req, res) {
    res.render('login',{
        title:TITLE_LOGIN
    });
});

//向前端抛值，当userpermission为1 时为管理员权限、为0 时为用户权限
router.post('/', function(req, res) {

    var userName = req.body.txtUserName,
        userPwd = req.body.txtUserPwd,
        isRem = req.body.chbRem;
   //     userpermission = req.body.permission;

    User.getUserByUserName(userName, function (err, result) {
       // console.log(result);

        if(result[0] === undefined) {

            res.locals.error = "用户不存在";
            res.render('login',{
                title: TITLE_LOGIN
            });

            return;

        }

        if(result[0].USER_NAME !== userName || result[0].USER_PW !== userPwd) {

            res.locals.error = "用户名或密码错误";
            res.render('login',{
                title: TITLE_LOGIN
            });
            console.log('用户名或密码错误');

        }

        else {

            if(isRem) {
                res.cookie('islogin', userName, { maxAge: 60000 });
            }

            res.locals.username = userName;
            req.session.username = res.locals.username;
            console.log(req.session.username);

            User.getUserpermissionByUserName(userName, function (err, result) {
                console.log("permission: " + userName);

                if (result[0].USER_PERMISSION === 1){
                    res.redirect('/admin');
                }

                if (result[0].USER_PERMISSION === 0){
                    res.redirect('/userBooking');
                }

            })

         }

    });
});

module.exports = router;

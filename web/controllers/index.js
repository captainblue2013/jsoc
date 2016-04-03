/**
 * Created by lanhao on 15/5/17.
 */
'use strict';
var fs  =require('fs');

var config = require('../config/config.js');
var isType = require('../../libs/func/isType.js');
var makeData = require('../../libs/func/makeData.js');
var Controller = {};

Controller.index = function (req,res) {
    res.render('index.html');
};

Controller.mock = function(req,res){
    if(config.apis){
        var apis = require('../../apiDocs/'+config.apis).apis;
        var route = false;
        for(let k in apis){
            if(matchUrl(req.url,apis[k].uri)){
                route = apis[k];
                break;
            }
        }
        if(checkRequest(req,route)){
            res.json(200,response(route.return.data),'');
        }else {
            res.json(400, {},'请求有误，请检查参数与请求方法');
        }
    }else{
        res.json(400,{},'config.apis 为定义');
    }
};

var matchUrl = function (uri, route) {
    uri = uri.split('?')[0];
    route = toRegExp(route);
    return !! new RegExp(route,'i').test(uri);
};

var toRegExp = function (route) {
    var r = route.replace(/{.+}/ig,'[a-zA-Z0-9]+');
    return '^'+r.replace(/\//ig,'\\/')+'$';
};

var checkRequest = function (req, route) {
    if(req.method.toLowerCase() != route.method.toLowerCase()){
        console.log('method error');
        return false;
    }

    for(let k in route.body){
        if(!isType(route.body[k].type,req.body[k])){
            console.log('body error');
            return false;
        }
    }

    for(let k in route.query){
        if(!isType(route.query[k].type,req.query[k])){
            console.log('query error');
            return false;
        }
    }
    return true;
};

var response = function(retData){
    if(retData){
        if(typeof retData == 'object' && (!retData.type) && (!retData.assert)){
            for(let k in retData){
                retData[k] = response(retData[k]);
            }
        }else{
            retData = makeData(retData.type);
        }
    }else{
        return {};
    }
    return retData;
};

module.exports = Controller;

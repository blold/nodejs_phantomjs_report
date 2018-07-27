const express = require("express");
const app = express();
const path = require('path');
const childProcess = require('child_process');
const phantomjs = require('phantomjs-prebuilt');
const binPath = phantomjs.path;
const bodyParser = require('body-parser');
const sassMiddleware  = require('node-sass-middleware');
const fs = require('fs');
const crypto = require('crypto');
const admin = require("firebase-admin"); 
const dateData = require('./reportTime');
const apiGetData = require('./data');
const init = admin.initializeApp({
    credential: admin.credential.cert({
        "type": "service_account",
        "project_id": "nauticus-platform",
        "private_key_id": "3b7d5d0b48249bd854938dc20dd8072ccccf820d",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC4cUVkM+pngNvq\n/nzsrKdncOZkPt0cr7PNCWnPVFqmdM6K3xuTPBiieZHrsi+29S8OHw7I75A3AQd/\nanbNJ4ABQi/xXl/4NBhrfiUL/6DSv+/akoneciUUXs3lcNxZ9tasJeJbEHnxCK/i\n9kEXYTU02FKCoh3K3VstL2Q5wisq5IunOQuAKkL39HlNgVZGg9JHd5MKn8UkZeK2\ngpQqaHj6HtdwwADrFy5E7pi+ih1fHRi/3aX6RukF2P5Rj6Om/E80cKzH5q6/wNA7\nYJtPXAoy7W3HFurQdVAsg+uaYV9qLBf3M9QImKrdnfxMhMpmtRTIUZGINXQqwzJY\nq0UROIMLAgMBAAECggEAD+gzpWA1hlFekND7ojKDyjqPoYlVwDcbvoJiKJpBqoXR\nbbhZ5E60YIgz6wwg7FpkrAbxW1K58THQB+T9M6qv8gEs1Fgg1m2xG3gzfBTtta9j\nDB/uRGE7dxseuSaM19902pT2hYcRapXRYYrTyKSUFlIqejoUGrO7kiqPriGOX9z/\ngsLJsIw7uV1M7ISnqjUKApddXrZpQYHptAkP9ldzN6N+Ku7AN8tD3jttoDVCBblV\nGca858W3uKwi9B5jK5K+nboUWUUuUATlucLtLgmHXp/Ru/XbwRFUwfSARuk1fOkS\nX0Ap8IhrnEn8d1gV8qrYbvg7BDkXbWB7lckCjmOxgQKBgQDtnqoQduU7Xmxa1A9i\ncgdh3A+QLXXEI43BWpCD0El7TBHHXq1r0ZPVdaci9ueitXik/BuRdSj5exUXIHEi\nDl6A2l7PKTMeUvCATmVjcUof5GXgAo7FfsB4nEBfXx/QUVhEp/BqyWadvkgNsmPF\n/fdrjkjgW8pK6M5Qiusr7Fo+gQKBgQDGtZeO5oyKpCbTVcQqN6EfqEjvURed3Kuw\nX0UjQiZ4FBe+1aYR9/t+H4gF8mF/L2elyQEWtWppgwbU+vbY5DSop5/FU88kudD7\nAqtis1mOkVPCxQ5YSqEgCJBSqzoc6sUbkvdbS6J13dqHayxs22KcfDqW/TQ297I+\nXJNXaRUTiwKBgQDkzj0v8Wy2CCwKIdxWjTpyjrYlvMCDh0C+iHhTlMLNCOits4sG\nIR5bExlHX7yYPmnXZDMfk1NLN6uNQ13szy1MofldPWzNrEuNIPAcG0CnCQTX+V6E\n6ZJoEP0jWLOHomx+X7/u89Pt3QYAul+8jNosJSwjbf+Sti3D/KCLAOG9AQKBgQCi\nmd4XNVkz6fdLYBdRZIwYV6C3FGh66SQlAxCUNYE9KVP0+OcYNRA6uJqaIyjc5nGu\nG7kkV/dnt6xTg7mS6cqdZ+05j8clilgTzq9n6NMT8p/T9WQzo34NtHRE8ZBwMTxx\nv+Vhc5bRVGWKAo0r1qnu20kmXLPpdu8IUMDQ+lAg2QKBgF6mJIHQMLFk8UCUIFZz\nRVP5W1P87tJ/LagmUGPLjV7CYDwNL2YeAdiuMr3cNzWGDZBf63tgQ/lZBMVo1Tti\nWokkTEN1D3UYUp8fKGEldQpsPKcDYmpaIiJXo88S4kaV6pYkk86QUnlfwjfU3Nd0\nv6Z/V5Xt5sY1bTCLhFygRADA\n-----END PRIVATE KEY-----\n",
        "client_email": "firebase-adminsdk-b5t3h@nauticus-platform.iam.gserviceaccount.com",
        "client_id": "101883089060778528859",
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://accounts.google.com/o/oauth2/token",
        "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
        "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-b5t3h%40nauticus-platform.iam.gserviceaccount.com"
    }),
    databaseURL: "https://nauticus-platform.firebaseio.com/",
    databaseAuthVariableOverride: {
        uid: "backend"
    }
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(sassMiddleware({
    /* Options */
    src: __dirname + '/public', 
    dest: __dirname + '/public',
    debug: true
}));
app.use(express.static(__dirname + '/public'));
app.all('*', function(req, res, next) {
    
    if (req.method === 'OPTIONS') {
        var headers = {};
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization";
        res.writeHead(200, headers);
        res.end();
    } else {
        //...other requests
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Content-Type');
    }
    next();
});

function deletePdf(){
    const directory = 'downloadFiles';
    setTimeout(function(){
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            
            for (const file of files) {
                fs.unlink(path.join(directory, file), err => {
                if (err) throw err;
                });
            }
            });
        },5000)
}

app.get("/",function(req,res){
    res.render("index",  {error: ''});
})

/*
    Report 1
*/
let report1AllData = {};
app.get("/report1",function(req,res){
    res.render("report1", {datas: report1AllData});
})

app.post('/report1',function(req, res, next){
    apiGetData.getData('http://localhost:3000/report1_data').then(d => {
        // res.render("report2", {datas: d});
        report1AllData.user = req.body.name;
        report1AllData.data = d;
        let childArg2 = [
            path.join(__dirname, 'phantomjs-script.js'),
              'http://localhost:3000/report1',
              'downloadFiles/report1.pdf',
              'A4'
          ];
          new Promise((res, rej) => {
            childProcess.execFile(binPath, childArg2, function(err, stdout, stderr) {
                // handle results
                if (err || stderr) {
                    throw (500, err || stderr);
                    return;
                }
                res(stdout);
            })
        }).then(d => {
            let obj = new Object();
            obj.code = '200';
            obj.r_N = '1'; //Report number
            res.send(obj);
        })
    });
}); 

app.get("/download/:id", function(req, res){
    var filePath = path.join(__dirname, 'downloadFiles/');
    res.download(filePath + 'report' + req.params.id + '.pdf', 'report1.pdf', function(err){
        if (err) res.send('Not found');
    });
    deletePdf();
});

app.get('/report1_data', function(req,res){
    let data = new Object();
    data.ac_acti = [
        {date: '04/02/07', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
        {date: '04/02/08', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
        {date: '04/02/09', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
        {date: '04/02/06', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
        {date: '04/02/04', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
    ];
    data.printDate = dateData.getDate();
    data.printTime = dateData.getTime();
    res.send(data);
})


/*
    History Table
*/
app.get('/tableData', function(req,res){
    let data = [
        {date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},{date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},{date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/02/08', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/02/09', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/02/10', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/02/11', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/05/12', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/08/13', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/05/15', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},{date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},{date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},{date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},{date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},{date: '04/02/07', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'},
        {date: '04/01/12', time: '00:23', ac: 'Trade', market: 'Apple Inc', dir: 'SELL', quan: '24', price: '1231', consi: '1212', cost: '12313', c_rate: '1241', o_type: 'Limit', settle: 'Y', s_date: '13/02/2018', o_id: 'werwer123123'}
    ];
    let obj = new Object();
    obj.code = '200'
    obj.data = data;
    res.send(obj);
})


app.get('/table', function(req,res){
    res.render('dataTable');
})


/*
    Report 2
*/
let report2AllData = {};
app.get("/report2",function(req,res){
    res.render('report2', {datas: report2AllData});
})

app.get("/report2_data",function(req,res){
    let data = new Object();
    data.ac_sum = [{name: 'Value of USD assets', value: '12121'}, {name: 'Cash Balance AUD', value: '345345'}, {name: 'Total account value', value: '66757'}];
    data.ex_r = [{from: 'USD', to: 'AUD', rate: '34234'}, {from: 'RMB', to: 'AUD', rate: '1231'}];
    data.h_usd = [{detail: 'Facebook Inc', isin: 'US02131241241', quantity: '213', cost: '21431', current: '5645', value: '123123', gl_d: '456456', gl_p: '432'},
        {detail: 'Apple Inc', isin: 'US02131241241', quantity: '213', cost: '21431', current: '5645', value: '123123', gl_d: '456456', gl_p: '432'}
        ];
    data.ac_acti = [
        {date: '04/02/07', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
        {date: '04/02/08', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
        {date: '04/02/09', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'},
        {date: '04/02/10', time: '00:23', code: '321', type: 'bpay', isin: '', trans_type: '', trd_cur: 'Cash In', quan: '1212', d_price: '123', d_charge: '123', gst: '123', c_rate: '1.2', credit: '123', balance: '123'}
    ];
    let report2Data = data;
    report2Data.printDate = dateData.getDate();
    report2Data.printTime = dateData.getTime();
    res.send(report2Data);
})

app.post("/report2",function(req,res){
    // report2AllData = req.body;
    // console.log(report2AllData);
    apiGetData.getData('http://localhost:3000/report2_data').then(d => {
        // res.render("report2", {datas: d});
        report2AllData.user = req.body.name;
        report2AllData.data = d;
        let childArg2 = [
            path.join(__dirname, 'phantomjs-script.js'),
              'http://localhost:3000/report2',
              'downloadFiles/report2.pdf',
              'A4'
          ];
          new Promise((res, rej) => {
            childProcess.execFile(binPath, childArg2, function(err, stdout, stderr) {
                // handle results
                if (err || stderr) {
                    throw (500, err || stderr);
                    return;
                }
                res(stdout);
            })
        }).then(d => {
            let obj = new Object();
            obj.code = '200';
            obj.r_N = '2'; //Report number
            res.send(obj);
        })
    });

})

app.use(function(request, response) {
    response.status(404).send("Page not found!");
});

app.listen(3000, function(){
    console.log("Server is listening!");
})   


   



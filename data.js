const request = require('request');
let data = {};

data.getData = function doRequest(url){
    return new Promise((resolve, reject) => {
        request(url, function(err, res, body){
            if( !err && res.statusCode == 200){
                var data = JSON.parse(body);
                // console.log('dddddd:  ' + JSON.stringify(data));
                resolve(data);
            }else {reject(err)};
        })
    })
}



module.exports = data;


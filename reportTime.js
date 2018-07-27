let dateResult = {};


dateResult.getDate = function(){
    var utc = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    return utc;
}
dateResult.getTime = function(){
    let unix = Math.round( new Date()/1000);
    let date = new Date(unix*1000);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

module.exports = dateResult;
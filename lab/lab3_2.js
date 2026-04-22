var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var autoscaling = new AWS.AutoScaling();

var task = function (request, callback) {

    // pobranie capacity z URL
    const url = require('url');
    const queryObject = url.parse(request.url, true).query;
    const capacity = parseInt(queryObject.capacity);

    if (!capacity || capacity < 1) {
        callback(null, "Podaj poprawną wartość capacity");
        return;
    }

    var params = {
        AutoScalingGroupName: "BienASG",
        DesiredCapacity: capacity,
        HonorCooldown: false
    };

    autoscaling.setDesiredCapacity(params, function(err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(null, "Błąd: " + JSON.stringify(err));
        } else {
            callback(null, "Ustawiono desired capacity na: " + capacity);
        }
    });
};

exports.lab = task;
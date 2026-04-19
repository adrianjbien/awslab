// stub for lab 1_2
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var ec2 = new AWS.EC2();

var task = function (request, callback) {

    console.log("AWS request started");

    var ec2 = new AWS.EC2();

    ec2.describeInstances({}, function (err, data) {

        if (err) {
            console.log("AWS ERROR:", err);

            callback(request, {
                status: 500,
                body: JSON.stringify(err)
            });
            return;
        }

        console.log("AWS DATA:", JSON.stringify(data));

        callback(request, {
            status: 200,
            body: JSON.stringify(data, null, 2)
        });

        console.log("AWS request finished");
    });
};

exports.lab = task;
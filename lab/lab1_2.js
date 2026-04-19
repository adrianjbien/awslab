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

        var result = [];

        data.Reservations.forEach(res => {
            res.Instances.forEach(inst => {
                result.push({
                    id: inst.InstanceId,
                    state: inst.State.Name,
                    type: inst.InstanceType,
                    publicIp: inst.PublicIpAddress,
                    publicDns: inst.PublicDnsName,
                    launchTime: inst.LaunchTime
                });
            });
        });

        console.log("PARSED:", result);

        callback(request, {
            status: 200,
            body: JSON.stringify(result, null, 2)
        });
    });
};

exports.lab = task;
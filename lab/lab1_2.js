// stub for lab 1_2
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var ec2 = new AWS.EC2();

var task = function (request, callback) {

    var params = {
        // możesz dodać filtry jeśli chcesz, np. tylko running:
        // Filters: [{ Name: "instance-state-name", Values: ["running"] }]
    };

    ec2.describeInstances(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            callback(request, {
                status: 500,
                body: JSON.stringify(err)
            });
        } else {
            // upraszczamy odpowiedź (czytelniejsze dane)
            var instances = [];

            data.Reservations.forEach(reservation => {
                reservation.Instances.forEach(instance => {
                    instances.push({
                        InstanceId: instance.InstanceId,
                        State: instance.State.Name,
                        Type: instance.InstanceType,
                        PublicIP: instance.PublicIpAddress,
                        LaunchTime: instance.LaunchTime
                    });
                });
            });

            callback(request, {
                status: 200,
                body: JSON.stringify(instances, null, 2)
            });
        }
    });
};

exports.lab = task;
// stub for lab 1_3
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config.json');

var ec2 = new AWS.EC2();

var task = function (request, callback) {

    /* This example launches an instance using the specified AMI, instance type, security group, subnet, block device mapping, and tags. */

    var params = {
        ImageId: "ami-0f23ee11d840e3e64",
        InstanceType: "t3.micro",
        KeyName: "connectionAWS",
        MaxCount: 1,
        MinCount: 1,
        SecurityGroupIds: [
            "sg-0106957ad9b05ea39"
        ]
    };
    ec2.runInstances(params, function(err, data) {
        if (err) console.log(err, err.stack); // an error occurred
        else     console.log(data);           // successful response


        let instanceInfo = "IP: " + data.Instances[0].PrivateIpAddress + "\n" + "DNS Name: " + data.Instances[0].PublicDnsName;
        callback(null, instanceInfo);
    });
};

exports.lab = task;
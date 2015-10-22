var lodash = require("lodash");
var exec = require("child_process").execSync;
var Etcd = require('node-etcd');
var etcd = new Etcd(process.env.ETCD.split(":")[0], process.env.ETCD.split(":")[1]);

var dockerConfig = lodash.trim(exec("docker ps | grep " + process.env.HOSTNAME).toString()).split(/\s+/);
var appName = dockerConfig.pop();
var servicePort = dockerConfig.pop().match(/(:)([0-9]+)/)[2];
var hostIp = process.env.HOST_IP;

etcd.set("services/multilead/upstream/"+appName, hostIp + ":" + servicePort, { ttl: 120 });

setInterval(function() {
  console.log(hostIp, servicePort);
  etcd.set("services/multilead/upstream/"+appName, hostIp + ":" + servicePort, { ttl: 120 });
}, 60000);



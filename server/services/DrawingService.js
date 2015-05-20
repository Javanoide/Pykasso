/**
 * Created by Baptiste on 20/05/2015.
 */


var redis = require("./DBService");
var uuid = require('node-uuid');
var async = require("async");
var exports = {};

/**
 * create drawing
 * @param name
 */
exports.create = function create(name) {
    var uid = uuid.v1();
    redis.hset("drawings", name, uid, redis.print);
    redis.hset("drawing"+uid+"/info", "name", name, redis.print);
    redis.zadd("drawing"+uid+"/data", Date.now(), JSON.stringify([]), redis.print);
};

/**
 * delete drawing
 * @param name
 */
exports.delete = function remove(name) {
    exports.getId(name, function(err, uid) {
        var multi = redis.multi();
        multi.hdel("drawings", name);
        multi.del("drawing"+uid+"/info");
        multi.del("drawing"+uid+"/data");
        multi.exec();
    });
};

/**
 * get drawing id by drawing name
 * @param name
 * @param callback
 */
exports.getId = function getId(name, callback) {
    redis.hget("drawings", name, function (err, replies) {
        callback(err, replies);
    });
};

/**
 * add draw to drawing
 * @param name, drawing name
 * @param data, array of point
 */
exports.addToDrawing = function addToDrawing(name, data) {
    exports.getId(name, function(err, uid) {
        redis.zadd("drawing"+uid+"/data", Date.now(), JSON.stringify(data));
    });
};

/*exports.getDrawData = function getDrawData(name) {
    var client = redis.createClient();
    exports.getId(name, function(err, uid) {
        client.zget("drawing"+uid+"/data");
    });
};*/

module.exports = exports;


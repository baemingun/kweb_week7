var mysql = require('mysql');
var config = require('../db/db_info').local;

module.exports = function () {
    return {
        init: function () {
            return mysql.createPool({
                connectionLimit : config.connectionLimit,
                host     : config.host,
                user     : config.user,
                password : config.password,
                database : config.database,
                debug    :  config.debug,
                multipleStatements : config.multipleStatements
            })
        },

        test_open: function (con) {
            con.connect(function (err) {
                if (err) {
                    console.error('mysql connection error :' + err);
                } else {
                    console.info('mysql is connected successfully.');
                }
            })
        }
    }
};


var express = require('express');
var router = express.Router();

var mysql_db = require('../db/db_con')();
var pool = mysql_db.init();

/* GET home page. */
router.get('/', function(req, res, next) {
    pool.getConnection(function (err,conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err,null);
            return;
        }
        var sql = "SELECT * FROM board";
        var exec = conn.query(sql,[] ,function(err, rows) {
            conn.release();

            if (err) throw err;
            res.render('board', { rows: rows });
        });
    });
});

router.get('/view/:id', function(req, res, next) {
    pool.getConnection(function (err,conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err,null);
            return;
        }
        var id = req.params.id;
        var sql = "SELECT * FROM board WHERE id = ?";
        var exec = conn.query(sql,[id] ,function(err, row) {
            conn.release();

            if (err) throw err;
            res.render('view', { row: row[0] });
        });
    });
});

router.get('/write', function(req, res, next) {
    res.render('write');
});

router.get('/update', function(req, res, next) {
    res.render('board', { rows: rows });
});

router.post('/write', function(req, res, next) {
    pool.getConnection(function (err,conn) {
        if(err) {
            if(conn) {
                conn.release();
            }
            callback(err,null);
            return;
        }
        var title = req.body.title;
        var content = req.body.content;
        var author = req.body.author;
        var pwd = req.body.pwd;

        var sql = "INSERT INTO board (title,content,author,pwd) VALUES (?,?,?,?)";
        var exec = conn.query(sql,[title,content,author,pwd] ,function(err, rows) {
            conn.release();

            if (err) throw err;
            res.redirect("/board");
        });
    });
});

router.post('/update', function(req, res, next) {
    //Implement
});

router.post('/delete', function(req, res, next) {
    //Implement
});

module.exports = router;


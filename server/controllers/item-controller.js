
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/items.db');

var exported = {
    postItem: (req, res) => {
        console.log("POST request received at /items");
        console.log(req.body);
        db.serialize(() => {
            db.run('INSERT INTO item(description) VALUES(?)', [req.body.description], function (err) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                }
                console.log("New item has been added");
                res.json(req.body);
            });
        });
    }
}

module.exports = exported;

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
    },

    getItemsByDescription: (req, res) => {
        db.serialize(() => {
            db.all('SELECT item_id ID, description DESCRIPTION FROM item WHERE description LIKE ?', [`%${req.params.description}%`], function (err, rows) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                }
                console.log("GET request received at /items");
                console.log(rows);
                if (rows.length > 0) {
                    res.json(rows);
                } else {
                    res.status(404).send(`Item with description ${req.params.description} not found`);
                }
            });
        });

    },
}

module.exports = exported;
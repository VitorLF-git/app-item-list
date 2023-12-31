const { get, put } = require('../routes/itemRoute');
var path = require('path')
var databaseLocation = path.join(__dirname, '..',  '..', 'database', 'items.db');

var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database(databaseLocation);

var exported = {
    postItem: (req, res) => {
        console.log("POST request received at /items");
        console.log(req.body);
        db.serialize(() => {
            db.run('INSERT INTO item(description, due_date, priority) VALUES(?,?,?)', [req.body.description, req.body.dueDate, req.body.priority], function (err) {
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
            db.all('SELECT * FROM item WHERE description LIKE ?', [`%${req.params.description}%`], function (err, rows) {
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

    getAllItems: (req, res) => {
        db.serialize(() => {
            db.all('SELECT * FROM item', function (err, rows) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                }
                console.log("GET request received at /items");
                console.log(rows);
                if (rows.length > 0) {
                    res.json(rows);
                } else {
                    res.status(404).send(`No items found`);
                }
            });
        });

    },

    getItemById: (req, res) => {
        db.serialize(() => {
            db.get('SELECT * FROM item WHERE item_id = ?', [req.params.id], function (err, row) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                }
                console.log("GET request received at /items");
                console.log(row);
                if (row) {
                    res.json(row);
                } else {
                    res.status(404).send(`Item with id ${req.params.id} not found`);
                }
            });
        });
    },

    putItem: (req, res) => {
        console.log("PUT request received at /items");
        console.log(req.body);
        db.serialize(() => {
            db.run('UPDATE item SET description=?, due_date=?, priority=? WHERE item_id = ?',  [req.body.description, req.body.dueDate, req.body.priority, req.params.id], function (err) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                }
                console.log("Item has been updated");
                res.json(req.body);
            });
        });
    },

    deleteItem: (req, res) => {
        console.log("DELETE request received at /items");
        console.log(req.body);
        db.serialize(() => {
            db.run('DELETE FROM item WHERE item_id = ?', [req.params.id], function (err) {
                if (err) {
                    console.log(err.message);
                    res.status(500).send(err.message);
                }
                console.log("Item has been deleted");
                res.send(`Item with id ${req.params.id} has been deleted`);
            });
        });
    }
}

module.exports = exported;
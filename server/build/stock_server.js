/**
 * Created by Li on 2018/5/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var path = require("path");
var ws_1 = require("ws");
var app = express();
app.use('/', express.static(path.join(__dirname, '..', 'client')));
app.get('/api/stock', function (req, res) {
    var result = stocks;
    var params = req.query;
    if (params.nam) {
        result = result.filter(function (stock) { return stock.name.indexOf(params.name) !== -1; });
    }
    res.json(result);
});
app.get('/api/stock/:id', function (req, res) {
    res.json(stocks.find(function (stock) { return stock.id == req.params.id; }));
});
var server = app.listen(8086, 'localhost', function () {
    console.log('Server Start,Address is:http://localhost:8086');
});
var subscriptions = new Set();
var wsServer = new ws_1.Server({ port: 8085 });
wsServer.on("connection", function (websocket) {
    subscriptions.add(websocket);
});
var messageCount = 0;
setInterval(function () {
    subscriptions.forEach(function (ws) {
        if (ws.readyState === 1) {
            if (messageCount == 100) {
                messageCount = 1;
            }
            ws.send(JSON.stringify({ messageCount: messageCount++ }));
        }
        else {
            subscriptions.delete(ws);
        }
    });
}, 2000);
var Stock = (function () {
    function Stock(id, name, price, rating, desc, categories) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.rating = rating;
        this.desc = desc;
        this.categories = categories;
    }
    return Stock;
}());
exports.Stock = Stock;
var stocks = [
    new Stock(1, "First Stock", 1.99, 3.5, "This is my first stock", ["IT", "Web"]),
    new Stock(2, "Second Stock", 2.99, 4.5, "This is my second stock", ["Finance"]),
    new Stock(3, "Third Stock", 3.99, 2.5, "This is my third stock", ["IT"]),
    new Stock(4, "Fourth Stock", 4.99, 1.5, "This is my fourth stock", ["Web"]),
    new Stock(5, "Fifth Stock", 5.99, 2.4, "This is my fifth stock", ["Finance"]),
    new Stock(6, "Sixth Stock", 6.99, 3.5, "This is my sixth stock", ["IT", "Web"]),
    new Stock(7, "Seventh Stock", 7.99, 5.0, "This is my seventh stock", ["IT", "Finance"]),
    new Stock(8, "Eighth Stock", 8.99, 4.5, "This is my eighth stock", ["Finance", "Web"]),
];

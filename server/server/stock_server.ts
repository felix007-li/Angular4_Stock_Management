/**
 * Created by Li on 2018/5/17.
 */

import * as express from "express";
import * as path from "path";
import {Server} from "ws";

const app = express();

app.use('/', express.static(path.join(__dirname, '..', 'client')))

app.get('/api/stock', (req, res) => {
    let result = stocks;
    let params = req.query;

    if(params.nam){
        result = result.filter(stock => stock.name.indexOf(params.name) !== -1);
    }

    res.json(result);
});

app.get('/api/stock/:id', (req, res) => {
    res.json(stocks.find(stock => stock.id == req.params.id));
});

const server = app.listen(8086, 'localhost', () => {
    console.log('Server start,Address is: http://localhost:8086');
});

var subscriptions = new Set<any>();

const wsServer = new Server({port: 8085});
wsServer.on("connection", websocket => {
    subscriptions.add(websocket);
});

var messageCount = 0;

setInterval(() => {
    subscriptions.forEach(ws => {
        if(ws.readyState === 1){
            ws.send(JSON.stringify({messageCount: messageCount++}));
        }else{
            subscriptions.delete(ws);
        }
    })
}, 2000);

export class Stock {
    constructor(public id: number,
                public name: string,
                public price: number,
                public rating: number,
                public desc: string,
                public categories: Array<string>) {

    }
}

const stocks: Stock[] = [
    new Stock(1, "First Stock", 1.99, 3.5, "This is my first stock", ["IT", "Web"]),
    new Stock(2, "Second", 2.99, 4.5, "This is my second stock", ["Finance"]),
    new Stock(3, "Third Stock", 3.99, 2.5, "This is my third stock", ["IT"]),
    new Stock(4, "Fourth Stock", 4.99, 1.5, "This is my fourth stock", ["Web"]),
    new Stock(5, "Fifth Stock", 5.99, 2.4, "This is my fifth stock", ["Finance"]),
    new Stock(6, "Sixth Stock", 6.99, 3.5, "This is my sixth stock", ["IT", "Web"]),
    new Stock(7, "Seventh Stock", 7.99, 5.0, "This is my seventh stock", ["IT", "Finance"]),
    new Stock(8, "Eighth Stock", 8.99, 4.5, "This is my eighth stock", ["Finance", "Web"]),
];

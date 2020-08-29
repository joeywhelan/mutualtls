/**
 * @fileoverview Express-based REST API server demonstrating authentication via mutual TLS/client-side certificates
 * @author Joey Whelan <joey.whelan@gmail.com>
 */

'use strict';
'use esversion 6';
const https = require('https');
const express = require('express');
const fs = require('fs');

const port = 8443;
const key = fs.readFileSync('serverKey.pem');
const cert = fs.readFileSync('serverCert.pem');
const options = {
        key: key,
        cert: cert,
        requestCert: true,
        ca: [cert]
};

let kvpStore = {};

const app = express();
app.use(express.json());

//create
app.post('/kvp', (req, res) => {
    const key = req.body.key;
    const value = req.body.value;
    if (key && value) {
        if (key in kvpStore) {
            res.status(400).json({error: 'kvp already exists'});
        }
        else {
            kvpStore[key] = value;
            res.status(201).json({key: key, value: kvpStore[key]});
        }
    } 
    else {
        res.status(400).json({error: 'missing key value pair'});
    }   
});

//retrieve
app.get('/kvp/:key', (req, res) => {
    const key = req.params.key;

    if (key in kvpStore) {
        res.status(200).json({key: key, value: kvpStore[key]});
    }
    else {
        res.status(404).json({error: 'key not found'});
    }
});

//update
app.put('/kvp', (req, res) => {
    const key = req.body.key;
    const value = req.body.value;
    if (key && value) {
        if (key in kvpStore) {
            kvpStore[key] = value;
            res.status(200).json({key: key, value: kvpStore[key]});
        }
        else {
            kvpStore[key] = value;
            res.status(201).json({key: key, value: kvpStore[key]});
        }
    }
    else {
        res.status(400).json({error: 'missing key value pair'});
    }
});

//delete
app.delete('/kvp/:key', (req, res) => {
    const key = req.params.key;
    if (key in kvpStore) {
        delete kvpStore[key]
        res.status(200).json({'result': `${key} deleted`});
    }
    else {
        res.status(404).json({error: 'key not found'});
    }
});

https.createServer(options, app).listen(port);
console.log(`server listening on ${port}`);
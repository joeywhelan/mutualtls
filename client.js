/**
 * @fileoverview REST API client to demonstrate mutual TLS/client-side certificates
 * @author Joey Whelan <joey.whelan@gmail.com>
 */

'use strict';
'use esversion 6';
const https = require('https');
const fs = require('fs');
const fetch = require('node-fetch');

const key = fs.readFileSync('clientKey.pem');
const cert = fs.readFileSync('clientCert.pem');
const options = {
        key: key,
        cert: cert,
        rejectUnauthorized: false
};
const url = 'https://localhost:8443/kvp/';
const tlsAgent = new https.Agent(options)

async function create(kvp) {
    const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(kvp),
        headers: {'Content-Type': 'application/json'},
        agent: tlsAgent
    });

    const json = await response.json();
    console.log(`CREATE - ${response.status} ${JSON.stringify(json)}`);
}

async function retrieve(key) {
    const response = await fetch(url + key, {
        method: 'GET',
        agent: tlsAgent
    });

    const json = await response.json();
    console.log(`RETRIEVE - ${response.status} ${JSON.stringify(json)}`);

}

async function update(kvp) {
    const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(kvp),
        headers: {'Content-Type': 'application/json'},
        agent: tlsAgent
    });

    const json = await response.json();
    console.log(`UPDATE - ${response.status} ${JSON.stringify(json)}`);
}

async function del(key) {
    const response = await fetch(url + key, {
        method: 'DELETE',
        agent: tlsAgent
    });

    const json = await response.json();
    console.log(`DELETE - ${response.status} ${JSON.stringify(json)}`);
}

(async () => {
    await create({key:'1', value:'abc'});
    await retrieve('1');
    await update({key:'1', value:'def'});
    await del('1');
})();



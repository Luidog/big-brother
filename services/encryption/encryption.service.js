'use strict';

const crypto = require('crypto');
const { algorithm, key } = require('../../configuration')

const isJson = data => {
    item = typeof item !== "string" ?
        JSON.stringify(item) :
        item;

    try {
        item = JSON.parse(item);
    } catch (e) {
        return false;
    }

    if (typeof item === "object" && item !== null) {
        return true;
    }

    return false;
}

const encryption = {
    afterSerialization: (doc) => {
        console.log(doc)
        if (isJson(doc)) {
            let cipher = crypto.createCipher(algorithm, key);
            encrypted = cipher.update(JSON.stringify(doc), 'utf8', 'hex') + cipher.final('hex');
            return encrypted;
        }
        return doc;
    },
    beforeDeserialization: (doc) => {
        console.log(doc)
        let decipher = crypto.createDecipher(algorithm, key);

        try {
            let decrypted = decipher.update(doc, 'hex', 'utf8') + decipher.final('utf8');
            return JSON.parse(decrypted);
        } catch (e) {
            return doc
        }
    }
}

module.exports = { encryption }
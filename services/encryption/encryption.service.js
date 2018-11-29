'use strict';

const crypto = require('crypto');
const { algorithm, length, key } = require('../../configuration')

const isJson = item => {
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
            
            let cipher = crypto.createCipher(algorithm, key, iv);
            let encrypted = cipher.update(JSON.stringify(doc), 'utf8', 'hex') + cipher.final('hex');
            return encrypted;
        }
        return doc;
    },
    beforeDeserialization: (doc) => {
        
        let decipher = crypto.createDecipher(algorithm, key, iv);

        try {
            let decrypted = decipher.update(doc, 'hex', 'utf8') + decipher.final('utf8');
            console.log(JSON.parse(decrypted))
            return JSON.parse(decrypted);
        } catch (e) {
            return doc
        }
    }
}

module.exports = { encryption }
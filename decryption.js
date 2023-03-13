// const crypto = require('crypto');
// const fs = require('fs');


// function decryptFunc() {
//     // Load the private key from a file
//     const privateKey = fs.readFileSync('private.pem', 'utf-8');

//     // Load the encrypted data from a file
//     const encryptedString = fs.readFileSync('encryptedData1.txt', 'utf-8');

//     // Decrypt the data using the private key
//     const decryptedData = crypto.privateDecrypt(privateKey, Buffer.from(encryptedString, 'base64'));

//     // Convert the decrypted data to a string
//     const decryptedString = decryptedData.toString();

//     // Parse the decrypted string to JSON object
//     const decryptedObject = JSON.parse(decryptedString);

//     // console.log(decryptedObject);

//     return decryptedObject
// }

// console.log(decryptFunc())
const crypto = require('crypto');
const fs = require('fs');

// Crypto helper - encryption and deccryption of string using PEM public or private keys from files.
// Works with keys created using openssl:
/*
Without passphrase:
openssl genrsa -out pvkey.pem 4096
openssl rsa -in pvkey.pem -outform PEM -pubout -out pbkey.pem
*/

function encrypt(s, keyFileName_public) {
    var encs = crypto.publicEncrypt(readKeyFromPEMFile(keyFileName_public), Buffer.from(s));
    var encs = encs.toString("base64");
    return encs;
}

function decrypt(es, keyFileName_private) {
    var options = { key: readKeyFromPEMFile(keyFileName_private) };
    var dcs = crypto.privateDecrypt(options, Buffer.from(es, "base64"));
    var dcs = dcs.toString("utf8");
    return dcs;
}

function readKeyFromPEMFile(fn) {
    var s = fs.readFileSync(fn, 'utf8');
    return s;
}

module.exports = { encrypt, decrypt };

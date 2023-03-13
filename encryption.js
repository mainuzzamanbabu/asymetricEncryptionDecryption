const { decryptFunc } = require('./decryption');

const crypto = require('crypto');
const fs = require('fs');
// Load the public key of the recipient from a file
const publicKey = fs.readFileSync('public.pem', 'utf-8');

// Example data to encrypt
const objData = { name: 'Md. Mainuzzaman', cert_serial: '8005565', ID: '171-15-099911' };
const jsonString = JSON.stringify(objData);

// Encrypt the data using the public key
const encryptedData = crypto.publicEncrypt(publicKey, Buffer.from(jsonString, 'utf-8'));

// Save the encrypted data to a file

const encryptedString = encryptedData.toString('base64');
console.log(encryptedString)
// fs.writeFileSync('encrypted.dat', encryptedData);
fs.writeFileSync('encryptedData.txt', encryptedString)
console.log("Decrypted Strings are: ", decryptFunc(encryptedString))
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');

function decryptStringWithPrivateKey(s, privateKeyFile) {
    const privateKey = fs.readFileSync(path.resolve(privateKeyFile));
    const decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING,
    }, Buffer.from(s, 'base64'));
    return decrypted.toString();
}

const privateKeyFile = './private.pem';

const encrypted = 'Spe7H1hkgxAvFcUulhCHfhHM5OTDKxEU10FavlnZcA4/atfeqnOvtM399R/MNPrsS+gaz1np/zyHC+JWb2LmrZV9DZeh0ns1wCvMeV5ARxhFSmhHy6bKX4wCcca553OMgKaltcQkxriK648MFycP62gUZa5vpMvhLMSDT++48s6cJajbUP22HQUuviOcq9hwEq5H9nogXLR7nIetuxDnL167MJjI4LaC6wm0bx9lmGi4gmizmNQgen+QjGUBPxPpWtPWt4H0DOUcJqBK9wvhjXfZX6o13cwrBHl5MDcsYMhucgdpaGykFzenJueQqvP59gHoble5X4LSW2r9B+i9xw==';
const encryptedString = encrypted.toString('base64');
const decrypted = decryptStringWithPrivateKey(encryptedString, privateKeyFile);
console.log(`Encrypted: ${encryptedString}`);
console.log(`Decrypted: ${decrypted}`);

// let decryptedObject;
// try {
//     decryptedObject = JSON.parse(decrypted);
//     console.log(`Parsed JSON:`, decryptedObject);
// } catch (e) {
//     console.error(`Error parsing JSON:`, e.message);
// }
// const inputString = "{ name: 'Farhan Tanvir', cert_serial: '8005561', ID: '131-35-383' }";

// Use regular expressions to extract the values of name, cert_serial, and ID
const nameMatch = decrypted.match(/name: '(.*?)'/);
const certMatch = decrypted.match(/cert_serial: '(.*?)'/);
const idMatch = decrypted.match(/ID: '(.*?)'/);

// Extract the values from the regular expression matches
const name = nameMatch ? nameMatch[1] : null;
const certSerial = certMatch ? certMatch[1] : null;
const id = idMatch ? idMatch[1] : null;

console.log(name); // Output: "Farhan Tanvir", "8005561", "131-35-383"
console.log(certSerial);
console.log(id);
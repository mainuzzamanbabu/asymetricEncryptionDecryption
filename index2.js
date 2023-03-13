const crypto = require('crypto');
const fs = require('fs');

class CryptoHelper {
    static encryptStringWithPublicKey(s, keyFilename) {
        const publicKey = fs.readFileSync(keyFilename, 'utf8');
        const buffer = Buffer.from(s, 'utf8');
        const encrypted = crypto.publicEncrypt(publicKey, buffer);
        return encrypted.toString('base64');
    }

    static decryptStringWithPrivateKey(s, keyFilename) {
        const privateKey = fs.readFileSync(keyFilename, 'utf8');
        const buffer = Buffer.from(s, 'base64');
        const decrypted = crypto.privateDecrypt(
            {
                key: privateKey,
                padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                oaepHash: 'sha256',
            },
            buffer
        );
        return decrypted.toString('utf8');
    }

    static readPrivateKeyFromPem_PKCS1(keyFilename) {
        const privateKey = fs.readFileSync(keyFilename, 'utf8');
        const buffer = Buffer.from(privateKey, 'utf8');
        const header = '-----BEGIN RSA PRIVATE KEY-----';
        const footer = '-----END RSA PRIVATE KEY-----';
        const start = buffer.indexOf(header) + header.length;
        const end = buffer.indexOf(footer);
        const key = buffer.slice(start, end);
        return `-----BEGIN RSA PRIVATE KEY-----${key}-----END RSA PRIVATE KEY-----`;
    }
}

// Example usage
const encrypted = 'e7MBn2JvZppIqiKeJM3zkeuptC/6gffeEhw9O0nQX1g6gmZbZNSJGmGDerxaspcuem018Hxuti70OQpxgFX6LbL0DBwP0Qx4evrawLib+DK4V/FDFP00prjDQir3nf3LP795ruz/o9Bz17nH6sDp9OD1boufs9mw4DPF69Fc3sG0en+9NnCWPBhGq0ZsXtgRNWhZ62otzJfqAl5r3HwNhK6OZVCjnAuErmnOO+ZGC+ZOwH+/RStMnYtnCZer3idMA8Mb3FR/VOYKbr0PQ7Z05X9PA2aJ/r6oaq3w9OssAi6h+QsmqFhz2mu7Hn6iUBgEx+pluHmZeX8sTjpv1rDnnA==';
const decrypted = CryptoHelper.decryptStringWithPrivateKey(
    encrypted,
    './private.pem'
);
console.log(decrypted);

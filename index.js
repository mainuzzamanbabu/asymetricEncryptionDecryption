var ch = require('./decryption');

// const objData = { name: 'Farhan Tanvir', cert_serial: '524566', ID: '131-35-383' };
// const jsonString = JSON.stringify(objData);


// var s = jsonString;
// console.log(s);

var encrypted = 'T6IuCxt0a/QYdKl8IWP1C7azI4a6TFzfHK9yZ8vYXmOtmaTiEv4K9zSAxg4jkTdF7rj902tvSBqBtkv7ux06K8TV4zjchdcrBKwmC9I4RNGDsg5Nu4wIrXoUyxrYXeqhO/y2n4hKte4uLcudY1MIcarrv9H9hew3JTfLmTEeRR+t3cZNuBlwZqR4BollzO7T92z1UvUysPwiWfjLzbY18R4Kw8Z6tevXpPfgTEfrK7yiKwThFGmOwQwNsApXXs1aWh7SjwQC7ZkpMpvzCFGNM+t9MbRkj3GfsCfI/NMRdsZ3EHRbOTr/EqYZfxaF3/KWgsV83X6PLHO8FzL9kKCnXg=='
console.log(encrypted);

var decrypted = ch.decrypt(encrypted, "./private.pem");
console.log(decrypted);
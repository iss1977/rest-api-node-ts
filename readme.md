# Building a REST API with Node.js, Mongoose & TypeScript

Creating private and punlic keys:

openssl genrsa -out file.key 2048
openssl pkcs8 -topk8 -inform pem -in file.key -outform pem -nocrypt -out file.pem
openssl rsa -in file.key -pubout -out publickey.key

# REST API with Node.js, JWT, Mongoose & TypeScript

### Features:
- Implements user validation using JWT access token and refresh token
- simple backend based on NodeJS and Mongoose to perform REST
- Tests using jest, supertest
- Configure application using "Node-config"
- Logging using "pino"
- schema validation using "zod"

</br>

Creating private and public keys:

openssl genrsa -out file.key 2048
openssl pkcs8 -topk8 -inform pem -in file.key -outform pem -nocrypt -out file.pem
openssl rsa -in file.key -pubout -out publickey.key


Special thanx to TomDoesTech
https://youtu.be/BWUi6BS9T5Y


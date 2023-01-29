import supertest = require("supertest");
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { Mongoose } from "mongoose";


import server from './../server';
import { createProduct } from "../service/product.service";
import { productPayload } from './sampleProduct';

const app = server();
let mongoServer: MongoMemoryServer;
let connection: typeof mongoose;

describe('product', () => {

    beforeAll(async () => {
        try {
            mongoServer = await MongoMemoryServer.create({
                instance: {
                    port: 3678
                }
            });

            connection = await mongoose.connect(mongoServer.getUri(), {
                dbName: 'jestDB',
                autoCreate: true,
            });

            console.info(`Connection to MongoDB In-Memory Server successful. Uri:${mongoServer.getUri()}`);
        } catch (error) {
            console.error(error);
        }

    });

    afterAll(async () => {

        try {
            await mongoose.disconnect();
            await mongoose.connection.close();
            await mongoServer.stop();
        } catch (error) {
            console.error(error);
        }
    });


    describe('verify db connection', () => {

    });

    describe('get product', () => {

        describe('given the product does not exist', () => {
            it('should return 404', async () => {
                const productId = 'product-123';
                await supertest(app).get(`/api/product/${productId}`).expect(404);
            })
        });

        describe('given the product does exist', () => {
            it('should return 200 and the product', async () => {

                const product = await createProduct(productPayload);

                const response = await supertest(app).get(`/api/products/${product.productId}`);
                const { body, statusCode } = response;
                const productId = body.productId;

                expect(statusCode).toBe(200);
                expect(body.productId).toBe(productId);
            })
        })

    });

})
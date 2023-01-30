import supertest = require("supertest");
import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose, { CallbackError, Mongoose, Schema } from "mongoose";


import server from './../server';
import { createProduct } from "../service/product.service";
import { productPayload, userPayload } from './testPayloads';
import { signJwt } from "../utils/jwt.utils";

const app = server();
let mongoServer: MongoMemoryServer;
let connection: typeof mongoose;

describe('Testing products functionality', () => {

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

    describe('verify MongoMemoryServer DB connection', () => {
        it('should insert 2 docuemnts in db', async () => {
            interface TestDocument{
                name: string;
            }
            const MyModel = mongoose.model<TestDocument>('Test', new Schema({ name: String }));
            const result = await MyModel.insertMany([{name : 'test1'},{name : 'test2'} ]);
            MyModel.countDocuments({}, function (err: any, count: number){
                expect(count).toBe(2);
            });
            expect(result.length).toBe(2);
        })



    });

    describe('get product route', () => {

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

    describe('create product route', () => {

        describe('given the user is not logged in.', () => {
            it('should return a 403 error', async () => {
                const { statusCode } = await supertest(app).post('/api/products');
                expect(statusCode).toBe(403);
            });
        });

        describe('given the user is logged in.', () => {
            it('should return a 200 and created product', async () => {
                const jwt = signJwt(userPayload);

                const { statusCode, body } = await supertest(app).post('/api/products')
                .set('Authorization', `Bearer ${jwt}`)
                .send(productPayload);

                expect(statusCode).toBe(200);

                expect(body).toEqual({
                    __v: 0,
                    _id: expect.any(String),
                    createdAt: expect.any(String),
                    description: "Claw your carpet in places everyone can see - why hide my amazing artistic clawing skills?. If it smells like fish eat as much as you wish destroy house in 5 seconds missing until dinner time pose purrfectly to show my beauty for eat plants, meow, and throw up because i ate plants. Slap the dog because cats rule. Knock over christmas tree cough furball pelt around the house and up and down stairs chasing phantoms and am in trouble, roll over",
                    image: "https://image.com/sample.jpg",
                    price: 899.99,
                    productId: expect.any(String),
                    title: "Product title",
                    updatedAt: expect.any(String),
                    user: expect.any(String)
                });
            });
        });

    });


})
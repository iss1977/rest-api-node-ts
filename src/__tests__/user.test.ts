import mongoose from 'mongoose';
import supertest from 'supertest';
import server from './../server';
import { userInput, userPayload, createUserServiceMockReturnData, sessionPayload } from './testPayloads';
import * as UserService from './../service/user.service';
import * as SessionService from './../service/session.service';
import { createUserSessionHandler } from '../controller/session.controller';

const app = server();

jest.setTimeout(60000);


describe('user', () => {
    describe('user registration', () => {
        describe('given the user and password are valid', () => {
            it('should return an user payload', async () => {
                //@ts-ignore
                const createUserServiceMock = jest.spyOn(UserService, 'createUser').mockReturnValueOnce(createUserServiceMockReturnData);
                const ui = userInput;
                const { statusCode, body } = await supertest(app).post('/api/users').send(userInput);
                expect( statusCode ).toBe(200);
                expect ( body ).toMatchObject(createUserServiceMockReturnData);
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput);

            });
        });
        describe('given the passwords do not match,', () => {
            it('should return a 400', async () => {
                jest.clearAllMocks();
                //@ts-ignore
                const createUserServiceMock = jest.spyOn(UserService, 'createUser');
                const ui = userInput;
                const { statusCode, body } = await supertest(app).post('/api/users').send({...userInput, passwordConfirm: 'does-not-match'});
                expect( statusCode ).toBe(400);
                expect(createUserServiceMock).not.toHaveBeenCalledWith(userInput); //will fail in middleware
            });
        });
        describe('given the user service throws', () => {
            it('should return a 409 error', async () => {
                jest.clearAllMocks();
                //@ts-ignore
                const createUserServiceMock = jest.spyOn(UserService, 'createUser').mockRejectedValueOnce('Error thrown');
                const ui = userInput;
                const { statusCode, body } = await supertest(app).post('/api/users').send(userInput);
                expect( statusCode ).toBe(409);
                expect(createUserServiceMock).toHaveBeenCalledWith(userInput); //will fail in middleware

            });
        });
    });

    describe('create user session', () => {
        describe('given the user and password are valid', () => {
            it('should returna signed accessToekn & refresh token', async () => {
                jest.clearAllMocks();
                //@ts-ignore
                jest.spyOn(UserService, 'validatePassword').mockReturnValue(userPayload);
                //@ts-ignore
                jest.spyOn(SessionService, 'createSession').mockReturnValue(sessionPayload);

                const req = {
                    body: {
                        email: 'test@example.com',
                        password: 'my-password'
                    },
                    get: () => 'user-gaent-sample'
                }

                const responseSendFn = jest.fn();
                const res = {
                    send: responseSendFn,
                }

                //@ts-ignore
                const result = await createUserSessionHandler(req,res);

                expect(responseSendFn).toBeCalledWith({
                    accessToken: expect.any(String),
                    refreshToken: expect.any(String)
                });
            });
        });
        
    })

});
import request from 'supertest';
import app from '../src/app.js';
import {describe, expect, test} from '@jest/globals';

describe('Test user functionality', () => {
    test('Should signup a new user', async () => {
        await request(app).post('/api/v1/users').send({
            name: "Mr Test Mihail",
            email: "mihail.test@gmail.com",
            password: 'testPass22222'
        }).expect(201);
    })
})

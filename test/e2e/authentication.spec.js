'use strict';

const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../src/app');

describe('GET /', () => {

    let server;

    beforeAll(() => {
        server = request(app);
    });

    describe('When not authenticated', () => {

        it('returns a HTTP 401', async () => {
            const res = await server.get('/');

            expect(res.statusCode).toEqual(401);
        });
    });

    describe('When authenticated', () => {

        let token;

        const secret = 'AZERTYUIOP';

        const user = {
            id: 12345,
            username: 'matthieu',
        };

        beforeEach(() => {
            token = jwt.sign(user, secret);
        });

        it('returns a HTTP 200', async () => {
            const res = await server
                .get('/')
                .set('Authorization', `Bearer ${token}`);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual({ foo: 'bar' });
        });
    });
});

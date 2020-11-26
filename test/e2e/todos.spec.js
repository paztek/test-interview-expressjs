'use strict';

const request = require('supertest');
const jwt = require('jsonwebtoken');

const app = require('../../src/app');

describe('CRUD /todos', () => {

    let server;

    beforeAll(() => {
        server = request(app);
    });

    describe('When not authenticated', () => {

        it('returns a HTTP 401', async () => {
            const res = await server.get('/todos');

            expect(res.statusCode).to.equal(401);
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

        describe('GET /todos', () => {

            it('returns a HTTP 200 with the list of todos', async () => {
                const res = await server
                    .get('/todos')
                    .set('Authorization', `Bearer ${token}`);

                expect(res.statusCode).toEqual(200);
                expect(res.body).toBeInstanceOf(Array);
                expect(res.body).toHaveLength(3);
            });
        });

        describe('POST /todos', () => {

            it('returns a HTTP 201 with the newly created todo', async () => {
                const payload = {
                    label: 'Answer correctly',
                    done: false,
                };

                const res = await server
                    .post('/todos')
                    .set('Authorization', `Bearer ${token}`)
                    .send(payload);

                expect(res.statusCode).toEqual(201);
                expect(res.body.id).toBeDefined();
                expect(res.body).toContain(payload);
            });
        });

        describe('GET /todos/:id', () => {

            it('returns a HTTP 200 with the desired todo', async () => {
                const id = 2;

                const res = await server
                    .get(`/todos/${id}`)
                    .set('Authorization', `Bearer ${token}`);

                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toEqual(id);
            });
        });

        describe('PUT /todos/:id', () => {

            it('returns a HTTP 200 with the updated todo', async () => {
                const id = 2;

                const payload = {
                    label: 'My updated todo',
                    done: true,
                };

                const res = await server
                    .put(`/todos/${id}`)
                    .set('Authorization', `Bearer ${token}`)
                    .send(payload);

                expect(res.statusCode).toEqual(200);
                expect(res.body.id).toEqual(id);
                expect(res.body).toContain(payload);
            });
        });

        describe('DELETE /todos/:id', () => {

            it('returns a HTTP 204 with no content', async () => {
                const id = 2;

                const res = await server
                    .delete(`/todos/${id}`)
                    .set('Authorization', `Bearer ${token}`)

                expect(res.statusCode).toEqual(204);
                expect(res.body).toBeFalsy();
            });
        });
    });
});

const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app')

describe('read posts', ()  => {
    let db;
    let posts;

    beforeEach(async () => {
        db = await getDb();
        await Promise.all([
            db.query('INSERT INTO Blogs (title, blog) VALUES (?, ?)', [
                'Second Post',
                'This is my second post',
            ]),

            db.query('INSERT INTO Blogs (title, blog) VALUES (?, ?)', [
                'Third Post',
                'This is my third post',
            ]),

            db.query('INSERT INTO Blogs (title, blog) VALUES (?, ?)', [
                'Fourth Post',
                'This is my fourth post',
            ]),
        ]);

        [posts] = await db.query('SELECT * from Blogs');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Blogs');
        await db.close();
    });

    describe('/blogs', () => {
        describe('GET', () => {
            it('returns all blog posts in the database', async () => {
                const res = await request(app).get('/blogs').send();

                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(3);

                res.body.forEach((blogPost) => {
                    const expected = posts.find((a) => a.id === blogPost.id);

                    expect(blogPost).to.deep.equal(expected)
                })
            })
        })
    })

})
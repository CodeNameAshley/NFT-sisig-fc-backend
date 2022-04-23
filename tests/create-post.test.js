const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db')
const app = require('../src/app');

describe('create a blog post', () => {
    let db;
    beforeEach(async () => (db = await getDb()));

    afterEach(async () => {
        await db.query('DELETE FROM Blogs');
        await db.close();
    })

    describe('/blogs', () => {
        describe('POST', () => {
            it('creates a new post in the blog section of the database', async () => {
                const res = await request(app).post('/blogs').send({
                    title: 'Start of a new blog',
                    blog: 'This is the start of my new blog'
                });

                expect(res.status).to.equal(200);

                const [[blogs]] = await db.query(
                    `SELECT * FROM Blogs WHERE title = 'Start of a new blog'`
                );

                expect(blogs.title).to.equal('Start of a new blog');
                expect(blogs.blog).to.equal('This is the start of my new blog')
            })
        })
    })
})
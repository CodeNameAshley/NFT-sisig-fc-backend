const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/dbTest')
const app = require('../src/app');

describe('create a blog post', () => {
    let db;

    beforeEach(async () => (db = await getDb()))

    afterEach(async () => {
        await db.query('DELETE FROM Blog');
        await db.close();
    })

    describe('/blog', () => {
        describe('POST', () => {
            it('creates a new post in the blog section of the database', async () => {
                const res = await (await request(app).post('/blog')).send({
                    title: 'Start of a new blog',
                    blog: 'This is the start of my new blog'
                });

                expect(res.status).to.equal(201);

                const [[blogEntries]] = await db.query(
                    `SELECT * FROM Blogs WHERE title = 'Start of a new blog'`
                );

                expect(blogEntries.title).to.equal('Start of a new blog');
                expect(blogEntries.blog).to.equal('This is the start of my new blog')
            })
        })
    })
})
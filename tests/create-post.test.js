const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db')
const app = require('../src/app');

describe('create a blog post', () => {
    let db;
    beforeEach(async () => {db = await getDb()});

    afterEach(async () => {
        await db.query('DELETE FROM Blogs');
        await db.close();
    })

    describe('/blogs', () => {
        describe('POST', () => {
            it('creates a new post in the blog section of the database', async () => {
                const response = await request(app).post('/blogs').send(
                    {title:'Ashley', blog:'This is the start of my new blog'});

                expect(response.status).to.equal(200);
                
                console.log(response._data)
                console.log(response.method)

                const [[blogEntries]] = await db.query(
                    `SELECT * FROM Blogs WHERE title = 'Ashley'`
                );

                console.log(blogEntries);

                expect(blogEntries.title).to.equal('Ashley');
                expect(blogEntries.blog).to.equal('This is the start of my new blog')
            })
        })
    })
})
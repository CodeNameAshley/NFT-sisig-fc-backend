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
                    {title:'This is the first ever blog!', blog:'This is the start of my new blog'});

                expect(response.status).to.equal(200);
                
                // This test will only pass if Response is console logged.
                console.log(response)

                const [[blogEntry]] = await db.query(`SELECT * FROM Blogs WHERE title = 'This is the first ever blog!'`)

                console.log(blogEntry);

                expect(blogEntry.title).to.equal('This is the first ever blog!');
                expect(blogEntry.blog).to.equal('This is the start of my new blog')
            })
        })
    })
})
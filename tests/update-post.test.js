const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update post', () => {
    let db
    let blogs

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

        [blogs] = await db.query('SELECT * FROM Blogs')
    })

    afterEach(async () => {
        await db.query('DELETE FROM Blogs');
        await db.close();
    })

    describe('/blogs/:blogId', () => {
        describe('PATCH', () => {
            it('updates a single blog post with the correct ID', async () => {

                const blog = blogs[0];
                const res = await request(app).patch(`/blogs/${blog.id}`).send({title: 'updated title', blog: 'updated blog body'})
    
                expect(res.status).to.equal(200);
    
                const [[newBlogPost]] = await db.query('SELECT * FROM Blogs WHERE id = ?', [blog.id])
    
                expect(newBlogPost.title).to.equal('updated title')
            })
        })

        it('returns a 404 if the blog post is not in the database', async () => {
            const res = await request(app).patch('/blogs/12345').send({title: 'updated title'});

            expect(res.status).to.equal(404);
        })
    })
})
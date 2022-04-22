// tests/artist-delete.js
const { expect } = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('delete blog post', () => {
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
    describe('DELETE', () => {
      it('deletes a single blog post with the correct id', async () => {
        const blog = blogs[0];
        const res = await request(app).delete(`/blogs/${blog.id}`).send();

        expect(res.status).to.equal(200);

        const [
          [deletedBlogPost],
        ] = await db.query('SELECT * FROM Blogs WHERE id = ?', [blog.id]);

        expect(!!deletedBlogPost).to.be.false;
      });

      it('returns a 404 if the blog is not in the database', async () => {
        const res = await request(app).delete('/blogs/999999').send();

        expect(res.status).to.equal(404);
      });
    });
  });
});
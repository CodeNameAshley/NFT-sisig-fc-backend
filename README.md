# ⭐ SFC API ⭐
This API is a personal project made for an app called SFC. SFC is a NFT sports team. This API provides the backend which will be used to retrieve blog posts used to update the team. 

# Motivation
The motivation behind the creation of this project is to be able to showcase my ability to build a full stack application. This application exists to provide data storage for an app. The maintenance of this app will be provided by the creator.

# Build status
Build status of continuous integration.

# Code style
Standard ECMAScript 2022. All files are separated into their respective folders - controllers, routes, services, tests, utils.

# Screenshots
Please forgive me I'm working on this!

# Tech/framework used
JavaScript
Node.js
Express.js
Mocha
Chai
Supertest
MySQL

VSCode
Postman
Docker
MySQL Workbench


# Features
This is a TDD API that uses CRUD (create, read, update, delete), and integration tests.

# Code Example
`const getDb = require("../services/db.js");


exports.createBlogPost = async (req,res) => {
    const db = await getDb();
    const {title, blog} = req.body;

    try {
        db.query('INSERT INTO Blogs (title, blog) VALUES (?, ?)', [title, blog]);

        res.send('Blog created').status(200)
        } catch (err) {
            res.status(500).json(err)
        }

        db.close();
}`

# Installation
To install
`npm i`

To run app
`npm start`

# API Reference
GET localhost:3000/blogs
- retrieves all blog post from the API, ID (auto increment) is visible.
  
POST localhost:3000/blogs
- creates a blog post with auto incremented ID.

PATCH localhost:3000/blogs/:blogId
- updates a single blog post by ID, must specify which key value pair to update.

DELETE localhost:3000/blogs/:blogId
- deletes a single blog post by ID.


# Tests
To run all tests
`npm test`

A test snippet
`const {expect} = require('chai');
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

                const [[blogEntries]] = await db.query(
                    `SELECT * FROM Blogs WHERE title = 'Start of a new blog'`
                );

                expect(blogEntries.title).to.equal('Start of a new blog');
                expect(blogEntries.blog).to.equal('This is the start of my new blog')
            })
        })
    })
})`

# How to use?
Currently in the works

# Contribute
The project is about to deployed, how to contribute will be update after.

# Credits
MIT © Ashley @ CodeNameAshley
const express = require('express');

const app = express();

const blogPostRouter = require('./routes/blogPost')

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello World!')
    res.status(200)

})

app.use('/blogs', blogPostRouter)

module.exports = app;
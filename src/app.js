const express = require('express');

const app = express();

app.use(express.json());

app.get('/', (req,res) => {
    res.send('Hello World!')
    res.status(200)

})


module.exports = app;
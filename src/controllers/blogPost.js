const getDb = require("../services/db.js");


exports.create = async (req,res) => {
    const db = await getDb();
    const {title, blog} = req.body;

    try {
        db.query('INSERT INTO Blogs (title, blog) VALUES (?, ?)', [title, blog]);

        res.send('Blog created').status(200)
        } catch (err) {
            res.status(500).json(err)
        }

        db.close();
}
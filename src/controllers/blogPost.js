const getDb = require("../services/db.js");


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
}

exports.readAllBlogPost = async (req, res) => {
    const db = await getDb();

    try {
        const [ blogs ] = await db.query('SELECT * FROM Blogs')
        res.status(200).json(blogs)
    } catch (err) {
        res.status(500).json(err)
    }

    db.close()
}

exports.readByBlogId = async (req,res) => {
    const db = await getDb();
    const { blogId } = req.params;

    const [[posts]] = await db.query(`SELECT * FROM Blogs WHERE id = ?`, [
        blogId,
    ]);

    if (!posts) {
        res.status(404).send(`Blog post not found with ID ${blogId}`)
    } else {
        res.status(200).json(posts);
    }

    db.close()
}

exports.updateByBlogId = async (req,res) => {
    const db = await getDb();
    const details  = req.body
    const { blogId } = req.params;


    try {
        const [[existingBlogs]] = await db.query(`SELECT * FROM Blogs WHERE id = ?`, [blogId]);

        
        if(existingBlogs) {
            await db.query(`UPDATE Blogs SET ? WHERE id = ?`, [details, blogId])
            res.status(200)
            res.send('Blog Post Updated')
        } else {
            res.status(404)
            res.send('Nothing was updated')
        }
    } catch (err) {
        res.status(500).send('Update failed')
    }

    db.close();
}

exports.deleteByBlogId = async (req,res) => {
    const db = await getDb();
    const { blogId } = req.params;


    try {
        const [[existingBlogs]] = await db.query(`SELECT * FROM Blogs WHERE id = ?`, [blogId]);

        
        if(existingBlogs) {
            await db.query(`DELETE from Blogs WHERE id = ?`, [blogId])
            res.status(200)
            res.send('Blog Post Deleted')
        } else {
            res.status(404)
            res.send('Nothing was deleted')
        }
    } catch (err) {
        res.status(500).send('This delete request failed')
    }

    db.close();
}
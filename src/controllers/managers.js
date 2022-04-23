const getDb = require("../services/db.js");


exports.createManager= async (req,res) => {
    const db = await getDb();
    const {manager, managerInfo, team, teamInfo} = req.body;

    try {
        const [[existingManager]] = await db.query('SELECT * FROM Managers WHERE manager = ?', [manager]);

        if(!existingManager) {
            db.query('INSERT INTO Managers (manager, managerInfo, team, teamInfo) VALUES (?, ?, ?, ?)', [manager, managerInfo, team, teamInfo]);
    
            res.send('Manager Created').status(200)
        } else {
            res.status(404)
            res.send('Manager not found')
        }

        } catch (err) {
            res.status(500).send('Something went wrong with creating a manager')
        }

    db.close();
}
const getDb = require("../services/db.js");


exports.createManager= async (req,res) => {
    const db = await getDb();
    const {manager, managerInfo, team, teamInfo} = req.body;

    try {
        // this code blocks gets all managers in the database by their name
        // for now this works, but when team gets bigger team name needs to be included as a parameter for creating a team
        const [[existingManager]] = await db.query('SELECT * FROM Managers WHERE manager = ?', [manager]);

        // if there is already a manager with that name that API will not allow you to create another profile.
        if(!existingManager) {
            db.query('INSERT INTO Managers (manager, managerInfo, team, teamInfo) VALUES (?, ?, ?, ?)', [manager, managerInfo, team, teamInfo]);
    
            res.send('Manager Created').status(200)
        } else if (existingManager) {
            res.send('This manager already exists!')
        } else {
            res.status(404)
            res.send('Manager not found')
        }

        } catch (err) {
            res.status(500).send('Something went wrong with creating a manager')
        }

    db.close();
}

exports.readAllManagers = async (req, res) => {
    const db = await getDb();

    try {
        const [ managers ] = await db.query('SELECT * FROM Managers')
        res.status(200).json(managers)
    } catch (err) {
        res.status(500).json(err)
    }

    db.close()
};

exports.readByManagerId = async (req,res) => {
    const db = await getDb();
    const {managerId} = req.params;

    const [[managers]] = await db.query(`SELECT * FROM Managers WHERE id = ?`, [managerId]);

    if(!managers) {
        res.status(404).send('This manager does not exist!');
    } else {
        res.status(200).json(managers);
    }

    db.close();
}

exports.updateByManagerId = async (req,res) => {
    const db = await getDb();
    const details = req.body;
    const {managerId} = req.params;

    try {
        const [[existingManager]] = await db.query(`SELECT * FROM Managers WHERE id = ?`, [managerId]);

        if(existingManager) {
            await db.query(`UPDATE Managers SET ? WHERE id = ?`, [details, managerId])
            res.status(200).send('Manager updated')
        } else {
            res.status(404).send('Manager not found')
        }
    } catch (err) {
        res.status(500).send('Update failed')
    }

    db.close();
}

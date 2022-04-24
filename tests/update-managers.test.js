const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app');

describe('update managers', () => {
    let db
    let managers

    beforeEach(async () => {
        db = await getDb();
        await Promise.all([
            db.query('INSERT INTO Managers (manager, managerInfo, team, teamInfo) VALUES (?, ?, ?, ?)', [
                'Ashley',
                'A manager who manages team vscode',
                'Team VSCode',
                'This team deals with coding this project'
            ]),

            db.query('INSERT INTO Managers (manager, managerInfo, team, teamInfo) VALUES (?, ?, ?, ?)', [
                'Betsy',
                'Manages Team Dentastix',
                'Team Dentastix',
                'This team deals with the consumption of dentastix'
            ]),

            db.query('INSERT INTO Managers (manager, managerInfo, team, teamInfo) VALUES (?, ?, ?, ?)', [
                'Noodles',
                'Manages Team Cuddles',
                'Team Cuddles',
                'This team invades your personal space just to cuddle'
            ]),
        ]);

        [managers] = await db.query('SELECT * from Managers');
    });

    afterEach(async () => {
        await db.query('DELETE FROM Managers');
        await db.close();
    });

    describe('/managers/:managerId', () => {
        describe('PATCH', () => {
            it('updates a single manager with the correct ID', async () => {

                const manager = managers[2];
                const res = await request(app).patch(`/managers/${manager.id}`).send({manager: 'Poodles', managerInfo: 'Assistant Dentastix eater', team: 'Poodlellini Team', teamInfo: 'The team of Poodles'})
    
                expect(res.status).to.equal(200);
    
                const [[updatedManager]] = await db.query('SELECT * FROM Managers WHERE id = ?', [manager.id])
    
                expect(updatedManager.manager).to.equal('Poodles')
            })
        })

        it('returns a 404 if the manager is not in the database', async () => {
            const res = await request(app).patch('/managers/12345').send({manager: 'Foot'});

            expect(res.status).to.equal(404);
        })
    })
})
const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db');
const app = require('../src/app')

describe('read managers', ()  => {
    let db;
    let managers;

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

    describe('/managers', () => {
        describe('GET', () => {
            it('returns all the managers in the database', async () => {
                const res = await request(app).get('/managers').send();

                expect(res.status).to.equal(200);
                expect(res.body.length).to.equal(3);

                res.body.forEach((manager) => {
                    const expected = managers.find((a) => a.id === manager.id);
    
                    expect(manager).to.deep.equal(expected)
                })
            })
        })
    })

})
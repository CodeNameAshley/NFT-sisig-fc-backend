const {expect} = require('chai');
const request = require('supertest');
const getDb = require('../src/services/db')
const app = require('../src/app');

describe('create a profile for a manager', () => {
    let db;
    beforeEach(async () => (db = await getDb()));

    afterEach(async () => {
        await db.query('DELETE FROM Managers');
        await db.close();
    })

    describe('/managers', () => {
        describe('POST', () => {
            it('creates a new manager profile in the database', async () => {
                const res = await request(app).post('/managers').send({
                    manager: 'Ashley',
                    managerInfo: 'A manager who manages team vscode',
                    team: 'Team VSCode',
                    teamInfo: 'This team deals with coding this project'
                });

                expect(res.status).to.equal(200);

                const [[managers]] = await db.query(
                    `SELECT * FROM Managers WHERE manager = 'Ashley'`
                );

                expect(managers.manager).to.equal('Ashley');
                expect(managers.managerInfo).to.equal('A manager who manages team vscode');
                expect(managers.team).to.equal('Team VSCode');
                expect(managers.teamInfo).to.equal('This team deals with coding this project');
            })
        })
    })
})
const assert = require("assert")
const regNumb = require('../regNumbers')
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://codex:codex123@localhost/my_reg_numbers';


const pool = new Pool({
    connectionString,
});

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from reg_numbers;");

    });

    it('should pass the db test', async function () {

        // the Factory Function is called CategoryService
        let RegInstance = regNumb(pool);
        await RegInstance.setNumber("ca 123 85")

        let number = await RegInstance.getNumber();
        assert.equal(number.rows);

    });

    it('should show the print all the regnumbers in the database', async function () {


        let RegInstance = regNumb(pool);
        await RegInstance.setNumber("ca 123 85")
        await RegInstance.setNumber("cy 123 25")
        await RegInstance.setNumber("cj 823 85")
        let number = await RegInstance.getNumber();
        assert.equal(number.rows);

    });

    it('should return error messages when reg number format is invalid', async function () {


        let RegInstance = regNumb(pool);
        await RegInstance.setNumber("ca123 85")


        let number = await RegInstance.getNumber();
        assert.equal(number.rows);

    });

    it('should return numbers for the town selected', async function () {


        let RegInstance = regNumb(pool);
        await RegInstance.setNumber("ca 183 25")
        // await RegInstance.setNumber("cj 623 85")

        let number = await RegInstance.getNumber();
        assert.equal(number.rows);
        var town = 'CA'

        let capetownRegs = await RegInstance.filterNumbers(town)
        assert.equal(capetownRegs, "CA 183 25");
    });


    it('should return numbers for the town selected', async function () {


        let RegInstance = regNumb(pool);
        await RegInstance.setNumber("cj 153 25")
        // await RegInstance.setNumber("cj 623 85")

        let number = await RegInstance.getNumber();
        assert.equal(number.rows);
        var town = 'CJ'

        let capetownRegs = await RegInstance.filterNumbers(town)
        assert.equal(capetownRegs, "CJ 153 25");
    });

    it('should return numbers for the town selected', async function () {


        let RegInstance = regNumb(pool);
        await RegInstance.setNumber("cy 113 25")
        // await RegInstance.setNumber("cj 623 85")

        let number = await RegInstance.getNumber();
        assert.equal(number.rows);
        var town = 'CY'

        let capetownRegs = await RegInstance.filterNumbers(town)
        assert.equal(capetownRegs, "CY 113 25");
    });



    after(function () {
        pool.end();
    })
});
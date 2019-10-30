const assert = require("assert")
const regNumb = require('../regNumbers')
const pg = require("pg");
const Pool = pg.Pool;

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || 'postgresql://postgres@localhost:5432/greet_test';

const pool = new Pool({
    connectionString,
});

describe('The basic database web app', function () {

    beforeEach(async function () {
        // clean the tables before each test run
        await pool.query("delete from namestoGreet;");

    });

    it('should pass the db test', async function () {

        // the Factory Function is called CategoryService
        let GreetInstance = Greet(pool);
        await GreetInstance.setName("sino")

        let greet = await GreetInstance.getName();
        assert.equal(1, greet.length);

    });
    it('should show the count of the names in the database', async function () {

        
        let GreetInstance = Greet(pool);
        await GreetInstance.setName("sino")
        await GreetInstance.setName("sbu")

        let greet = await GreetInstance.getCount();
        assert.equal(2, greet);

    });

    it('should not count duplicate names in the database', async function () {

      
        let GreetInstance = Greet(pool);
        await GreetInstance.setName("sino")
        await GreetInstance.setName("sino")

        let greet = await GreetInstance.getCount();
        assert.equal(1, greet);

    });
    it('should greet in the language selected', async function () {

       
        let GreetInstance = Greet(pool);
    
        await GreetInstance.langGreet("Sino", "English")

        let greet = await GreetInstance.getGreeting();
        assert.equal("Hello, Sino", greet);
    });

 it('should greet in the language selected', async function () {

   
        let GreetInstance = Greet(pool);
    
        await GreetInstance.langGreet("Siwe", "Xhosa")

        let greet = await GreetInstance.getGreeting();
        assert.equal("Mholo, Siwe", greet);
    });
    it('should greet in the language selected', async function () {

       
        let GreetInstance = Greet(pool);
    
        await GreetInstance.langGreet("Lona", "Afrikaans")

        let greet = await GreetInstance.getGreeting();
        assert.equal("Hallo, Lona", greet);
    });
    


    
    

    after(function () {
        pool.end();
    })
});
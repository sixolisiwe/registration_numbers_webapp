module.exports = function regForTowns(pool) {
    var nameOfTown;

    async function setNumber(numbers) {

        let upperCase = numbers.toUpperCase(2);
        let already_exist = await pool.query('SELECT * FROM reg_numbers WHERE regNumber = $1', [upperCase]);
        let towns_table = await pool.query('SELECT * FROM towns');
        let towns_id;
        if (already_exist.rowCount === 1) {

            return "already entered!";
        }
        // let duplicate = " ";
        for (let x = 0; x < towns_table.rows.length; x++) {
            const row = towns_table.rows[x];
            if (upperCase.startsWith(row.tag)) {
                towns_id = row.id;
            }
            if (towns_id === row.id) {
                await pool.query('INSERT INTO reg_numbers (regNumber,town_id) VALUES ($1,$2)', [upperCase, towns_id]);
            }
        }
        
    }

    async function getNumber() {

        nameOfTown = await pool.query("SELECT * FROM reg_numbers");
        return nameOfTown.rows;

    }

    async function filterNumbers(toFilter) {

        let filterSec = toFilter;
        let toCheck = [];

        var filterTowns = await pool.query('SELECT * FROM towns INNER JOIN reg_numbers ON towns.id = reg_numbers.town_id');
        var y = filterTowns.rows;
        console.log(filterSec);
        if (filterSec === "AllTemp") {
            return y;
        }

        for (let x = 0; x < y.length; x++) {
            const rowToFilter = y[x];


            if (filterSec === rowToFilter.tag) {



                toCheck.push(rowToFilter.regnumber);

                // console.log(toCheck, "************");

            }
        }

        return toCheck;

    }

    return {
        setNumber,
        getNumber,
        filterNumbers
    };

};
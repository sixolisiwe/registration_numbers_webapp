module.exports = function regForTowns(pool) {
    var nameOfTown;
  
    async function setNumber(numbers) {

        let upperCase = numbers.toUpperCase(2);
        let already_exist = await pool.query('SELECT * FROM reg_numbers WHERE regNumber = $1', [upperCase])
        let towns_table = await pool.query('SELECT * FROM towns')
        let towns_id;
        let duplicate = " ";
        for (let x = 0; x < towns_table.rows.length; x++) {
            const row = towns_table.rows[x]
            // const element = towns_table.rows[x].tag;
            // console.log("tag", element);
            // console.log("row==",row);

            if (upperCase.startsWith(row.tag)) {
                // console.log("tag",row.tag);

                // console.log('rowid', row.id);

                towns_id = row.id
            }
            if (already_exist.rowCount === 1) {
                return duplicate;
            }
            if (towns_id === row.id) {
                await pool.query('INSERT INTO reg_numbers (regNumber,town_id) VALUES ($1,$2)', [upperCase, towns_id])
            }

            // console.log("user" , numbers);

            //    console.log(element);
        }
        // console.log("towns", towns_id);

    }

    async function getNumber() {

        nameOfTown = await pool.query("SELECT * FROM reg_numbers");
        // console.log(nameOfTown.rows, 'plate addded');
        return nameOfTown.rows;


    }


     async function filterNumbers(toFilter) {
//         let filterSec;

console.log(toFilter);

        var filterTowns = await pool.query('SELECT * FROM towns WHERE tag = $1', [toFilter])
        // console.log(filterTowns)
        // for (let x = 0; x < filterTowns.rows.length; x++) {
        //     const rowToFilter = filterTowns.rows[x]
        //     console.log("filter",rowToFilter);
            
//         if (toFilter=== rowToFilter.regnumber) {
//             filterSec = rowToFilter.regnumber;
//         }

    // }
//  //  return filterSec;
}

    return {
        setNumber,
        getNumber,
        filterNumbers
    }
}
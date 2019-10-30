module.exports = function names(townApp) {

    async function enteredNumbers(req, res) {


        let town = await townApp.getNumber()
        res.render('index', {
         reg_numbers: town,   
        });
    }

    async function add(req, res) {
        let input = req.body.textboxTemp;
        await townApp.setNumber(input);
        res.redirect('/')
    }
    async function filtersApp(req, res) {
        let filterInput = req.body.radioBtnTemp;
        await townApp.filterNumbers(filterInput);



        res.redirect('/')
    }

    


    return {
        enteredNumbers,
        add,
        filtersApp
    }
}
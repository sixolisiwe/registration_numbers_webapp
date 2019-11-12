module.exports = function names(townApp) {

    async function enteredNumbers(req, res) {


        let town = await townApp.getNumber();
        res.render('index', {
            reg_numbers: town,
            // messages: req.flash
        });

    }

    async function add(req, res) {
        // let town = await townApp.getNumber();

        let input = req.body.textboxTemp;
        let regex = /^[A-Za-z]{2}\s[0-9\s]{3}\s[0-9]{3}$/;
        let regexTest = regex.test(input);

        if (regexTest === true) {
            await townApp.setNumber(input);
        } else {
            req.flash('error', 'format not supported!');

        }
        if (input === '') {
            req.flash('error', 'please enter a valid registration number');
        }



        res.redirect('/');
    }

    async function filtersApp(req, res) {
        let filterInput = req.body.radioBtnTemp;
        
        if (filterInput === '' || filterInput === undefined) {
            req.flash('error', 'please select a valid town');

        }
        res.render('index', {
            filtered: await townApp.filterNumbers(filterInput)

            // res.redirect('/')

        });

    }

    return {
        enteredNumbers,
        add,
        filtersApp
    };
};
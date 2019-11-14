module.exports = function names(townApp) {

    async function enteredNumbers(req, res) {


        let town = await townApp.getNumber();
        res.render('index', {
            reg_numbers: town,
    
        });

    }

    async function add(req, res) {

        let input = req.body.textboxTemp;
        let regex = /^[A-Za-z]{2}\s[0-9\s]{3}\s[0-9]{3}$/;
        let regexTest = regex.test(input);

        if (input === ''|| input === undefined) {
            req.flash('error', 'please enter a valid registration number!');
        } else if (regexTest === true) {
            let error = await townApp.setNumber(input);
            (error)? req.flash('error', 'already entered!'): "";
        } else {
            req.flash('error', 'Incorrect format, e.g CA 123 456');

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
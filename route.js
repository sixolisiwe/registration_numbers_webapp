module.exports = function names(townApp) {

    async function enteredNumbers(req, res) {


        let town = await townApp.getNumber()
        res.render('index', {
            reg_numbers: town,
            messages: req.flash('error'),
        });
        
    }

    async function add(req, res) {
        let town = await townApp.getNumber()
        let input = req.body.textboxTemp;
        await townApp.setNumber(input);
        if (input === '' ) {

            req.flash('error', 'please enter a valid registration number')
        }
       else if(input !== town){
            req.flash('error', 'please enter  a valid town tag')

        }
        else{
            req.flash('error', 'sucessfully added!')
        }
        
        res.redirect('/')
    }

    async function filtersApp(req, res) {
        // console.log(req.body);
        
        let filterInput = req.body.radioBtnTemp;
         console.log(await townApp.filterNumbers(filterInput), "3333333333333333");
        
        res.render('index', {
        filtered : await townApp.filterNumbers(filterInput)
    
        // res.redirect('/')
    })
}

    return {
        enteredNumbers,
        add,
        filtersApp
    }
}
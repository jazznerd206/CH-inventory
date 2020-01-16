module.exports = function(app) {
    app.get('/', (function(req, res) {
        res.render('index');
    }))
    app.get('/enter', (function(req, res) {
        res.render('crud-selector');
    }))
    app.get('/update', (function(req, res) {
        res.render('update-selector');
    }))
    app.get('/create-new', (function(req, res) {
        res.render('create-new');
    }))
    app.get('/create-new-reichenbach-bar', (function(req, res) {
        res.render('reichenbach-bar-entry');
    }))
}
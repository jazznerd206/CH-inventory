module.exports = function(app) {
    app.get('/', (function(_req, res) {
        res.render('index');
    }))
    app.get('/add', (function(_req, res) {
        res.render('addto');
    }))
    app.get('/remove', (function(_req, res) {
        res.render('removefrom');
    }))
    app.get('/addnew', (function(_req, res) {
        res.render('addnew');
    }))
    app.get('/delete', (function(_req, res) {
        res.render('delete');
    }))
    app.get('/viewall', (function(_req, res) {
        res.render('totalselector');
    }))
}
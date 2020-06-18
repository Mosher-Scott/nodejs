// Need to create these
var express = require('express');
var router = express.Router();

/* Base route */
router.get('/', function (req, res) {
    res.render('pages/formSubmission', { title: 'Results'});
});

module.exports = router;    
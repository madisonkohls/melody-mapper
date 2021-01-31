const router = require('express').Router();
let Journal = require('../models/journals.model')

router.route('/').get((req, res) => {
    Journal.find()
        .then(journals => res.json(journals))
        .catch(err => res.status(400).json('Error: ' + err));
});
//add routing stuffs here

module.exports = router;
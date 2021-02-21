const router = require('express').Router();
let Journal = require('../models/journals.model')
 
router.route('/').get((req, res) => {
   Journal.find()
       .then(journals => res.json(journals))
       .catch(err => res.status(400).json('Error: ' + err));
});
//add routing stuffs here
 
router.route('/add').post((req, res) => {
   const userid = req.body.userid;
   const text = req.body.text;
   const date = req.body.date;
   const title = req.body.title;
   const newJournal = new Journal({
       userid,
       title,
       text,
       date
   });
    newJournal.save()
     .then(() => res.json('Journal added!'))
     .catch(err => res.status(400).json('Error: ' + err));
 });
 
 router.route('/:id').delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then(() => res.json('Exercise deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});

 router.route('/update/:id').post((req, res) => {
   Exercise.findById(req.params.id)
     .then(exercise => {
       journal.username = req.body.username;
       journal.text = req.body.text;
       journal.date = Date.parse(req.body.date);;
        exercise.save()
         .then(() => res.json('Journal updated!'))
         .catch(err => res.status(400).json('Error: ' + err));
     })
     .catch(err => res.status(400).json('Error: ' + err));
 });
 
module.exports = router;


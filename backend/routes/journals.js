const router = require('express').Router();
let Journal = require('../models/journals.model')

router.route('/').get((req, res) => {
   Journal.find()
       .then(journals => res.json(journals))
       .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  Journal.findById(req.params.id)
      .then(journal => res.json(journal))
      .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
   const userid = req.body.userid;
   const text = req.body.text;
   const date = req.body.date;
   const title = req.body.title;
   const mood = req.body.mood;
   const newJournal = new Journal({
       userid,
       title,
       text,
       date,
       mood,
   });
    newJournal.save()
     .then(() => res.json(newJournal._id))
     .catch(err => res.status(400).json('Error: ' + err));
 });

router.route('/search-journals').post((req,res)=>{
  let journalPattern = new RegExp("^"+req.body.query)
  //searching by title
  if(req.body.searchType == 'title'){
  Journal.find({title:{$regex:journalPattern}})
  .then(journal=>{
      res.json(journal)
  }).catch(err=>{
    console.log(err)})
  };

  //searching by mood
  if(req.body.searchType == 'mood'){
    Journal.find({mood:{$regex:journalPattern}})
    .then(journal=>{
        res.json(journal)
    }).catch(err=>{
       console.log(err)})
  
  };
  //.catch(err=>{
    //  console.log(err)
  //})
});


 router.route('/delete').delete((req, res) => {
    Journal.deleteOne({'title':req.body.title, 'text':req.body.text, 'userid':req.body.id} )//{userid:req.body.id}
      .then(()=>{
        res.json('journal deleted')}
      )
      .catch(err => res.status(400).json('Error: ' + err));

 });

 router.route('/update').post((req, res) => {
   Exercise.find({'title':req.body.title, 'text':req.body.text, 'userid':req.body.id} )
     .then(exercise => {
       journal.userid = journal.userid;
       journal.title = req.body.title;
       journal.text = req.body.text;
       journal.date = Date.parse(req.body.date);
        exercise.save()
         .then(() => res.json('Journal updated!'))
         .catch(err => res.status(400).json('Error: ' + err));
     })
     .catch(err => res.status(400).json('Error: ' + err));
 });

module.exports = router;

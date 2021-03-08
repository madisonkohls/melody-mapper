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
   const mood = req.body.mood;
   const newJournal = new Journal({
       userid,
       title,
       text,
       date,
       mood,
   });
    newJournal.save()
     .then(() => res.json('Journal added!'))
     .catch(err => res.status(400).json('Error: ' + err));
 });

 /*
 router.route('/search/:journalTitle').get((req, res) => {
  Journal.find({title=journalTitle})
      .then(journals => res.json(journals))
      .catch(err => res.status(400).json('Error: ' + err));
});
*/
router.route('/search-journals').post((req,res)=>{
  let journalPattern = new RegExp("^"+req.body.query)
  Journal.find({title:{$regex:journalPattern}})
  .then(journal=>{
      if(journal.userID == req.body.userCheck)
      {
      res.json(journal);
      console.log (journal);
      }
  }).catch(err=>{
      console.log(err)
  })

});

 
 router.post('/delete',(req, res) => {
    Journal.deleteOne({title:req.body.title}, {text:req.body.text}, {userid:req.body.id})
      .then(
      res.json('Exercise deleted.')
      )

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


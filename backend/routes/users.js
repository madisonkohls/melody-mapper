const router = require('express').Router();
let User = require('../models/users.model')

router.route('/').get((req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/login').post(async (req, res) => {
    try {
        const { username, password } = req.body
        //Check if username
        if(!username){
            return res.status(400).json({
                type: "Please enter a username."
            })
        }
        //Check if password
        if(!password){
            return res.status(400).json({
                type: "Please enter a password."
            })
        }
        //Check if username is valid
        let user = await User.findOne({
            username: username
        })
        if(!user){
            return res.status(400).json({
                type: "There is no account under such username, please enter a valid username."
            })
        }
        if (password != user.password){
            return res.status(400).json({
                type: "Incorrect password, please try again."
            });
        }
        return res.status(200).json({ user: user })
    }
    catch(error){
        console.log(error)
    }
})

router.route('/createaccount').post(async (req, res) => {
    try {
        //Check if username
        if(!req.body.username){
            return res.status(400).json({
                type: "Please enter a username."
            })
        }
        //Check if username is available
        let user = await User.findOne({
            username: req.body.username
        })
        if(user){
            return res.status(400).json({
                type: "Username is already taken, please select new username."
            })
        }
        //Check if username is long enough
        if(req.body.username.length < 5){
            return res.status(400).json({
                type: "Username is too short, must be at least 5 characters."
            })
        }
        //Check if password
        if(!req.body.password){
            return res.status(400).json({
                type: "Please enter a password."
            })
        }
        //Check if password is long enough
        if(req.body.password.length < 8){
            return res.status(400).json({
                type: "Password is too short, must be at least 8 characters."
            })
        }
        //Check if First Name
        if(!req.body.firstName){
            return res.status(400).json({
                type: "Please enter a name."
            })
        }

        //Make user
        const username = req.body.username;
        const password = req.body.password;
        const firstName = req.body.firstName;
        const emailAddress = req.body.emailAddress;

        const newUser = new User({
            username,
            password,
            firstName,
            emailAddress,
        });

        newUser.save()
            .then(async () => res.status(200).json({ user: await newUser }))
            .catch(err => res.status(400).json('Error: ' + err))
    }
    catch(error){
        console.log(error)
    }
});

router.route('/updateaccount/:id').post(async (req, res) => {
  try {
      //Check if password
      if(!req.body.password){
          return res.status(400).json({
              type: "Please enter a password."
          })
      }
      //Check if password is long enough
      if(req.body.password.length < 8){
          return res.status(400).json({
              type: "Password is too short, must be at least 8 characters."
          })
      }
      //Check if First Name
      if(!req.body.firstName){
          return res.status(400).json({
              type: "Please enter a first name."
          })
      }

      User.findById(req.params.id)
      .then(user => {
          user.username = req.body.username;
          user.password = req.body.password;
          user.firstName = req.body.firstName;
          user.emailAddress = req.body.emailAddress;
          user.musicGenre = req.body.musicGenre;

          user.save()
              .then(async () => res.status(200).json({ user: user }))
              .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  }
  catch(error){
      console.log(error)
  }
});

router.route('/:id').get((req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('Account deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;
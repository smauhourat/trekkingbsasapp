const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const checkObjectId = require('../../middleware/checkObjectId');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Add user
// @access  Public
router.post(
    '/', 
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min:6 })
    ],
    async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            let user = await User.findOne({ email: email });

            if (user) {
                return res.status(400).json({ errors: [{msg: 'User already exists'}] })
            }

            user = new User({
                name,
                email,
                password
            });

            var salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();

            const payload = {
                user: {
                    id: user.id
                }
            };

            jwt.sign(
                payload, 
                config.get('jwtSecret'),
                { expiresIn: 360000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );

            //res.send('User registered');

        } catch(err) {
            console.error(err);
            res.status(500).send(err);
        }
    }
);

// @route   PUT api/users/:id
// @desc    Update user
// @access  Private
router.put(
  '/:id', 
  checkObjectId('id'),
  auth,
  [
      check('name', 'Name is required').not().isEmpty()
  ],
  async (req,res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, {new: true});

        res.json(user);
      } catch(err) {
          console.error(err);
          res.status(500).send(err);
      }
  }
);

// @route    GET api/users/:id
// @desc     Get user by ID
// @access   Public
router.get('/:id', 
  auth, 
  checkObjectId('id'),
  async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route    DELETE api/users/:id
// @desc     Delete a user
// @access   Private
router.delete('/:id', 
  auth,  
  checkObjectId('id'),
  async (req, res) => {
    try {
      if (auth.user._id === req.params.id) {
        return res.status(409).json({ msg: 'User is same to logged' });
      }

      const user = await User.findById(req.params.id);
  
      if (!user) {
        return res.status(404).json({ msg: 'User not found' });
      }
  
      await user.remove();
  
      res.json({ msg: 'User removed' });
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
});

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', 
  auth, 
  async (req, res) => {
    try {
        const users = await User
        .find()
        .sort({ date: 'asc' });

        res.json({ 
            "metadata": {
              "count": users.length
            },          
            "data": users
          });

        if (!users) {
            return res.status(404).json({ msg: 'Users not found' });
          }
    } catch(err) {
        console.error(err.message);
  
        res.status(500).send('Server Error');
    }
});

module.exports = router;
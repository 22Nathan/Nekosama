

const express = require('express')
const router = express.Router()
const User = require('../model/user')
const bcrypt = require('bcrypt')


router.post('/user/login', async (req, res) => {

    console.log(req.body);

    try {
        const user = await User.findOne({ email: req.body.email })
        res.setHeader('Content-Type', 'application/json')
        if (!user) { res.status(500).json( { userFound: false, user: null } ) }
        else {
            const isMatch = await user.comparePassword( req.body.password )
            if (isMatch) { res.status(200).json( { userFound: true, user: user } ) }
            else { res.status(500).json( { userFound: false, user: null } ) }
        }
    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        res.status(500).json( { userFound:false, message: error.message } )
    }

})


router.post('/user/signup', async (req, res) => {

    try {
        if( req.body.email && req.body.password ){
            const newUser = new User({
                email:req.body.email, 
                password:req.body.password 
            })
            const request = await newUser.save()
            res.status(201).json(newUser)
        } else { res.status(500).json({ message: 'err' }) }
    } catch (error) { res.status(400).json({ message: error.message }) }

})



router.delete('/user/delete', async (req, res) => {

    console.log(req.body);

    try {
        // const { email } = req.body.email
        const deletedUser = await User.findOneAndDelete({ email: req.body.email })

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }

})



router.put('/user/update', async (req, res) => {

    console.log(req.body);

    try {
      const { email, password } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);

      const updatedUser = await User.findOneAndUpdate({email:email}, { password: hashedPassword, email: email }, {
        new: true,
      });
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal server error' });
    }
})



module.exports = router


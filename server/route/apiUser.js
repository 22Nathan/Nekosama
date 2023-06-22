

const express = require('express')
const router = express.Router()
const User = require('../model/user')


router.get('/user/login', async (req, res) => {

    try {
        const user = await User.findOne({ email: req.body.email })
        if (!user) {
            res.setHeader('Content-Type', 'application/json')
            res.status(500).json( { userFound: false, user: null } )
        }
        else {
            const isMatch = await user.comparePassword( req.body.password )
            if (isMatch) {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).json( { userFound: true, user: user } )
            }
            else {
                res.setHeader('Content-Type', 'application/json')
                res.status(500).json( { userFound: false, user: null } )
            }
        }
    } catch (error) {
        res.setHeader('Content-Type', 'application/json')
        res.status(500).json( { message: error.message } )
    }

})


router.post('/user/signup', async (req, res) => {

    try {
        if( req.body.email && req.body.password && req.body.pseudo ){
            const newUser = new User({
                email:req.body.email, 
                pseudo:req.body.pseudo, 
                password:req.body.password 
            })
            const request = await newUser.save()
            res.status(201).json(newUser)
        } else { res.status(500).json({ message: 'err' }) }
    } catch (error) { res.status(400).json({ message: error.message }) }

})



module.exports = router


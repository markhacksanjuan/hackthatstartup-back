const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const passport = require('passport')
const crypto = require('crypto')
const bcryptSalt = 10

router.post('/signup', (req, res, next) => {
    const { email, password, name, lastName } = req.body

    if(!email || !password){
        res.json({ errorMessage: 'Need email and password'})
    }
    if(password.length < 6){
        res.json({ errorMessage: 'Make the password larger, 6 min'})
    }
    
    User.findOne({ email : email })
        .then(user => {
            if(!user){
                bcrypt.genSalt(bcryptSalt)
                    .then(salt => {
                        bcrypt.hash(password, salt)
                            .then(hashedPwd => {
                                newUser = {
                                    name,
                                    lastName,
                                    email,
                                    password: hashedPwd
                                }
                            User.create(newUser)
                                .then(result => {
                                    res.json(result)
                                })
                            })
                    })
            }else {
                res.send({ errorMessage: 'Email already exists'})
            }
        })
        .catch(err => {
            console.error(err)
        })
})
router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        if(err){
            res.status(500).send({ message: 'Something went wrong authenticating user'})
            return
        }
        if(!theUser){
            res.send(failureDetails)
            return
        }
        req.login(theUser, (err) => {
            if(err){
                res.send({ message: 'Session save went bad'})
                return
            }
            res.status(200).json(theUser)
            res.end()
        })
    })(req, res, next)
})
router.post('/logout', (req, res, next) => {
    req.logout()
    res.status(200).json({ message: 'Log out success!' })
})
router.get('/loggedin', (req, res, next) => {
    if(req.isAuthenticated()) {
        res.status(200).json(req.user)
        return
    }
    res.status(403).json({ message: 'Unauthorized' })
})

module.exports = router
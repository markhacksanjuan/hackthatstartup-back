const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt')
const User = require('../models/user.model')

// --- SERIALIZE & DESERIALIZE USER ---
passport.serializeUser((user, next) => {
    next(null, user._id)
})
passport.deserializeUser((id, next) => {
    User.findById(id)
        .then(user => {
            next(null, user)
        })
        .catch(err => next(err))
})

// --- SET STRATEGY ---
passport.use(new LocalStrategy({
    usernameField: 'email',
    passReqToCallback: true
}, (req, username, password, next) => {
    User.findOne({ email: username })
        .then(user => {
            if(user){
                // if(!user.isVerified){
                //     next(null, false, {message: 'User is not verified'})
                //     return
                // }
                bcrypt.compare(password, user.password)
                    .then(response => {
                        if(!response){
                            next(null, false, {message: 'Email or password incorrects'})
                        }else {
                            next(null, user)
                        }
                    })
            }else {
                next(null, false, {message: 'Email or password incorrects'})
            }
        })
        .catch(err => {
            console.error(err)
            next(err)
        })
}))
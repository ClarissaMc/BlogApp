const bcrypt = require('bcrypt')
const User = require('../models/User')

module.exports = (req, res) =>{
    const { username, password } = req.body;

    User.findOne({username:username})
        .then((user) =>{
            if (user) {
                bcrypt.compare(password, user.password)
                    .then((same) =>{
                        if (same) { // if passwords match
                            req.session.userId = user._id   // store user session
                            res.redirect('/')
                        }
                        else {
                            const validationErrors = ["Incorrect password"]
                            req.flash('validationErrors', validationErrors)
                            req.flash('data', req.body)
                            res.redirect('/auth/login')
                        }
                    })
                    .catch((error) =>{
                        const validationErrors = ["Incorrect password"]
                        req.flash('validationErrors', validationErrors)
                        req.flash('data', req.body)
                        res.redirect('/auth/login')
                    })
            }
            else {
                const validationErrors = ["Incorrect username"]
                req.flash('validationErrors', validationErrors)
                req.flash('data', req.body)
                res.redirect('/auth/login')
            }
        })
        .catch((error) =>{
            const validationErrors = ["Incorrect username"]
            req.flash('validationErrors', validationErrors)
            req.flash('data', req.body)
            res.redirect('/auth/login')
        })
}
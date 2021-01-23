const express = require('express')
const router = express.Router()
const Academic = require('../models/academic.model')
const User = require('../models/user.model')

router.post('/new', (req, res, next) => {
    const { university, degree, dateEnded, userId } = req.body
    const newAcademic = {
        university,
        degree,
        dateEnded,
        userId
    }
    if(!userId){
        res.send({ errorMessage: 'Something went wrong'})
        return
    }
    Academic.create(newAcademic)
        .then(createdAcademic => {
            User.findOneAndUpdate({ _id: userId }, {$push: {academics: createdAcademic._id}})
            .then(result => {
                res.status(200).json(createdAcademic)
            })
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })

})
router.get('/all/:id', (req, res, next) => {
    const { id } = req.params
    Academic.find({ userId: id })
        .then(academics => {
            res.status(200).json(academics)
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })
})
router.post('/edit/:id', (req, res, next) => {
    const { id } = req. params
    const { university, degree, dateEnded } = req.body
    const editedAcademic = {
        university,
        degree,
        dateEnded
    }
    Academic.findOneAndUpdate({ _id: id}, editedAcademic)
        .then(() => {
            res.status(200).json(editedAcademic)
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })
})
router.get('/delete/:id', (req, res, next) => {
    const { id } = req.params
    Academic.findOneAndRemove({ _id: id })
        .then(deletedAcademic => {
            res.status(200).json(deletedAcademic)
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })
})

module.exports = router
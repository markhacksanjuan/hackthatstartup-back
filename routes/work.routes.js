const express = require('express')
const router = express.Router()
const Work = require('../models/work.model')
const User = require('../models/user.model')

router.post('/new', (req, res, next) => {
    const { company, position, started, ended, job, userId } = req.body
    const newWork = {
        company,
        position,
        started,
        ended,
        job,
        userId
    }
    if(!userId){
        res.send({ errorMessage: 'Something went wrong'})
        return
    }
    Work.create(newWork)
        .then(createdWork => {
            User.findOneAndUpdate({ _id: userId }, {$push: {works: createdWork._id}})
            .then(result => {
                res.status(200).json(createdWork)
            })
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })

})
router.get('/all/:id', (req, res, next) => {
    const { id } = req.params
    Work.find({ userId: id })
        .then(works => {
            res.status(200).json(works)
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })
})
router.post('/edit/:id', (req, res, next) => {
    const { id } = req. params
    const { company, position, started, ended, job } = req.body
    const editedWork = {
        company,
        position,
        started,
        ended,
        job,
    }
    Work.findOneAndUpdate({ _id: id}, editedWork)
        .then(() => {
            res.status(200).json(editedWork)
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })
})
router.get('/delete/:id', (req, res, next) => {
    const { id } = req.params
    Work.findOneAndRemove({ _id: id })
        .then(deletedWork => {
            res.status(200).json(deletedWork)
        })
        .catch(err => {
            console.error(err)
            res.json(err)
        })
})

module.exports = router

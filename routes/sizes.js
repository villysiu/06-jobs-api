const express = require('express')

const router = express.Router()
const {
    createSize,
    deleteSize,
    getSizes,
    updateSize,
    getSize,
} = require('../controllers/sizes')

router.route('/').post(createSize).get(getSizes)

router.route('/:id').get(getSize).delete(deleteSize).patch(updateSize)

module.exports = router
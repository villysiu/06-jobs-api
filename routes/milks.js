const express = require('express')

const router = express.Router()
const {
    createMilk,
    deleteMilk,
    getMilks,
    updateMilk,
    getMilk,
} = require('../controllers/milks')

router.route('/').post(createMilk).get(getMilks)

router.route('/:id').get(getMilk).delete(deleteMilk).patch(updateMilk)

module.exports = router
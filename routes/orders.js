const express = require('express')

const router = express.Router()
const {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
    getOrder,
} = require('../controllers/orders')

router.route('/').post(createOrder).get(getOrders)

router.route('/:id').get(getOrder).delete(deleteOrder).patch(updateOrder)

module.exports = router
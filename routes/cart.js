const express = require('express')

const router = express.Router()
const {
    createCart,
    deleteCart,
    getCarts,
    updateCart,
    getCart,
} = require('../controllers/carts')

router.route('/').post(createCart).get(getCarts)

router.route('/:id').get(getCart).delete(deleteCart).patch(updateCart)

module.exports = router
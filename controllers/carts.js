const Cart = require('../models/Cart')
const Menuitem = require('../models/Menuitem')
const Milk = require('../models/Milk')
const Size = require('../models/Size')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getCarts = async (req, res) => {
    const carts = await Cart.find({ createdBy: req.user.userId })
    .populate({
        path: 'menuitem',
        select: 'title -_id'
    })
    .populate({
      path: 'milk',
      select: 'title price'
    })
    .populate({
      path: 'size',
      select: 'title price'
    })
    .sort('updatedAt')

    res.status(StatusCodes.OK).json({ carts, count: carts.length })
}

const getCart = async (req, res) => {
    const {
        user: { userId },
        params: { id: cartId },
    } = req

    const cart = await Cart.findOne({
        _id: orderId,
        createdBy: userId,
    })

    if (!cart) {
        throw new NotFoundError(`No cart with id ${cartId}`)
    }
    res.status(StatusCodes.OK).json({ cart })
}

const createCart = async (req, res) => {
    console.log("creating cart")
    const {
        menuitemId,
        milkId,
        temperature,
        sugar,
        sizeId,
        quantity
    } = req.body


    let menuitem = await Menuitem.findById(menuitemId)
    if(!menuitem)
        throw new NotFoundError('Menuitem not found')
    let unitPrice = menuitem.price


    let milk = await Milk.findById(milkId)
    if(!milk)
        throw new NotFoundError('Milk not found')
    unitPrice += milk.price     

    let size = await Size.findById(sizeId)
    if(!size)
        throw new NotFoundError('Size not found')
    unitPrice += size.price


    const cart = await Cart.create({
        createdBy: req.user.userId,
        menuitem: menuitem._id,

        milk: milk._id,
        size: size._id,
        temperature,
        sugar,
        quantity,
        unitPrice: unitPrice
        
    })
    res.status(StatusCodes.CREATED).json({ cart })
}

const updateCart = async (req, res) => {
    const { id: cartId } = req.params;
    
    const {
        // menuitemId,
        milkId,
        temperature,
        sugar,
        sizeId,
        quantity
    } = req.body

    const cart = await Cart.findById(cartId)
    if(!cart)
        throw new NotFoundError('Cart not found')

    const menuitem = await Menuitem.findById(cart.menuitemId)
    if(!menuitem)
        throw new NotFoundError('Menuitem not found')
    let unitPrice = menuitem.price

    const milk = await Milk.findById(milkId)
    if(!milk)
        throw new NotFoundError('Milk not found')
    total += milk.price     

    const size = await Size.findById(sizeId)
    if(!size)
        throw new NotFoundError('Size not found')
    total += size.price


    
    cart.createdBy = req.user.userId
    cart.menuitem = menuitem._id

    cart.milk = milk._id
    cart.size = size._id
    cart.temperature = temperature
    cart.sugar = sugar
    cart.quantity = quantity
    cart.price = total
        
    await cart.save()

    res.status(StatusCodes.OK).json({ cart })
}

const deleteCart = async (req, res) => {
  const { id: cartId } = req.params;

  const cart = await Cart.findByIdAndDelete(cartId)
  if (!cart) {
    throw new NotFoundError(`No cart with id ${cartId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createCart,
  deleteCart,
  getCarts,
  updateCart
}
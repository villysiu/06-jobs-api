const Milk = require('../models/Milk')
const { StatusCodes } = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors')

const getMilks = async (req, res) => {
  const milks = await Milk.find();
  res.status(StatusCodes.OK).json({ milks, count: milks.length })
}


const getMilk = async (req, res) => {
  const {id: milkId} = req.params

  const milk = await Milk.findOne(milkId)

  if (!milk) {
    throw new NotFoundError(`No milk with id ${milkId}`)
  }
  res.status(StatusCodes.OK).json({ milk })
}

const createMilk = async (req, res) => {
  console.log(req.body)
  // title and price
  const milk = await Milk.create(req.body)
  res.status(StatusCodes.CREATED).json({ milk })
}

const updateMilk = async (req, res) => {
  const { id: milkId } = req.params;
  const { title } = req.body;

  if (title === '') {
    throw new BadRequestError('Title field cannot be empty')
  }

  const milk = await Milk.findByIdAndUpdate(
    milkId,
    req.body,
    { new: true, runValidators: true }
  )
  if (!milk) {
    throw new NotFoundError(`No Milk with id ${MilkId}`)
  }
  res.status(StatusCodes.OK).json({ milk })
}

const deleteMilk = async (req, res) => {
  const { id: milkId } = req.params;

  const milk = await Milk.findByIdAndRemove(milkId)
  if (!milk) {
    throw new NotFoundError(`No milk with id ${milkId}`)
  }
  res.status(StatusCodes.OK).send()
}

module.exports = {
  createMilk,
  deleteMilk,
  getMilks,
  updateMilk,
  getMilk,
}
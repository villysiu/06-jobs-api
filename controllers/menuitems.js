const { StatusCodes } = require('http-status-codes')
const mongoose = require('mongoose')
const Menuitem = require('../models/Menuitem')
const Category = require('../models/Category')
const Milk = require('../models/Milk')
const { BadRequestError, NotFoundError } = require('../errors')


const createMenuitem = async (req, res) => {
  const {
    title,
    imageUrl,
    price,
    categoryId,
    milkId,
    temperature,
    sugar,
    active
  } = req.body

  if (!title || title.trim() === '') {
    throw new BadRequestError('Title is required')
  }

  const category = await Category.findById(categoryId)

  if (!category) {
    throw new NotFoundError('Category not found')
  }


  let milk = null
  if(milkId){
    milk = await Milk.findById(milkId)
    if(!milk)
        throw new NotFoundError('Milk not found')
  }

  const menuitem = await Menuitem.create({
    title,
    imageUrl,
    price,
    category: category._id,
    milk: milk ? milk._id : null,
    temperature,
    sugar,
    active: true
  })

  res.status(StatusCodes.CREATED).json({ menuitem })
}


const updateMenuitem = async (req, res) => {
    const { id: menuitemId } = req.params

    const menuitem = await Menuitem.findById(menuitemId)
    if (!menuitem) {
        throw new NotFoundError('Menuitem not found')
    }

    const updates = req.body

    for (const [key, value] of Object.entries(updates)) {
        switch (key) {
            case 'title':
                if (value === '') {
                    throw new BadRequestError('Title cannot be empty')
                }
                menuitem[key] = value
                break

            case 'imageUrl':
            case 'active':
                menuitem[key] = value
                break

            case 'price':
                menuitem.price = Number(value)
                break

            case 'categoryId':
                if (value === '') {
                    throw new BadRequestError('Category cannot be empty')
                }
                const category = await Category.findById(value)
                if (!category) 
                    throw new NotFoundError('Category not found')
                menuitem.category = category._id
                break

            case 'milkId':
                if(value === ''){
                    menuitem.milk = null
                }
                else {
                    const milk = await Milk.findById(value)
                    if (!milk) 
                        throw new NotFoundError('Milk not found')
                    menuitem.milk = milk._id
                }
                
                break

            case 'temperature':
                menuitem.temperature = value || "FREE"
                break

            case 'sugar':
                menuitem.sugar = value || "FREE"
                break

            default:
                break
        }
    }

    await menuitem.save()

    res.status(StatusCodes.OK).json({ menuitem })
}


const getMenuitems = async (req, res) => {
  const { category } = req.query; // query param: ?category=<id>

  const filter = {};
  if (category) 
    filter.category = category;

  const menuitems = await Menuitem.find(filter)
    // .populate('category')
    // .populate('milk');
    .populate({
      path: 'category',
      select: 'title -_id,'
    })
    .populate({
      path: 'milk',
      select: 'title price -_id,'
    });

  res.status(StatusCodes.OK).json({
    menuitems,
    count: menuitems.length,
  });
};



const getMenuitem = async (req, res) => {
  const { id } = req.params


  const menuitem = await Menuitem.findById(id)
    .populate({
      path: 'category',
      select: 'title -_id,'
    })
    .populate({
      path: 'milk',
      select: 'title price -_id,'
    });

  if (!menuitem) {
    throw new NotFoundError('Menuitem not found')
  }

  res.status(StatusCodes.OK).json({ menuitem })
}


const deleteMenuitem = async (req, res) => {
  const { id } = req.params

  const menuitem = await Menuitem.findByIdAndDelete(id)

  if (!menuitem) {
    throw new NotFoundError('Menuitem not found')
  }

  res.status(StatusCodes.OK).json({ msg: 'Menu item deleted' })
}



module.exports = {
  createMenuitem,
  updateMenuitem,
  getMenuitems,
  getMenuitem,
  deleteMenuitem
}

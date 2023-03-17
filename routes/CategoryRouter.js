const express = require('express')
const {
  getCategory,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory
} = require('../controllers/CategoryController')

const router = express.Router()

router.get('/category',getCategory)
router.get('/category/:id',getCategoryById)
router.post('/category',createCategory)
router.patch('/category/:id',updateCategory)
router.delete('/category/:id',deleteCategory)

module.exports = router
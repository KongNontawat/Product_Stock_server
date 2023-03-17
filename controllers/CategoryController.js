const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getCategory = async (req, res) => {
  try {
    const category = await prisma.category.findMany()
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.getCategoryById = async (req, res) => {
  try {
    const category = await prisma.category.findFirst({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json(category)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.createCategory = async (req, res) => {
  const { typeId, name } = req.body
  try {
    const validate = await prisma.category.findFirst({
      where: { typeId: typeId }
    })
    if (!validate) {
      const category = await prisma.category.create({
        data: { typeId,name}
      })
      res.status(201).json(category)
    } else {
      res.status(401).json({ msg: 'รหัสประเภทสินค้านี้มีอยู่แล้ว โปรดลองอีกครั้ง' })
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.updateCategory = async (req, res) => {
  const { typeId,name } = req.body
  try {
    const validate = await prisma.category.findFirst({
      where: {
        NOT: { id: Number(req.params.id) },
        typeId:typeId
      }
    })
    if (!validate) {
      const category = await prisma.category.update({
        where: { id: Number(req.params.id) },
        data: { typeId,name }
      })
      res.status(200).json(category)
    } else {
      res.status(401).json({ msg: 'รหัสประเภทสินค้านี้มีอยู่แล้ว โปรดลองอีกครั้ง' })
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.deleteCategory = async (req, res) => {
  try {
    await prisma.category.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json('Delete Success')
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
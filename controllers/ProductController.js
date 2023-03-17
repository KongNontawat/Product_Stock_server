const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient()

exports.getProducts = async (req, res) => {
  try {
    const product = await prisma.product.findMany({
      include:{category:true}
    })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json(product)
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.createProduct = async (req, res) => {
  const { catId, sku, name, price, stock } = req.body
  try {
    const validate = await prisma.product.findFirst({
      where: { sku: sku }
    })
    if (!validate) {
      const product = await prisma.product.create({
        data: { catId, sku, name, price, stock }
      })
      res.status(201).json(product)
    } else {
      res.status(401).json({ msg: 'รหัสสินค้านี้มีอยู่แล้ว โปรดลองอีกครั้ง' })
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.updateProduct = async (req, res) => {
  const { catId, sku, name, price, stock } = req.body
  try {
    const validate = await prisma.product.findFirst({
      where: {
        NOT: { id: Number(req.params.id) },
        sku: sku
      }
    })
    if (!validate) {
      const product = await prisma.product.update({
        where: { id: Number(req.params.id) },
        data: { catId, sku, name, price, stock }
      })
      res.status(200).json(product)
    } else {
      res.status(401).json({ msg: 'รหัสสินค้านี้มีอยู่แล้ว โปรดลองอีกครั้ง' })
    }
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}

exports.deleteProduct = async (req, res) => {
  try {
    await prisma.product.delete({
      where: {
        id: Number(req.params.id)
      }
    })
    res.status(200).json('Delete Success')
  } catch (error) {
    res.status(500).json({ msg: error.message })
  }
}
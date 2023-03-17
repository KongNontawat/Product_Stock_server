const express = require('express')
const dotenv = require('dotenv')
const cors = require('cors')
const ProductRouter = require('./routes/ProductRouter')
const CategoryRouter =  require('./routes/CategoryRouter')
const app = express()
dotenv.config()
app.use(cors())
app.use(express.json())

app.use(ProductRouter)
app.use(CategoryRouter)

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`)
})
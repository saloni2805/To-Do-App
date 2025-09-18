const express = require("express")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const cors = require("cors")
app.use(cors())

require("dotenv").config()

const PORT = process.env.PORT || 5000

const todosRouter = require("./routes/todos")
app.use("/api/todos", todosRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

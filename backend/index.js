const express = require("express")
const cors = require("cors")
require("dotenv").config()

const PORT = process.env.PORT || 5000

const todosRouter = require("./routes/todos")

const app = express()
app.use(cors())
app.use(express.json())

app.use("/api/todos", todosRouter)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

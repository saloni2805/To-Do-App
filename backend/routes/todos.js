const express = require("express")
const router = express.Router()
const todosController = require("../controllers/todosController")

router.get("/", todosController.getTodos)
router.post("/", todosController.addTodo)
router.put("/:id", todosController.updateTodo)
router.delete("/:id", todosController.deleteTodo)

module.exports = router

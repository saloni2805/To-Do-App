const pool = require("../config/db")

async function getTodos(req, res) {
  try {
    const [rows] = await pool.query("SELECT * FROM todos")
    res.json(rows)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

async function addTodo(req, res) {
  try {
    const { title, description } = req.body
    if (!title) return res.status(400).json({ error: "Title is required" })
    const [result] = await pool.query(
      "INSERT INTO todos (title, description) VALUES (?, ?)",
      [title, description || null]
    )
    const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [
      result.insertId,
    ])
    res.status(201).json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

async function updateTodo(req, res) {
  try {
    const { id } = req.params
    const { title, description, status } = req.body
    const [result] = await pool.query(
      "UPDATE todos SET title = ?, description = ?, status = ? WHERE id = ?",
      [title, description, status, id]
    )
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Todo not found" })
    const [rows] = await pool.query("SELECT * FROM todos WHERE id = ?", [id])
    res.json(rows[0])
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

async function deleteTodo(req, res) {
  try {
    const { id } = req.params
    const [result] = await pool.query("DELETE FROM todos WHERE id = ?", [id])
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Todo not found" })
    res.json({ message: "Deleted" })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Database error" })
  }
}

module.exports = { getTodos, addTodo, updateTodo, deleteTodo }

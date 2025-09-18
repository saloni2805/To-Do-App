import { useEffect, useState } from "react"
import { getTodos, addTodo, updateTodo, deleteTodo } from "./api"
import TodoForm from "./components/ToDoForm"
import TodoList from "./components/ToDoList"

export default function App() {
  const [todos, setTodos] = useState([])
  const [loading, setLoading] = useState(true)
  // const [editing, setEditing] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const res = await getTodos()
      setTodos(res.data)
    } catch (e) {
      console.error(e)
      alert("Failed to fetch todos")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleAdd = async (payload) => {
    try {
      const res = await addTodo(payload)
      setTodos((prev) => [res.data, ...prev])
    } catch (e) {
      console.error(e)
      alert("Add failed")
    }
  }

  const handleUpdate = async (id, payload) => {
    try {
      console.log(payload)
      const res = await updateTodo(id, payload)
      console.log(res.data)
      setTodos((prev) => prev.map((t) => (t.id === id ? res.data : t)))
      // setEditing(null)
    } catch (e) {
      console.error(e)
      alert("Update failed")
    }
  }

  const handleDelete = async (id) => {
    if (!confirm("Delete this task?")) return
    try {
      await deleteTodo(id)
      setTodos((prev) => prev.filter((t) => t.id !== id))
    } catch (e) {
      console.error(e)
      alert("Delete failed")
    }
  }

  const toggleComplete = async (todo) => {
    try {
      const updated = {
        ...todo,
        status: todo.status === "Pending" ? "Completed" : "Pending",
      }
      const res = await updateTodo(todo.id, updated)
      setTodos((prev) => prev.map((t) => (t.id === todo.id ? res.data : t)))
    } catch (e) {
      console.error(e)
      alert("Toggle failed")
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-md rounded-2xl p-6">
        <h1 className="text-2xl font-bold mb-4 text-center">To-Do App</h1>
        <TodoForm
          onAdd={handleAdd}
          // onUpdate={handleUpdate}
          // editing={editing}
          // onCancel={() => setEditing(null)}
        />
        {loading ? (
          <p className="mt-4 text-center">loading...</p>
        ) : (
          <TodoList
            todos={todos}
            handleUpdate={handleUpdate}
            onDelete={handleDelete}
            onToggle={toggleComplete}
          />
        )}
      </div>
    </div>
  )
}

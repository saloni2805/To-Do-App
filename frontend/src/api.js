import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:5000/api",
})

export const getTodos = () => API.get("/todos")
export const addTodo = (data) => API.post("/todos", data)
export const updateTodo = (id, data) => API.put(`/todos/${id}`, data)
export const deleteTodo = (id) => API.delete(`/todos/${id}`)

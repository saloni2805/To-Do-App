import React from "react"
import TodoItem from "./TodoItem"
export default function TodoList({ todos, handleUpdate, onDelete, onToggle }) {
  return (
    <ul className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onEdit={handleUpdate}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </ul>
  )
}

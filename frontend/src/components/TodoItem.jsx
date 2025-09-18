import { useState } from "react"

export default function TodoItem({ todo, onEdit, onDelete, onToggle }) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedTitle, setEditedTitle] = useState(todo.title)
  const [editedDesc, setEditedDesc] = useState(todo.description || "")

  const handleSave = () => {
    if (editedTitle.trim() === "") return
    onEdit(todo.id, {
      title: editedTitle,
      description: editedDesc,
      status: todo.status,
    })
    setIsEditing(false)
  }

  return (
    <div className="flex flex-col gap-2 bg-white shadow-md rounded-xl p-4 border border-gray-200">
      {/* Editing form */}
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
          />
          <textarea
            value={editedDesc}
            onChange={(e) => setEditedDesc(e.target.value)}
            className="w-full border rounded-lg px-3 py-2 focus:ring focus:ring-blue-300 outline-none"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-3 py-1 rounded-lg bg-green-500 text-white hover:bg-green-600"
            >
              Save
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-3 py-1 rounded-lg bg-gray-400 text-white hover:bg-gray-500"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center">
            {/* Title */}
            <h3
              className={`text-lg font-semibold ${
                todo.status === "Completed" ? "line-through text-gray-400" : ""
              }`}
            >
              {todo.title}
            </h3>
            {/* Edit-Delete */}
            <div className="flex gap-2">
              <button
                onClick={() => setIsEditing(true)}
                className="px-2 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(todo.id)}
                className="px-2 py-1 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
          {/* Description */}
          {todo.description && (
            <p
              className={`text-gray-600 ${
                todo.status === "Completed" ? "line-through" : ""
              }`}
            >
              {todo.description}
            </p>
          )}
          {/* Toggle button for completed and pending */}
          <button
            onClick={() => onToggle(todo)}
            className={`mt-2 px-3 py-1 rounded-lg text-white ${
              todo.status === "Completed"
                ? "bg-gray-500 hover:bg-gray-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {todo.status === "Completed"
              ? "Mark as Pending"
              : "Mark as Completed"}
          </button>
        </>
      )}
    </div>
  )
}

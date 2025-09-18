import React, { useState } from "react"

export default function TodoForm({ onAdd }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  // useEffect(() => {
  //   if (editing) {
  //     setTitle(editing.title || "")
  //     setDescription(editing.description || "")
  //   } else {
  //     setTitle("")
  //     setDescription("")
  //   }
  // }, [editing])

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) return alert("Title required")
    const payload = { title: title.trim(), description: description.trim() }
    setTitle("")
    setDescription("")
    // if (editing) onUpdate(editing.id, payload)
    onAdd(payload)
  }

  return (
    <form onSubmit={submit} className="mb-6">
      <div className="flex gap-2">
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Task title"
          className="flex-1 px-4 py-2 border rounded-lg"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
          Add
        </button>
        {/* {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-3 py-2 border rounded-lg"
          >
            Cancel
          </button>
        )} */}
      </div>
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description (optional)"
        className="w-full mt-2 p-3 border rounded-lg"
      />
    </form>
  )
}

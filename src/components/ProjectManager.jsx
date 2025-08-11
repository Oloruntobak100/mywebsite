import { useState } from 'react'

function ProjectManager() {
  const [projects, setProjects] = useState(() => {
    // Try to load from localStorage for persistence
    const saved = localStorage.getItem('portfolioProjects')
    return saved ? JSON.parse(saved) : []
  })
  const [form, setForm] = useState({ title: '', description: '', youtube: '' })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.title || !form.description || !form.youtube) return
    const updated = [...projects, { ...form }]
    setProjects(updated)
    localStorage.setItem('portfolioProjects', JSON.stringify(updated))
    setForm({ title: '', description: '', youtube: '' })
  }

  const handleDelete = (idx) => {
    const updated = projects.filter((_, i) => i !== idx)
    setProjects(updated)
    localStorage.setItem('portfolioProjects', JSON.stringify(updated))
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Manage Portfolio Projects</h1>
      <form onSubmit={handleSubmit} className="mb-8 space-y-4 max-w-xl">
        <input
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          name="title"
          placeholder="Project Title"
          value={form.title}
          onChange={handleChange}
        />
        <textarea
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          name="description"
          placeholder="Project Description"
          value={form.description}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 rounded bg-gray-800 border border-gray-700"
          name="youtube"
          placeholder="YouTube Link"
          value={form.youtube}
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add Project
        </button>
      </form>
      <div className="space-y-6">
        {projects.length === 0 && <p>No projects added yet.</p>}
        {projects.map((proj, idx) => (
          <div key={idx} className="bg-gray-800 p-4 rounded shadow flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-xl font-semibold">{proj.title}</h2>
              <p className="mb-2">{proj.description}</p>
              <a href={proj.youtube} target="_blank" rel="noopener noreferrer" className="text-blue-400 underline">YouTube Link</a>
            </div>
            <button
              onClick={() => handleDelete(idx)}
              className="mt-2 md:mt-0 bg-red-600 px-3 py-1 rounded hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProjectManager
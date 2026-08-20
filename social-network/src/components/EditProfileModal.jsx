import React, { useEffect, useState } from 'react'
import Icon from './Icon'

export default function EditProfileModal({ open, profile, onClose, onSave }) {
  const [form, setForm] = useState(profile)
  useEffect(() => setForm(profile), [profile, open])
  if (!open) return null

  const change = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    onSave({
      ...form,
      followers: Number(form.followers) || 0,
      following: Number(form.following) || 0,
    })
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <form className="edit-modal" onSubmit={submit} onMouseDown={(e) => e.stopPropagation()}>
        <div className="modal-head"><h2>Edit profile</h2><button type="button" onClick={onClose}><Icon name="close" /></button></div>
        <label>Name<input name="name" value={form.name} onChange={change} /></label>
        <label>Username<input name="username" value={form.username} onChange={change} /></label>
        <label>Bio<textarea name="bio" rows="4" value={form.bio} onChange={change} /></label>
        <label>Location<input name="location" value={form.location} onChange={change} /></label>
        <div className="two-fields">
          <label>Followers<input name="followers" type="number" value={form.followers} onChange={change} /></label>
          <label>Following<input name="following" type="number" value={form.following} onChange={change} /></label>
        </div>
        <p className="modal-note">This frontend-only version saves profile edits in your browser using localStorage.</p>
        <button className="save-btn" type="submit">Save changes</button>
      </form>
    </div>
  )
}

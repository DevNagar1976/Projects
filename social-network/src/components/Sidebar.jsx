import React from 'react'
import Icon from './Icon'

const nav = [
  ['home', 'home', 'Home'],
  ['search', 'search', 'Search'],
  ['explore', 'explore', 'Explore'],
  ['messages', 'message', 'Messages'],
  ['notifications', 'heart', 'Notifications'],
  ['create', 'plus', 'Create'],
  ['profile', 'user', 'Profile'],
]

export default function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <button className="brand" onClick={() => onChange('home')} aria-label="Home">Instagram</button>
      <nav className="side-nav">
        {nav.map(([key, icon, label]) => (
          <button key={key} className={`nav-item ${active === key ? 'active' : ''}`} onClick={() => onChange(key)}>
            <Icon name={icon} size={25} />
            <span>{label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="nav-item"><Icon name="bell" size={24} /><span>Threads</span></button>
        <button className="nav-item"><Icon name="menu" size={25} /><span>More</span></button>
      </div>
    </aside>
  )
}

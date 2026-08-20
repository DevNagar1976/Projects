import React from 'react'
import Avatar from './Avatar'
import Icon from './Icon'

export default function ProfilePage({ profile, grid, onEdit }) {
  return (
    <main className="profile-page">
      <section className="profile-header">
        <div className="profile-avatar-wrap"><Avatar initials="HP" image={profile.image || '/profile.jpg'} alt={profile.username} size="xl" story /></div>
        <div className="profile-info">
          <div className="profile-title-row">
            <h1>{profile.username}</h1>
            <button className="soft-btn" onClick={onEdit}>Edit profile</button>
            <a className="soft-btn" href={profile.website} target="_blank" rel="noreferrer">View Instagram</a>
            <Icon name="settings" size={24} />
          </div>
          <div className="profile-stats">
            <span><strong>{profile.posts}</strong> posts</span>
            <span><strong>{profile.followers}</strong> followers</span>
            <span><strong>{profile.following}</strong> following</span>
          </div>
          <div className="profile-bio">
            <strong>{profile.name}</strong>
            <span className="category">Digital creator</span>
            {profile.bio.split('\n').map((line) => <p key={line}>{line}</p>)}
            <span>📍 {profile.location}</span>
            <a href={profile.website} target="_blank" rel="noreferrer">instagram.com/hp___.18</a>
          </div>
        </div>
      </section>

      <section className="highlights">
        {['Projects', 'React', 'MERN', 'Coding'].map((item, i) => (
          <div className="highlight" key={item}>
            <div className="highlight-circle">{['💻','⚛️','🚀','⌨️'][i]}</div>
            <strong>{item}</strong>
          </div>
        ))}
      </section>

      <div className="profile-tabs">
        <button className="active"><Icon name="grid" size={13}/> POSTS</button>
        <button><Icon name="bookmark" size={13}/> SAVED</button>
        <button><Icon name="user" size={13}/> TAGGED</button>
      </div>

      <section className="grid-posts">
        {grid.map((item) => (
          <article className="grid-card" key={item.id}>
            <div className="grid-emoji">{item.emoji}</div>
            <strong>{item.title}</strong>
            <span>{item.subtitle}</span>
          </article>
        ))}
      </section>
    </main>
  )
}

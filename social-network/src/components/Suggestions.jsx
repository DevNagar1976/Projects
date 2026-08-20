import React from 'react'
import Avatar from './Avatar'

export default function Suggestions({ profile, people, following, onToggleFollow }) {
  return (
    <aside className="suggestions">
      <div className="current-user">
        <Avatar initials="HP" image={profile.image || '/profile.jpg'} alt={profile.username} size="lg" />
        <div className="person-copy">
          <strong>{profile.username}</strong>
          <span>{profile.name}</span>
        </div>
        <a href={profile.website} target="_blank" rel="noreferrer">Profile</a>
      </div>

      <div className="suggest-title"><span>Suggested for you</span><button>See All</button></div>
      <div className="suggest-list">
        {people.map((person) => {
          const isFollowing = following.includes(person.id)
          return (
            <div className="suggest-row" key={person.id}>
              <Avatar initials={person.initials} image={person.image} alt={person.username} size="sm" />
              <div className="person-copy">
                <strong>{person.username}</strong>
                <span>{person.reason}</span>
              </div>
              <button className={isFollowing ? 'following' : ''} onClick={() => onToggleFollow(person.id)}>
                {isFollowing ? 'Following' : 'Follow'}
              </button>
            </div>
          )
        })}
      </div>
      <p className="why-suggested">Suggestions are demo profiles matched to your MERN, React, Node.js and web-development interests.</p>
      <div className="footer-links">About · Help · Press · API · Jobs · Privacy · Terms · Locations · Language</div>
      <div className="footer-copy">© 2026 SOCIAL UI • FRONTEND DEMO</div>
    </aside>
  )
}

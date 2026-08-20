import React, { useEffect, useMemo, useState } from 'react'
import Icon from './components/Icon'
import Sidebar from './components/Sidebar'
import Stories from './components/Stories'
import PostCard from './components/PostCard'
import Suggestions from './components/Suggestions'
import ProfilePage from './components/ProfilePage'
import EditProfileModal from './components/EditProfileModal'
import Avatar from './components/Avatar'
import { initialPosts, initialProfile, profileGrid, stories, suggestedPeople } from './data/mockData'

const PROFILE_KEY = 'hp_instagram_frontend_profile'
const FOLLOW_KEY = 'hp_instagram_frontend_following'

export default function App() {
  const [active, setActive] = useState('home')
  const [profile, setProfile] = useState(() => {
    const saved = localStorage.getItem(PROFILE_KEY)
    return saved ? { ...initialProfile, ...JSON.parse(saved), image: '/profile.jpg' } : initialProfile
  })
  const [posts, setPosts] = useState(initialPosts)
  const [following, setFollowing] = useState(() => JSON.parse(localStorage.getItem(FOLLOW_KEY) || '[]'))
  const [editOpen, setEditOpen] = useState(false)
  const [query, setQuery] = useState('')

  useEffect(() => localStorage.setItem(PROFILE_KEY, JSON.stringify(profile)), [profile])
  useEffect(() => localStorage.setItem(FOLLOW_KEY, JSON.stringify(following)), [following])

  const filteredSuggestions = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return suggestedPeople
    return suggestedPeople.filter((p) => `${p.username} ${p.name} ${p.reason}`.toLowerCase().includes(q))
  }, [query])

  const toggleLike = (id) => setPosts((prev) => prev.map((post) => post.id === id
    ? { ...post, liked: !post.liked, likes: post.likes + (post.liked ? -1 : 1) }
    : post
  ))

  const toggleFollow = (id) => setFollowing((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])

  const saveProfile = (next) => {
    setProfile(next)
    setEditOpen(false)
  }

  return (
    <div className="app-shell">
      <Sidebar active={active} onChange={(key) => {
        if (key === 'create') return
        setActive(key === 'profile' ? 'profile' : key)
      }} />

      <div className="mobile-topbar">
        <button className="mobile-brand" onClick={() => setActive('home')}>Instagram</button>
        <div className="mobile-actions"><span>♡</span><span>✉</span></div>
      </div>

      {active === 'profile' ? (
        <ProfilePage profile={profile} grid={profileGrid} onEdit={() => setEditOpen(true)} />
      ) : active === 'search' ? (
        <main className="search-page">
          <h1>Search</h1>
          <div className="search-box"><Icon name="search" size={18}/><input autoFocus value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search developers" />{query && <button onClick={() => setQuery('')}><Icon name="close" size={17}/></button>}</div>
          <h3>Suggested developers</h3>
          {filteredSuggestions.map((person) => (
            <div className="search-person" key={person.id}>
              <Avatar initials={person.initials} image={person.image} alt={person.username} size="md" />
              <div className="person-copy"><strong>{person.username}</strong><span>{person.name}</span><span>{person.reason}</span></div>
              <button className={following.includes(person.id) ? 'following' : ''} onClick={() => toggleFollow(person.id)}>{following.includes(person.id) ? 'Following' : 'Follow'}</button>
            </div>
          ))}
        </main>
      ) : (
        <main className="home-layout">
          <section className="feed-column">
            <Stories stories={stories} />
            {posts.map((post) => <PostCard key={post.id} post={post} onLike={toggleLike} />)}
          </section>
          <Suggestions profile={profile} people={suggestedPeople} following={following} onToggleFollow={toggleFollow} />
        </main>
      )}

      <nav className="mobile-nav">
        <button onClick={() => setActive('home')}>⌂</button>
        <button onClick={() => setActive('search')}>⌕</button>
        <button>＋</button>
        <button>♡</button>
        <button className="mini-me" onClick={() => setActive('profile')}><img src="/profile.jpg" alt="hp___.18" /></button>
      </nav>

      <EditProfileModal open={editOpen} profile={profile} onClose={() => setEditOpen(false)} onSave={saveProfile} />
    </div>
  )
}

import React from 'react'
import Avatar from './Avatar'

export default function Stories({ stories }) {
  return (
    <div className="stories-scroll">
      {stories.map((story) => (
        <button className="story" key={story.id}>
          <Avatar initials={story.initials} image={story.image} alt={story.username} size="story" story />
          <span>{story.label}</span>
        </button>
      ))}
    </div>
  )
}

import React from 'react'

export default function Avatar({ initials, image, alt = 'Profile', size = 'md', story = false }) {
  return (
    <div className={story ? 'avatar-ring' : ''}>
      <div className={`avatar avatar-${size}`}>
        {image ? <img src={image} alt={alt} /> : initials}
      </div>
    </div>
  )
}

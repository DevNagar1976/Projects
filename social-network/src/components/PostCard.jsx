import React from 'react'
import Avatar from './Avatar'
import Icon from './Icon'

export default function PostCard({ post, onLike }) {
  return (
    <article className="post-card">
      <div className="post-head">
        <div className="person-row">
          <Avatar initials={post.initials} image={post.image} alt={post.username} size="sm" story />
          <div>
            <strong>{post.username}</strong>
            <span className="post-time"> • {post.time}</span>
          </div>
        </div>
        <Icon name="more" size={21} />
      </div>

      <div className="post-visual">
        <span className="visual-kicker">@{post.username}</span>
        <div className="visual-icon">⌘</div>
        <h3>{post.title}</h3>
        <p>{post.subtitle}</p>
      </div>

      <div className="post-actions">
        <div className="post-actions-left">
          <button onClick={() => onLike(post.id)} aria-label="Like">
            <Icon name="heart" size={26} filled={post.liked} className={post.liked ? 'liked' : ''} />
          </button>
          <button aria-label="Comment"><Icon name="message" size={25} /></button>
          <button aria-label="Share"><Icon name="send" size={24} /></button>
        </div>
        <button aria-label="Save"><Icon name="bookmark" size={24} /></button>
      </div>
      <div className="post-meta">
        <strong>{post.likes.toLocaleString()} likes</strong>
        <p><strong>{post.username}</strong> {post.caption}</p>
        <button className="muted-link">View all 12 comments</button>
        <div className="comment-line"><input placeholder="Add a comment…" /><span>☺</span></div>
      </div>
    </article>
  )
}

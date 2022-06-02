import React from 'react'
import Post from './Post'
function MyPosts({posts}) {
  return (
    <div className='my-post-card-container'>
        {posts.map(post=> <Post key={post.id} post={post} />)}
    </div>
  )
}

export default MyPosts
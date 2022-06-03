import React from 'react'
import { useNavigate} from 'react-router-dom'
function Post({post}) {
    const navigate=useNavigate()
  return (
    <div className='post-card' onClick={()=> navigate(`/posts/${post.id}`)}>
        <div className='post-card-price'>${post.price}</div>  
        <div className='post-card-img-container'>
        {post.image_url.length>0?
            <img src={post.image_url[0]}/> 
            : 
            <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png' /> }
        </div>
        {/* <img src={post.image_url[0]}/> */}
        <div className='post-card-info'>
            <div className='post-card-info-1'>
            <p>{post.title}  <span>${post.price}  </span>  ({post.location})</p>
            </div>
            <div className='post-card-created-at'>{post.created_at}</div>
        </div>
       
    </div>
  )
}

export default Post
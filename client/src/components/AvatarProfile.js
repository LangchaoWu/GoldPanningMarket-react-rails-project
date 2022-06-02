import React from 'react'

function AvatarProfile({src,alt}) {
    return (
      <div >
          {src? <img className='avatar-profile' src={src} alt={alt}/>
          :
          <img className='avatar-profile' src='https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png' alt='no-avatar' />
          }
  
      </div>
    )
  }

export default AvatarProfile
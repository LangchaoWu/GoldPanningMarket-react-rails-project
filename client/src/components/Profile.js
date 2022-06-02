import React, { useState } from 'react'
import { Modal,Form } from 'react-bootstrap';
import Avatar from './Avatar';
import AvatarProfile from './AvatarProfile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faMars,faVenus } from '@fortawesome/free-solid-svg-icons'


function Profile({show,onHide,currentUser, currentAvatar, setCurrentAvatar,setCurrentUser}) {
  const [avatar,setAvatar]=useState("")
  const [edit,setEdit]=useState(false)
  const formData = new FormData();
  const [name,setName]=useState(currentUser.name)
  const [gender,setGender]=useState(currentUser.gender)
  formData.append("avatar",avatar)
  function handleSubmit(e){
    e.preventDefault();
    fetch(`/users/${currentUser.id}`,{
      method:"PATCH",
      //  headers:{
      // "Content-type":"application/json"
  // },
  body:formData
   })
  .then(res=>res.json())
  .then(data => {
    console.log(data)
    setCurrentAvatar(data.avatar)
    })
  }

  function hanldEditSubmit(e){
    e.preventDefault();
    const newUser={
      name:name,
      gender:gender
    }

    fetch(`/users/${currentUser.id}`,{
      method:"PATCH",
       headers:{
      "Content-type":"application/json"
  },
    body:JSON.stringify(newUser)
   })
  .then(res=>res.json())
  .then(data => {
    console.log(data)
    setCurrentUser(data)
    setEdit(false)
    })
    
  }
  return (
    <Modal
    show={show} onHide={onHide}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header closeButton className='profile-bg'>
      <Modal.Title id="contained-modal-title-vcenter">
        Your Profile
      </Modal.Title>
    </Modal.Header>
    <Modal.Body className='profile-bg'>
        <div className='profile-container'>
          <div className='avatar-profile-container'>
              <div className='avatar-container-box'>
                <AvatarProfile src={currentAvatar} alt={currentUser.name} ></AvatarProfile>
              </div>
            
              <form onSubmit={handleSubmit}>
              <input className='img-input' type='file' accept="image/*" onChange={(e)=>setAvatar(e.target.files[0])} ></input>
              <input type="submit"  value="Update Avatar"></input>
              </form>
          </div>

          <div className='profile-info-container'>
          
            {edit?
              <div className='edit-container'>
                <form onSubmit={hanldEditSubmit}>
                  <div>
                  <label>Name:  </label>
                  </div>
                <div>
                  <input className='name-input' type="text" placeholder={currentUser.name} onChange={(e)=>setName(e.target.value)}></input>
                </div>
               
                <div><label>Gender:  </label> </div>
                <select className="gender-selection" name="gender" value={gender} onChange={(e)=>setGender(e.target.value)}>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </select>
                <div > 
                  <input type="submit" value="update" ></input> 
                  <button onClick={()=>setEdit(false)}>cancel</button>
                </div>
                </form>
             </div>
            : 
              <div>
                
                <h1>Name: {currentUser.name}</h1> 
                <h4>Gender: {currentUser.gender==="Male"?
                <FontAwesomeIcon className='gender-icon-male' icon={faMars}/>
                :
                <FontAwesomeIcon className='gender-icon-female' icon={faVenus} />
                }
                </h4>
              </div> 
            }
              
             
             
            
               
            {edit? null: <button className="profile-edit" onClick={()=>setEdit(true)}>edit</button>}


          </div>


        </div>
    </Modal.Body>
    <Modal.Footer className='profile-bg'>
      <button onClick={onHide}>Close</button>
    </Modal.Footer>
  </Modal>
  )
}

export default Profile

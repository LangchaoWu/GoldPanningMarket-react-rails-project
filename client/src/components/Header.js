import React, { useState } from 'react';
import Avatar from './Avatar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faXmarkCircle } from '@fortawesome/free-solid-svg-icons'
import { useNavigate} from 'react-router-dom'

function Header({isLogin, setIsLogin,currentUser,setCurrentUser,currentAvatar,setCurrentAvatar,setModalShow,setModalSignUpShow,sideBar,setSideBar,setShowPost,setPosts}) {
    const navigate=useNavigate()
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [test,setTest]=useState("")
    const [error, setError] = useState([])
    function onSubmit(e){
        e.preventDefault()
        const user = {
            username: username.toLowerCase(),
            password:password
        }
       
        fetch(`/login`,{
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify(user)
        })
        .then(res => {
          if(res.ok){
            res.json()
            .then(user=>{
              console.log(user)
              setCurrentUser(user)
              setCurrentAvatar(user.avatar)
              setPosts(user.posts)
               setIsLogin(true)
                setSideBar(false)
            })
            
          } else {
            res.json()
            .then(json => setError(json.error))
          }
        })
    }
    function handleLoginOut(){
        fetch('/logout',{
            method:'DELETE'
        })
        .then(()=>{
            setIsLogin(false)
            setCurrentUser({})
            setPosts([])
            setCurrentAvatar("")
             
        })
      

    }

  return (
    <div className='nav-container'>
        <div className='logo-container' onClick={()=> navigate("/")}>
            <img src={require("./goldenshovel.png")}></img>
            
        </div>

        <div className='title-container'>
            <h2 onClick={()=> navigate("/")}>GoldPanning Market</h2>
            {/* <h2>A wepsite you can login, even logout</h2> */}
        </div>
        <div className='login-container'>
            <div className='login-info'>
                {isLogin?
                <div className='user-expand'>
                    <div className='avatar-container'>
                            <Avatar src={currentAvatar} alt={currentUser.name}/>
                    </div>
                    <div className='user-info-container'> 
                        <div className='user-text'>Hi, {currentUser.name}</div>
                        <div className='user-text' onClick={()=>setModalShow(true)}>Your Profile</div>
                        <div className='user-text'onClick={()=>navigate("/mypost")}>My Posts</div>
                        <div className='user-text' onClick={()=>setShowPost(true)}>New Post</div>
                        <div className='user-text' onClick={handleLoginOut}>Logout</div>
                    </div>
                   
                
                </div>
                
                :
                 <h3 className='Login-text' onClick={()=>{ setSideBar(!sideBar)}}>Login</h3>}
            </div>
            <div className={sideBar? "login-box active" :"login-box"}>
                
                <form onSubmit={onSubmit}>
                    <div className="user-box">
                    <input type="text" name="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                    <label>Username</label>
                    </div>
                    <div className="user-box">
                    <input type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    <label>Password</label>
                    </div>
                    {/* <div className='error-message'>Invalid username or password</div> */}
                    {error?<div className='error-message'>{error}</div>:null}
                    <button type="submit">LOGIN </button>
                    {/* <p className='Sign-up-link'>Don't have an account?<Link to="/create" className='go-to-sign-up'>Sign up</Link></p> */}
                    <p className='Sign-up-link'>Don't have an account? <span onClick={()=>{setModalSignUpShow(true) ;setSideBar(false)}}>Sign up</span></p> 
                </form>
                <FontAwesomeIcon className='close-icon' icon={faXmarkCircle} onClick={()=>setSideBar(false)} />
            </div>
        </div>


    </div>
  )
}

export default Header
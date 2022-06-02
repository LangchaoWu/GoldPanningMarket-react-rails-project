import React,{useState} from 'react'
import { Modal,Form,Button} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
function SignUp({show,setModalSignUpShow,setCurrentUser,setIsLogin,setModalShow}) {
    const [errors, setErrors] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [name,setName]=useState("")
    const [gender,setGender]=useState("Male")
    const navigate=useNavigate()
    function onSubmit(e){
        e.preventDefault()
      
      
        const newUser = {
            username: username.toLowerCase(),
            password:password,
            name: name,
            gender: gender
            // avatar: avatarImg
        }
        console.log(newUser)
      
        fetch(`/users`,{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(newUser)
            // body:data
          })
          .then(res => res.json())
          .then(data => {
            console.log(data)
            if(data.error){
              setErrors(data.error)
            } else {
              console.log(data)
      
              setCurrentUser(data)
              setIsLogin(true)
              setModalSignUpShow(false)
              setModalShow(false)
              navigate("/")
            }
          })
    }   

  return (
    <Modal
    show={show} onHide={()=>setModalSignUpShow(false)}
    
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    
  >
   
    <Modal.Body>
        <Form onSubmit={onSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Username</Form.Label>
                <Form.Control type="username" placeholder="Enter username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label>name</Form.Label>
                <Form.Control type="name" placeholder="name" value={name} onChange={(e) => setName(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Gender</Form.Label>
                <Form.Select value={gender} onChange={(e)=> setGender(e.target.value)} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                </Form.Select>
            </Form.Group>


           
            {errors?errors.map((e,index) => <div key={index} className='error-message-sign-up'>{e}</div>):null}
            <Button variant="primary" type="submit">
                Sign Up
            </Button>
        </Form>
    </Modal.Body>
    <Modal.Footer>
      <button onClick={()=>setModalSignUpShow(false)}>Close</button>
    </Modal.Footer>
  </Modal>
  )
}

export default SignUp
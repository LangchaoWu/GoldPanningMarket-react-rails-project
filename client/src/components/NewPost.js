import React,{useState} from 'react'
import { Modal,Form,Button} from 'react-bootstrap';
import { useNavigate} from 'react-router-dom'
function NewPost({posts, setPosts,allPosts, setAllPosts, show,setShowPost,currentUser}) {
const [title,setTitle]=useState("")
const [category,setCategory]=useState("")
const [location,setLocation]=useState("")
const [condition,setCondition]=useState("Good")
const [price,setPrice]=useState("")
const [description,setDescription]=useState("")
const [images,setImages]=useState([]) 
const [errors, setErrors] = useState([])
const [post,setPost]=useState({})
const navigate=useNavigate()
// formData.append("images",images)

function handleSubmit(e){
    e.preventDefault();
    
   
    const ImagesArry=Array.from(images)
    console.log(ImagesArry)
  
   
    // const newFile={
    //     images:images
    // }
    const newPost={
        title,
        category,
        condition,
        location,
        price,
        description,
        user_id:currentUser.id
    }
    
    // console.log(formData)
   
    // console.log(images)
    fetch(`/posts`,{
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(newPost)
        // body:data
      })
      .then(res => res.json())
      .then(data => {
        console.log(data)
        // setPost(data)
        if(data.error){
            setErrors(data.error)
          } else {
              if(ImagesArry){
            ImagesArry.forEach(image=> {
                const formData = new FormData();
                formData.append("images",image)
                fetch(`/posts/${data.id}`,{
                    method:"PATCH",
                    //  headers:{
                    // "Content-type":"application/json"
                // },
                body:formData
                 })
                .then(res=>res.json())
                .then(data => {
                  console.log(data)
                  setPosts([...posts,data])
                  setAllPosts([...allPosts,data])
                  setShowPost(false)
                  setTitle("")
                  setCategory("")
                  setLocation("")
                  setPrice("")
                  setDescription("")
                  setImages([])
                  navigate("/mypost")
                  })
            })
            }
            setPosts([...posts,data])
            setAllPosts([...allPosts,data])
            setShowPost(false)
            setTitle("")
            setCategory("")
            setLocation("")
            setPrice("")
            setDescription("")
            setImages([])
            navigate("/mypost")
          }
      })
  

    //   fetch(`/posts/2`,{
    //     method:"PATCH",
    //     //  headers:{
    //     // "Content-type":"application/json"
    // // },
    // body:formData
    //  })
    // .then(res=>res.json())
    // .then(data => {
    //   console.log(data)
      
    //   })
    }
  return (
    <Modal
    show={show} onHide={()=>setShowPost(false)}
    // show={show} onHide={()=>setModalSignUpShow(false)}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
    
  >
   
    <Modal.Body className='new-post-form'>
        <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" >
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" value={title} onChange={(e)=> setTitle(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Category</Form.Label>
                <Form.Control type="text" placeholder="Category" value={category} onChange={(e)=>setCategory(e.target.value)}/>
            </Form.Group>
            
            <Form.Group className="mb-3" >
                <Form.Label>location</Form.Label>
                <Form.Control type="name" placeholder="location" value={location} onChange={(e)=>setLocation(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Condition</Form.Label>
                <Form.Select  value={condition} onChange={(e)=>setCondition(e.target.value)}>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Usable">Usable</option>
                <option value="Salvage">Salvage</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>price</Form.Label>
                <Form.Control type="price" placeholder="price" value={price} onChange={(e)=>setPrice(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>description</Form.Label>
                <Form.Control type="text" placeholder="description" value={description}onChange={(e)=>setDescription(e.target.value)}/>
            </Form.Group>

            <Form.Group className="mb-3" >
                <Form.Label>Images</Form.Label>
                <Form.Control type="file" multiple   accept="image/*" onChange={(e)=>{
                    // const newArray=[...e.target.files]
                   setImages(e.target.files)
                    // setImages(newArray)
                }
                    }/>
            </Form.Group>

            {errors?errors.map((e,index) => <div key={index} className='error-message'>{e}</div>):null}
            {/* {errors?errors.map((e,index) => <div key={index} className='error-message-sign-up'>{e}</div>):null} */}
            <Button variant="primary" type="submit">
                create post
            </Button>
        </Form>
    </Modal.Body>
    <Modal.Footer className='new-post-form'>
      <button onClick={()=>setShowPost(false)} >Close</button>
    </Modal.Footer>
  </Modal>
  
  )
}

export default NewPost
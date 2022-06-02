import React,{useEffect, useState} from 'react'
import { Modal,Form,Button} from 'react-bootstrap';

function Update({allPosts, setAllPosts,post,setPost,updateShow,setUpdateShow,setImages,posts,setPosts}) {
    const [title,setTitle]=useState(post.title)
    const [category,setCategory]=useState(post.category)
    const [location,setLocation]=useState(post.location)
    const [condition,setCondition]=useState(post.condition)
    const [price,setPrice]=useState(post.price)
    const [description,setDescription]=useState(post.description)
    const [errors, setErrors] = useState([])
    const [imagesInput,setImagesInput]=useState([]) 
    useEffect(()=>{
        setTitle(post.title)
        setCategory(post.category)
        setLocation(post.location)
        setCondition(post.condition)
        setPrice(post.price)
        setDescription(post.description)
    },[post])
    function handleSubmit(e){
        e.preventDefault();
        const ImagesArry=Array.from(imagesInput)
        const updatedPost={
            title,
            category,
            condition,
            location,
            price,
            description
        }
        fetch(`/posts/${post.id}`,{
            method:'PATCH',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(updatedPost)
            // body:data
          })
          .then(res => res.json())
          .then(data => {
            const newPost=allPosts.map(eachPost=> {if(eachPost.id === data.id){
                return data}
                else{ return eachPost}
            } )
            const newMypost=posts.map(eachPost=> {if(eachPost.id === data.id){
                return data}
                else{ return eachPost}
            } )
            setPosts(newMypost)
            setAllPosts(newPost)
            setPost(data)
            setUpdateShow(false)
            
          })

        if(ImagesArry.length > 0){
            ImagesArry.forEach(image=> {
                const formData = new FormData();
                formData.append("images",image)
                fetch(`/posts/${post.id}`,{
                    method:"PATCH",
                    //  headers:{
                    // "Content-type":"application/json"
                // },
                body:formData
                 })
                .then(res=>res.json())
                .then(data => {
                  console.log(data)
                  setPost(data)
                  setImages(data.image_url)
            
                  })
            })
        }
    }
  return (
    <Modal
    show={updateShow} onHide={()=>setUpdateShow(false)}
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
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Usable">Usable</option>
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
                    setImagesInput(e.target.files)
                    // setImages(newArray)
                }
                    }/>
                <Button className='add-more-imgs-btn'type="submit"> Add more Images</Button>
            </Form.Group>

            {errors?errors.map((e,index) => <div key={index} className='error-message'>{e}</div>):null}
            {/* {errors?errors.map((e,index) => <div key={index} className='error-message-sign-up'>{e}</div>):null} */}
            <Button variant="primary" type="submit">
                Update
            </Button>
        </Form>
    </Modal.Body>
    <Modal.Footer className='new-post-form'>
      <button onClick={()=>setUpdateShow(false)} >Close</button>
    </Modal.Footer>
  </Modal>
  )
}

export default Update
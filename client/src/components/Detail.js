import { faL } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import {useEffect, useState} from 'react'
import { useParams,useNavigate } from "react-router-dom";
import DeleteConfirm from './DeleteConfirm';
import Update from './Update';
function Detail({currentUser,allPosts,setAllPosts,  posts, setPosts}) {
    const params = useParams();
    const [post,setPost]=useState({})
    const [currentImg,setCurrentImg]=useState("")
    const [images,setImages]=useState([])
    const [showAsk,setShowAsk]=useState(false)
    const [question,setQuestion]=useState("")
    const [questions,setQuestions]=useState([])
    const [replyShow, setReplyShow]=useState(false)
    const [replyText,setReplyText]=useState('')
    const navigate=useNavigate()
    const [show, setShow] = useState(false);
    const [updateShow,setUpdateShow]=useState(false)

    const handleClose = () => setShow(false);
  


    useEffect(()=>{
        fetch(`/posts/${params.id}`)
        .then(res => res.json())
        .then(data => {
        //   console.log(data)
            setPost(data)
            setCurrentImg(data.image_url[0])
            setImages(data.image_url)
            setQuestions(data.questions)
        //   console.log(data)
        })

      },[])

    function handleSubmit(e){
        e.preventDefault()
        const newQuestion={
            question:question,
            post_id:post.id
        }
        fetch('/questions',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(newQuestion)
          })
          .then(res => res.json())
          .then(data=> {console.log(data)
          setQuestions([...questions,data])
          setShowAsk(false)
          setQuestion("")
        }
          )
    }

    function handleReplySubmit(id){
        
        const newAnswer={
            answer:replyText,
            question_id:id
        }
      
        fetch('/answers',{
            method:'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(newAnswer)
          })
          .then(res => res.json())
          .then(data=> {console.log(data)
         const newQuestions=questions.map( question=> {
            if( question.id === id) {
                question.answers=[...question.answers,data]
                console.log(question)
                return question
            }
            else{
                return question
            }
         })
         setQuestions(newQuestions)
          setReplyShow(false)
          setReplyText("")
        }
          )
    }


    function handleDelete(){
        fetch(`/posts/${post.id}`,{
            method:'DELETE'
        })
        .then(()=>{
            const newPost=allPosts.filter(eachPost=> eachPost.id !== post.id )
            const newMypost=posts.filter(eachPost=> eachPost.id !== post.id)
            setPosts(newMypost)
            setAllPosts(newPost)
            navigate("/mypost")
        })
    }


  return (
      
    <div className='post-card-detail-container'>
         <DeleteConfirm setShow={setShow} show={show} handleClose={handleClose} handleDelete={handleDelete}/>
         <Update allPosts={allPosts} setAllPosts={setAllPosts} posts={posts} setPosts={setPosts}  post={post} setPost={setPost} updateShow={updateShow} setUpdateShow={setUpdateShow} setImages={setImages}/>
        <div className='detail-container'>
        
            <div className='post-card-detail'>
                <div className='post-images'>
                    <div className='post-img-show'>
                        {currentImg? <img src={currentImg}></img>
                        :
                        <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/1024px-No_image_available.svg.png' />
                        }
                    </div>
                    <div className='post-images-section'>
                        {images.length>0?
                        images.map((img,index)=><div key={index} className='img-slide'onClick={()=> setCurrentImg(img)}><img src={img}/></div>)
                        :null   
                    }
                    </div>
                </div>
                <div className='post-information'>
                    <h1 >{post.title}</h1>
                    <p>Price: ${post.price}</p>
                    <p>Condition: {post.condition}</p>
                    <p>Category: {post.category}</p>
                    <p>Location: {post.location}</p>
                    <p>Description: </p>
                    <p className='description-area'>
                        {post.description? post.description: "no description"}
                    </p>
                    {currentUser.id===post.user_id?  <div className='edit-delete-btn'>
                        <button onClick={()=>setUpdateShow(true)}>Edit</button>
                        <button onClick={()=>setShow(true)}>Delete</button>    
                    </div>  
                    :
                    null}
                      
                </div>    
            
            </div>    
            <div className='question-container'>
                <h1>Questions</h1>
                {showAsk? <form onSubmit={handleSubmit}>
                <input type="text" value={question} onChange={(e)=>setQuestion(e.target.value)}></input>
                <button type='submit'>Ask</button>
                </form>
                :null
                }
                <ul>
                {questions? 
                questions.map(question=> <div key={question.id}>
                    <li className='questions'>Q: {question.question}   <span className='reply' onClick={()=>setReplyShow(!replyShow)}>Reply</span></li>
                    {replyShow? <form onSubmit={(e)=>
                        {e.preventDefault()
                        handleReplySubmit(question.id)}}>
                    <input type="text" value={replyText} onChange={(e)=>setReplyText(e.target.value)}></input>
                    <button type='submit'>Reply</button>
                     </form>
                    :null
                    }
                    <div className='replys'>
                    {question.answers? question.answers.map(answer=> <li key={answer.id}>Ans: {answer.answer}</li> ):null}
                    </div>
                    </div>)
                    :
                    null
                    }
                    
                </ul>
               
               
                <p className="ask-btn" onClick={()=> setShowAsk(!showAsk)}>Ask</p>
            </div>

        
        </div>


    </div>
 
  )
}

export default Detail
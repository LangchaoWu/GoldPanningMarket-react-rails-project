import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
function Show({allPosts,filterCategory,setFilterCategory}) {

    // let categoryArry=allPosts.map(post=> {return post.category})
    const categoryList = [...new Set(allPosts.map(post => post.category))];
    const navigate=useNavigate()

    const [ad,setAd]=useState(true)
    const [ad2,setAd2]=useState(true)
    function handleClick(category){
         const newPosts=allPosts.filter(post => post.category===category) 
         setFilterCategory(newPosts)
         navigate("/show")
    }
  return (
    <div className='show-page-container'>
        <div className='ad-container'>
            {ad? <div className='ad-container-1'>
                <a className='ad' href="https://phase4-project-gameshop.herokuapp.com/PlayStation" target="_blank" rel="noopener noreferrer"  >
                    <div >
                        <p >Looking for fun?</p>
                    </div> 
                    <img src={require("./gameshop.png")}></img>   
                    <div >
                        <p  >Your best Game Shop</p>
                    </div> 
                </a>
                <button  onClick={(e)=> {
                    e.stopPropagation()
                    setAd(false)}}>x</button>

            </div>: null}
        </div>
        <div className='category-container'>
            <div className='category-container-2'>
            {categoryList.map((category,index)=> <div  key={index}  className="category-item"><p onClick={()=>handleClick(category)}>{category}</p></div>)}
            </div>
        </div>
        <div className='ad-container'>
           {ad2? <div className='ad-container-2'>
                {/* <a className='ad' href="https://phase4-project-gameshop.herokuapp.com/PlayStation" target="_blank" rel="noopener noreferrer"  >
                    <div >
                        <p >Looking for fun?</p>
                    </div> 
                    <img src={require("./gameshop.png")}></img>   
                    <div >
                        <p  >Your best Game Shop</p>
                    </div> 
                </a> */}
                <div>
                    <h1>Want to grow your business? Start posting ads here</h1>
                </div>
                <button  onClick={(e)=> {
                    e.stopPropagation()
                    setAd2(false)}}>x</button>

            </div>:null}
        </div>

    </div>
  )
}

export default Show
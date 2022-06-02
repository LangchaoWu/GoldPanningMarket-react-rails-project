import React,{useState,useEffect} from 'react'
import { useNavigate} from 'react-router-dom'
function Show({allPosts,filterCategory,setFilterCategory}) {

    // let categoryArry=allPosts.map(post=> {return post.category})
    const categoryList = [...new Set(allPosts.map(post => post.category))];
    const navigate=useNavigate()
    function handleClick(category){
         const newPosts=allPosts.filter(post => post.category===category) 
         setFilterCategory(newPosts)
         navigate("/show")
    }
  return (
    <div className='show-page-container'>
        <div></div>
        <div className='category-container'>
            <div className='category-container-2'>
            {categoryList.map((category,index)=> <div  key={index}  className="category-item"><p onClick={()=>handleClick(category)}>{category}</p></div>)}
            </div>
        </div>
        <div></div>

    </div>
  )
}

export default Show
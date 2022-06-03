import React,{useState,useEffect} from 'react'
import Post from './Post'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import{ faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'


function Home({posts}) {
  const [searchText,setSearchText]=useState("")
  const [filter,setFilter]=useState("All")
  const [filteredList,setFilterList]=useState(posts)

  useEffect(()=>{
      setFilterList(posts)
  },[])
  function handlerSearch(e){
    setSearchText(e.target.value)
  }
//   let displayPosts=filteredList.filter(post=> {return post.title.toLowerCase().includes(searchText.toLowerCase()) || post.category.toLowerCase().includes(searchText.toLowerCase()) })

  function handleChange(e){
      setFilter(e.target.value)
    if(e.target.value==="All"){
        let filteredPost=posts
        setFilterList(filteredPost)
    }else if(e.target.value ==='New'){
        let filteredPost=posts.filter(post=> post.condition ==="New")
        setFilterList(filteredPost)
    }
    else if(e.target.value ==='Like New'){
        let filteredPost=posts.filter(post=> post.condition ==="Like New")
        setFilterList(filteredPost)
    }else if(e.target.value ==='Excellent'){
        let filteredPost=posts.filter(post=> post.condition ==="Excellent")
        setFilterList(filteredPost)
    }
    else if(e.target.value ==='Good'){
        let filteredPost=posts.filter(post=> post.condition ==="Good")
        setFilterList(filteredPost)
    }
    else if(e.target.value ==='Fair'){
        let filteredPost=posts.filter(post=> post.condition ==="Fair")
        setFilterList(filteredPost)
    }
    else if(e.target.value ==='Usable'){
        let filteredPost=posts.filter(post=> post.condition ==="Usable")
        setFilterList(filteredPost)
    }
    else {
        let filteredPost=posts.filter(post=> post.condition ==="Salvage")
        setFilterList(filteredPost)
    }
  }
//   let displayPosts=posts.filter(post=> {return post.title.toLowerCase().includes(searchText.toLowerCase()) || post.category.toLowerCase().includes(searchText.toLowerCase()) })
//   let filteredPost=displayPosts
let displayPosts=filteredList.filter(post=> {return post.title.toLowerCase().includes(searchText.toLowerCase()) || post.category.toLowerCase().includes(searchText.toLowerCase()) })
  return (
    <div className='home-page-container'>
        <div className='filter-container'>
            <div className='serach-container'>
            
            <input placeholder="Search " value={searchText} onChange={handlerSearch}></input>
            <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
            </div>

            <div className='filter-list'>
               
               <div className='condition-select-container'>
                <label htmlFor="sortby">Condition</label>
                <div>
                <select id="sortList" className='sortList' value={filter} onChange={handleChange}>
                <option value="All">All</option>
                <option value="New">New</option>
                <option value="Like New">Like New</option>
                <option value="Excellent">Excellent</option>
                <option value="Good">Good</option>
                <option value="Fair">Fair</option>
                <option value="Usable">Usable</option>
                <option value="Salvage">Salvage</option>
                
                </select>
                </div>
            </div>

            </div>

            
        </div>

        <div className='post-card-container'>
            {displayPosts.map(post=> <Post key={post.id} post={post} />)}
        </div>
    </div>
  )
}

export default Home
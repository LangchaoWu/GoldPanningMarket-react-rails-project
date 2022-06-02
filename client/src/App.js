import 'bootstrap/dist/css/bootstrap.min.css';
import React ,{useState,useEffect}from 'react'
import './App.css';
import Header from './components/Header';
import Profile from './components/Profile';
import SignUp from './components/SignUp';
import NewPost from './components/NewPost';
import MyPosts from './components/MyPosts';
import Home from './components/Home';
import Detail from './components/Detail';
import { Routes,Route} from "react-router-dom";
import Show from './components/Show';

function App() {
  const [currentUser,setCurrentUser]=useState({})
  const [currentAvatar,setCurrentAvatar]=useState("")
  const [isLogin,setIsLogin]=useState(false)
  const [modalShow, setModalShow] = useState(false);
  const [modalSignUpShow, setModalSignUpShow] = useState(false);
  const [sideBar,setSideBar]=useState(false)
  const [showPost, setShowPost] = useState(false);
  const [posts,setPosts]=useState([])
  const [allPosts,setAllPosts]=useState([])
  const [filterCategory,setFilterCategory]=useState(allPosts)
  
  useEffect(()=>{
    fetch('/authorized_user')
    .then(res=>res.json())   
    .then((data) => {
         if(data){
          console.log(data)
           setIsLogin(true);
          setCurrentUser(data);

          setCurrentAvatar(data.avatar)
          setPosts(data.posts)
       
        }
        });

    fetch('/posts')
    .then(res=>res.json())
    .then(data => {
      setAllPosts(data)
      setFilterCategory(data) 
    }
      )
        
      },[])

  return (
    <div className="App">
      <Header isLogin={isLogin} 
            setIsLogin={setIsLogin} 
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
            currentAvatar={currentAvatar} 
            setCurrentAvatar={setCurrentAvatar} 
            setModalShow={setModalShow} 
            setModalSignUpShow={setModalSignUpShow} 
            sideBar={sideBar} 
            setSideBar={setSideBar} 
            setShowPost={setShowPost}
            setPosts={setPosts}
            />
      {/* <DeleteConfirm /> */}
      <Profile show={modalShow} onHide={() => setModalShow(false)} currentUser={currentUser} currentAvatar={currentAvatar} setCurrentAvatar={setCurrentAvatar} setCurrentUser={setCurrentUser}/>
      <SignUp show={modalSignUpShow} setModalSignUpShow={setModalSignUpShow} setCurrentUser={setCurrentUser} setIsLogin={setIsLogin} setModalShow={setModalShow}  setSideBar={setSideBar}/>  
      <NewPost posts={posts} setPosts={setPosts} allPosts={allPosts} setAllPosts={setAllPosts} show={showPost} setShowPost={setShowPost} currentUser={currentUser}/> 
      <Routes>
      <Route path='/mypost' element={<MyPosts  posts={posts}/> }/>
      <Route path='/show' element={<Home posts={filterCategory}  ></Home>}></Route>
      <Route path="/posts/:id" element={<Detail  currentUser={currentUser} allPosts={allPosts} setAllPosts={setAllPosts} posts={posts} setPosts={setPosts}></Detail>}/>
      <Route path="/" element={<Show allPosts={allPosts} filterCategory={filterCategory} setFilterCategory={setFilterCategory}></Show>} />
      </Routes>
    </div>
  );
}

export default App;

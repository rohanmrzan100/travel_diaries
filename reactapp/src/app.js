import React, { useEffect } from 'react'
import { BrowserRouter,Route,Routes } from "react-router-dom"
import Home from './components/home/home'
import Auth from './components/login/auth'
import Diaries from './components/diaries/diaries'
import AddPost from './components/diaries/addpost'
import Edit from './components/diaries/edit'
import Profile from './components/profile/profile'
import { useSelector } from 'react-redux';
import NavbarTop from './components/header/navbar'
import Post from './components/diaries/post'
import MainLayout from './components/others/mainLayout'

const App = () => {
  
const loggedin = useSelector(state=>state.loggedin)
const post_id = useSelector(state=>state.post_id)

const postID = localStorage.getItem("postID")




  return (
  <>
    <BrowserRouter>
    <NavbarTop/>
     <MainLayout>
     <Routes>
        <Route  path='/' element={<Home/>}/>
        <Route  path='/home' element={<Home/>}/>
        <Route  path='/diaries' element={<Diaries/>}/>
       
        <Route  path='/auth' element={<Auth/>}/>  
        <Route  path={`post/${postID}`} element={<Post/>}/>  
        {loggedin?
         <>     
        <Route  path='/addpost' element={<AddPost/>}/>
        <Route  path='/profile' element={<Profile/>}/>
        <Route  path={`posts/${postID}/edit`} element={<Edit/>}/>
        </>:null} 
        </Routes>
     </MainLayout>
      
    </BrowserRouter>
  </>

)}

export default App
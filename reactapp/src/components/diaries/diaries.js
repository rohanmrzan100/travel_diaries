import React, { useEffect, useState } from 'react'

import  {gettAllPosts} from '../../api/api'
import DiariesPost from './card'
const Diaries = () => {
  const [posts,setPosts]= useState()
  
  useEffect(()=>{
    gettAllPosts().then((data)=>
      {
       setPosts(data) 
      }
    )
  },[])

  
  return (
   <>
    {posts && posts.slice(0).reverse().map((post)=>(
    
      <DiariesPost
      key={post._id}
      title={post.title}
      description={post.description}
      location={post.location}
      image={post.image}
      date={new Date(`${post.date}`).toLocaleDateString()}
      id={post._id}
      userID = {post.user}
      name = {post.user.name}
      userImage = {post.user.image}
      
      />
    ))}
   </>
  )
}

export default Diaries
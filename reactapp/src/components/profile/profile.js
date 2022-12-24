import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import {Container,Typography} from '@mui/material/';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import MainFeaturedPost from './main';
import FeaturedPost from './posts';
import { getPostById, getUser } from '../../api/api';

const theme = createTheme();

export default function Profile() {
  const id = localStorage.getItem('userID')
  const [user,setUser] = React.useState()
  const [posts,setPosts] = React.useState([])

 
  React.useEffect(()=>{
    getUser(id).then((user)=>{
     setUser(user)
    })
  },[])

React.useEffect(()=>{
   user && user.posts.map((postID)=>{
    getPostById(postID).then((post)=>{
      setPosts(prevState=>[...prevState,post.data])
     
    })
  })
},[user])
const uniqueArray = posts.filter((value, index) => {
  const _value = JSON.stringify(value);
  return index === posts.findIndex(obj => {
    return JSON.stringify(obj) === _value;
  });
});
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <main>

          {user &&  <MainFeaturedPost 
            name = {user.name}
            userImage = {user.image}
            date={ new Date(user.date).toLocaleDateString()
            }
            />
          }



          <Typography  variant='h4' >Your Posts</Typography>
          <hr style={{borderTop:"5px solid red"}}></hr>


          <Grid container  padding='10px' justifyContent="space-between">
           {
            uniqueArray && uniqueArray.map((post,i)=>(
              <FeaturedPost key={i} 
              title={post.title}
              description={post.description}
              location={post.location}
              date={new Date(`${post.date}`).toLocaleDateString()}
              image={post.image}
              id={post._id}           
              />
            ))
           }
          </Grid>
          
        </main>
      </Container>
      
    
    </ThemeProvider>
  );
}
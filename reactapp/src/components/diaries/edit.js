import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import {  Paper} from '@mui/material';
import { useNavigate} from "react-router-dom"
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import AddCircleIcon from '@mui/icons-material/AddCircle';
import {
  getPostById,
  editPost
} from "../../api/api"
import {useSelector} from "react-redux"
const theme = createTheme();

export default function Edit() {
  const navigate = useNavigate()
  const [post,setPost] = React.useState() 
  const id = localStorage.getItem('postID')
  React.useEffect(()=>{
  getPostById(id).then((post)=>{
    setPost(post.data)
  })
},[])

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const editData = {
      title:data.get('title'),
      description  :data.get('description'),
      location:data.get('location')
    }
    editPost(id,editData).then(()=>{
      navigate("/diaries")
    })
    
  };
  return (
    <ThemeProvider theme={theme}>
     {post &&
      <Grid container component="main" sx={{ marginTop:"20px"}}>
        <CssBaseline />
     
      
        <Grid item xs={false} sm={4} md={6}
         sx={{
          backgroundImage:`url(${post.image})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
        }}
        >
        </Grid>
      
     
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
             height:"90%",
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
             <AddCircleIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
            Edit your Post
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <label>Title</label>
              <TextField
                
                required
                fullWidth
                id="title"
                
                name="title"
                placeholder={post.title}
              
                autoFocus
              />
               <label>Description</label>
              <TextField
                
                required
                fullWidth
                name="description"
                placeholder={post.description}
                
                type="text"
                id="description"
                multiline
              />
               <label>Location</label>
              <TextField
               
                required
                fullWidth
                name="location"
                placeholder={post.location}
                type="text"
                id="location"
              />
                      
             
              <Button
                type="submit"
                fullWidth
                variant="contained" 
                color='success'
                sx={{ mt: 3, mb: 2 }}
              >
               Edit Diary
              </Button>   
               
            </Box>
          </Box>
        </Grid>
     
      </Grid>}
    </ThemeProvider>
  );
}
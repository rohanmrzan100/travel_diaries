import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Paper} from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { showSuccessToastMessage } from '../others/toast';

import { addPost } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';


const theme = createTheme();

export default function AddPost() {
  const dispatch = useDispatch()
 const navigate = useNavigate()
  const link = 'https://imgv3.fotor.com/images/homepage-feature-card/Upload-an-image.jpg'
  const [image,setImage] = React.useState('')
  const [Link,setLink] = React.useState('')
  const handleChange = (e)=>{
    e.preventDefault()    
    const image =  e.target.files[0];
    previewImage(image)//fucntion
    setImage(image)
  }

  const previewImage = (file) => {
   
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onloadend = () => {
      setLink(reader.result);
  };
};

  
const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const reader = new FileReader();
    
    if(!image)alert('Image not added')
        reader.readAsDataURL(image);
        reader.onloadend = () => {
           const postData = {
            image:reader.result,
            title:data.get('title'),
            description  :data.get('description'),
            location:data.get('location'),
            user:localStorage.getItem('userID')
        }
        dispatch({type:"isLoading"})
        addPost(postData).then(()=>{
          showSuccessToastMessage("Post Addition")
          dispatch({type:"is_Not_Loading"})
          navigate("/diaries")
         
        })


      }   
     
  };
  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main">
        <CssBaseline />    
        <Grid item xs={12} sm={8} md={6} component={Paper} elevation={6} square>
          <Box
            sx={{
            
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height:'100%',
             
            }}
          >
             <Avatar sx={{  bgcolor: 'secondary.main' }}>
             <AddCircleIcon/>
            </Avatar>
            <p className='fancy-text' style={{color:"black"}}>
            Add your Diary
            </p>
            <Box component="form" noValidate onSubmit={handleSubmit} >
              <TextField
                margin="normal"
                required
                fullWidth
                id="title"
                label="Enter title"
                name="title"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="description"
                label=" Enter description"
                type="text"
                id="description"
                multiline
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="location"
                label="Enter location"
                type="text"
                id="location"
              />
             <label>Add image:</label>
              <TextField
                margin="normal"
                required
                fullWidth
                name="image"
                
                type="file"
                id="image"
                onChange={handleChange}
              />
             
              <Button
                
                type="submit"
                fullWidth
                variant="contained" 
                color='success'
                sx={{ mt: 3, mb: 2 }}
              >
               Post Diary
              </Button>           
            </Box>
          </Box>
        </Grid>
        <Grid item  xs={12} sm={4} md={6} 
         sx={{
          backgroundImage:`url(${link})`,
          backgroundRepeat: 'no-repeat',
          backgroundColor: (t) =>
            t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          
        }}
       
        >
          <div className='div'>
          <img src={Link} className="center" alt=''/>
          </div>
        </Grid>
      
      </Grid>
    </ThemeProvider>
  );
}

import React,{useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { sendAuthReq } from '../../api/api';
import {useNavigate} from "react-router-dom"
import { useDispatch } from 'react-redux';
import { showSuccessToastMessage } from '../others/toast';
import { showErrorToastMessage } from '../others/toast';
const theme = createTheme();


const Auth = ()=> {
 const dispatch = useDispatch()
 useEffect(()=>{
  dispatch({type:"auth_page"})
 })

const navigate = useNavigate()

const [signup,setSignup] = useState(true);
const [image,setImage] = React.useState('')
const [Link,setLink] = React.useState('')
const handleAvatarChange = (e)=>{
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
const handlerChange = ()=>{
    document.getElementById("authform").reset();
    setSignup(!signup)
  }

const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget)
    if(signup){
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onloadend = () => {
      const  userData = {
              image:reader.result,
              name: data.get('name'),
              email: data.get('email'),
              password: data.get('password')
    }
      dispatch({type:"isLoading"})
      sendAuthReq(true,userData).then(()=>{
      showSuccessToastMessage("Signup")
      setSignup(false)
      document.getElementById("authform").reset();
      dispatch({type:"is_Not_Loading"}) 
    })
  } 
    }else{
      const  userData = {
        email: data.get('email'),
        password: data.get('password')
      }
      dispatch({type:"isLoading"})
      sendAuthReq(false,userData).then((data)=>{
        if(data.user){ 
          showSuccessToastMessage("Login")
            navigate('/home')
            localStorage.setItem("userID",data.user._id)         
        }else{
          showErrorToastMessage("Login")
          dispatch({type:"is_Not_Loading"})
        }
      })
     
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs"sx={{marginTop:"70px"}}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         
          <Typography component="h1" variant="h5">
           {signup? "Sign up":"Log In"}
          </Typography>
         {signup && <Avatar
            alt=""
            src={Link}
            sx={{ width: 70, height: 70 ,border:'1px solid black'}}
          />}
          <Box component="form"  id='authform' onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              {signup?<Grid item xs={12}>
              <label>Add Profile Image:</label>
              <TextField
                margin="normal"
                fullWidth
                name="image"
                type="file"
                id="image"
                onChange={handleAvatarChange}
              />
                <TextField
                  autoComplete="given-name"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  autoFocus
                />
              
              </Grid>:null}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3,fontWeight:"bold" }}
            >
              {signup?'Sign Up':"Log In"}
            </Button>

            <Button
             onClick={handlerChange}
              fullWidth
              
              variant="outlined"
              sx={{ mt: 2, mb: 2,":hover":{color:"green"},fontWeight:"bold" }}
            >
            {signup?"Already Have an account? Log In":"Aren't registered? Sign up" }
            </Button>
          
              
        
          </Box>
        </Box>
     
      </Container>

     
    </ThemeProvider>
  );
}
export default Auth
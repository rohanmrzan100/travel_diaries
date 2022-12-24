import React, { useEffect } from 'react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import CarouselComp from './corousek'
import { useDispatch, useSelector } from 'react-redux';




const Home = () => {
  const loggedin = useSelector(state=>state.loggedin)
  const isLoading = useSelector(state=>state.isLoading)
  const dispatch = useDispatch()
  useEffect(()=>{
  dispatch({type:"not_auth_page"})
  dispatch({type:"is_Not_Loading"})

   })
  return (
    <>    
      <CarouselComp/>
      <Divider/>
        <Box className='ta-center'>
        <div className='fancy-text' style={{color:"black"}}>Share your travel diaries with us</div>
        <Divider/>
        <Stack spacing={2} direction="row"  sx={{display:"flex" ,justifyContent:"center"}}>
        {loggedin? <Button href="/addpost" variant="outlined" >Share your Travel</Button>:null}
         <Button href="/diaries" variant="contained">View Diaries</Button>
        </Stack>
        </Box>
     
      
    </>

  )}


export default Home
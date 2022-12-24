import React from 'react'
import {
 Button,Box, Card,Avatar,CardHeader,IconButton,CardContent,Typography
} from '@mui/material';

import LocationOnIcon from '@mui/icons-material/LocationOn';

import Tooltip from '@mui/material/Tooltip';

import {useNavigate} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
const DiariesPost = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const post_id = useSelector(state=>state.post_id)
 
  const handleReadMore = ()=>{
    dispatch({
      type:"get_post_id",
      payload:props.id
    })
    localStorage.setItem("postID",props.id)
    const postID = localStorage.getItem('postID')
    navigate(`/post/${postID}`)
  }
 
  return (
    <>
      <Card sx={{ width:"50vw",
      minWidth:"400px" ,
      margin:"auto",
      marginTop:'10px',
      marginBottom:"10px"
      
      }}>
        <CardHeader  
        className='flex'
        sx={{height:'50px'}}
          avatar={
            <Avatar 
            src={props.userImage}
             />
          }
          action={
            <Tooltip title= {props.location} >
            <IconButton>
              <LocationOnIcon />
            </IconButton>
            </Tooltip>
          }
          title={props.name}
          subheader={props.date}
        />
        <hr></hr>
       <Box
        sx={{ 
          textAlign:"center",
          margin:'auto',
          height:'300px' 
       }}> 
         <img style={{height:"100%"}} src={props.image}/>
       </Box>
        <CardContent>
          <Typography variant="h7" fontWeight={'bold'}>
          {props.title}
          </Typography>
        
          <hr></hr>
        <div className='flex'>
        <Typography variant="h7" fontWeight={'bold'} marginRight="10px" >
          {props.name}
        </Typography>
        
        <Typography variant="body2" textAlign={"left"}>
          {props.description.substring(0,200)}
          <Button variant="text" onClick={handleReadMore}>
            ...READ MORE</Button>
        </Typography>
        </div>
        </CardContent>
    
        
      </Card>
     
      
    </>



  )
}

export default DiariesPost
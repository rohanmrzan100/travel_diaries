import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import {Card,Avatar} from '@mui/material';
import Typography from '@mui/material/Typography';
import Hr from '../others/hr';
import { getPostById } from '../../api/api';
export default function Post() {
  const [post ,setPost] = React.useState()
  const post_id =   localStorage.getItem('postID')
  React.useEffect(()=>{
    getPostById(post_id).then((data)=>{
      setPost(data.data)
    })
  },[])


  return (
   <>
   {post && <Card 
    sx={{
        margin:" 20px auto 20px auto",
        width:'80%',
        border:'1px solid'
    }}
    >
    <Typography variant='h6'  sx={{padding:"10px"}}>
        {post.location}
        </Typography>
      <hr ></hr>
    <Box
        sx={{ 
          textAlign:"center",
          height:'300px' ,
         
        
    }}> 
      <img style={{height:"100%"}} src={post.image}/>
    </Box>
      <Card sx={{ display: 'flex', flexDirection: 'column' ,marginTop:"20px" }}>

        
        <Box sx={{padding:"10px"}}>
        <Box sx={{ display: 'flex',justifyContent: 'left',alignItems: 'center'}}>
        <Avatar
        alt=""
        src={post.user.image}
        sx={{ width: 56, height: 56 ,border:'1px solid black'}}
      />
            <Typography variant='h6'sx={{marginLeft:"10px"}}>
              {post.user.name}
            </Typography>
        </Box>
          
        
          <Hr/>
        <Typography variant='h7'>
          {post.description}
        </Typography>
        <Hr/>
        <Typography>
            <strong>Posted on :</strong> {new Date(post.date).toLocaleDateString()}
        </Typography>
        <Typography>
        <strong>Posted by :</strong>{post.user.name}
        </Typography>
        </Box>
        </Card>
    </Card>}
   </>
  );
}
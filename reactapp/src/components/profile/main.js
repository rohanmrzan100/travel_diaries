import * as React from 'react';

import Paper from '@mui/material/Paper';
import {
    CardHeader,
    Avatar,  
} from '@mui/material/';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

function MainFeaturedPost(props) {
 

  return (
    <Paper
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        mb: 4,
        mt:9,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(https://source.unsplash.com/random)`,
      }}
    >
     
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
        <CardHeader 
          avatar={
          <Avatar 
          sx={{ width:"100px",height:"100px" }}
          src={props.userImage}
                   />
        }
       title={
         <>
            <h1>{props.name}</h1>
            <h3>Joined in {props.date}</h3>
        </>
       }
      />
     
            
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}


export default MainFeaturedPost;
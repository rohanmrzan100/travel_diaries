import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';

import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {
  Stack
} from '@mui/material';
import {Link,useNavigate} from "react-router-dom"
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditTwoToneIcon from '@mui/icons-material/ModeEditTwoTone';
import {useDispatch} from "react-redux"
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { deletePostByID } from '../../api/api';


function FeaturedPost(props) {
 const navigate = useNavigate()
 const dispatch  = useDispatch()
 const [open, setOpen] = React.useState(false);
 const handleClickOpen = () => {
   setOpen(true);
 };

 const handleClose = () => {
   setOpen(false);
 };


const sendPostID = ()=>{
  localStorage.setItem("postID",props.id)
  dispatch({
    type:'get_post_id',
    payload:props.id
  })
}
// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}


const deleteHandler = ()=>{    
  deletePostByID(props.id).then(()=>{
    dispatch({type:'isLoading'})
    sleep(1500).then(()=>{
      dispatch({type:'is_Not_Loading'})
      window.location.href = "/profile"
    })

  })
  

}

const handleClick = ()=>{
  localStorage.setItem("postID",props.id)
  dispatch({
    type:'get_post_id',
    payload:props.id
  })
  navigate(`/post/${props.id}`)
}
 return (
    <>
    <Grid item  lg={5.9} md={12} className="posts" border="1px solid black" marginBottom="10px">
      <>
        <Card sx={{ display: 'flex'}} onClick = {handleClick}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h3" variant="h5">
              {props.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {props.description.substring(0,100)}<strong> ...Read More</strong>
            </Typography>
            <Typography variant="subtitle1" paragraph>
            Created At:{props.date}
            </Typography>
            
          </CardContent>
          <CardMedia
            component="img"
            sx={{ maxWidth: '150px',height:'150px' ,display: { xs: 'none', sm: 'block' } }}
            image={props.image}
            alt="gigiugogiu"
          />
          
        </Card>
        <Stack spacing={2} direction="row-reverse" margin={1} sx={{zIndex:20}}>
          <Button variant="contained" color='error' onClick={handleClickOpen}><DeleteIcon/>Delete</Button>
          <Link  to={`/posts/${props.id}/edit`} style={{ textDecoration: 'none' }}>
          <Button onClick={sendPostID} variant="outlined"><ModeEditTwoToneIcon/>Edit</Button>
          </Link>
        </Stack>
      </>
    </Grid>



    <Dialog
    open={open}
    onClose={handleClose}
    aria-labelledby="alert-dialog-title"
    aria-describedby="alert-dialog-description"
    >
    <DialogTitle id="alert-dialog-title">
      Are you sure?
    </DialogTitle>
    <DialogContent>
      <DialogContentText id="alert-dialog-description">
        Are you sure you want to delete this diary?
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button variant='contained' color='error' onClick={deleteHandler}>Yes</Button>
      <Button variant="outlined" onClick={handleClose} autoFocus>
        No
      </Button>
    </DialogActions>
    </Dialog>
    </>
  );
}


export default FeaturedPost;
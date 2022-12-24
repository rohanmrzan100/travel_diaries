import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import * as React from 'react';
import Button from '@mui/material/Button';
import {useNavigate,Link} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';

function NavbarTop() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const userID = localStorage.getItem("userID")
    const authPage = useSelector(state=>state.authpage)
    const loggedin = useSelector(state=>state.loggedin)
    const [open, setOpen] = React.useState(false);
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
  
    React.useEffect(()=>{
      if(userID){
        dispatch({type:"loggedIn"})
      }
    })
    const handleClick = ()=>{
      if(userID){
        localStorage.removeItem('userID')
      }
      dispatch({type:"not_loggedIn"})
      handleClose();
      window.location.href='/auth'
    }
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container  className='flex'>
        <>
      
        <Link to='/home' style={{textDecoration:"none"}}><h1 className='fancy-text'> Travel Diaries</h1></Link>
        
        
        
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto" >

            <Nav.Link href='/home' ><Button  variant='text' color='warning'>
                    Home</Button>
            </Nav.Link>
            <Nav.Link href='/diaries' ><Button variant='text' color='warning'>
                    Diaries</Button>
            </Nav.Link>
            {loggedin && <>
            <Nav.Link href='/addpost' ><Button  variant='text' color='warning'>
                    Add Post</Button>
            </Nav.Link>
            <Nav.Link href='/profile'><Button variant='text' color='warning'>
                    Profile</Button>
            </Nav.Link>
            </>}
                 
          </Nav>
          <Nav>
          { !authPage &&  <Nav.Link  ><Button variant="contained" color="error" onClick={!loggedin?()=>navigate('/auth'):handleClickOpen}>
                {loggedin?"Log Out":"Login/register"}
            </Button>
            </Nav.Link>}
        <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
            
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to Log Out?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={handleClose}>No</Button>
                <Button onClick={handleClick} autoFocus>
                    Log Out
                </Button>
                </DialogActions>
            </Dialog>

          </Nav>
        </Navbar.Collapse>
        </>
      </Container>
    </Navbar>
    
  );
}

export default NavbarTop;
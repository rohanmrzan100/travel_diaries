import React from 'react'
import {ToastContainer} from "react-toastify"
import { Container } from 'react-bootstrap';
import LoadingSpinner from './LoadingSpinner';
import { useSelector } from 'react-redux';
const MainLayout = (props) => {
const isLoading = useSelector(state=>state.isLoading)



  return (
    <Container style={{padding:"0px",margin:"20px auto auto auto",width:"100%"}}>
        {props.children}
      
       
       {isLoading && <LoadingSpinner/>}
     
        <ToastContainer/>
    </Container>
  )
}

export default MainLayout
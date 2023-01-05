import React, { useState } from 'react';
import {
  MDBCard,
  MDBCardText,
  MDBCardTitle,
  MDBCardBody,
  MDBListGroup,
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
  MDBListGroupItem,
  MDBTextArea
} from 'mdb-react-ui-kit';

import { useBlogContext } from '../contexts/BlogContext';
import { snapshotToArray, writeComment } from '../helpers/firebase';

const BlogCard=({handleClose,handleShow,item,index,showModal,setShowModal})=> {
   
    
  const[content,setContent]=useState()
  const {blogData2}=useBlogContext()
  
   
  




  const handleSubmit=(e)=>{
    e.preventDefault();
    writeComment(item,content);
    setContent("");
    handleClose()
  }
  return (
    <>
      <i key={item.id}  onClick={()=>{handleShow(index)}} role="button"  className="fa fa-comment fa-2x fa-beat" aria-hidden="true"></i>
      <MDBModal show={showModal === index} onHide={handleClose}  tabIndex='-1'>
        <MDBModalDialog scrollable>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Comments</MDBModalTitle>
              <MDBBtn
                className='btn-close'
                color='none'
                onClick={() => handleClose()}
              ></MDBBtn>
            </MDBModalHeader>
            <form onSubmit={handleSubmit} action="">
      <MDBListGroup style={{margin:"auto"}} className='w-100'>
        
        <MDBListGroupItem><MDBTextArea required value={content} onChange={(e)=>setContent(e.target.value)} label='Content' id='textAreaExample' rows={5} /></MDBListGroupItem>
        <MDBBtn  className="w-50 m-auto" size="lg">Create Comment</MDBBtn>
      </MDBListGroup>
      </form>
            <MDBModalBody>
              {blogData2?.comments?.[item?.id] && Object.values(blogData2?.comments?.[item?.id]).map((item)=>{
                return(
                  <MDBCard border='success' background='white' shadow='0' className='mb-3'>
      
      <MDBCardBody className='text-success'>
        <MDBCardTitle >{item.name}</MDBCardTitle>
        <hr />
        <MDBCardText  >
          {item.comment}
        </MDBCardText>
      </MDBCardBody>
      
    </MDBCard>
                  
                )
              })}
              
            </MDBModalBody>
            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={() => handleClose()}>
                Close
              </MDBBtn>
              
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </>
  );
}
export default BlogCard;
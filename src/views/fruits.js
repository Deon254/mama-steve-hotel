
import React, { useState, useEffect, useRef } from 'react';
import Data from "../data.json";
import { v1 as uuidv1 } from 'uuid';
import axios from 'axios';
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
} from "react-bootstrap";

function App() {

  // Reference
  const nameRef = useRef();
  const priceRef = useRef();
  const quantityRef = useRef();

  // State 
  const [data, setData] = useState(Data);

  // Temp State
  const [name, setName] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const [updateID, setUpdateID] = useState();
  const [updateName, setUpdateName] = useState();
  const [updatePrice, setUpdatePrice] = useState();
  const [updateQuantity, setUpdateQuantity] = useState();

  // Effect
  //////////////////////////////////////////
  useEffect(() => {
    // console.log(data);
    // setDate(Data)
    // clear form fields
    nameRef.current.value = null;
    priceRef.current.value = null;
    quantityRef.current.value = null;
    
  },[data]);
  


  // Add Post
  //////////////////////////////////////////
  const addPost = () => {
    if(name && price && quantity ) {
      // create new post object
      let newPost = {
        "id": uuidv1(),
        "name": name,
        "price": price,
        "quantity":quantity
      }
      // merge new post with copy of old state
      let posts = [...data, newPost];
      // push new object to state
      setData(posts);
      // clear title and content from state
      setName();
      setPrice();
      setQuantity();

      // update write to json file
      saveJson(posts);

   }
  }
  


  // Delete Post 
  //////////////////////////////////////////
  const deletePost = (key) => {
    // filter out post containing that id
    let filterOutPost = [...data].filter(OBJ=>OBJ.id!==key);
    // save the rest in state
    setData(filterOutPost);

    // update write to json file
    saveJson(filterOutPost);

  }

  // Populate Post
  ////////////////////////////////////////// 
  const populatePost = (key, name, price, quantity) => {
    setUpdateID(key);
    setUpdateName(name);
    setUpdatePrice(price);
      setUpdateQuantity(quantity);

  }

  // Update Post 
  //////////////////////////////////////////
  const updatePost = () => {
    // populate post info from temp state and prepare new object for changed post
    let editedPost = {
      "id": updateID,
      "name": updateName,
      "price": updatePrice,
      "quantity":updateQuantity
    }
    // remove old post with same ID and get the remaining data /// filter 
    let filterPost = [...data].filter(OBJ=>OBJ.id!==updateID);
    // prepare object with edited post + remaining data from object above
    let posts = [...filterPost, editedPost];
    // push int state
    setData(posts);

    setUpdateID();
    setUpdateName();
    setUpdatePrice();
    setUpdateQuantity();

    // update write to json file
    saveJson(posts);

  }

  // Write to JSON File
  //////////////////////////////////////////
  // this function will receive all uodated state / posts after you add, edit delete post
  const saveJson = (posts) => {
    // api URL // end point from node server / express server
    const url = 'http://localhost:5000/write'
    axios.post(url, posts)
    .then(response => {
      // console.log(response);
    });
  }





  return (
    <div className="App">

      <div>
        <h4>Add New Fruit</h4>
        <input placeholder="Name" 
          onChange={ e => setName( e.target.value ) } 
          value={ name || '' } 
          ref={ nameRef }
        />
        <br />
        <input placeholder="Price in KSHS" 
          onChange={ e => setPrice( e.target.value ) } 
          value={ price || '' } 
          ref={ priceRef }
        />
        <br />
        <input placeholder="Quantity" 
          onChange={ e => setQuantity( e.target.value ) } 
          value={ quantity || '' } 
          ref={ quantityRef }
        />
        <br />

        <Button variant="primary"onClick={addPost}>Add Fruit</Button>
      </div>

      {/* If temp state has got values of title and content for update form show this */}

      { updateName || updatePrice || updateQuantity ? 
        (
          <div>
            <h4>Update Post</h4>
            <input placeholder="Name" 
              onChange={ e => setUpdateName( e.target.value ) } 
              value={ updateName || '' } 
            />
            <br />
            <input placeholder="Price in KSHS" 
              onChange={ e => setUpdatePrice( e.target.value ) } 
              value={ updatePrice || '' } 
            />
            <br />

            <input placeholder="Quantity" 
              onChange={ e => setUpdateQuantity( e.target.value ) } 
              value={ updateQuantity || '' } 
            />
            <br />
            <Button variant="primary" onClick={ updatePost }>Update Product</Button>
          </div>
        ) : null }

      <div className="posts">

      <Container fluid>
        <Row>
          <Col md="12">
            <Card className="strpied-tabled-with-hover">
              <Card.Header>
                <Card.Title as="h4">Fruits</Card.Title>
                
              </Card.Header>
              <Card.Body className="table-full-width table-responsive px-0">
                <Table className="table-hover table-striped">
                  <thead>
                    <tr>
                      <th className="border-0">ID</th>
                      <th className="border-0">Name</th>
                      <th className="border-0">Price</th>
                      <th className="border-0">Quantity</th>
                      <th className="border-0">Edit</th>
                      <th className="border-0">Delete</th>
                      
                    </tr>
                  </thead>
            
        { data ? data.map(posts => {
          return(
            <tbody>
                    <tr>
                      <td>{posts.id}</td>
                      <td>{posts.name}</td>
                      <td>{posts.price}</td>
                      <td>{posts.quantity}</td>       

                       
                <td> <Button variant="primary" onClick={ () => populatePost(posts.id, posts.name, posts.price,posts.quantity) }>Edit</Button></td>
                <td> <Button variant="danger"onClick={ () => deletePost(posts.id) }>Delete</Button></td>

                    </tr>

                 </tbody>

          )
        }) : null }
        </Table>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

       
      </div>
    </div>
  );
}

export default App;
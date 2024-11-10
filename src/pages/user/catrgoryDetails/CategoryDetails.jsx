import React from 'react'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Loader from '../../../reusable/loader/Loader.jsx'
import useFetchData from '../../../customHooks/useFetchData';


export default function CategoryDetails() {
    /*const [products,setProducts] = useState([]);
    const {categoryId} = useParams(); 
    const getProducts = async ()=>{
        const {data} = await axios.get (`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
        setProducts(data.products);
    }

    useEffect( ()=>{
        getProducts();
    },[]);*/
    const {categoryId} = useParams();
    const {data,loading,error} = useFetchData(`https://ecommerce-node4.onrender.com/products/category/${categoryId}`);
    console.log(data);
 if (loading){
  return(
    <Loader />
  )
 }
 if(error){
  return <div className='alert-danger'>{error}</div>
 }
    
 /* return (
    <section className='products'>
      {data.products.map(product=>
      
        <div className='product' key={product._id}>
            <h2>{product.name}</h2>
          <img src={product.mainImage.secure_url} />
          <Link className='btn btn-outline-primary' to={`/product/${product._id}`}>Details</Link>
        </div>
      )}

    </section>  )*/


  return (
    <section style={{
      background: 'linear-gradient(to right, #f9f9f9, #e3f2fd)', 
    }}>
       <div className='container-fluid category-details'>
      <h1 className='text-center fw-bolder p-5'>Products</h1>
    <section className='products d-flex justify-content-evenly flex-wrap border-3 fs-1 lh-lg w-100 p-5'>
      {data.products.map(product => (
        <Card
  className='p-3 text-center fw-bold flex-md-grow mb-5'
  style={{
    width: '18rem',
    margin: '10px',
    transition: 'transform 0.3s ease',
  }}
  key={product._id}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
  onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'} 
>          <Card.Img variant="top" src={product.mainImage.secure_url} alt='Product' title='Product'  />
          <Card.Body>
            <Card.Title><h3 className='fs-6 lh-base p-2'>{product.name.substring(0, 50)}...</h3></Card.Title>
            <Link to={`/product/${product._id}`}>
              <Button variant="primary" className='btn1'>Details</Button>
            </Link>
          </Card.Body>
        </Card>
      ))}
    </section>
    </div>

    </section>
   
  );
}
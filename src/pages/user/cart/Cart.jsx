import React from 'react'
import useFetchData from '../../../customHooks/useFetchData';
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import style from "./Cart.module.css";
import axios from 'axios';

export default function cart() {
    
    const [cartItems, setCartItems] = useState([]);
    const navigate = useNavigate();
    const getCart = async()=>{
        try{
            const token = localStorage.getItem('userToken');
            const {data} = await axios.get(`https://ecommerce-node4.onrender.com/cart/`,
            {
              headers:{
                Authorization:`Tariq__${token}`
              }
            })
            console.log(data);
        setCartItems(data.products);
        }catch(error){
            console.log(error);
        }
    }
    const increaseQty = async (productId)=>{
      try{
        const token = localStorage.getItem('userToken');
        const {data} = await axios.patch(`https://ecommerce-node4.onrender.com/cart/incraseQuantity`,
        {productId},
        {
          headers:{
            Authorization:`Tariq__${token}`
          }
        })
        console.log(data);
        getCart();
        /*setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId ? { ...item, quantity: item.quantity + 1 } : item
          )
        );*/
    }catch(error){
        console.log(error);
    }
    }
    const decreaseQty = async (productId) => {
      try {
        const token = localStorage.getItem('userToken');
        await axios.patch(
          `https://ecommerce-node4.onrender.com/cart/decraseQuantity`,
          {productId},
          {
            headers: {
              Authorization: `Tariq__${token}`
            }
          }
        );
        getCart();
        /*setCartItems((prevItems) =>
          prevItems.map((item) =>
            item.productId === productId && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        );*/

      } catch (error) {
        console.log(error);
      }
    };
    const removeItem = async (productId) => {
      try {
        const token = localStorage.getItem('userToken');
        await axios.patch(`https://ecommerce-node4.onrender.com/cart/removeItem`, 
        {productId},
        { 
          headers: {
            Authorization: `Tariq__${token}`,
          },
        });
        getCart();
      } catch (error) {
        console.log(error);
      }
    };
    const clearCart = async () => {
      try {
        const token = localStorage.getItem('userToken');
        await axios.patch(`https://ecommerce-node4.onrender.com/cart/clear`,
          {}, 
          {
          headers: {
            Authorization: `Tariq__${token}`
          },
        });
        getCart(); 
      } catch (error) {
        console.log(error);
      }
    };
    useEffect( ()=>{
        getCart();
    },[]);

    /*return (
        <section>
        <h2>Your Cart</h2>
        <div className="container mt-5">
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Product</th>
                <th>q</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id}>
                  <td className='itemName'>
                  <img className='img-fluid' src={item.details.mainImage.secure_url} alt={item.details.name} />
                   <p>{item.details.name}</p> 
                    </td>
                  <td>
                  <div className="btn-group" role="group">
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={() => increaseQty(item.productId)}
                      >
                        +
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={() => decreaseQty(item.productId)}
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                    </div>
                  </td>
                  <td className='itemQuantity'>{item.quantity}</td>
                  <td className='itemPrice'>{item.details.price}</td>
                  <td className='itemSubtotal'>{(item.quantity * item.details.price)}</td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() => removeItem(item.productId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
            <button className="btn btn-danger mb-3" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-primary mt-3" onClick={() => navigate('/checkout')}>
             Checkout
            </button>
        </div>
        )}
      </div>
      </section>
    )
}*/
return(
/*<section>
      <h2 className="cart-header">Your Cart</h2>
      <div className="container mt-5">
        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty.</p>
        ) : (
          <div className="row">
            {cartItems.map((item) => (
              <div key={item._id} className="col-12 mb-3">
                <div className="cart-card">
                  <div className="d-flex align-items-center">
                    <img
                      src={item.details.mainImage.secure_url}
                      alt={item.details.name}
                      className="cart-image me-3"
                    />
                    <div className="flex-grow-1">
                      <h5 className="cart-item-name">{item.details.name}</h5>
                      <p className="cart-item-price">
                        Price: <span>{item.details.price} JD</span>
                      </p>
                      <div className="d-flex align-items-center">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => increaseQty(item.productId)}
                        >
                          +
                        </button>
                        <span className="fw-bold">{item.quantity}</span>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => decreaseQty(item.productId)}
                          disabled={item.quantity <= 1}
                        >
                          -
                        </button>
                      </div>
                      <p className="cart-subtotal mt-2">
                        Subtotal: <span>{(item.quantity * item.details.price).toFixed(2)} JD</span>
                      </p>
                    </div>
                    <button
                      className="btn btn-danger btn-sm ms-3"
                      onClick={() => removeItem(item.productId)}
                    >
                      <i className="bi bi-trash"></i> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {cartItems.length > 0 && (
          <div className="cart-actions">
            <button className="btn btn-danger" onClick={clearCart}>
              Clear Cart
            </button>
            <button className="btn btn-primary" onClick={() => navigate('/checkout')}>
              Checkout
            </button>
          </div>
        )}
      </div>
    </section>*/
    <section className="py-5" style={{ backgroundColor: '#f8f9fa' }}>
    <h2 className="text-center mb-4">Your Cart</h2>
    <div className="container mt-5">
      {cartItems.length === 0 ? (
        <p className="text-center" style={{ fontStyle: 'italic', color: '#6c757d' }}>Your cart is empty.</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div 
              key={item._id}
              className="card mb-3 shadow-sm border-light"
              style={{
                transition: 'transform 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div className="row g-0 align-items-center">
                <div className="col-md-3 text-center">
                  <img 
                    className="img-fluid rounded" 
                    src={item.details.mainImage.secure_url} 
                    alt={item.details.name} 
                    style={{ height: '150px', objectFit: 'cover' }} 
                  />
                </div>
                <div className="col-md-8">
                  <div className="card-body p-4">
                    <h5 className="card-title text-secondary" style={{ fontSize: '1rem' }}>{item.details.name}</h5>
                    <p className="card-text">
                      <span className="fw-bold">Price: </span> 
                      <span className="text-success">${item.details.price}</span>
                    </p>
                    <div className="d-flex align-items-center mb-3">
  <button
    type="button"
    className="btn btn-outline-primary btn-sm me-1"
    onClick={() => increaseQty(item.productId)}
    style={{
      border: 'none', // إزالة الحدود
      borderRadius: '50%',
      padding: '0.2rem 0.5rem',
      fontSize: '1rem',
      color: '#007bff',
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s, color 0.3s' // إضافة تأثير للانتقال
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#e0f0ff'; // تأثير عند تمرير الماوس
      e.target.style.color = '#0056b3'; // تغيير اللون عند تمرير الماوس
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'transparent'; // إعادة الخلفية عند الخروج
      e.target.style.color = '#007bff'; // إعادة اللون الأصلي
    }}
  >
    +
  </button>
  <span className="fw-bold mx-1" style={{ fontSize: '0.9rem', color: '#555' }}>{item.quantity}</span>
  <button
    type="button"
    className="btn btn-outline-secondary btn-sm ms-1"
    onClick={() => decreaseQty(item.productId)}
    disabled={item.quantity <= 1}
    style={{
      border: 'none', // إزالة الحدود
      borderRadius: '50%',
      padding: '0.2rem 0.5rem',
      fontSize: '1rem',
      color: '#6c757d',
      backgroundColor: 'transparent',
      transition: 'background-color 0.3s, color 0.3s' // إضافة تأثير للانتقال
    }}
    onMouseEnter={(e) => {
      e.target.style.backgroundColor = '#e0e0e0'; // تأثير عند تمرير الماوس
      e.target.style.color = '#555'; // تغيير اللون عند تمرير الماوس
    }}
    onMouseLeave={(e) => {
      e.target.style.backgroundColor = 'transparent'; // إعادة الخلفية عند الخروج
      e.target.style.color = '#6c757d'; // إعادة اللون الأصلي
    }}
  >
    -
  </button>
</div>

                    <p className="mb-1">
                      <span className="fw-bold">Subtotal: </span> 
                      <span className="text-danger">${(item.quantity * item.details.price)}</span>
                    </p>
                  </div>
                </div>
                <div className="col-md-1 d-flex align-items-center">
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => removeItem(item.productId)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
          <div className="d-flex justify-content-center mt-5">
            <button className="btn btn-danger me-2 btn-sm p-3" onClick={clearCart} style={{ width: '100px' }}>
              Clear Cart
            </button>
            <button className="btn btn-primary ms-2 btn-sm p-3" onClick={() => navigate('/checkout')} style={{ width: '100px' }}>
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  </section>

  );
};




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../../../../reusable/loader/Loader.jsx';

export default function Orders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getOrders = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/order`, {
                headers: {
                    Authorization: `Tariq__${token}`,
                },
            });
            console.log(data);
            setOrders(data.orders); 
        } catch (error) {
            console.error(error);
            setError('Failed to load orders.'); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getOrders();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className='alert alert-danger'>{error}</div>;
    }

    return (
        <div className="container mt-4">
            <h2 style={{ fontSize: '2.5rem', color: '#343a40', marginBottom: '20px' }}>Your Orders</h2>
            {orders.length === 0 ? (
                <p style={{ fontSize: '1.2rem', color: '#6c757d' }}>No orders found.</p>
            ) : (
                <>
                    {orders.map(order => (
                        <div key={order._id} className="mb-4">
                            <div className="card" style={{ border: '1px solid #ced4da' }}>
                                <div className="card-body">
                                    <h5 className="card-title" style={{ color: '#007bff', fontSize: '1.5rem' }}>Order ID: {order.id}</h5>
                                    <p className="card-text" style={{ fontSize: '1.1rem', color: '#495057' }}>Total: JOD {order.finalPrice}</p>
                                    <p className="card-text" style={{ fontSize: '1.1rem', color: '#495057' }}>Status: {order.status}</p>
                                    <h6 style={{ fontSize: '1.2rem', color: '#343a40' }}>Products:</h6>
                                    <ul className="list-group list-group-flush">
                                        {order.products.map(product => (
                                            <li key={product._id} className="list-group-item" style={{ display: 'flex', alignItems: 'center', padding: '15px' }}>
                                                <img 
                                                    src={product.productId.mainImage.secure_url} 
                                                    alt={product.productId.name} 
                                                    style={{ width: '60px', height: '60px', marginRight: '15px', borderRadius: '5px' }} 
                                                />
                                                <div style={{ flexGrow: 1 }}>
                                                    <p style={{ margin: '0', fontSize: '1.1rem', color: '#343a40' }}>Product Name: {product.productId.name}</p>
                                                    <p style={{ margin: '0', fontSize: '1rem', color: '#6c757d' }}>Quantity: {product.quantity}</p>
                                                    <p style={{ margin: '0', fontSize: '1rem', color: '#6c757d' }}>Item Price: {product.unitPrice} JOD</p>
                                                    <p style={{ margin: '0', fontSize: '1rem', color: '#6c757d' }}>Final Price: {product.finalPrice} JOD</p>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
    
    
}

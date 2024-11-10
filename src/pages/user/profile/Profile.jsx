import React, { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import Loader from '../../../reusable/loader/Loader.jsx';
import { Nav } from 'react-bootstrap';
import style from './Profile.module.css';
import axios from 'axios';

export default function Profile() {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getUserProfile = async () => {
        try {
            const token = localStorage.getItem('userToken');
            const { data } = await axios.get(`https://ecommerce-node4.onrender.com/user/profile`, {
                headers: {
                    Authorization: `Tariq__${token}`,
                },
            });
            console.log(data);
            setUserData(data.user); 
        } catch (error) {
            console.error(error);
            setError('Failed to load user profile.'); 
        } finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        getUserProfile();
    }, []);

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div className='alert alert-danger'>{error}</div>;
    }

    /*return (
        <div>
            <h2>User Profile</h2>
            <Outlet context={userData} />
            <ul>
                <li>
                <Link className="nav-link" to = {'info'}>Info</Link>
                </li>
                <li>
                <Link className="nav-link" to = {'contact'}>Contact</Link>
                </li>
                <li>
                <Link className="nav-link" to = {'ordersDetails'}>Orders Details</Link>
                </li>
            </ul>
        </div>
    );*/
   return (
    <section className='profile p-5'>
        <div className="container">
            <h2 style={{ textAlign: 'center', fontSize: '2.5rem', color: '#343a40' }}>Profile Information</h2>
            <div className='p-5' style={{ padding: '20px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                <div style={{ display: 'flex' }}>
                    <nav style={{ flex: '1', marginRight: '20px' }}>
                        {['info', 'contact', 'ordersDetails'].map((link, index) => (
                            <Link 
                                key={index} 
                                to={link} 
                                style={{ 
                                    display: 'block', 
                                    color: '#495057', 
                                    fontWeight: '500', 
                                    padding: '10px', 
                                    textDecoration: 'none', 
                                    marginBottom: '10px', 
                                    borderRadius: '5px', 
                                    backgroundColor: '#f8f9fa',
                                    transition: 'background-color 0.3s',
                                    textAlign: 'center',
                                    borderBottom: '3px solid transparent',
                                }}
                                onMouseOver={e => {
                                    e.currentTarget.style.backgroundColor = '#e2e6ea'; 
                                    e.currentTarget.style.borderBottom = '3px solid #007bff'; 
                                }} 
                                onMouseOut={e => {
                                    e.currentTarget.style.backgroundColor = '#f8f9fa'; 
                                    e.currentTarget.style.borderBottom = '3px solid transparent';
                                }}
                            >
                                {link.charAt(0).toUpperCase() + link.slice(1).replace(/([A-Z])/g, ' $1')}
                            </Link>
                        ))}
                    </nav>
                    <div style={{ flex: '3' }}>
                        <Outlet context={userData} />
                    </div>
                </div>
            </div>
        </div>
    </section>
);
}

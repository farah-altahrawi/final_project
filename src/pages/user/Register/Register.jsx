/*import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react'

export default function Register() {
  const schema = yup.object({
    userName:yup.string().required().min(2).max(15),
    email:yup.string().required().min(5).max(20).email(),
    password:yup.string().required().min(6).max(20),

});
  const formik = useFormik({
    initialValues:{
      userName:'',
      email:'',
      password:'',
      image:null,
    },onSubmit:RegisterUser,
    validationSchema:schema
  });
  async function RegisterUser(){
   const {data} = await axios.post('https://ecommerce-node4.onrender.com/auth/signup',formik.values);
   console.log(data);
  }

  const handleImageChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]); 
  };

  return (
    <div>
        <h1 className="text-center p-4">Register</h1>
        <form onSubmit={formik.handleSubmit} className="m-auto w-50">
            <div className="form-floating mb-3">
            <input type="text" className="form-control" onChange={formik.handleChange} name="userName" id="name" value={formik.userName} onBlur={formik.handleBlur} placeholder="" required min={2} max={15} />
            <label htmlFor="name">User Name</label>
            {formik.touched.userName && formik.errors.userName?<div className="text text-danger">{formik.errors.userName}</div> :null}
            </div>
            <div className="form-floating mb-3">
            <input type="email" className="form-control" onChange={formik.handleChange} name="email" id="email" value={formik.email} onBlur={formik.handleBlur} placeholder="" required min={5} max={20} />
            <label htmlFor="email">Email</label>
            {formik.touched.email && formik.errors.email?<div className="text text-danger">{formik.errors.email}</div> :null}
            </div>
            <div className="form-floating mb-3">
            <input type="password" className="form-control" onChange={formik.handleChange} name="password" id="pass" value={formik.password} onBlur={formik.handleBlur} placeholder="" required min={6} max={20} />
            <label htmlFor="pass">Password</label>
            {formik.touched.password && formik.errors.password?<div className="text text-danger">{formik.errors.password}</div> :null}
            </div>
            <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            onChange={handleImageChange} 
          />
        </div>
            <div className="d-grid gap-2 col-6 mx-auto">
            <button type='submit' className="btn btn-outline-info">Register</button>
            </div>

        </form>
    </div>
  )
}
*/
import axios from 'axios';
import { useFormik } from 'formik';
import * as yup from 'yup';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Register() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const schema = yup.object({
    userName: yup.string().required().min(2).max(15),
    email: yup.string().required().min(5).max(30).email(),
    password: yup.string().required().min(6).max(20),
  });

  const formik = useFormik({
    initialValues: {
      userName: '',
      email: '',
      password: '',
      image: null,
    },
    onSubmit: RegisterUser,
    validationSchema: schema,
  });

  async function RegisterUser() {
    try {
      const { data } = await axios.post('https://ecommerce-node4.onrender.com/auth/signup', formik.values);
      console.log(data);

      toast.success({
        text: "Registration successful! Please check your email for verification.",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745",
      });

      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  const handleImageChange = (event) => {
    formik.setFieldValue('image', event.currentTarget.files[0]); 
  };

  return (
    <>
              <ToastContainer />
              <div>
      <h1 className="text-center p-4">Register</h1>
      <form onSubmit={formik.handleSubmit} className="m-auto w-50">
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            name="userName"
            id="name"
            value={formik.values.userName}
            onBlur={formik.handleBlur}
            placeholder=""
            required
            min={2}
            max={15}
          />
          <label htmlFor="name">User Name</label>
          {formik.touched.userName && formik.errors.userName ? (
            <div className="text text-danger">{formik.errors.userName}</div>
          ) : null}
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            onChange={formik.handleChange}
            name="email"
            id="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            placeholder=""
            required
            min={5}
            max={30}
          />
          <label htmlFor="email">Email</label>
          {formik.touched.email && formik.errors.email ? (
            <div className="text text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            onChange={formik.handleChange}
            name="password"
            id="pass"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            placeholder=""
            required
            min={6}
            max={20}
          />
          <label htmlFor="pass">Password</label>
          {formik.touched.password && formik.errors.password ? (
            <div className="text text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="mb-3">
          <label htmlFor="profilePicture" className="form-label">
            Profile Picture
          </label>
          <input
            type="file"
            className="form-control"
            id="profilePicture"
            onChange={handleImageChange} 
          />
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button type='submit' className="btn btn-outline-info">Register</button>
        </div>
      </form>
    </div>

    </>
     );
}

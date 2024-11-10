/*import axios from "axios";
import { useFormik } from "formik"
import { useNavigate } from "react-router-dom";
import * as yup from 'yup';
import {jwtDecode} from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "./context/User";

export default function Login({setIsLogin,setUserData}) {
   const userName = useContext(UserContext);
   const navigate = useNavigate();
    const schema = yup.object({
        email:yup.string().required().min(5).max(20).email(),
        password:yup.string().required().min(6).max(20),

    });
 const formik = useFormik({
        initialValues:{
        email:'',
        password:''
        },
        onSubmit:LoginUser,
        validationSchema:schema
    });

    async function LoginUser (){
       const {data} = await axios.post('https://ecommerce-node4.onrender.com/auth/signin',formik.values)
       console.log(data);
       if (data.message == 'success'){
        localStorage.setItem("userToken",data.token);
        setIsLogin(true);
        const decoded = jwtDecode (data.token);
        setUserData(decoded);
        //navigate('/');
       }
        
    }

  return (
    <div>
        <h1 className="p-4 text-center">Login</h1>
        <form onSubmit={formik.handleSubmit} className="w-50 m-auto">
            <div className="form-floating mb-3">
            <input type="email" className="form-control" onChange={formik.handleChange} name="email" id="email" value={formik.email} onBlur={formik.handleBlur} placeholder="" required min={5} max={20}/>
            <label htmlFor="email">Email</label>
            {formik.touched.email && formik.errors.email?<div className="text text-danger">{formik.errors.email}</div> :null}
            </div>
            <div className="form-floating mb-3">
            <input type="password" className="form-control" onChange={formik.handleChange} name="password" id="pass" value={formik.password} onBlur={formik.handleBlur} placeholder="" required min={6} max={20} />
            <label htmlFor="pass">Password</label>
            {formik.touched.password && formik.errors.password?<div className="text text-danger">{formik.errors.password}</div> :null}
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
            <button type='submit' className="btn btn-outline-info" >Login</button>
            </div>        
            </form>
    </div>
  )
}*/
import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useContext } from "react";
import { UserContext } from "./context/User";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login({ setIsLogin, setUserData }) {
  const navigate = useNavigate();
  const [showForgotPasswordModal, setShowForgotPasswordModal] = useState(false);
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const schema = yup.object({
    email: yup.string().required().min(5).max(30).email(),
    password: yup.string().required().min(6).max(20),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: loginUser,
    validationSchema: schema,
  });

  async function loginUser() {
    try {
      const { data } = await axios.post(
        "https://ecommerce-node4.onrender.com/auth/signin",
        formik.values
      );
      if (data.message === "success") {
        localStorage.setItem("userToken", data.token);
        setIsLogin(true);
        const decoded = jwtDecode(data.token);
        setUserData(decoded);
        toast.success("You have been logged in successfully", {
          duration: 3000,
          position: "top-center",
          style: {
            backgroundColor: "#28a745",
          },
        });
        navigate("/");
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to log in. Please check your credentials.", {
        duration: 3000,
        position: "top-center",
        style: {
          backgroundColor: "#dc3545",
        },
      });
    }
  }
  async function forgotPasswordSubmit(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://ecommerce-node4.onrender.com/auth/sendcode",
        { email }
      );
      console.log(response.data);
      localStorage.setItem("userEmail", email);
      setIsCodeSent(true);
    } catch (error) {
      console.error("Error:", error);
    }
  }

  async function resetPasswordSubmit(e) {
    e.preventDefault();
    try {
      const storedEmail = localStorage.getItem("userEmail");
      const response = await axios.patch(
        "https://ecommerce-node4.onrender.com/auth/forgotPassword",
        {
          email: storedEmail,
          password: newPassword,
          code: code,
        }
      );
      console.log(response.data);

      toast.success({
        text: "Password changed successfully!",
        duration: 3000,
        gravity: "top",
        position: "center",
        backgroundColor: "#28a745",
      });

      navigate("/");

      localStorage.removeItem("userEmail");
    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <>
          <ToastContainer />
          <div>
      <h1 className="p-4 text-center">Login</h1>
      <form onSubmit={formik.handleSubmit} className="w-50 m-auto">
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
            autoComplete="username"
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
            autoComplete="current-password"
          />
          <label htmlFor="pass">Password</label>
          {formik.touched.password && formik.errors.password ? (
            <div className="text text-danger">{formik.errors.password}</div>
          ) : null}
        </div>
        <div className="d-grid gap-2 col-6 mx-auto mb-3">
          <button type="submit" className="btn btn-outline-info">
            Login
          </button>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setShowForgotPasswordModal(true)}
            data-bs-toggle="modal"
            data-bs-target="#forgotPasswordModal"
          >
            Forgot Password?
          </button>
        </div>
      </form>

      <div
        className="modal fade"
        id="forgotPasswordModal"
        tabIndex="-1"
        aria-labelledby="forgotPasswordModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="forgotPasswordModalLabel">
                {isCodeSent ? "Reset Password" : "Forgot Password"}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => setShowForgotPasswordModal(false)}
              ></button>
            </div>
            <div className="modal-body">
              {isCodeSent ? (
                <form onSubmit={resetPasswordSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                      placeholder="Enter the code"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-success">
                    Submit
                  </button>
                </form>
              ) : (
                <form onSubmit={forgotPasswordSubmit}>
                  <div className="mb-3">
                    <input
                      type="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Send Code
                  </button>
                </form>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => setShowForgotPasswordModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>


    </>
      );
}

import axios from "axios";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";

export default function Checkout() {
  /*const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0); 

  async function getCartItems() {
    try {
      const token = localStorage.getItem("userToken");
      const { data } = await axios.get(`https://ecommerce-node4.onrender.com/order`,
     {
        headers: {
            Authorization:`Tariq__${token}`
        },
      });
      console.log(data);
      setCartItems(data.orders); 
        } catch (error) {
      console.error(error);
    }
  }

  const calculateTotal = () => {
    const totalAmount = cartItems.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    setTotal(totalAmount);
  };
*/
  const handleCheckout = async (values) => {
    try {
      const token = localStorage.getItem("userToken");
      const {data} = await axios.post(`https://ecommerce-node4.onrender.com/order`,
        {
            couponName: '',
            address: values.address,
            phone: values.phone,
          },
         {
        headers: {
            Authorization:`Tariq__${token}`
        },
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const schema = yup.object({
    couponName: yup.string(),
    address: yup.string().required(),
    phone: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: {
      couponName: '',
      address: '',
      phone: '',
    },
    validationSchema: schema,
    onSubmit: handleCheckout,
  });

  /*useEffect(() => {
    getCartItems();
  }, []);

  /*useEffect(() => {
    calculateTotal();
  }, [cartItems]);*/

  return (
    <div className="mb-5">
      
      <h1 className="text-center p-5">Checkout</h1>

      <form onSubmit={formik.handleSubmit} className="w-50 mx-auto" >
        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            name="couponName"
            id="couponName"
            value={formik.values.couponName}
            onBlur={formik.handleBlur}
            placeholder=""
          />
          <label htmlFor="name">Coupon Name</label>
          {formik.touched.name && formik.errors.couponName ? (
            <div className="text text-danger">{formik.errors.couponName}</div>
          ) : null}
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            name="address"
            id="address"
            value={formik.values.address}
            onBlur={formik.handleBlur}
            placeholder=""
          />
          <label htmlFor="address">Your Address</label>
          {formik.touched.address && formik.errors.address ? (
            <div className="text text-danger">{formik.errors.address}</div>
          ) : null}
        </div>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            onChange={formik.handleChange}
            name="phone"
            id="phone"
            value={formik.values.phone}
            onBlur={formik.handleBlur}
            placeholder=""
          />
          <label htmlFor="phone">Phone Number</label>
          {formik.touched.phone && formik.errors.phone ? (
            <div className="text text-danger">{formik.errors.phone}</div>
          ) : null}
        </div>

        <div className="d-grid gap-2 col-6 mx-auto">
          <button type="submit" className="btn btn-outline-info">
            Complete Order
          </button>
        </div>
      </form>
    </div>
  );
}
<h1 className="p-4 text-center">Checkout</h1>

/* <div className="cart-items">
   {cartItems.map((item) => (
     <div key={item.product._id} className="cart-item">
       <h5>{item.name}</h5>
       <p>Price: {item.price} JOD</p>
       <p>Quantity: {item.quantity}</p>
     </div>
   ))}
 </div>

 <h3>Total Price: {total} JOD </h3>*/
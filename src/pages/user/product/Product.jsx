import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import style from "./Product.module.css";
import { useParams, useNavigate } from 'react-router-dom'; 
import Loader from '../../../reusable/loader/Loader.jsx';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';




export default function Product() {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState(null);
    const [product,setProduct] = useState({});
    const [productImages,setProductImages] = useState([]);
    const [avgRating, setAvgRating] = useState();
    const [review, setReview] = useState();
    const [rating, setRating] = useState('');
    const {productId} = useParams(); 

    const getProduct = async ()=>{
        setLoading(true); 
        const {data} = await axios.get (`https://ecommerce-node4.onrender.com/products/${productId}`);
        console.log(data);
        setProduct(data.product);
        setProductImages(data.product.subImages);
        setAvgRating(data.avgRating);
        setLoading(false);

    }

const getOrderStatus = async () => {
  try {
    const { data } = await axios.get('https://ecommerce-node4.onrender.com/order', {
      headers: {
        Authorization: `Tariq__${token}`,
      },
    });

   /*
    data.orders.forEach(order => {
      order.products.forEach(product => {
        console.log(product.productId.status);
      });
    });

    
    const statuses = data.orders.map(order =>
      order.products.map(product => product.productId.status)
    );
    setOrderStatus(statuses);*/

  } catch (err) {
    console.error('Failed to load order status.');
  }
};
    useEffect( ()=>{
        getProduct();
        getOrderStatus();
    },[]);

    const addToCart = async()=>{
      const token = localStorage.getItem('userToken');
      setLoading(true);
      try {
        const { data } = await axios.post(
          `https://ecommerce-node4.onrender.com/cart/`,
          { productId: productId },
          {
            headers: {
              Authorization: `Tariq__${token}`,
            },
          }
        )
        toast.success('Product added to the cart', {
          position: "top-right",
          autoClose: 3000, 
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,})
        
    } catch (err) {
      toast.error('Product Has Already Been Added ', {
        position: "top-right",
        autoClose: 3000, 
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,})
    
    }finally{
      setLoading(false);
    }
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('userToken');
  
    try {
      const response = await axios.post(
        `https://ecommerce-node4.onrender.com/products/${productId}/review`, 
        { comment: review, rating: rating },
        { headers: { Authorization: `Tariq__${token}` } }
      );
  
      if (response.data.message === 'success') {
        toast.success("Review added successfully!");
        setReview('');
        setRating('');
        getProduct();
      }
    } catch (err) {
      toast.error("You must have purchased this product to add a review.");
    }
  };


if (loading){
  return(
    <Loader />
  )
 }
 if(error){
 return <div className='alert-danger'>{error}</div>
 }
/*return (
  <>
      <section className='product'>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          {productImages.map(img => (
              <img src={img.secure_url} key={img.public_id} alt="Product" />
          ))}
          <button onClick={addToCart} className='btn btn-success'>Add to cart</button>
          <h3>Reviews</h3>
          <p>Average Rating: {avgRating}/5</p>
          {product.reviews && product.reviews.length > 0 ? (
              product.reviews.map((review) => (
                  <div key={review._id}>
                      <p>{review.comment}</p>
                  </div>
              ))
          ) : (
              <p>No Reviews Yet</p>
          )}
      </section>
      
      {product.status === 'Active' && ( 
          <form onSubmit={handleReviewSubmit} className="review-form">
              <div className="form-group">
                  <label htmlFor="rating">Rating</label>
                  <select 
                      id="rating"
                      value={rating} 
                      onChange={(e) => setRating(e.target.value)} 
                      required
                  >
                      <option value="" label="Rating" />
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>
              </div>
              <div className="form-group">
                  <label htmlFor="review">Write Your Review</label>
                  <textarea 
                      id="review"
                      placeholder=''
                      value={review} 
                      onChange={(e) => setReview(e.target.value)} 
                      required
                  />
              </div>
              <button type="submit" className='btn btn-primary'>Send</button>
          </form>
      )}
  </>
);
}*/
/*return(
<>
<section className="product-details row">

 <div className="col-lg-7">
    <div className="tab-content tab-content-cost" id="v-pills-tabContent">
      {productImages.map((img, index) => (
        <div
          className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
          id={`v-pills-image${index + 1}`}
          role="tabpanel"
          aria-labelledby={`v-pills-image${index + 1}-tab`}
          key={img.public_id}
        >
          <img className="img-fluid" src={img.secure_url} alt="Product" title="Product" />
        </div>
      ))}
    </div>

    <div className="nav nav-cost nav-pills d-flex mt-3" id="v-pills-tab" role="tablist" aria-orientation="horizontal">
      {productImages.map((img, index) => (
        <button
          className={`nav-link ${index === 0 ? 'active' : ''} flex-fill`}
          id={`v-pills-image${index + 1}-tab`}
          data-bs-toggle="pill"
          data-bs-target={`#v-pills-image${index + 1}`}
          type="button"
          role="tab"
          aria-controls={`v-pills-image${index + 1}`}
          aria-selected={index === 0 ? 'true' : 'false'}
          key={img.public_id}
        >
          <img src={img.secure_url} alt="Product" title="Product" className="img-thumbnail" />
        </button>
      ))}
    </div>
  </div>

  <div className="col-lg-5">
    <h2>{product.name}</h2>
    <p>{product.description}</p>
    <button onClick={addToCart} className="btn btn-success mb-3">Add to cart</button>

    <h3>Reviews</h3>
    <p>Average Rating: {avgRating}/5</p>
    {product.reviews && product.reviews.length > 0 ? (
      product.reviews.map((review) => (
        <div key={review._id}>
          <p>{review.comment}</p>
        </div>
      ))
    ) : (
      <p>No Reviews Yet</p>
    )}

    {product.status === 'Active' && (
      <form onSubmit={handleReviewSubmit} className="review-form mt-4">
        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
            className="form-control"
          >
            <option value="" label="Rating" />
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>
        <div className="form-group mt-3">
          <label htmlFor="review">Write Your Review</label>
          <textarea
            id="review"
            placeholder=""
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Send</button>
      </form>
    )}
  </div>
</section>

  </>
  );*/
return(
  <>
      <ToastContainer />
  <section className="product-details p-5">
    <div className="container">
    <div className="row">
  <div className="col-lg-7">
    <div
      className="tab-content tab-content-cost"
      id="v-pills-tabContent"
      style={{
        backgroundColor: '#f8f9fa',
        padding: '20px',
        borderRadius: '5px',
        textAlign: 'center',
      }} 
    >
      {productImages.map((img, index) => (
        <div
          className={`tab-pane fade ${index === 0 ? 'show active' : ''}`}
          id={`v-pills-image${index + 1}`}
          role="tabpanel"
          aria-labelledby={`v-pills-image${index + 1}-tab`}
          key={img.public_id}
        >
          <img
            className="img-fluid"
            src={img.secure_url}
            alt="Product"
            title="Product"
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
        </div>
      ))}
    </div>

    <div
      className="nav nav-cost nav-pills d-flex mt-3"
      id="v-pills-tab"
      role="tablist"
      aria-orientation="horizontal"
      style={{
        display: 'flex',
        flexWrap: 'nowrap',
        overflowX: 'auto',
        gap: '8px',
      }}
    >
      {productImages.map((img, index) => (
        <button
          className={`nav-link ${index === 0 ? 'active' : ''} flex-fill`}
          id={`v-pills-image${index + 1}-tab`}
          data-bs-toggle="pill"
          data-bs-target={`#v-pills-image${index + 1}`}
          type="button"
          role="tab"
          aria-controls={`v-pills-image${index + 1}`}
          aria-selected={index === 0 ? 'true' : 'false'}
          key={img.public_id}
          style={{
            padding: '5px',
            border: '2px solid #f4f4f4',
            borderRadius: '3px',
            cursor: 'pointer',
            flex: '0 0 auto',
            width: '80px',
            height: '100px',
          }}
        >
          <img
            src={img.secure_url}
            alt="Product"
            title="Product"
            className="img-thumbnail"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
          />
        </button>
      ))}
    </div>
  </div>
<div className="col-lg-5">
  <h2 className="fw-bold text-dark mx-3 p-3 fs-3 lh-base">{product.name}</h2>
  <div className="stars mx-3 px-3">
          <i className={`fa fa-star${avgRating >= 1 ? '' : '-o'}`} style={{ color: product.avgRating >= 1 ? '#ccc' : '#FFD700', fontSize: '1.5rem' }}></i>
          <i className={`fa fa-star${avgRating >= 2 ? '' : '-o'}`} style={{ color: product.avgRating >= 2 ? '#ccc' : '#FFD700', fontSize: '1.5rem' }}></i>
          <i className={`fa fa-star${avgRating >= 3 ? '' : '-o'}`} style={{ color: product.avgRating >= 3 ? '#ccc' : '#FFD700', fontSize: '1.5rem' }}></i>
          <i className={`fa fa-star${avgRating >= 4 ? '' : '-o'}`} style={{ color: product.avgRating >= 4 ? '#ccc' : '#FFD700', fontSize: '1.5rem' }}></i>
          <i className={`fa fa-star${avgRating >= 5 ? '' : '-o'}`} style={{ color: product.avgRating >= 5 ? '#ccc' : '#FFD700', fontSize: '1.5rem' }}></i>
        </div>
        <p className="text-muted fs-6 lh-base text-start mx-3 p-3" style={{ maxWidth: '600px' }}>
  {product.description}
</p>  <p className='fw-bold h5 mx-3 px-3 mb-3'>
  Price:  <span className="h5 fw-bold text-success">
    {product.price} $
  </span>
  </p>

  <button onClick={addToCart} className="btn btn-success mb-3 mt-2 w-100">
    Add to Cart
  </button>
</div>

<div className='py-3 mt-5'>
<div className="review-section ">
        <h3>Reviews</h3>        
      </div>
    {product.reviews && product.reviews.length > 0 ? (
      product.reviews.map((review) => (
        <div key={review._id} className="review-item border-bottom py-2">
          <p className="mb-1" style={{ fontWeight: 'bold' }}>{review.comment}</p>
          <small className="text-muted">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</small>
        </div>
      ))
    ) : (
      <p>No Reviews Yet</p>
    )}

</div>


<form onSubmit={handleReviewSubmit} className="review-form mt-4">
  <div className="form-group">
    <label htmlFor="rating">Rating</label>
    <select
      id="rating"
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      required
      className="form-control"
      aria-label="Select a rating from 1 to 5"
    >
      <option value="" disabled label="Select your rating" />
      {[1, 2, 3, 4, 5].map((star) => (
        <option key={star} value={star}>{star}</option>
      ))}
    </select>
  </div>
  
  <div className="form-group mt-3">
    <label htmlFor="review">Write Your Review</label>
    <textarea
      id="review"
      placeholder="Share your experience with this product..."
      value={review}
      onChange={(e) => setReview(e.target.value)}
      required
      className="form-control"
      aria-label="Write your review here"
    />
  </div>
  
  <button type="submit" className="btn btn-primary mt-3">
    Send
  </button>
</form>

      
</div>


  
  </div>

</section>

  </>

)};

import React, { useEffect } from 'react';
import {useState} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import  { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Pagination, Autoplay } from 'swiper/modules';
import Loader from '../../../reusable/loader/Loader.jsx';
import useFetchData from '../../../customHooks/useFetchData';


export default function Categories() {
   /* const [categories,setCategories] = useState([]);
    const getCategories = async ()=>{
        const {data} = await axios.get ('https://ecommerce-node4.onrender.com/categories/active?page=1&limit=3');
        setCategories(data.categories);
    }

    useEffect( ()=>{
        getCategories();
    },[]);
*/
const {data,loading,error} = useFetchData('https://ecommerce-node4.onrender.com/categories/active');
 if (loading){
  return(
    <Loader />
  )
 }
 if(error){
 return <div className='alert-danger'>{error}</div>
 }
/*
  return (
    <section className='categories'>
   <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
    >
      {data.categories.map(category=>
        <SwiperSlide key={category._id}>
  <Link to={`/CategoryDetails/${category._id}`}>
    <img src={category.image.secure_url} alt={category.name} />
  </Link>
</SwiperSlide>

      )}
      </Swiper>
    </section>
  )
}
*/

return (
  <>
  <section className='categories h-100'>
    <div className="container bg-body-tertiary py-4">
    <Swiper 
slidesPerView={2}
/*spaceBetween={20}*/
autoplay={{
  delay: 3000, 
 disableOnInteraction: false, 
}}

pagination={{
  clickable: true,
}}
modules={[Pagination, Autoplay]}
className="mySwiper"
speed={600}
>
{data.categories.map(category=>
        <SwiperSlide key={category._id} className='h-100'>
        <Link to={`/CategoryDetails/${category._id}`} className='d-flex justify-content-center align-items-center h-100 p-3 h-100'>
          <img src={category.image.secure_url} alt={category.name} className='img-fluid' />
        </Link>
        </SwiperSlide>
         )}
</Swiper>
    </div>

</section>
</>

);
}

/*<Swiper
        direction={'horizontal'}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination, Autoplay]}
        className="mySwiper"
        slidesPerView={3}
        autoplay={{
          delay: 4000, 
          disableOnInteraction: false, 
        }}
      >
         {data.categories.map(category=>
        <SwiperSlide key={category._id}>
        <Link to={`/CategoryDetails/${category._id}`}>
          <img src={category.image.secure_url} alt={category.name} />
        </Link>
        </SwiperSlide>
         )}
      </Swiper>
    */

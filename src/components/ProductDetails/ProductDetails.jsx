import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader/Loader';
import { cartContext } from '../../context/cartContext';
import toast from 'react-hot-toast';

// 👇 1. استيراد Swiper والموديولات الخاصة بيه لصفحة التفاصيل
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// استيراد ستايلات Swiper الجاهزة
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import styles from './ProductDetails.module.css';

export default function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [isLoading, setLoading] = useState(true);
    let { addProductToCart } = useContext(cartContext);

    async function addProduct(productId) {
        let response = await addProductToCart(productId);
        if (response?.data?.status === 'success') {
            toast.success(response.data.message);
        } else {
            toast.error(response?.data?.message || "حدث خطأ ما");
        }
    }

    function getProductDetails(productId) {
        axios.get(`https://ecommerce.routemisr.com/api/v1/products/${productId}`)
            .then((response) => {
                setProduct(response.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }

    useEffect(() => {
        getProductDetails(id);
    }, [id]);

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='container py-5 mt-5'>
            <div className='row align-items-center g-5'>
                
                {/* العمود الأول: سلايدر صور المنتج */}
                <div className='col-md-4'>
                    {product?.images && product.images.length > 0 ? (
                        <Swiper
                            modules={[Navigation, Pagination, Autoplay]}
                            navigation={true}
                            pagination={{ clickable: true }}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            slidesPerView={1} // يعرض صورة واحدة فقط في المرة
                            spaceBetween={0}
                            className={styles.detailsSwiper}
                        >
                            {product.images.map((imgUrl, index) => (
                                <SwiperSlide key={index}>
                                    <div className={styles.imageContainer}>
                                        <img 
                                            src={imgUrl} 
                                            alt={`${product?.title} - ${index}`} 
                                            className='w-100' 
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    ) : (
                        // لو مفيش ألبوم صور (للاحتياط)، بنعرض الصورة الرئيسية الافتراضية
                        <img src={product?.imageCover} alt={product?.title} className='w-100 rounded' />
                    )}
                </div>

                {/* العمود الثاني: تفاصيل المنتج */}
                <div className='col-md-8'>
                    <div className='details-content'>
                        <h2 className='h4 font-weight-bold text-dark mb-2'>{product?.title}</h2>
                        <p className='text-muted my-3 leading-relaxed'>{product?.description}</p>
                        
                        <span className='text-success font-sm d-block mb-3 fw-bold'>
                            {product?.category?.name}
                        </span>

                        <div className='d-flex justify-content-between align-items-center border-top border-bottom py-3 my-4'>
                            <span className='fw-bold fs-5 text-dark'>{product?.price} EGP</span>
                            <span className='d-flex align-items-center gap-1'>
                                <i className='fas fa-star text-warning'></i> 
                                <span className='fw-semibold'>{product?.ratingsAverage}</span>
                            </span>
                        </div>

                        {/* زرار الإضافة الملتزم بنفس الاستايل الأسود الموحد */}
                        <button 
                            onClick={() => addProduct(product.id)} 
                            className='btn w-100 py-2.5'
                            style={{
                                backgroundColor: '#111111',
                                color: '#ffffff',
                                border: 'none',
                                fontWeight: 'bold',
                                borderRadius: '5px',
                                fontSize: '16px'
                            }}
                        >
                            + Add To Cart
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}
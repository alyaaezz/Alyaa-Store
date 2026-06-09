import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import Loader from '../Loader/Loader'
import { Link, useNavigate } from 'react-router-dom' // ضفنا useNavigate هنا
import { cartContext } from '../../context/cartContext'
import { userContext } from '../../context/userContext' // استدعاء الـ User Context بتاعك
import toast from 'react-hot-toast'
import ProductSlider from '../ProductSlider/ProductSlider'

export default function Products() {
    let { addProductToCart } = useContext(cartContext); 
    let { userToken } = useContext(userContext); // 1. استهلاك التوكن لمعرفة حالة تسجيل الدخول
    
    const navigate = useNavigate(); // 2. هوك التنقل بين الصفحات
    const [isLoading, setLoading] = useState(true)
    const [products, setProducts] = useState([])
    const [selectedCategory, setSelectedCategory] = useState('All')

    async function addProduct(productId) {
        // 3. التشيك الذكي: لو المستخدم مش مسجل دخول (التوكن فاضي أو مش موجود)
        if (!userToken) {
            toast.error("Sorry! Login Frist ", {
                position: 'top-center',
                duration: 3000
            });
            navigate('/login'); // توجيهه فوراً لصفحة الـ Login
            return; // إيقاف الفانكشن هنا ومنع الإضافة
        }

        // لو مسجل دخول يكمل الكود العادي بتاعك:
        let response = await addProductToCart(productId)
        if (response?.data?.status === 'success') {
            toast.success(response.data.message)
        } else {
            toast.error(response?.data?.message || "حدث خطأ ما")
        }
    }

    function getProducts() {
        axios.get('https://ecommerce.routemisr.com/api/v1/products')
            .then((response) => {
                setProducts(response.data.data)
                setLoading(false)
            })
            .catch((error) => {
                console.error("Error fetching products:", error)
                setLoading(false)
            })
    }

    useEffect(() => {
        getProducts()
    }, [])

    const filteredProducts = products.filter((product) => {
        if (selectedCategory === 'All') return true;
        
        if (selectedCategory === 'Clothing') {
            return product?.category?.name?.toLowerCase().includes('clothing') || 
                   product?.category?.name?.toLowerCase().includes('fashion') ||
                   product?.category?.name?.toLowerCase().includes('men') ||
                   product?.category?.name?.toLowerCase().includes('women');
        }
        
        return product?.category?.name?.toLowerCase() === selectedCategory.toLowerCase();
    });

    return (
        <div className='container py-5'>
            
            {!isLoading && (
                <ProductSlider 
                    data={filteredProducts} 
                    selectedCategory={selectedCategory} 
                    setSelectedCategory={setSelectedCategory} 
                />
            )}

            <div className='row g-4 mt-4'>
                {!isLoading ? (
                    filteredProducts.length > 0 ? (
                        filteredProducts.map((productInfo) => (
                            <div key={productInfo.id} className='col-md-3'>
                                <div className='product p-3 border styleProduct h-100'>
                                    <Link to={`/productDetails/${productInfo.id}`}>
                                        <img src={productInfo?.imageCover} alt={productInfo?.title} className='w-100' />
                                        <span className='text-success d-block font-sm'>{productInfo?.category?.name}</span>
                                        
                                        <h3 className='h6'>
                                            {productInfo?.title?.split(' ')?.slice(0, 2)?.join(' ') || "Product Name"}
                                        </h3>

                                        <div className='d-flex justify-content-between align-items-center'>
                                            <span>{productInfo?.price} EGP</span>
                                            <span>
                                                <i className='fas fa-star text-warning'></i> 
                                                {productInfo?.ratingsAverage}
                                            </span>
                                        </div>
                                    </Link>
                                    <button 
                                        onClick={() => addProduct(productInfo.id)} 
                                        className='btn w-100 mt-2'
                                        style={{ 
                                            backgroundColor: '#530da9', 
                                            color: '#ffffff',          
                                            border: 'none',            
                                            padding: '10px 0',          
                                            fontWeight: 'bold',         
                                            borderRadius: '5px'         
                                        }}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center w-100 my-5">
                            <h4 className="text-muted">No products available in this section.</h4>
                        </div>
                    )
                ) : (
                    <Loader />
                )}
            </div>
        </div>
    )
}
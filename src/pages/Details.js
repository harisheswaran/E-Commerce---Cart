import React from 'react'
import { useState,useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Details = ({cartItems,setCartItem}) => {
    const [product, setproduct] = useState(null);
    const {id} = useParams();
    const [qty,setqty] = useState(1);
    useEffect(
        ()=>{
            fetch('http://www.localhost:5000/api/v1/products/'+id)
            .then((res) => res.json()).then( res => setproduct(res.product));
        },[]
    )
    console.log(product);

    function addtocart(){
        const itemexixt=cartItems.find((item)=> item.product._id == product._id)
        if(!itemexixt){
            const newitem = {product,qty};
            setCartItem((prev) => [...prev,newitem]);
            toast.success("Item added to cart!!!");
        }
        else{
            toast.warning("Item already added to cart???");
        }
    } 

  return product && <div class="container container-fluid">
    <div class="row f-flex justify-content-around">
        <div class="col-12 col-lg-5 img-fluid" id="product_image">
            <img src={product.images[0].image} alt="sdf" height="500" width="500"/>
        </div>

        <div class="col-12 col-lg-5 mt-5">
            <h3>{product.name}</h3>
            <p id="product_id">Product # {product._id}</p>

            <hr/>

            <div class="rating-outer">
                <div class="rating-inner" style={{width: `${product.ratings*20}%`}}></div>
            </div>
       

            <hr/>

            <p id="product_price">${product.price}</p>
            <div class="stockCounter d-inline">
                <span onClick={()=>{ return qty<=1?1:setqty(qty-1)}} class="btn btn-danger minus">-</span>

                <input type="number" class="form-control count d-inline" value={qty} readOnly />

                <span onClick={()=>{return qty == product.stock ? toast.dark('You have reached the limit'):setqty(qty+1)}}  class="btn btn-primary plus">+</span>
            </div>
            <button type="button" onClick={addtocart} disabled={product.stock==0}  id="cart_btn" class="btn btn-primary d-inline ml-4">Add to Cart</button>

            <hr/>

            <p>Status: <span id="stock_status" className={product.stock > 0 ? 'text-success' : 'text-danger'}>{product.stock > 0 ? 'In Stock' : 'Out Of Stock'}</span></p>

            <hr/>

            <h4 class="mt-2">Description:</h4>
            <p>{product.description}</p>
            <hr/>
            <p id="product_seller mb-3">Sold by: <strong>{product.seller}</strong></p>
            
            <div class="rating w-50"></div>
                    
        </div>

    </div>

</div>
  
}

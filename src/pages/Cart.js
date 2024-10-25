import {Fragment,useState} from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
export const Cart = ({cartItems,setCartItem}) => {
    const [complete, setcomplete] = useState(false)
    function increase(item){
        if(item.product.stock == item.qty){
            return;
        }
        const upd = cartItems.map((i)=>{
            if(i.product._id==item.product._id){
                i.qty++;
            }
            return i;
        })
        setCartItem(upd);
    }

    function decrease(item){
        if(item.qty > 1){
        const upd = cartItems.map((i)=>{
            if(i.product._id==item.product._id){
                i.qty--;
            }
            return i;
        })
        setCartItem(upd);
        }
    }

    function removeitem(item){
        const upd = cartItems.filter((i)=>{
            if(i.product._id !=item.product._id){
                return i;
            }
        })
        setCartItem(upd);
        toast.warning("Item deleted from cart");
    }

    function placeorder(){
        fetch("http://www.localhost:5000/api/v1/order",{
            method: 'POST',
            headers:{'Content-Type':'application/json'},
            body:JSON.stringify(cartItems),
        }).then(()=> {
            setCartItem([]);
            setcomplete(true);
            toast.success("Order Success")
        }
        );
    }

  return cartItems.length>0?<Fragment>
    <div class="container container-fluid">
  <h2 class="mt-5">Your Cart: <b>{cartItems.length} items</b></h2>
  
  <div class="row d-flex justify-content-between">
      <div class="col-12 col-lg-8">
        {
            cartItems.map((item)=>(
          <Fragment>
          <hr />
          <div class="cart-item">
              <div class="row">
                  <div class="col-4 col-lg-3">
                      <img src={item.product.images[0].image} alt="Laptop" height="90" width="115"/>
                  </div>

                  <div class="col-5 col-lg-3">
                  <Link to={"/products/"+item.product._id}>{item.product.name}</Link>
                  </div>


                  <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                      <p id="card_item_price">${item.product.price}</p>
                  </div>

                  <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                      <div class="stockCounter d-inline">
                          <span class="btn btn-danger minus" onClick={()=> decrease(item)}>-</span>
                          <input type="number" class="form-control count d-inline" value={item.qty} readOnly/>

                          <span class="btn btn-primary plus" onClick={()=> increase(item)}>+</span>
                      </div>
                  </div>

                  <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                      <i id="delete_cart_item" onClick={() => removeitem(item)} class="fa fa-trash btn btn-danger"></i>
                  </div>

              </div>
          </div>
          <hr />
          </Fragment>
            ))
        }
      </div>

      <div class="col-12 col-lg-3 my-4">
          <div id="order_summary">
              <h4>Order Summary</h4>
              <hr />
              <p>Subtotal:  <span class="order-summary-values">{cartItems.reduce((acc,item) =>  (acc + item.qty),0)} (Units)</span></p>
              <p>Est. total: <span class="order-summary-values">${Number(cartItems.reduce((acc,item) =>  (acc + item.qty*item.product.price),0)).toFixed(2)}</span></p>

              <hr />
              <button id="checkout_btn" onClick={placeorder} class="btn btn-primary btn-block">Place Order</button>
          </div>
      </div>
  </div>
</div>
  </Fragment> :  ( !complete ? <h2>Your cart is empty</h2>: <Fragment><h2>Order Completed</h2><p>You're Order has been placed successfully</p></Fragment>)
}

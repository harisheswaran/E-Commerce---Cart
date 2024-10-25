import {React,Fragment, useEffect} from 'react'
import { Product } from '../components/Product'
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
export const Home = () => {

    const [list, setlist] = useState([]);
    const [searchparams,setsearchparams]=useSearchParams()
    useEffect(
        ()=>{
            fetch('http://www.localhost:5000/api/v1/products?'+searchparams).then((res) => res.json()).then ( res => setlist(res.products));
        },[searchparams]
    )
    console.log(list);
  return <Fragment>
    <h1 id="products_heading">Latest Products</h1>

    <section id="products" className="container mt-5">
      <div className="row">
        {
            list.map(li => <Product list={li}/>)
        }
      </div>
    </section>

    
  </Fragment>
}

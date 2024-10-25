import React from 'react'
import { Link } from 'react-router-dom'
export const Product = ({list}) => {
  return <div className="col-sm-12 col-md-6 col-lg-3 my-3">
  <div className="card p-3 rounded">
  <Link to={"/products/"+list._id}><img
      className="card-img-top mx-auto"
      src={list.images[0].image}
    /></Link>
    <div className="card-body d-flex flex-column">
      <h5 className="card-title">
      <Link to={"/products/"+list._id}>{list.name}</Link>
      </h5>
      <div className="ratings mt-auto">
        <div className="rating-outer">
          <div className="rating-inner" style={{width: `${list.ratings*20}%`}}></div>
        </div>
      </div>
      <p className="card-text">${list.price}</p>
      <Link to={"/products/"+list._id} id="view_btn" className="btn btn-block">View Details </Link>
    </div>
  </div>
</div>
}

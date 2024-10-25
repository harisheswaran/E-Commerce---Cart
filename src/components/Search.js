import React from 'react'
import { useState } from 'react';
import {useNavigate} from 'react-router-dom';
export const Search = () => {

    const [keyword, setkeyword] = useState("");
    const navigate = useNavigate();

    const handler = () => {
        console.log('I am clicked')
        navigate('/search?keyword='+keyword);
    }

  return (
    <div className='col'>
        <input
        type="text"
        id="search_field"
        onChange={(e) => setkeyword(e.target.value)}
        onBlur={handler}
        className="form-control"
        placeholder="Enter Product Name ..."
       />
      <div>
        <button onClick={handler} id="search_btn" className="btn">
          <i className="fa fa-search" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  )
}

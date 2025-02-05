import axios from 'axios';
import React, { useState , useEffect } from 'react'
import { API_URL } from '../utills/BaseUrl';
import { Link } from 'react-router-dom'; 
function CategoryMenuDropdown() {
    const [data , setData] = useState('');

    useEffect(() => {
        axios.get(`${API_URL}/categories?displayOrder=ASC`)
          .then(response => {
            setData(response.data.body);
            setLoading(false);
          })
          .catch(error => {
            console.error("Error fetching data:", error.message);
            setLoading(false);
          });
      }, []);
      
  return (
    <>
        <div className="dropdown">
        <Link className="nav-link" to={'/'}>Our Programs</Link>
          <div className="dropdown-content">
            {
                data && data.map((category)=>{
                    return(
                        <div key={category._id}>
                            <Link to={`/category/${category._id}`}>{category.name}</Link>
                        </div>
                    )
                })
            }
          </div>
        </div>  
    </>
  )
}

export default CategoryMenuDropdown
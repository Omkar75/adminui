import React from 'react'
import './Paginations.css'
const Paginations = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }
    console.log(pageNumbers)
    return (
            <div className="pagination">
                {pageNumbers.map(number=>(
                    <a onClick={()=> paginate(number)} href = "!#"  className="page-item">
                        <span key={number} className="page-link">
                            {number}
                        </span>
                    </a>
                ))}
            </div>
    )
}

export default Paginations

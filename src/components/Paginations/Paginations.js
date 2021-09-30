import React from 'react'
import './Paginations.css'
const Paginations = ({postsPerPage, totalPosts, paginate}) => {
    const pageNumbers = [];
    for(let i=1; i<=Math.ceil(totalPosts/postsPerPage); i++){
        pageNumbers.push(i);
    }
    return (
            <div className="pagination">
                {pageNumbers.map(number=>(
                    < button onClick={()=> paginate(number)} className="page-item">
                        <span key={number} className="page-link">
                            {number}
                        </span>
                    </button>
                ))}
            </div>
    )
}

export default Paginations

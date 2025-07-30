import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = ({items}) => {
    const navigate= useNavigate();
    const [searchTerm, setSearchTerm]=useState('')
    function handleChange(e){
        setSearchTerm(e.target.value);

    }
function handleKeyDown(e){
  if (e.key === 'Enter' && searchTerm.trim()) {
    navigate(`/search-results?q=${searchTerm}`);
}
}

  return (
    <div><div className="search-bar">
          <input
            className="search-input"
            type='search'
            placeholder="What are you looking for?"
            onChange={handleChange}
            value={searchTerm}
            onKeyDown={handleKeyDown}

          />
          <img src="/assets/images/icons/search.svg" alt=""/>
        </div>
        </div>
  )
}

export default SearchBar; 
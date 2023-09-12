import './search.css'
import { useState } from 'react';

function Search({ onSearch }){

    const [searchValue, setSearchValue] = useState('');

    const handleInputChange = (e) => {
      const value = e.target.value
      setSearchValue(value)
      onSearch(value)
    };

    return(
        <div className="search-div">
                  <input
                        type="text"
                        placeholder="Pesquisar"
                        value={searchValue}
                        onChange={handleInputChange}
                    />
            <div className='search-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none">
                <path d="M21 21L16.657 16.657M16.657 16.657C17.3998 15.9141 17.9891 15.0322 18.3912 14.0615C18.7932 13.0909 19.0002 12.0506 19.0002 11C19.0002 9.94939 18.7932 8.90908 18.3912 7.93845C17.9891 6.96782 17.3998 6.08588 16.657 5.34299C15.9141 4.6001 15.0321 4.01081 14.0615 3.60877C13.0909 3.20672 12.0506 2.99979 11 2.99979C9.94936 2.99979 8.90905 3.20672 7.93842 3.60877C6.96779 4.01081 6.08585 4.6001 5.34296 5.34299C3.84263 6.84332 2.99976 8.87821 2.99976 11C2.99976 13.1218 3.84263 15.1567 5.34296 16.657C6.84329 18.1573 8.87818 19.0002 11 19.0002C13.1217 19.0002 15.1566 18.1573 16.657 16.657Z" stroke="#949494" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
}

export default Search
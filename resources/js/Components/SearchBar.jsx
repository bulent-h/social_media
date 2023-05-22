import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleInputFocus = () => {
    setIsFocused(true);
  };

  const handleInputBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <div className="relative w-52">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          className="ml-4 py-1 pl-3 pr-9 w-full bg-opacity-60 drop-shadow-2xl appearance-none overflow-hidden text-center rounded-full bg-gray-300 text-black border-gray-300 focus:ring-purple-700 shadow-sm"
        />
        <button
          type="submit"
          className={`absolute top-0 right-0 flex items-center justify-center h-full py-1 px-1 ${
            isFocused ? 'text-purple-700' : 'text-gray-400'
          }`}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </form>
  );
};

export default SearchBar;

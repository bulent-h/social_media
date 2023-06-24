import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const SearchBar = ({ searchTerm, onSearchTermChange, className }) => {
  const handleInputChange = (event) => {
    onSearchTermChange(event.target.value);
  };

  const searchBarClasses = className ? `search-bar ${className}` : 'search-bar';

  return (
    <div className={searchBarClasses}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleInputChange}
          className="py-1 pl-3 pr-9 w-full bg-opacity-60 drop-shadow-2xl appearance-none overflow-hidden text-center rounded-full bg-gray-300 dark:bg-gray-100 text-black border-gray-300 focus:ring-purple-700 shadow-sm"
        />
        <button
          type="button"
          className="absolute top-0 right-0 flex items-center justify-center h-full py-1 pr-6 text-gray-400"
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

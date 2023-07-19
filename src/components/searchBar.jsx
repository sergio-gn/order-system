import React, { useState } from 'react';

function SearchBar({ handleSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    handleSearch(value); // Pass the search term value to the handleSearch function
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search by product name or code..."
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
}

export default SearchBar;
